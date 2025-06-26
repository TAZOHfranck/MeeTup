import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Crown, Send, Smile, Paperclip } from 'lucide-react';
import { mockUsers } from '../../data/mockUsers';

interface Conversation {
  id: string;
  user: typeof mockUsers[0];
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export const MessagesView: React.FC = () => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      user: mockUsers[0],
      lastMessage: 'Hey! How was your day?',
      timestamp: '2 min ago',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      user: mockUsers[1],
      lastMessage: 'Thanks for the like! 😊',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      user: mockUsers[2],
      lastMessage: 'Would love to meet up sometime',
      timestamp: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const mockMessages = [
    { id: '1', text: 'Hi there! I really liked your profile 😊', sender: 'them', timestamp: '10:30 AM' },
    { id: '2', text: 'Thank you! I love your photos too', sender: 'me', timestamp: '10:32 AM' },
    { id: '3', text: 'What do you like to do for fun?', sender: 'them', timestamp: '10:35 AM' },
    { id: '4', text: 'I love traveling and trying new restaurants. How about you?', sender: 'me', timestamp: '10:37 AM' },
    { id: '5', text: 'That sounds amazing! I\'m really into hiking and photography', sender: 'them', timestamp: '10:40 AM' },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 bg-gray-50 flex">
      {/* Conversations List */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              whileHover={{ backgroundColor: '#f9fafb' }}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 cursor-pointer border-b border-gray-100 ${
                selectedConversation?.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.user.photos[0]}
                    alt={conversation.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-800 truncate">
                        {conversation.user.name}
                      </h3>
                      {conversation.user.isPremium && (
                        <Crown className="w-4 h-4 text-accent-500" />
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unreadCount > 0 && (
                      <div className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b border-gray-200 flex items-center space-x-3">
            <img
              src={selectedConversation.user.photos[0]}
              alt={selectedConversation.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-800">{selectedConversation.user.name}</h3>
                {selectedConversation.user.isPremium && (
                  <Crown className="w-4 h-4 text-accent-500" />
                )}
              </div>
              <p className="text-sm text-gray-500">
                {selectedConversation.isOnline ? 'Online now' : 'Last seen 2 hours ago'}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'me'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'me' ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                className="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a conversation</h3>
            <p className="text-gray-500">Choose from your existing conversations</p>
          </div>
        </div>
      )}
    </div>
  );
};