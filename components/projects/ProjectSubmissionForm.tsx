"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import type { Database } from "@/types/supabase"

type BuiltOn = Database["public"]["Enums"]["project_built_on"]

type Props = {
  onCreated?: () => void
}

export default function ProjectSubmissionForm({ onCreated }: Props) {
  const supabase = createClient()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [githubUrl, setGithubUrl] = useState("")
  const [builtOn, setBuiltOn] = useState<BuiltOn>("windsurf")
  const [otherText, setOtherText] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !overview || !liveUrl) {
      toast({ title: "Missing fields", description: "Title, overview and live URL are required", variant: "destructive" })
      return
    }
    if (builtOn === "other" && !otherText.trim()) {
      toast({ title: "Missing tool name", description: "Please specify what it is built on", variant: "destructive" })
      return
    }
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      toast({ title: "Not signed in", description: "Please sign in to submit a project", variant: "destructive" })
      setLoading(false)
      return
    }
    const table = 'project_submissions' as const
    const payload: Database["public"]["Tables"]["project_submissions"]["Insert"] = {
      user_id: user.id,
      title,
      overview,
      live_url: liveUrl,
      github_url: githubUrl ? githubUrl : null,
      built_on: builtOn,
      built_on_other_text: builtOn === "other" ? otherText : null,
      // is_featured is admin-controlled; omit so default false applies
    }
    const { error } = await (supabase as any)
      .from(table)
      .insert(payload)
    if (error) {
      toast({ title: "Failed to submit", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Project submitted", description: "Your project is now visible in the dashboard" })
      setTitle("")
      setOverview("")
      setLiveUrl("")
      setGithubUrl("")
      setBuiltOn("windsurf")
      setOtherText("")
      onCreated?.()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Windsurf Chatbot Toolkit" />
      </div>
      <div>
        <Label htmlFor="overview">Overview / Description</Label>
        <Textarea id="overview" value={overview} onChange={(e) => setOverview(e.target.value)} rows={5} placeholder="What does it do? Who is it for?" />
      </div>
      <div>
        <Label htmlFor="live">Live Link</Label>
        <Input id="live" type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." />
      </div>
      <div>
        <Label htmlFor="github">GitHub Repo (optional)</Label>
        <Input id="github" type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="builton">Built On</Label>
          <select id="builton" className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={builtOn} onChange={(e) => setBuiltOn(e.target.value as BuiltOn)}>
            <option value="windsurf">Windsurf</option>
            <option value="other">Other</option>
          </select>
        </div>
        {builtOn === "other" && (
          <div>
            <Label htmlFor="othertext">Specify</Label>
            <Input id="othertext" value={otherText} onChange={(e) => setOtherText(e.target.value)} placeholder="e.g. Next.js Agents, LangChain, etc." />
          </div>
        )}
      </div>
      <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Project"}</Button>
    </form>
  )
}
