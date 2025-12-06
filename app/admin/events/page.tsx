'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

type Event = {
  id: string
  title: string
  description: string
  event_date: string
  location: string
  image_url: string | null
  registration_link: string | null
  status: 'upcoming' | 'ongoing' | 'completed'
}

export default function AdminEventsPage() {
  const { toast } = useToast()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    location: '',
    registration_link: '',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed'
  })

  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: false })

    if (error) {
      toast({
        title: 'Error fetching events',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return

    if (editingEvent) {
      // Update existing event
      const { error } = await supabase
        .from('events')
        .update(formData)
        .eq('id', editingEvent.id)

      if (error) {
        toast({
          title: 'Error updating event',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Event updated successfully',
        })
        setShowForm(false)
        setEditingEvent(null)
        resetForm()
        fetchEvents()
      }
    } else {
      // Create new event
      const { error } = await supabase
        .from('events')
        .insert([{ ...formData, created_by: session.user.id }])

      if (error) {
        toast({
          title: 'Error creating event',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Event created successfully',
        })
        setShowForm(false)
        resetForm()
        fetchEvents()
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      toast({
        title: 'Error deleting event',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Event deleted successfully',
      })
      fetchEvents()
    }
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      event_date: event.event_date,
      location: event.location,
      registration_link: event.registration_link || '',
      status: event.status,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_date: '',
      location: '',
      registration_link: '',
      status: 'upcoming',
    })
    setEditingEvent(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Events</h1>
            <p className="text-muted-foreground">Create and manage community events</p>
          </div>
          <div className="flex gap-4">
            {!showForm && (
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
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
              <CardTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event_date">Event Date</Label>
                    <Input
                      id="event_date"
                      type="datetime-local"
                      value={formData.event_date}
                      onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration_link">Registration Link (Optional)</Label>
                  <Input
                    id="registration_link"
                    type="url"
                    value={formData.registration_link}
                    onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <Button type="submit">
                    {editingEvent ? 'Update Event' : 'Create Event'}
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

        <div className="grid gap-6">
          {loading ? (
            <Card>
              <CardContent className="py-8 text-center">Loading events...</CardContent>
            </Card>
          ) : events.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No events yet. Create your first event!
              </CardContent>
            </Card>
          ) : (
            events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.event_date).toLocaleString()}
                        </div>
                        <div className="mt-1">Location: {event.location}</div>
                        <div className="mt-1">
                          Status: <span className="capitalize">{event.status}</span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  {event.registration_link && (
                    <p className="text-sm mt-2">
                      <a href={event.registration_link} target="_blank" className="text-primary hover:underline">
                        Registration Link
                      </a>
                    </p>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
