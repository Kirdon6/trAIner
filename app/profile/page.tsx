import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserWithProfile } from '@/lib/supabase/auth-helpers';
import { 
  User, 
  Settings,
  Edit,
  Brain,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  const userWithProfile = await getUserWithProfile(user.id);
  const profile = userWithProfile.profile;

  if (!profile) {
    redirect('/onboarding');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Profile</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Full Name
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {userWithProfile.full_name || 'Not set'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {userWithProfile.email}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Fitness Level
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium capitalize">
                    {profile.current_fitness_level || 'Not set'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Age
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {profile.age ? `${profile.age} years` : 'Not set'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Weight
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {profile.weight ? `${profile.weight} kg` : 'Not set'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Height
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {profile.height ? `${profile.height} cm` : 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            {/* Training Preferences */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Training Preferences</h2>
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Training Days
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {profile.preferences?.training_days?.length 
                      ? `${profile.preferences.training_days.length} days per week`
                      : 'Not set'
                    }
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Preferred Time
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium capitalize">
                    {profile.preferences?.preferred_time?.replace('_', ' ') || 'Not set'}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Units System
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium capitalize">
                    {userWithProfile.units_system}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Timezone
                  </label>
                  <p className="text-gray-900 dark:text-white font-medium">
                    {userWithProfile.timezone}
                  </p>
                </div>
              </div>
            </div>

            {/* Injury History */}
            {profile.injury_history && profile.injury_history.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Injury History</h2>
                <div className="space-y-2">
                  {profile.injury_history.map((injury: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {injury.description || 'Injury recorded'}
                      </p>
                      {injury.date && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {new Date(injury.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Features */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Features</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Personalized training plans</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Smart scheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700 dark:text-gray-300">Recovery insights</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Link>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium"
                >
                  <Settings className="h-4 w-4" />
                  Account Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 