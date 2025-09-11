import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LibraryPage } from '@/components/pages/LibraryPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Library - SREF Mining Co',
  description: 'Your personal collection of SREF codes.',
}

export default async function LibraryPageRoute() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Fetch user's own SREF codes
  const { data: libraryData, error } = await supabase
    .from('sref_codes')
    .select(`
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
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching library:', error)
  }

  // Transform the data to match the expected structure
  const library = libraryData?.map(item => {
    return {
      id: item.id,
      code_value: item.code_value,
      sv_version: item.sv_version,
      title: item.title,
      copy_count: item.copy_count,
      upvotes: item.upvotes,
      downvotes: item.downvotes,
      save_count: item.save_count,
      created_at: item.created_at,
      code_images: item.code_images || [],
      code_tags: item.code_tags || []
    }
  }) || []

  return (
    <LibraryPage 
      user={user}
      initialSrefCodes={library}
    />
  )
}