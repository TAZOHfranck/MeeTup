import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Edit3, MapPin, Briefcase, GraduationCap, Heart, Crown, Settings, Star } from 'lucide-react';
import { User } from '../../types';

interface ProfileViewProps {
  user: User;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display font-bold text-gray-800">
            My Profile
          </h1>
          <div className="flex items-center space-x-3">
            {user.isPremium && (
              <div className="flex items-center space-x-2 bg-gradient-sunset px-4 py-2 rounded-full">
                <Crown className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Premium Member</span>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-primary-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Photos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Photos</h2>
              
              {/* Main Photo */}
              <div className="relative mb-4">
                <img
                  src={user.photos[0]}
                  alt={user.name}
                  className="w-full h-80 object-cover rounded-xl"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Additional Photos */}
              <div className="grid grid-cols-2 gap-2">
                {user.photos.slice(1).map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`${user.name} ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                ))}
                {user.photos.length < 6 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primary-500 transition-colors"
                  >
                    <Camera className="w-6 h-6 text-gray-400" />
                  </motion.div>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-600 text-center">
                {user.photos.length}/6 photos uploaded
              </div>
            </div>
          </div>

          {/* Right Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Basic Information</h2>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-600">
                    {user.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="text-lg font-semibold text-gray-800">{user.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <div className="text-lg font-semibold text-gray-800">{user.age}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="text-lg capitalize text-gray-800">{user.gender}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Looking For</label>
                  <div className="text-lg text-gray-800">{user.lookingFor}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{user.location}</span>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>

            {/* Professional Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Professional</h2>
              <div className="space-y-3">
                {user.occupation && (
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-800">{user.occupation}</div>
                      <div className="text-sm text-gray-600">Occupation</div>
                    </div>
                  </div>
                )}
                {user.education && (
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-800">{user.education}</div>
                      <div className="text-sm text-gray-600">Education</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
                {isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-sm text-gray-500 hover:border-primary-500 hover:text-primary-500 transition-colors"
                  >
                    + Add Interest
                  </motion.button>
                )}
              </div>
            </div>

            {/* Premium Features */}
            {!user.isPremium && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-sunset rounded-2xl p-6 shadow-lg text-white cursor-pointer"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Crown className="w-8 h-8" />
                  <div>
                    <h2 className="text-xl font-semibold">Upgrade to Premium</h2>
                    <p className="text-white/80">Unlock exclusive features</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Unlimited likes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>See who liked you</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Advanced filters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Priority support</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold mt-4 hover:bg-gray-100 transition-colors"
                >
                  Upgrade Now - $9.99/month
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};