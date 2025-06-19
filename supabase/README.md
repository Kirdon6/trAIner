# Database Migrations

This directory contains the SQL migrations for the trAIner database schema.

## Migration Files

1. **001_create_users_table.sql** - Creates the users table with authentication integration
2. **002_create_user_profiles_table.sql** - Creates the user_profiles table with fitness data
3. **003_create_auth_trigger.sql** - Creates trigger to automatically create user records on signup

## How to Apply Migrations

### Option 1: Using Supabase Dashboard (Recommended for development)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the left sidebar
3. Copy and paste the contents of each migration file
4. Run them in order (001 first, then 002, then 003)
5. Verify the tables are created in the **Table Editor**

### Option 2: Using Supabase CLI (For production)

If you have the Supabase CLI installed:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (replace with your project ref)
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

## Database Schema

### Users Table
- `id` (UUID, PK) - References auth.users
- `email` (TEXT) - User's email address
- `full_name` (TEXT) - User's full name
- `created_at` (TIMESTAMP) - Record creation time
- `updated_at` (TIMESTAMP) - Last update time
- `timezone` (TEXT) - User's timezone (default: UTC)
- `units_system` (ENUM) - Metric or Imperial (default: metric)

### User Profiles Table
- `id` (UUID, PK) - Profile ID
- `user_id` (UUID, FK) - References users.id
- `current_fitness_level` (ENUM) - Beginner, Intermediate, or Advanced
- `age` (INTEGER) - User's age
- `weight` (DECIMAL) - Weight in kg
- `height` (DECIMAL) - Height in cm
- `injury_history` (JSONB) - Array of injury records
- `preferences` (JSONB) - User preferences object
- `created_at` (TIMESTAMP) - Record creation time
- `updated_at` (TIMESTAMP) - Last update time

## User Flow

### 1. User Registration
- User signs up through Supabase Auth
- Trigger automatically creates user record in `users` table
- User is redirected to dashboard

### 2. Onboarding Flow
- Dashboard checks if user has a profile
- If no profile exists, user is redirected to `/onboarding`
- Multi-step form collects:
  - Fitness level
  - Basic information (age, weight, height)
  - Training preferences (days, time)
  - Units system preference
- Profile is created and user is redirected to dashboard

### 3. Profile Management
- Users can view their profile at `/profile`
- Profile can be edited later
- All data is used for AI-powered training plans

## Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Policies** ensure users can only access their own data
- **Automatic timestamps** via triggers
- **Data validation** with CHECK constraints
- **Proper indexing** for performance
- **Auth trigger** automatically creates user records

## API Endpoints

- `POST /api/profile` - Create or update user profile
- `GET /api/profile` - Fetch user profile

## Next Steps

After applying these migrations:

1. Test the complete user flow (signup → onboarding → dashboard)
2. Set up Strava API integration
3. Create additional tables for training plans and activities
4. Implement AI plan generation logic
5. Add profile editing functionality 