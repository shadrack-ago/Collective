import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  // Redirect logged in users away from auth pages
  if (req.nextUrl.pathname.startsWith('/auth/login') || req.nextUrl.pathname.startsWith('/auth/register')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Admin routes - check if user is admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single()

      if (!profile?.is_admin) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/login', '/auth/register'],
}
