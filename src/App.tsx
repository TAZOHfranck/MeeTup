import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { Header } from './components/layout/Header';
import { DiscoverView } from './components/discover/DiscoverView';
import { MatchesView } from './components/matches/MatchesView';
import { MessagesView } from './components/messages/MessagesView';
import { ProfileView } from './components/profile/ProfileView';
import { Heart } from 'lucide-react';

type AuthView = 'login' | 'register';
type AppView = 'discover' | 'matches' | 'messages' | 'profile';

function App() {
  const { user, isAuthenticated, isLoading, login, logout, register } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');
  const [currentView, setCurrentView] = useState<AppView>('discover');

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-romantic flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <Heart className="w-10 h-10 text-primary-500 animate-pulse" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            AfroConnect
          </h1>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Authentication views
  if (!isAuthenticated) {
    return (
      <>
        <AnimatePresence mode="wait">
          {authView === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3 }}
            >
              <LoginForm
                onLogin={login}
                onSwitchToRegister={() => setAuthView('register')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterForm
                onRegister={register}
                onSwitchToLogin={() => setAuthView('login')}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#333',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            },
          }}
        />
      </>
    );
  }

  // Main application
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        currentUser={user}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {currentView === 'discover' && <DiscoverView />}
          {currentView === 'matches' && <MatchesView />}
          {currentView === 'messages' && <MessagesView />}
          {currentView === 'profile' && user && <ProfileView user={user} />}
        </motion.div>
      </AnimatePresence>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
        }}
      />
    </div>
  );
}

export default App;