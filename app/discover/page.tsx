import { createClient } from '@/lib/supabase/server'
import { DiscoverPage } from '@/components/pages/DiscoverPage'

export default async function DiscoverPageRoute() {
  const supabase = await createClient()
  
  // Check authentication status
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch public SREF codes for display - get more than needed to filter duplicates
  const { data: allSrefCodes, error } = await supabase
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
    .limit(50) // Get more records to account for filtering duplicates
  
  // Filter to only show latest version of each unique code_value + sv_version combination
  const srefCodes = allSrefCodes ? (() => {
    const codeMap = new Map()
    
    for (const code of allSrefCodes) {
      const key = `${code.code_value}-${code.sv_version}`
      
      if (!codeMap.has(key) || new Date(code.created_at) > new Date(codeMap.get(key).created_at)) {
        codeMap.set(key, code)
      }
    }
    
    return Array.from(codeMap.values())
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 20) // Take top 20 after filtering
  })() : []

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
