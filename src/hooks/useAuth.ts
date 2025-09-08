import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [adminChecking, setAdminChecking] = useState(false);

  useEffect(() => {
    // Get initial session
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        setAdminChecking(true);
        await checkAdminStatus(session.user.id);
        setAdminChecking(false);
      } else {
        setIsAdmin(false);
        setAdminRole(null);
      }
      setLoading(false);
    })();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setAdminChecking(true);
          await checkAdminStatus(session.user.id);
          setAdminChecking(false);
        } else {
          setIsAdmin(false);
          setAdminRole(null);
        }
        setLoading(false);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log('Checking admin status for user:', userId);
      const { data, error } = await supabase
        .from('admin_users')
        .select('role, is_active')
        .eq('user_id', userId)
        .single();

      console.log('Admin check result:', { data, error });

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
        setAdminRole(null);
        return;
      }

      if (data && data.is_active) {
        console.log('User is admin:', data);
        setIsAdmin(true);
        setAdminRole(data.role);
      } else {
        console.log('User is not admin or inactive:', data);
        setIsAdmin(false);
        setAdminRole(null);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      setAdminRole(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    loading: loading || adminChecking,
    signOut,
    isAdmin,
    adminRole,
  };
};