import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, Heart, X } from 'lucide-react';
import { UserCard } from './UserCard';
import { mockUsers } from '../../data/mockUsers';
import { User } from '../../types';
import toast from 'react-hot-toast';

export const DiscoverView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const currentUser = users[currentIndex];

  const handleLike = (userId: string) => {
    toast.success('Liked! ❤️');
    nextUser();
  };

  const handlePass = (userId: string) => {
    nextUser();
  };

  const nextUser = () => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Reset or load more users
      setCurrentIndex(0);
      toast('No more profiles to show. Starting over!', {
        icon: '🔄',
      });
    }
  };

  if (!currentUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No more profiles</h3>
          <p className="text-gray-500">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display font-bold text-gray-800">
            Discover
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              showFilters ? 'bg-primary-500 text-white' : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span>Filters</span>
          </motion.button>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-xl p-6 mb-6 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="18"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="35"
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Any location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Looking For
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>All</option>
                    <option>Dating</option>
                    <option>Serious relationship</option>
                    <option>Marriage</option>
                    <option>Friendship first</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* User Card */}
          <div className="flex-1 flex justify-center">
            <AnimatePresence mode="wait">
              <UserCard
                key={currentUser.id}
                user={currentUser}
                onLike={handleLike}
                onPass={handlePass}
              />
            </AnimatePresence>
          </div>

          {/* Actions Panel */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePass(currentUser.id)}
                  className="w-full flex items-center justify-center space-x-3 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-700">Pass</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLike(currentUser.id)}
                  className="w-full flex items-center justify-center space-x-3 py-3 bg-gradient-romantic text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Like</span>
                </motion.button>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-500">{users.length - currentIndex}</div>
                    <div className="text-sm text-gray-600">Profiles left</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary-500">{currentIndex}</div>
                    <div className="text-sm text-gray-600">Profiles viewed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};