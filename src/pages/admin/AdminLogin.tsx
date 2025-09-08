import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Mail, Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const createAdminAccount = async () => {
    setCreatingAdmin(true);
    setMessage(null);

    try {
      // First create the user account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email || 'admin@wingmovers.com',
        password: 'Faheem*61',
        options: {
          data: {
            full_name: 'Admin User',
          },
        },
      });

      if (signUpError) {
        setMessage({ type: 'error', text: signUpError.message });
        return;
      }

      if (signUpData.user) {
        // Then create the admin record
        const { error: adminError } = await supabase
          .rpc('create_admin_user', {
            admin_email: email || 'admin@wingmovers.com',
            admin_role: 'admin'
          });

        if (adminError) {
          setMessage({ type: 'error', text: `User created but admin setup failed: ${adminError.message}` });
        } else {
          setMessage({ type: 'success', text: 'Admin account created successfully! You can now sign in.' });
          setPassword('Faheem*61');
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create admin account' });
    } finally {
      setCreatingAdmin(false);
    }
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else if (data.user) {

        // Check if user is admin
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('is_active, role')
          .eq('user_id', data.user.id)
          .single();
        console.log('Admin Data:', adminData);
        console.log('Admin Error:', adminError);
        console.log('adminData.is_active', adminData?.is_active)

        if (adminError || !adminData || !adminData.is_active) {
          console.log('Admin access denied:', { adminError, adminData });
          setMessage({
            type: 'error',
            text: 'Access denied. This account does not have admin privileges.'
          });
          // Sign out the user since they don't have admin access
          await supabase.auth.signOut();
        } else {
          console.log('Admin login successful, redirecting...');
          setMessage({ type: 'success', text: 'Admin login successful! Redirecting...' });
          // Navigate immediately; auth state listener will propagate
          navigate('/admin/dashboard', { replace: true });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-600">Access the Wing Movers admin panel</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Admin Setup:</p>
            <p>Enter an email address and click the button below to create an admin account.</p>
            <p className="text-xs text-gray-600 mt-1">Default password: Faheem*61</p>
            <button
              onClick={createAdminAccount}
              disabled={creatingAdmin || !email}
              className="mt-2 text-blue-600 hover:text-blue-800 underline text-xs disabled:opacity-50"
            >
              {creatingAdmin ? 'Creating admin account...' : 'Create admin account'}
            </button>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${message.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
            {message.text}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Admin email address"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Sign In as Admin
              </div>
            )}
          </button>

          <div className="text-center">
            <Link to="/" className="text-sm text-blue-600 hover:text-blue-500">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;