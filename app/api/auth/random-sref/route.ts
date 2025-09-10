import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

export interface RandomSrefData {
  code_value: string
  sv_version: number
  title: string
  image_url: string | null
  creator_name: string
  creator_avatar: string | null
}

// Generate a random avatar URL using DiceBear API
function generateRandomAvatar(seed: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=random`
}

export async function GET() {
  try {
    const supabase = createServiceClient()
    
    // Get a random SREF code with an image and the actual creator info
    // Using server client which has service role access
    const { data: codes, error: codesError } = await supabase
      .from('sref_codes')
      .select(`
        code_value,
        sv_version,
        title,
        user_id,
        users:user_id (
          username,
          email
        ),
        code_images (
          image_url,
          position
        )
      `)
      .not('code_images.image_url', 'is', null)
      .limit(50)
    
    console.log('API: Fetched codes:', codes?.length, 'Error:', codesError)
    
    if (codesError) {
      console.error('Error fetching SREF codes:', codesError)
      return NextResponse.json({ error: 'Failed to fetch SREF data' }, { status: 500 })
    }

    if (!codes || codes.length === 0) {
      // No codes with images found, return fallback data
      return NextResponse.json({
        code_value: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
        sv_version: Math.floor(Math.random() * 10) + 1,
        title: 'Cinematic Portrait',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
        creator_name: 'Demo Creator',
        creator_avatar: generateRandomAvatar('Demo Creator')
      })
    }

    // Pick a random code from the results
    const randomCode = codes[Math.floor(Math.random() * codes.length)]
    
    console.log('API: Selected random code:', JSON.stringify(randomCode, null, 2))
    
    // Get the first image (or fallback if none)
    const firstImage = randomCode.code_images?.[0]?.image_url
    
    // Use the actual creator data from the database
    const user = Array.isArray(randomCode.users) ? randomCode.users[0] : randomCode.users
    console.log('API: User data:', user)
    
    const creatorName = user?.username || user?.email || 'Unknown Creator'
    const creatorAvatar = generateRandomAvatar(creatorName)
    
    console.log('API: Final creator name:', creatorName)
    
    const result: RandomSrefData = {
      code_value: randomCode.code_value,
      sv_version: randomCode.sv_version,
      title: randomCode.title,
      image_url: firstImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      creator_name: creatorName,
      creator_avatar: creatorAvatar
    }
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Error in random SREF API:', error)
    
    // Return fallback data as last resort
    return NextResponse.json({
      code_value: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
      sv_version: Math.floor(Math.random() * 10) + 1,
      title: 'Artistic Vision',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      creator_name: 'Demo Creator',
      creator_avatar: generateRandomAvatar('Demo Creator')
    })
  }
}