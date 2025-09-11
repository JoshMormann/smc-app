import { createClient } from '@/lib/supabase/client'

export interface FavoriteAction {
  success: boolean
  message: string
  isFavorited?: boolean
}

/**
 * Check if a user has favorited a specific SREF code
 */
export async function checkIfFavorited(codeId: string, userId: string): Promise<boolean> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('saved_codes')
      .select('id')
      .eq('code_id', codeId)
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking favorite status:', error)
      return false
    }
    
    return !!data
  } catch (error) {
    console.error('Error in checkIfFavorited:', error)
    return false
  }
}

/**
 * Toggle favorite status for a SREF code
 */
export async function toggleFavorite(codeId: string, userId: string): Promise<FavoriteAction> {
  try {
    const supabase = createClient()
    
    // Check current status
    const isFavorited = await checkIfFavorited(codeId, userId)
    
    if (isFavorited) {
      // Remove from favorites
      const { error } = await supabase
        .from('saved_codes')
        .delete()
        .eq('code_id', codeId)
        .eq('user_id', userId)
      
      if (error) {
        console.error('Error removing favorite:', error)
        return { success: false, message: 'Failed to remove from favorites' }
      }
      
      // Update save count
      await updateSaveCount(codeId, -1)
      
      return { 
        success: true, 
        message: 'Removed from favorites',
        isFavorited: false 
      }
    } else {
      // Add to favorites
      const { error } = await supabase
        .from('saved_codes')
        .insert({
          code_id: codeId,
          user_id: userId
        })
      
      if (error) {
        console.error('Error adding favorite:', error)
        return { success: false, message: 'Failed to add to favorites' }
      }
      
      // Update save count
      await updateSaveCount(codeId, 1)
      
      return { 
        success: true, 
        message: 'Added to favorites',
        isFavorited: true 
      }
    }
  } catch (error) {
    console.error('Error in toggleFavorite:', error)
    return { success: false, message: 'An error occurred' }
  }
}

/**
 * Update the save count for a SREF code
 */
async function updateSaveCount(codeId: string, increment: number): Promise<void> {
  try {
    const supabase = createClient()
    
    // Get current count
    const { data: currentData, error: fetchError } = await supabase
      .from('sref_codes')
      .select('save_count')
      .eq('id', codeId)
      .single()
    
    if (fetchError) {
      console.error('Error fetching current save count:', fetchError)
      return
    }
    
    const newCount = Math.max(0, (currentData.save_count || 0) + increment)
    
    // Update count
    const { error: updateError } = await supabase
      .from('sref_codes')
      .update({ save_count: newCount })
      .eq('id', codeId)
    
    if (updateError) {
      console.error('Error updating save count:', updateError)
    }
  } catch (error) {
    console.error('Error in updateSaveCount:', error)
  }
}