import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  Activity, 
  Target, 
  Calendar, 
  TrendingUp, 
  Dumbbell, 
  Music, 
  Settings,
  Plus,
  Brain,
  Trophy,
  User,
  AlertCircle
} from 'lucide-react';
import { LogoutButton } from '@/components/logout-button';
import Link from 'next/link';
import { getUserWithProfile } from '@/lib/supabase/auth-helpers';

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user data from our database
  let userData = null;
  let profileData = null;
  let hasProfile = false;

  try {
    const userWithProfile = await getUserWithProfile(user.id);
    userData = userWithProfile;
    profileData = userWithProfile.profile;
    hasProfile = !!userWithProfile.profile;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  // Redirect to onboarding if user exists but has no profile
  if (userData && !hasProfile) {
    redirect('/onboarding');
  }

  // Show error if user record doesn't exist
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              User Record Not Found
            </h2>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              There was an issue creating your user record. Please try signing out and signing back in.
            </p>
            <LogoutButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                trAIner
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {userData?.full_name || user.email}
                </span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {userData?.full_name || 'Athlete'}! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your AI training assistant is ready to help you achieve your fitness goals.
          </p>
        </div>

        {/* Profile Summary */}
        {profileData && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Fitness Level:</span>
                <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                  {profileData.current_fitness_level}
                </span>
              </div>
              {profileData.age && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Age:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {profileData.age} years
                  </span>
                </div>
              )}
              {profileData.weight && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Weight:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-white">
                    {profileData.weight} kg
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Goals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">78%</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Achievements</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Workout Module */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <Dumbbell className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Workout & Running</h2>
              </div>
              <Link
                href="/workout"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI-powered training plans for running, strength training, and fitness goals.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Marathon Training</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Week 8 of 16</p>
                </div>
                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Strength Training</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Next: Upper Body</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tomorrow</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href="/workout/new-plan"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Plan
              </Link>
              <Link
                href="/workout/analytics"
                className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                Analytics
              </Link>
            </div>
          </div>

          {/* Piano Module */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Music className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Piano Learning</h2>
              </div>
              <Link
                href="/piano"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              AI-assisted piano practice with personalized lessons and progress tracking.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Classical Pieces</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mozart Sonata</p>
                </div>
                <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Daily Practice</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">30 min session</p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Today</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                href="/piano/new-lesson"
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                New Lesson
              </Link>
              <Link
                href="/piano/practice"
                className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Music className="h-4 w-4" />
                Practice Now
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/workout/log-activity"
              className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Activity className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Log Workout</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Record your activity</p>
              </div>
            </Link>
            
            <Link
              href="/calendar"
              className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">View Calendar</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">See your schedule</p>
              </div>
            </Link>
            
            <Link
              href="/settings"
              className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Settings className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Settings</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Configure your app</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 