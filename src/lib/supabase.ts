import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      stripe_customers: {
        Row: {
          id: number;
          user_id: string;
          customer_id: string;
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          user_id: string;
          customer_id: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          user_id?: string;
          customer_id?: string;
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      stripe_subscriptions: {
        Row: {
          id: number;
          customer_id: string;
          subscription_id: string | null;
          price_id: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
          status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          customer_id: string;
          subscription_id?: string | null;
          price_id?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          customer_id?: string;
          subscription_id?: string | null;
          price_id?: string | null;
          current_period_start?: number | null;
          current_period_end?: number | null;
          cancel_at_period_end?: boolean;
          payment_method_brand?: string | null;
          payment_method_last4?: string | null;
          status?: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      stripe_orders: {
        Row: {
          id: number;
          checkout_session_id: string;
          payment_intent_id: string;
          customer_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          status: 'pending' | 'completed' | 'canceled';
          created_at: string;
          updated_at: string;
          deleted_at: string | null;
        };
        Insert: {
          checkout_session_id: string;
          payment_intent_id: string;
          customer_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          status?: 'pending' | 'completed' | 'canceled';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
        Update: {
          checkout_session_id?: string;
          payment_intent_id?: string;
          customer_id?: string;
          amount_subtotal?: number;
          amount_total?: number;
          currency?: string;
          payment_status?: string;
          status?: 'pending' | 'completed' | 'canceled';
          created_at?: string;
          updated_at?: string;
          deleted_at?: string | null;
        };
      };
      admin_users: {
        Row: {
          id: string;
          user_id: string;
          role: 'super_admin' | 'admin' | 'moderator';
          permissions: any;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          role?: 'super_admin' | 'admin' | 'moderator';
          permissions?: any;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          role?: 'super_admin' | 'admin' | 'moderator';
          permissions?: any;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      quote_requests: {
        Row: {
          id: string;
          user_id: string;
          service_type: string;
          pickup_location: string;
          delivery_location: string;
          preferred_date: string | null;
          description: string | null;
          status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          service_type: string;
          pickup_location: string;
          delivery_location: string;
          preferred_date?: string | null;
          description?: string | null;
          status?: 'pending' | 'quoted' | 'accepted' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          service_type?: string;
          pickup_location?: string;
          delivery_location?: string;
          preferred_date?: string | null;
          description?: string | null;
          status?: 'pending' | 'quoted' | 'accepted' | 'completed' | 'cancelled';
          created_at?: string;
          updated_at?: string;
        };
      };
      quote_messages: {
        Row: {
          id: string;
          quote_request_id: string;
          sender_id: string;
          message: string;
          is_admin: boolean;
          price: number | null;
          estimated_time: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote_request_id: string;
          sender_id: string;
          message: string;
          is_admin?: boolean;
          price?: number | null;
          estimated_time?: string | null;
          created_at?: string;
        };
        Update: {
          quote_request_id?: string;
          sender_id?: string;
          message?: string;
          is_admin?: boolean;
          price?: number | null;
          estimated_time?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      stripe_user_subscriptions: {
        Row: {
          customer_id: string;
          subscription_id: string | null;
          subscription_status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
          price_id: string | null;
          current_period_start: number | null;
          current_period_end: number | null;
          cancel_at_period_end: boolean;
          payment_method_brand: string | null;
          payment_method_last4: string | null;
        };
      };
      stripe_user_orders: {
        Row: {
          customer_id: string;
          order_id: number;
          checkout_session_id: string;
          payment_intent_id: string;
          amount_subtotal: number;
          amount_total: number;
          currency: string;
          payment_status: string;
          order_status: 'pending' | 'completed' | 'canceled';
          order_date: string;
        };
      };
      admin_dashboard_stats: {
        Row: {
          total_quote_requests: number;
          total_users: number;
          pending_requests: number;
          quoted_requests: number;
          completed_requests: number;
          accepted_requests: number;
          cancelled_requests: number;
          recent_requests: number;
          recent_users: number;
        };
      };
      admin_quote_requests: {
        Row: {
          id: string;
          service_type: string;
          pickup_location: string;
          delivery_location: string;
          preferred_date: string | null;
          description: string | null;
          status: 'pending' | 'quoted' | 'accepted' | 'completed' | 'cancelled';
          created_at: string;
          updated_at: string;
          user_email: string;
          user_name: string | null;
          user_created_at: string;
        };
      };
      admin_users_list: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          last_sign_in_at: string | null;
          quote_requests_count: number;
          completed_requests_count: number;
          last_activity: string | null;
        };
      };
    };
    Functions: {
      create_admin_user: {
        Args: {
          admin_email: string;
          admin_role?: 'super_admin' | 'admin' | 'moderator';
        };
        Returns: void;
      };
      is_admin: {
        Args: {
          user_uuid?: string;
        };
        Returns: boolean;
      };
      is_super_admin: {
        Args: {
          user_uuid?: string;
        };
        Returns: boolean;
      };
    };
  };
};