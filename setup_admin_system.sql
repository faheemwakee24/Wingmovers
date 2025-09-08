-- Admin System Setup Script
-- Run this in your Supabase SQL Editor

-- Create enum for admin roles
DO $$ BEGIN
    CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'moderator');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role admin_role DEFAULT 'admin',
  permissions jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON admin_users;

-- RLS Policies for admin_users
CREATE POLICY "Admins can view all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE user_id = auth.uid() 
      AND is_active = true
    )
  );

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

-- Create admin dashboard stats view
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT
  (SELECT COUNT(*) FROM quote_requests) as total_quote_requests,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COUNT(*) FROM quote_requests WHERE status = 'pending') as pending_requests,
  (SELECT COUNT(*) FROM quote_requests WHERE status = 'quoted') as quoted_requests,
  (SELECT COUNT(*) FROM quote_requests WHERE status = 'completed') as completed_requests,
  (SELECT COUNT(*) FROM quote_requests WHERE status = 'accepted') as accepted_requests,
  (SELECT COUNT(*) FROM quote_requests WHERE status = 'cancelled') as cancelled_requests,
  (SELECT COUNT(*) FROM quote_requests WHERE created_at >= NOW() - INTERVAL '7 days') as recent_requests,
  (SELECT COUNT(*) FROM auth.users WHERE created_at >= NOW() - INTERVAL '7 days') as recent_users;

-- Create admin quote requests view
CREATE OR REPLACE VIEW admin_quote_requests AS
SELECT
  qr.id,
  qr.service_type,
  qr.pickup_location,
  qr.delivery_location,
  qr.preferred_date,
  qr.description,
  qr.status,
  qr.created_at,
  qr.updated_at,
  u.email as user_email,
  u.raw_user_meta_data->>'full_name' as user_name,
  u.created_at as user_created_at
FROM quote_requests qr
JOIN auth.users u ON qr.user_id = u.id
ORDER BY qr.created_at DESC;

-- Create admin users list view
CREATE OR REPLACE VIEW admin_users_list AS
SELECT
  u.id,
  u.email,
  u.raw_user_meta_data->>'full_name' as full_name,
  u.created_at,
  u.last_sign_in_at,
  (SELECT COUNT(*) FROM quote_requests WHERE user_id = u.id) as quote_requests_count,
  (SELECT COUNT(*) FROM quote_requests WHERE user_id = u.id AND status = 'completed') as completed_requests_count,
  (SELECT MAX(created_at) FROM quote_requests WHERE user_id = u.id) as last_activity
FROM auth.users u
ORDER BY u.created_at DESC;

-- Grant permissions for admin views
GRANT SELECT ON admin_dashboard_stats TO authenticated;
GRANT SELECT ON admin_quote_requests TO authenticated;
GRANT SELECT ON admin_users_list TO authenticated;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = user_uuid 
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = user_uuid 
    AND role = 'super_admin'
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create admin user
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email text,
  admin_role admin_role DEFAULT 'admin'
)
RETURNS void AS $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Get the user_id for the given email
  SELECT id INTO user_uuid 
  FROM auth.users 
  WHERE email = admin_email;
  
  IF user_uuid IS NULL THEN
    RAISE EXCEPTION 'User with email % does not exist', admin_email;
  END IF;
  
  -- Insert admin record
  INSERT INTO admin_users (user_id, role, permissions, is_active)
  VALUES (user_uuid, admin_role, '{}', true)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    role = EXCLUDED.role,
    is_active = true,
    updated_at = now();
    
  RAISE NOTICE 'Admin user created/updated for email: %', admin_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);

-- Create updated_at trigger for admin_users
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Update quote_requests policies to allow admin access
DROP POLICY IF EXISTS "Users can view their own quote requests or admins can view all" ON quote_requests;
CREATE POLICY "Users can view their own quote requests or admins can view all"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR is_admin()
  );

-- Update quote_messages policies to allow admin access
DROP POLICY IF EXISTS "Users can view messages for their quote requests or admins can view all" ON quote_messages;
CREATE POLICY "Users can view messages for their quote requests or admins can view all"
  ON quote_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quote_requests 
      WHERE id = quote_request_id 
      AND user_id = auth.uid()
    )
    OR is_admin()
  );

DROP POLICY IF EXISTS "Users can send messages to their quote requests or admins can send to any" ON quote_messages;
CREATE POLICY "Users can send messages to their quote requests or admins can send to any"
  ON quote_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (
      EXISTS (
        SELECT 1 FROM quote_requests 
        WHERE id = quote_request_id 
        AND user_id = auth.uid()
      )
      AND sender_id = auth.uid()
    )
    OR (
      is_admin() 
      AND sender_id = auth.uid()
    )
  );

-- Test the function
SELECT 'Admin system setup completed successfully!' as status; 