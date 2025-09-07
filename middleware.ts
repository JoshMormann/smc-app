import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if it exists
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const url = request.nextUrl.pathname

  // Auth pages that authenticated users shouldn't access
  const authPages = ['/auth/signin', '/auth/signup', '/auth/forgot-password']
  
  // Protected pages that require authentication
  const protectedPages = ['/favorites', '/library']

  // If user is authenticated and trying to access auth pages, redirect to discover
  if (user && authPages.includes(url)) {
    return NextResponse.redirect(new URL('/discover', request.url))
  }

  // If user is not authenticated and trying to access protected pages, redirect to signin
  if (!user && protectedPages.includes(url)) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  // Allow access to password reset page only if user has a session (from reset email)
  if (url === '/auth/reset-password' && !user) {
    return NextResponse.redirect(new URL('/auth/forgot-password', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}