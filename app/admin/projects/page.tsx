import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import ProjectList from "@/components/projects/ProjectList"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const runtime = 'nodejs'

export default async function AdminProjectsPage() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  if (!(profile as any)?.is_admin) {
    redirect('/dashboard')
  }

  const { data: projects = [] } = await supabase
    .from('project_submissions')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link href="/admin">
          <Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" />Back to Admin</Button>
        </Link>
      </div>
      <p className="text-muted-foreground">Feature standout projects, or remove inappropriate content.</p>
      <ProjectList initial={projects as any} currentUserId={session.user.id} isAdmin={true} />
    </div>
  )
}
