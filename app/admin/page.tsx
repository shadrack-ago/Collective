import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, FileText, Handshake, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function AdminPage() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  if (!profile?.is_admin) {
    redirect('/dashboard')
  }

  // Get counts
  const { count: eventsCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })

  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })

  const { count: partnershipsCount } = await supabase
    .from('partnerships')
    .select('*', { count: 'exact', head: true })

  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <p className="text-muted-foreground text-lg">
              Manage AI Collective Kenya content
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{eventsCount || 0}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Total Events
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{postsCount || 0}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Total Posts
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{partnershipsCount || 0}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Handshake className="h-4 w-4" />
                Partnerships
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{usersCount || 0}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Users
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Manage Events</CardTitle>
              <CardDescription>
                Create, edit, and manage upcoming community events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/events">
                <Button className="w-full">Manage Events</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Manage Posts</CardTitle>
              <CardDescription>
                Create and publish content for the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/posts">
                <Button className="w-full">Manage Posts</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Handshake className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Manage Partnerships</CardTitle>
              <CardDescription>
                Add and manage organizational partnerships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/partnerships">
                <Button className="w-full">Manage Partnerships</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
