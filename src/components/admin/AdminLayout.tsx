import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Settings, LogOut, RefreshCw, Key, AlertTriangle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLayout() {
  const { user, signOut, loading, isConfigured } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-md w-full">
          <div className="flex items-center gap-2 text-amber-600 mb-4">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="text-lg font-medium">Configuration Required</h2>
          </div>
          <p className="text-gray-600">
            Please configure Supabase environment variables to access the admin dashboard:
          </p>
          <ul className="mt-4 list-disc list-inside text-sm text-gray-600">
            <li>VITE_SUPABASE_URL</li>
            <li>VITE_SUPABASE_ANON_KEY</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-blue-500" />
              <span className="ml-2 text-lg font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium 
                         text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="space-y-2">
            <a
              href="/admin/api-key"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-white 
                       hover:text-gray-900 rounded-md transition-colors"
            >
              <Key className="w-4 h-4 mr-2" />
              API Key Management
            </a>
            <a
              href="/admin/data"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-white 
                       hover:text-gray-900 rounded-md transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Data Management
            </a>
          </aside>

          <main className="md:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}