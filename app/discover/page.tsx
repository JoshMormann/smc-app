import { createClient } from '@/lib/supabase/server'
import { DiscoverPage } from '@/components/pages/DiscoverPage'

export default async function DiscoverPageRoute() {
  const supabase = await createClient()
  
  // Check authentication status
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch public SREF codes for display
  const { data: srefCodes, error } = await supabase
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
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    console.error('Error fetching SREF codes:', error)
  }

  return (
    <DiscoverPage 
      user={user}
      initialSrefCodes={srefCodes || []}
    />
  )
}
