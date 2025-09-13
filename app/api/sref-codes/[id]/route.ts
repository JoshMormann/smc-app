import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { id } = params

    const { data, error } = await supabase
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
        user_id,
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
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching SREF code:', error)
      return NextResponse.json(
        { ok: false, error: 'SREF code not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ok: true,
      data
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    const { code_value, sv_version, title, tags, images } = body

    // Validate required fields
    if (!code_value || !title) {
      return NextResponse.json(
        { ok: false, error: 'Code value and title are required' },
        { status: 400 }
      )
    }

    // Check if user owns this SREF code
    const { data: existingCode, error: fetchError } = await supabase
      .from('sref_codes')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingCode) {
      return NextResponse.json(
        { ok: false, error: 'SREF code not found' },
        { status: 404 }
      )
    }

    if (existingCode.user_id !== user.id) {
      return NextResponse.json(
        { ok: false, error: 'Permission denied' },
        { status: 403 }
      )
    }

    // Update SREF code
    const { data: updatedCode, error: updateError } = await supabase
      .from('sref_codes')
      .update({
        code_value,
        sv_version: sv_version || '6',
        title,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating SREF code:', updateError)
      return NextResponse.json(
        { ok: false, error: 'Failed to update SREF code' },
        { status: 500 }
      )
    }

    // Update tags if provided
    if (tags !== undefined) {
      // Delete existing tags
      await supabase
        .from('code_tags')
        .delete()
        .eq('code_id', id)

      // Add new tags
      if (tags.length > 0) {
        const tagInserts = tags.map((tag: string) => ({
          code_id: id,
          tag: tag.trim()
        }))

        const { error: tagsError } = await supabase
          .from('code_tags')
          .insert(tagInserts)

        if (tagsError) {
          console.error('Error updating tags:', tagsError)
        }
      }
    }

    // Update images if provided
    if (images !== undefined) {
      // Delete existing images
      await supabase
        .from('code_images')
        .delete()
        .eq('code_id', id)

      // Add new images
      if (images.length > 0) {
        const imageInserts = images.map((image: { url: string; position: number }) => ({
          code_id: id,
          image_url: image.url,
          position: image.position
        }))

        const { error: imagesError } = await supabase
          .from('code_images')
          .insert(imageInserts)

        if (imagesError) {
          console.error('Error updating images:', imagesError)
        }
      }
    }

    // Fetch the complete updated record with all relations
    const { data: completeUpdatedCode, error: fetchUpdatedError } = await supabase
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
        user_id,
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
      .eq('id', id)
      .single()

    if (fetchUpdatedError) {
      console.error('Error fetching updated SREF code:', fetchUpdatedError)
      return NextResponse.json(
        { ok: false, error: 'Failed to fetch updated SREF code' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      data: completeUpdatedCode
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { id } = params

    // Check if user owns this SREF code
    const { data: existingCode, error: fetchError } = await supabase
      .from('sref_codes')
      .select('user_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingCode) {
      return NextResponse.json(
        { ok: false, error: 'SREF code not found' },
        { status: 404 }
      )
    }

    if (existingCode.user_id !== user.id) {
      return NextResponse.json(
        { ok: false, error: 'Permission denied' },
        { status: 403 }
      )
    }

    // Delete SREF code (cascade will handle related records)
    const { error: deleteError } = await supabase
      .from('sref_codes')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting SREF code:', deleteError)
      return NextResponse.json(
        { ok: false, error: 'Failed to delete SREF code' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      message: 'SREF code deleted successfully'
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}