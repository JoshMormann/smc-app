import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const tag = searchParams.get('tag') || ''
    
    let query = supabase
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

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,code_value.ilike.%${search}%`)
    }

    // Apply tag filter
    if (tag) {
      query = query.eq('code_tags.tag', tag)
    }

    // Apply pagination
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching SREF codes:', error)
      return NextResponse.json(
        { ok: false, error: 'Failed to fetch SREF codes' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        hasMore: (count || 0) > page * limit
      }
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { code_value, sv_version, title, tags, images } = body

    // Validate required fields
    if (!code_value || !title) {
      return NextResponse.json(
        { ok: false, error: 'Code value and title are required' },
        { status: 400 }
      )
    }

    // Create SREF code
    const { data: srefCode, error: srefError } = await supabase
      .from('sref_codes')
      .insert({
        code_value,
        sv_version: sv_version || '6',
        title,
        user_id: user.id
      })
      .select()
      .single()

    if (srefError) {
      console.error('Error creating SREF code:', srefError)
      return NextResponse.json(
        { ok: false, error: 'Failed to create SREF code' },
        { status: 500 }
      )
    }

    // Add tags if provided
    if (tags && tags.length > 0) {
      const tagInserts = tags.map((tag: string) => ({
        code_id: srefCode.id,
        tag: tag.trim()
      }))

      const { error: tagsError } = await supabase
        .from('code_tags')
        .insert(tagInserts)

      if (tagsError) {
        console.error('Error adding tags:', tagsError)
        // Continue without failing - tags are optional
      }
    }

    // Add images if provided
    if (images && images.length > 0) {
      const imageInserts = images.map((image: { url: string; position: number }) => ({
        code_id: srefCode.id,
        image_url: image.url,
        position: image.position
      }))

      const { error: imagesError } = await supabase
        .from('code_images')
        .insert(imageInserts)

      if (imagesError) {
        console.error('Error adding images:', imagesError)
        // Continue without failing - images are optional
      }
    }

    return NextResponse.json({
      ok: true,
      data: srefCode
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
