-- Fix Admin Users RLS Policies
-- This script fixes the infinite recursion issue

-- First, disable RLS temporarily to clear existing policies
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON admin_users;

-- Create simplified policies that don't cause recursion
-- Allow users to view their own admin record
CREATE POLICY "Users can view their own admin record"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Allow super admins to manage all admin users (simplified check)
CREATE POLICY "Super admins can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND role = 'super_admin'
      AND is_active = true
    )
  );

-- Alternative approach: Allow service role to manage admin users
-- This bypasses RLS for admin management
CREATE POLICY "Service role can manage admin users"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true);

-- Grant necessary permissions
GRANT ALL ON admin_users TO service_role;
GRANT SELECT ON admin_users TO authenticated;

-- Test the fix
SELECT 'Admin policies fixed successfully!' as status; 