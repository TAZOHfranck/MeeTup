import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Calendar, Users, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Event } from '../types/database'
import { EventCard } from '../components/EventCard'

export function Dashboard() {
  const { user, profile } = useAuth()
  const [myEvents, setMyEvents] = useState<Event[]>([])
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    upcomingEvents: 0
  })

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch events created by user
      const { data: createdEvents, error: createdError } = await supabase
        .from('events')
        .select('*')
        .eq('created_by', user!.id)
        .order('date', { ascending: true })

      if (createdError) throw createdError

      // Fetch events user joined
      const { data: participations, error: participationsError } = await supabase
        .from('event_participants')
        .select(`
          event_id,
          events (*)
        `)
        .eq('user_id', user!.id)

      if (participationsError) throw participationsError

      const joinedEventsData = participations?.map(p => p.events).filter(Boolean) as Event[]

      setMyEvents(createdEvents || [])
      setJoinedEvents(joinedEventsData || [])

      // Calculate stats
      const totalParticipants = (createdEvents || []).reduce((sum, event) => sum + event.current_participants, 0)
      const upcomingEvents = (createdEvents || []).filter(event => 
        new Date(`${event.date}T${event.time}`) > new Date()
      ).length

      setStats({
        totalEvents: createdEvents?.length || 0,
        totalParticipants,
        upcomingEvents
      })

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card">
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {profile?.full_name || 'Utilisateur'} !
          </h1>
          <p className="text-gray-600 mt-1">
            Voici un aperçu de vos événements
          </p>
        </div>
        <Link
          to="/create-event"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvel événement</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Événements créés</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total participants</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalParticipants}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">À venir</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Events */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Mes événements</h2>
          <Link
            to="/create-event"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Créer un événement
          </Link>
        </div>

        {myEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun événement créé
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre premier événement
            </p>
            <Link to="/create-event" className="btn-primary">
              Créer un événement
            </Link>
          </div>
        )}
      </div>

      {/* Joined Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Événements auxquels je participe</h2>

        {joinedEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune participation
            </h3>
            <p className="text-gray-600 mb-6">
              Découvrez des événements intéressants et rejoignez la communauté
            </p>
            <Link to="/events" className="btn-primary">
              Découvrir les événements
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}