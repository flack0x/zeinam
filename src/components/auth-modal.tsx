'use client';

import { useState } from 'react';
import Modal from './modal';
import LoginForm from '../app/admin/login-form';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif font-bold text-stone-800">
          {activeTab === 'login' ? 'Welcome Back' : 'Join Our Community'}
        </h2>
        <p className="text-stone-500 text-sm mt-1">
          {activeTab === 'login' 
            ? 'Please enter your details to sign in.' 
            : 'Create an account to start sharing.'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 mb-6">
        <button
          className={`flex-1 pb-2 text-sm font-medium transition-colors ${
            activeTab === 'login'
              ? 'border-b-2 border-stone-800 text-stone-900'
              : 'text-stone-400 hover:text-stone-600'
          }`}
          onClick={() => setActiveTab('login')}
        >
          Sign In
        </button>
        <button
          className={`flex-1 pb-2 text-sm font-medium transition-colors ${
            activeTab === 'register'
              ? 'border-b-2 border-stone-800 text-stone-900'
              : 'text-stone-400 hover:text-stone-600'
          }`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>

      {activeTab === 'login' ? (
        <LoginForm />
      ) : (
        <div className="text-center py-8">
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-100 mb-4">
                <p className="text-stone-600 text-sm mb-2">Registration is currently invite-only.</p>
                <p className="text-xs text-stone-400">Please contact the site owner for access.</p>
            </div>
        </div>
      )}
    </Modal>
  );
}
