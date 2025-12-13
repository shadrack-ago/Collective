import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users, Linkedin, MessageCircle, Lightbulb, LogOut, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Use Node.js runtime for Supabase compatibility
export const runtime = 'nodejs'

export default async function DashboardPage() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single()

  // Fetch upcoming events
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('status', 'upcoming')
    .order('event_date', { ascending: true })
    .limit(4)

  // Fetch partnerships
  const { data: partnerships } = await supabase
    .from('partnerships')
    .select('*')
    .limit(6)

  // Fetch projects count (authenticated-only visibility)
  const { count: projectsCount } = await supabase
    .from('project_submissions')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AI Collective Kenya</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard/projects">
                <Button variant="outline">Projects</Button>
              </Link>
              {profile?.is_admin && (
                <Link href="/admin">
                  <Button variant="outline">Admin Panel</Button>
                </Link>
              )}
              <form action="/api/auth/logout" method="post">
                <Button variant="ghost" type="submit">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {profile?.full_name || session.user.email}!
          </h1>
          <p className="text-muted-foreground text-lg">
            You're part of Kenya's premier AI community
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{events?.length || 0}</CardTitle>
              <CardDescription>Upcoming Events</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{partnerships?.length || 0}</CardTitle>
              <CardDescription>Active Partnerships</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">100K+</CardTitle>
              <CardDescription>Global Members</CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">{projectsCount || 0}</CardTitle>
              <CardDescription>Community Projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/projects">
                <Button variant="outline" className="w-full">View & Submit</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          {events && events.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription className="mt-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.event_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                          <div className="flex items-center gap-2 text-sm mt-1">
                            <Users className="h-4 w-4" />
                            {event.location}
                          </div>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    {event.registration_link && (
                      <Link href={event.registration_link} target="_blank">
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Register Now
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No upcoming events at the moment. Check back soon!
              </CardContent>
            </Card>
          )}
        </section>

        {/* Partnerships */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Partnerships</h2>
          {partnerships && partnerships.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {partnerships.map((partnership) => (
                <Card key={partnership.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{partnership.name}</CardTitle>
                    <CardDescription>{partnership.description}</CardDescription>
                  </CardHeader>
                  {partnership.website_url && (
                    <CardContent>
                      <Link href={partnership.website_url} target="_blank">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </Button>
                      </Link>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No partnerships listed yet
              </CardContent>
            </Card>
          )}
        </section>

        {/* Community Links */}
        <section className="bg-slate-100 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Connect With The Community</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://linkedin.com/company/aicollective" target="_blank">
              <Button variant="outline" className="gap-2">
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Button>
            </Link>
            <Link href="https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J" target="_blank">
              <Button variant="outline" className="gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Group
              </Button>
            </Link>
            <Link href="https://www.aicollective.com/" target="_blank">
              <Button variant="outline" className="gap-2">
                <Lightbulb className="h-5 w-5" />
                Global Website
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
