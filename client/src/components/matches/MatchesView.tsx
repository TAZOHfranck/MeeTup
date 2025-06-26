import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Calendar, Crown } from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';
import { User } from '../../types';

export const MatchesView: React.FC = () => {
  const [matches] = useState<User[]>(mockUsers.slice(0, 4)); // Simulate matches

  return (
    <div className="flex-1 bg-gradient-to-br from-rose-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">
            Your Matches
          </h1>
          <p className="text-gray-600">
            People who liked you back! Start a conversation.
          </p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative h-64">
                <img
                  src={match.photos[0]}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Premium Badge */}
                {match.isPremium && (
                  <div className="absolute top-3 right-3 bg-gradient-sunset px-2 py-1 rounded-full flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-white" />
                    <span className="text-white text-xs font-medium">Premium</span>
                  </div>
                )}

                {/* Online Status */}
                <div className="absolute top-3 left-3">
                  <div className={`w-3 h-3 rounded-full ${match.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
                    {match.isOnline && (
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                    )}
                  </div>
                </div>

                {/* Match Badge */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-gradient-romantic rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </motion.div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* User Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{match.name}</h3>
                  <span className="text-gray-600">{match.age}</span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {match.bio}
                </p>

                {/* Interests */}
                {match.interests.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {match.interests.slice(0, 2).map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                    {match.interests.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        +{match.interests.length - 2}
                      </span>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-romantic text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </motion.button>
                </div>

                {/* Match Date */}
                <div className="flex items-center justify-center space-x-1 mt-3 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>Matched 2 days ago</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {matches.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches yet</h3>
            <p className="text-gray-500 mb-4">Start swiping to find your perfect match!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-romantic text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Start Discovering
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};