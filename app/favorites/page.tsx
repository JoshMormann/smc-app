import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FavoritesPage } from '@/components/pages/FavoritesPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Favorites - SREF Mining Co',
  description: 'Your personal collection of favorite SREF codes.',
}

export default async function FavoritesPageRoute() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Fetch user's favorite SREF codes
  const { data: favoritesData, error } = await supabase
    .from('saved_codes')
    .select(`
      code_id,
      sref_codes (
        id,
        code_value,
        sv_version,
        title,
        copy_count,
        upvotes,
        downvotes,
        save_count,
        created_at,
        code_images (
          id,
          image_url,
          position
        ),
        code_tags (
          id,
          tag
        )
      )
    `)
    .eq('user_id', user.id)
    .order('saved_at', { ascending: false })

  if (error) {
    console.error('Error fetching favorites:', error)
  }

  // Transform the data to match the expected structure
  const favorites = favoritesData?.map(item => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const srefCode = item.sref_codes as any
    if (!srefCode) {
      return null
    }
    return {
      id: srefCode.id,
      code_value: srefCode.code_value,
      sv_version: srefCode.sv_version,
      title: srefCode.title,
      copy_count: srefCode.copy_count,
      upvotes: srefCode.upvotes,
      downvotes: srefCode.downvotes,
      save_count: srefCode.save_count,
      created_at: srefCode.created_at,
      code_images: srefCode.code_images || [],
      code_tags: srefCode.code_tags || []
    }
  }).filter(Boolean).filter((item): item is NonNullable<typeof item> => item !== null) || []

  return (
    <FavoritesPage 
      user={user}
      initialFavorites={favorites}
    />
  )
}