# Supabase Database Setup Guide

This guide will help you set up Supabase for your Dream Foundation project.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `dream-foundation-db`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)
   - **service_role** key (starts with `eyJ`) - Keep this secret!

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration (existing)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 4. Set Up Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-schema.sql` file
4. Click "Run" to execute the SQL

This will create:
- `event_users` table for event registration user data
- `event_children` table for event registration children data
- `admission_users` table for admission registration user data
- `admission_children` table for admission registration children data

## 5. Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see all 4 tables created
3. Test the API endpoints:
   - `POST /api/eventRegistration`
   - `POST /api/admissionRegistration`
   - `GET /api/eventRegistration?registrationId=test`
   - `GET /api/admissionRegistration?registrationId=test`

## 6. Security Configuration

The current setup allows public read/write access. For production:

1. Go to **Authentication** → **Policies**
2. Review and modify Row Level Security (RLS) policies as needed
3. Consider implementing authentication for admin access

## 7. Database Features

- **Automatic timestamps**: `created_at` and `updated_at` fields
- **Foreign key relationships**: Children tables reference parent user tables
- **Indexes**: Optimized for common queries
- **Triggers**: Automatic `updated_at` field updates

## 8. Backup and Monitoring

1. Enable **Point-in-time Recovery** in Settings → Database
2. Set up **Database Backups** schedule
3. Monitor usage in **Dashboard** → **Usage**

## Troubleshooting

### Common Issues:

1. **Connection Error**: Check your environment variables
2. **Permission Denied**: Verify RLS policies
3. **Table Not Found**: Run the SQL schema again
4. **CORS Issues**: Check Supabase project settings

### Useful Commands:

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- View table structure
\d event_users;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'event_users';
```

## Next Steps

1. Test the registration forms
2. Set up admin dashboard to view registrations
3. Implement data export functionality
4. Add data validation and constraints as needed

For more help, check the [Supabase Documentation](https://supabase.com/docs).
