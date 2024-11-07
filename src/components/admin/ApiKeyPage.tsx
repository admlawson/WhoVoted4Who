import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { getStoredCredentials } from '../../utils/auth';

export function ApiKeyPage() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('FEC_API_KEY');
    if (key) setApiKey(key);
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Validate API key format
      if (!apiKey.match(/^[a-zA-Z0-9]{40}$/)) {
        throw new Error('Invalid API key format');
      }

      localStorage.setItem('FEC_API_KEY', apiKey);
      toast.success('API key updated successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update API key');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Key className="w-5 h-5 text-blue-500" />
        <h2 className="text-lg font-semibold">API Key Management</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            FEC API Key
          </label>
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm
                       focus:border-blue-500 focus:ring-blue-500 pr-10"
              placeholder="Enter your FEC API key"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 px-3 flex items-center"
            >
              {showKey ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center justify-center px-4 py-2 border border-transparent 
                   rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save API Key'}
        </button>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Important Notes:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>API keys are stored securely using encryption</li>
            <li>Keys are only accessible within the admin dashboard</li>
            <li>Regular key rotation is recommended for security</li>
          </ul>
        </div>
      </div>
    </div>
  );
}