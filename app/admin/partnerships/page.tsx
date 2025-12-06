'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Briefcase, ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

type Partnership = {
  id: string
  name: string
  description: string
  website_url: string | null
  created_at: string
}

export default function AdminPartnershipsPage() {
  const { toast } = useToast()
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPartnership, setEditingPartnership] = useState<Partnership | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website_url: '',
  })

  const supabase = createClient()

  useEffect(() => {
    fetchPartnerships()
  }, [])

  const fetchPartnerships = async () => {
    const { data, error } = await supabase
      .from('partnerships')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast({
        title: 'Error fetching partnerships',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      setPartnerships(data || [])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPartnership) {
      const { error } = await supabase
        .from('partnerships')
        .update(formData as any)
        .eq('id', editingPartnership.id)

      if (error) {
        toast({
          title: 'Error updating partnership',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({ title: 'Partnership updated successfully' })
        setShowForm(false)
        setEditingPartnership(null)
        resetForm()
        fetchPartnerships()
      }
    } else {
      // @ts-ignore - Supabase type inference issue
      const { error } = await supabase
        .from('partnerships')
        .insert([formData])

      if (error) {
        toast({
          title: 'Error creating partnership',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({ title: 'Partnership created successfully' })
        setShowForm(false)
        resetForm()
        fetchPartnerships()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this partnership?')) return

    const { error } = await supabase
      .from('partnerships')
      .delete()
      .eq('id', id)

    if (error) {
      toast({
        title: 'Error deleting partnership',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({ title: 'Partnership deleted successfully' })
      fetchPartnerships()
    }
  }

  const handleEdit = (partnership: Partnership) => {
    setEditingPartnership(partnership)
    setFormData({
      name: partnership.name,
      description: partnership.description,
      website_url: partnership.website_url || '',
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      website_url: '',
    })
    setEditingPartnership(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Partnerships</h1>
            <p className="text-muted-foreground">Add and manage organizational partnerships</p>
          </div>
          <div className="flex gap-4">
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Partnership
              </Button>
            )}
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingPartnership ? 'Edit Partnership' : 'Add New Partnership'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website_url">Website URL (Optional)</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit">
                    {editingPartnership ? 'Update Partnership' : 'Add Partnership'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      resetForm()
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            <Card>
              <CardContent className="py-8 text-center">Loading partnerships...</CardContent>
            </Card>
          ) : partnerships.length === 0 ? (
            <Card className="md:col-span-2">
              <CardContent className="py-8 text-center text-muted-foreground">
                No partnerships yet. Add your first partnership!
              </CardContent>
            </Card>
          ) : (
            partnerships.map((partnership) => (
              <Card key={partnership.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{partnership.name}</CardTitle>
                      <CardDescription className="mt-2">{partnership.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(partnership)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(partnership.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {partnership.website_url && (
                  <CardContent>
                    <a
                      href={partnership.website_url}
                      target="_blank"
                      className="text-sm text-primary hover:underline"
                    >
                      {partnership.website_url}
                    </a>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
