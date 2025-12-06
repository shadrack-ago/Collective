import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, Lightbulb, MapPin, Linkedin, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">AI Collective Kenya</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Join Us</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Welcome to AI Collective Kenya
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          We gather pioneers on the frontier of AI to exchange insights, deepen our human connection, and drive collective progress across Kenya.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/auth/register">
            <Button size="lg" className="text-lg">
              Join the Community
            </Button>
          </Link>
          <Link href="https://www.aicollective.com/" target="_blank">
            <Button size="lg" variant="outline" className="text-lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">About AI Collective Kenya</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            AI Collective Kenya is part of the global AI Collective community - a non-profit, grassroots movement uniting 100,000+ pioneers worldwide. We bring together founders, researchers, operators, and investors exploring the frontier of AI.
          </p>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            As the Kenyan chapter, we create spaces for meaningful conversations, knowledge sharing, and collaboration. Through events, workshops, and community-led initiatives, we empower Kenya's AI ecosystem to contribute to steering AI's future toward trust, openness, and human flourishing.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Events & Workshops</CardTitle>
              <CardDescription>
                Discussion salons, demo nights, research roundtables, and networking dinners
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Community Network</CardTitle>
              <CardDescription>
                Connect with Kenya's brightest minds in AI - from builders to investors
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Lightbulb className="h-12 w-12 mb-4 text-primary" />
              <CardTitle>Knowledge Sharing</CardTitle>
              <CardDescription>
                Access insights, research, and resources from the global AI Collective community
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Community Links */}
      <section className="container mx-auto px-4 py-16 bg-slate-50 rounded-lg my-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Connect With Us</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="https://linkedin.com/company/aicollective" target="_blank">
            <Button variant="outline" size="lg" className="gap-2">
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </Button>
          </Link>
          <Link href="https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J" target="_blank">
            <Button variant="outline" size="lg" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              WhatsApp Group
            </Button>
          </Link>
          <Link href="https://www.aicollective.com/" target="_blank">
            <Button variant="outline" size="lg" className="gap-2">
              <Lightbulb className="h-5 w-5" />
              Global Website
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-slate-800 text-white rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-lg mb-8 opacity-90">
            Become part of Kenya's premier AI community and help shape the future of AI in Africa
          </p>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="text-lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">
              © 2024 AI Collective Kenya. Part of{' '}
              <Link href="https://www.aicollective.com/" target="_blank" className="underline hover:text-primary">
                The AI Collective
              </Link>
            </p>
            <p className="text-sm mb-3">
              Gathering pioneers on the frontier of AI
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <Link href="/privacy" className="hover:text-primary underline">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-primary underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
