export interface RandomSrefData {
  code_value: string
  sv_version: number
  title: string
  image_url: string | null
  creator_name: string
  creator_avatar: string | null
}

// Generate a random avatar URL using DiceBear API as fallback
function generateRandomAvatar(seed: string): string {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=random`
}

export async function getRandomSrefData(): Promise<RandomSrefData | null> {
  try {
    // Use the API route instead of direct database access
    // This bypasses RLS issues by using server-side service role
    const response = await fetch('/api/auth/random-sref', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`API response not ok: ${response.status}`)
    }
    
    const data = await response.json()
    return data
    
  } catch (error) {
    console.error('Error in getRandomSrefData:', error)
    
    // Return fallback data as last resort
    return {
      code_value: Math.floor(Math.random() * 9000000000 + 1000000000).toString(),
      sv_version: Math.floor(Math.random() * 10) + 1,
      title: 'Artistic Vision',
      image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      creator_name: 'Demo Creator',
      creator_avatar: generateRandomAvatar('Demo Creator')
    }
  }
}