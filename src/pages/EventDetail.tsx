import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, MapPin, Users, Clock, User, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Event, Profile } from '../types/database'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

export function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [event, setEvent] = useState<Event | null>(null)
  const [organizer, setOrganizer] = useState<Profile | null>(null)
  const [isParticipant, setIsParticipant] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    if (id) {
      fetchEventDetails()
    }
  }, [id, user])

  const fetchEventDetails = async () => {
    try {
      // Fetch event
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (eventError) throw eventError
      setEvent(eventData)

      // Fetch organizer
      const { data: organizerData, error: organizerError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', eventData.created_by)
        .single()

      if (organizerError) throw organizerError
      setOrganizer(organizerData)

      // Check if user is participant
      if (user) {
        const { data: participantData, error: participantError } = await supabase
          .from('event_participants')
          .select('*')
          .eq('event_id', id)
          .eq('user_id', user.id)
          .single()

        if (participantError && participantError.code !== 'PGRST116') {
          throw participantError
        }

        setIsParticipant(!!participantData)
      }

    } catch (error) {
      console.error('Error fetching event details:', error)
      navigate('/events')
    } finally {
      setLoading(false)
    }
  }

  const handleJoinEvent = async () => {
    if (!user || !event) return

    setActionLoading(true)
    try {
      if (isParticipant) {
        // Leave event
        const { error } = await supabase
          .from('event_participants')
          .delete()
          .eq('event_id', event.id)
          .eq('user_id', user.id)

        if (error) throw error

        // Update event participant count
        const { error: updateError } = await supabase
          .from('events')
          .update({ 
            current_participants: Math.max(0, event.current_participants - 1),
            updated_at: new Date().toISOString()
          })
          .eq('id', event.id)

        if (updateError) throw updateError

        setEvent(prev => prev ? { ...prev, current_participants: Math.max(0, prev.current_participants - 1) } : null)
        setIsParticipant(false)
      } else {
        // Join event
        if (event.current_participants >= event.max_participants) {
          alert('Cet événement est complet')
          return
        }

        const { error } = await supabase
          .from('event_participants')
          .insert({
            event_id: event.id,
            user_id: user.id
          })

        if (error) throw error

        // Update event participant count
        const { error: updateError } = await supabase
          .from('events')
          .update({ 
            current_participants: event.current_participants + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', event.id)

        if (updateError) throw updateError

        setEvent(prev => prev ? { ...prev, current_participants: prev.current_participants + 1 } : null)
        setIsParticipant(true)
      }
    } catch (error) {
      console.error('Error updating participation:', error)
      alert('Une erreur est survenue')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Événement non trouvé
          </h1>
          <button
            onClick={() => navigate('/events')}
            className="btn-primary"
          >
            Retour aux événements
          </button>
        </div>
      </div>
    )
  }

  const eventDate = new Date(`${event.date}T${event.time}`)
  const isUpcoming = eventDate > new Date()
  const isFull = event.current_participants >= event.max_participants
  const isOrganizer = user?.id === event.created_by

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour
      </button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  {event.title}
                </h1>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  isUpcoming 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {isUpcoming ? 'À venir' : 'Passé'}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {format(eventDate, 'EEEE dd MMMM yyyy', { locale: fr })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>
                    {format(eventDate, 'HH:mm')}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>
                    {event.current_participants}/{event.max_participants} participants
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="whitespace-pre-wrap">{event.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Organizer Card */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Organisateur
            </h3>
            <div className="flex items-center space-x-3">
              <div className="bg-primary-100 p-2 rounded-full">
                <User className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {organizer?.full_name || 'Utilisateur'}
                </p>
                <p className="text-sm text-gray-600">
                  {organizer?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Action Card */}
          {user && !isOrganizer && isUpcoming && (
            <div className="card">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Places disponibles
                  </span>
                  <span className={`text-sm font-medium ${
                    isFull ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {event.max_participants - event.current_participants}
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (event.current_participants / event.max_participants) * 100)}%`
                    }}
                  ></div>
                </div>

                <button
                  onClick={handleJoinEvent}
                  disabled={actionLoading || (!isParticipant && isFull)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    isParticipant
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {actionLoading
                    ? 'Chargement...'
                    : isParticipant
                    ? 'Se désinscrire'
                    : isFull
                    ? 'Événement complet'
                    : 'Participer'
                  }
                </button>

                {isParticipant && (
                  <p className="text-sm text-green-600 text-center">
                    ✓ Vous participez à cet événement
                  </p>
                )}
              </div>
            </div>
          )}

          {isOrganizer && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Gestion de l'événement
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Vous êtes l'organisateur de cet événement
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Participants inscrits:</span>
                  <span className="font-medium">{event.current_participants}</span>
                </div>
                <div className="flex justify-between">
                  <span>Places restantes:</span>
                  <span className="font-medium">{event.max_participants - event.current_participants}</span>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Participer à l'événement
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Connectez-vous pour participer à cet événement
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full btn-primary"
              >
                Se connecter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}