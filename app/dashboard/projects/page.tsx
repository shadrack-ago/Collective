import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import ProjectSubmissionForm from "@/components/projects/ProjectSubmissionForm"
import ProjectList from "@/components/projects/ProjectList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const runtime = 'nodejs'

export default async function DashboardProjectsPage() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/auth/login')

  // profile for admin flag
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', session.user.id)
    .single()

  // fetch projects: featured first, then latest; authenticated-only visibility
  const { data: projects = [] } = await supabase
    .from('project_submissions')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  const isAdmin = Boolean((profile as any)?.is_admin)

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your AI x Windsurf Projects</h1>
          <p className="text-muted-foreground">Share what you've built; explore what others in the Collective are shipping.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit a new project</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectSubmissionForm />
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Community Projects</h2>
        <div className="text-sm text-muted-foreground">Featured first • then newest</div>
      </div>
      <ProjectList initial={projects as any} currentUserId={session.user.id} isAdmin={isAdmin} />
    </div>
  )
}
