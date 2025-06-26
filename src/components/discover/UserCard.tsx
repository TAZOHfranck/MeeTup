import React from 'react';
import { motion } from 'framer-motion';
import { Heart, X, MapPin, Briefcase, GraduationCap, Crown } from 'lucide-react';
import { User } from '../../types';

interface UserCardProps {
  user: User;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onLike, onPass }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm mx-auto"
    >
      {/* Main Photo */}
      <div className="relative h-96">
        <img
          src={user.photos[0]}
          alt={user.name}
          className="w-full h-full object-cover"
        />
        
        {/* Premium Badge */}
        {user.isPremium && (
          <div className="absolute top-4 right-4 bg-gradient-sunset px-2 py-1 rounded-full flex items-center space-x-1">
            <Crown className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-medium">Premium</span>
          </div>
        )}

        {/* Online Status */}
        <div className="absolute top-4 left-4">
          <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}>
            {user.isOnline && (
              <div className="w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
            )}
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-bold">{user.name}</h3>
          <span className="text-lg font-medium">{user.age}</span>
        </div>
        
        <div className="flex items-center space-x-1 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{user.location}</span>
        </div>

        {user.occupation && (
          <div className="flex items-center space-x-1 mb-2">
            <Briefcase className="w-4 h-4" />
            <span className="text-sm">{user.occupation}</span>
          </div>
        )}

        {user.education && (
          <div className="flex items-center space-x-1 mb-3">
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm">{user.education}</span>
          </div>
        )}

        <p className="text-sm opacity-90 line-clamp-2">{user.bio}</p>

        {/* Interests */}
        {user.interests.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {user.interests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
              >
                {interest}
              </span>
            ))}
            {user.interests.length > 3 && (
              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                +{user.interests.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 right-6 flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPass(user.id)}
          className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-all duration-200"
        >
          <X className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(user.id)}
          className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-600 transition-all duration-200"
        >
          <Heart className="w-6 h-6" />
        </motion.button>
      </div>
    </motion.div>
  );
};