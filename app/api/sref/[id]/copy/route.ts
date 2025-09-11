import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServiceClient()
    const { id } = params

    // Get current copy count
    const { data: currentData, error: fetchError } = await supabase
      .from('sref_codes')
      .select('copy_count')
      .eq('id', id)
      .single()

    if (fetchError) {
      console.error('Error fetching current copy count:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch SREF data' }, { status: 500 })
    }

    const newCount = (currentData.copy_count || 0) + 1

    // Update copy count
    const { error: updateError } = await supabase
      .from('sref_codes')
      .update({ 
        copy_count: newCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (updateError) {
      console.error('Error updating copy count:', updateError)
      return NextResponse.json({ error: 'Failed to update copy count' }, { status: 500 })
    }

    return NextResponse.json({ success: true, copy_count: newCount })
    
  } catch (error) {
    console.error('Error in copy count API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}