/*
  # Quote Request System

  1. New Tables
    - `quote_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `service_type` (text)
      - `pickup_location` (text)
      - `delivery_location` (text)
      - `preferred_date` (date)
      - `description` (text)
      - `status` (enum: pending, quoted, accepted, completed, cancelled)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `quote_messages`
      - `id` (uuid, primary key)
      - `quote_request_id` (uuid, foreign key)
      - `sender_id` (uuid, foreign key to auth.users)
      - `message` (text)
      - `is_admin` (boolean)
      - `price` (decimal, optional)
      - `estimated_time` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Users can only see their own quote requests
    - Admins can see all quote requests
    - Users can only send messages to their own quote requests
    - Admins can send messages to any quote request
*/

-- Create enum for quote request status
CREATE TYPE quote_status AS ENUM ('pending', 'quoted', 'accepted', 'completed', 'cancelled');

-- Create quote_requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_type text NOT NULL,
  pickup_location text NOT NULL,
  delivery_location text NOT NULL,
  preferred_date date,
  description text,
  status quote_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quote_messages table
CREATE TABLE IF NOT EXISTS quote_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_request_id uuid REFERENCES quote_requests(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message text NOT NULL,
  is_admin boolean DEFAULT false,
  price decimal(10,2),
  estimated_time text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quote_requests
CREATE POLICY "Users can view their own quote requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own quote requests"
  ON quote_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own quote requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for quote_messages
CREATE POLICY "Users can view messages for their quote requests"
  ON quote_messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quote_requests 
      WHERE id = quote_request_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages to their quote requests"
  ON quote_messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM quote_requests 
      WHERE id = quote_request_id 
      AND user_id = auth.uid()
    )
    AND sender_id = auth.uid()
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quote_requests_user_id ON quote_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_messages_quote_request_id ON quote_messages(quote_request_id);
CREATE INDEX IF NOT EXISTS idx_quote_messages_created_at ON quote_messages(created_at);

-- Create updated_at trigger for quote_requests
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_quote_requests_updated_at
    BEFORE UPDATE ON quote_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();