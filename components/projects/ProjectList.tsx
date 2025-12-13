"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { Database } from "@/types/supabase"

export type Project = Database["public"]["Tables"]["project_submissions"]["Row"]

type Props = {
  initial?: Project[]
  currentUserId: string
  isAdmin?: boolean
  onChanged?: () => void
}

export default function ProjectList({ initial = [], currentUserId, isAdmin = false, onChanged }: Props) {
  const [projects, setProjects] = useState<Project[]>(initial ?? [])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editOverview, setEditOverview] = useState("")
  const supabase = createClient()
  const { toast } = useToast()

  function canEdit(p: Project) {
    return p.user_id === currentUserId || isAdmin
  }

  async function startEdit(p: Project) {
    setEditingId(p.id)
    setEditTitle(p.title)
    setEditOverview(p.overview)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditTitle("")
    setEditOverview("")
  }

  async function saveEdit(id: string) {
    const { error, data } = await (supabase as any)
      .from("project_submissions")
      .update({ title: editTitle, overview: editOverview })
      .eq("id", id)
      .select("*")
      .single()
    if (error) {
      toast({ title: "Failed to update", description: error.message, variant: "destructive" })
      return
    }
    setProjects((prev) => prev.map((p) => (p.id === id ? (data as Project) : p)))
    cancelEdit()
    onChanged?.()
    toast({ title: "Updated", description: "Project updated" })
  }

  async function toggleFeatured(p: Project) {
    const { error, data } = await (supabase as any)
      .from("project_submissions")
      .update({ is_featured: !p.is_featured })
      .eq("id", p.id)
      .select("*")
      .single()
    if (error) {
      toast({ title: "Failed to change featured", description: error.message, variant: "destructive" })
      return
    }
    setProjects((prev) => prev.map((x) => (x.id === p.id ? (data as Project) : x)))
    onChanged?.()
  }

  async function remove(p: Project) {
    const { error } = await supabase
      .from("project_submissions")
      .delete()
      .eq("id", p.id)
    if (error) {
      toast({ title: "Failed to delete", description: error.message, variant: "destructive" })
      return
    }
    setProjects((prev) => prev.filter((x) => x.id !== p.id))
    onChanged?.()
    toast({ title: "Deleted", description: "Project removed" })
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">No projects yet. Be the first to submit one!</div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {(projects || []).map((p) => (
        <Card key={p.id} className={p.is_featured ? "ring-1 ring-primary" : ""}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">
              {p.title}
              {p.is_featured && (
                <span className="ml-2 inline-block text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Featured</span>
              )}
            </CardTitle>
            <div className="text-xs text-muted-foreground">
              {new Date(p.created_at).toLocaleDateString()}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                {p.built_on === "windsurf" ? "Windsurf" : p.built_on_other_text || "Other"}
              </span>
              <a className="underline" href={p.live_url} target="_blank" rel="noreferrer">Live</a>
              {p.github_url && (
                <a className="underline" href={p.github_url} target="_blank" rel="noreferrer">GitHub</a>
              )}
            </div>
            {editingId === p.id ? (
              <div className="space-y-2">
                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <Textarea rows={4} value={editOverview} onChange={(e) => setEditOverview(e.target.value)} />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit(p.id)}>Save</Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>Cancel</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{p.overview}</p>
            )}

            <div className="flex gap-2">
              {canEdit(p) && editingId !== p.id && (
                <Button size="sm" variant="outline" onClick={() => startEdit(p)}>Edit</Button>
              )}
              {canEdit(p) && (
                <Button size="sm" variant="destructive" onClick={() => remove(p)}>Delete</Button>
              )}
              {isAdmin && (
                <Button size="sm" onClick={() => toggleFeatured(p)}>
                  {p.is_featured ? "Unfeature" : "Feature"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
