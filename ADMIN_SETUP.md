# Wing Movers Admin System

This document provides comprehensive information about the admin system implementation for the Wing Movers project.

## Overview

The admin system provides role-based access control with three levels of administration:
- **Super Admin**: Full system access, can manage other admins
- **Admin**: Standard administrative access
- **Moderator**: Limited administrative access

## Database Schema

### Admin Users Table
```sql
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role admin_role DEFAULT 'admin',
  permissions jsonb DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Admin Views
- `admin_dashboard_stats`: Aggregated statistics for dashboard
- `admin_quote_requests`: All quote requests with user information
- `admin_users_list`: All users with activity statistics

## Setup Instructions

### 1. Run Database Migration
First, apply the admin system migration:
```bash
supabase db push
```

### 2. Create Initial Admin Account
1. Navigate to `/admin/login`
2. Enter an email address (e.g., `admin@wingmovers.com`)
3. Click "Create admin account"
4. The system will create both the user account and admin record
5. Default password: `Faheem*61`

### 3. Create Super Admin (Optional)
To create a super admin, you can either:
- Use the admin interface (if you have super admin access)
- Run this SQL directly in Supabase:
```sql
SELECT create_admin_user('superadmin@wingmovers.com', 'super_admin');
```

## Admin Features

### Dashboard (`/admin/dashboard`)
- Overview statistics
- Quick access to admin functions
- System health monitoring

### Quote Management (`/admin/quotes`)
- View all quote requests
- Respond to customer inquiries
- Update quote status
- Provide pricing and estimates

### Admin Users (`/admin/users`)
- **Super Admin Only**: Create new admin accounts
- View all admin users
- Activate/deactivate admin accounts
- Monitor admin activity

## Security Features

### Row Level Security (RLS)
- Admin users can only access data they're authorized to see
- Quote requests are filtered by user ownership or admin status
- Admin functions are protected by role-based policies

### Authentication Flow
1. User logs in with email/password
2. System checks if user exists in `admin_users` table
3. If found and active, grants admin access
4. If not found or inactive, denies access and signs out user

## API Functions

### `create_admin_user(admin_email, admin_role)`
Creates an admin user record for an existing auth user.

**Parameters:**
- `admin_email`: Email address of the user
- `admin_role`: Role ('super_admin', 'admin', 'moderator')

**Usage:**
```sql
SELECT create_admin_user('admin@example.com', 'admin');
```

### `is_admin(user_uuid)`
Checks if a user has admin privileges.

### `is_super_admin(user_uuid)`
Checks if a user has super admin privileges.

## Role Permissions

### Super Admin
- ✅ Create/delete admin users
- ✅ Activate/deactivate admin accounts
- ✅ Access all admin features
- ✅ View all system data

### Admin
- ✅ Access admin dashboard
- ✅ Manage quote requests
- ✅ View user data
- ❌ Manage other admin users

### Moderator
- ✅ View admin dashboard
- ✅ Respond to quote requests
- ❌ Access user management
- ❌ Manage admin users

## Environment Variables

Ensure these are set in your `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Troubleshooting

### Common Issues

1. **"Access denied" error on admin login**
   - Check if user exists in `admin_users` table
   - Verify `is_active` is true
   - Ensure user has valid auth account

2. **Cannot create admin account**
   - Verify email is not already in use
   - Check Supabase auth settings
   - Ensure RPC function exists in database

3. **Admin dashboard not loading**
   - Check if `admin_dashboard_stats` view exists
   - Verify user has proper permissions
   - Check browser console for errors

### Database Queries for Debugging

Check if user is admin:
```sql
SELECT * FROM admin_users WHERE user_id = 'user-uuid-here';
```

Check admin dashboard stats:
```sql
SELECT * FROM admin_dashboard_stats;
```

List all admin users:
```sql
SELECT 
  au.*,
  u.email,
  u.raw_user_meta_data->>'full_name' as full_name
FROM admin_users au
JOIN auth.users u ON au.user_id = u.id;
```

## Best Practices

1. **Password Security**: Change default passwords immediately
2. **Role Management**: Only grant necessary permissions
3. **Regular Audits**: Monitor admin activity regularly
4. **Backup**: Keep regular backups of admin user data
5. **Logging**: Monitor admin actions for security

## Development Notes

- The admin system uses Supabase's built-in auth system
- RLS policies ensure data security
- Admin status is checked on every page load
- Role-based UI components show/hide based on permissions

## Support

For technical support or questions about the admin system, please refer to the project documentation or contact the development team. 