import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, MapPin, Users } from 'lucide-react'
import { Event } from '../types/database'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(`${event.date}T${event.time}`)
  const isUpcoming = eventDate > new Date()

  return (
    <Link to={`/events/${event.id}`} className="block group">
      <div className="card hover:shadow-md transition-shadow duration-200">
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {event.title}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              isUpcoming 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {isUpcoming ? 'À venir' : 'Passé'}
            </span>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {event.description}
          </p>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>
                {format(eventDate, 'dd MMM yyyy à HH:mm', { locale: fr })}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{event.current_participants}/{event.max_participants}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}