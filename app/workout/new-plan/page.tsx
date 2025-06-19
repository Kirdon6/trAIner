import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { 
  Brain,
  Dumbbell,
  ArrowLeft,
  Target,
  Calendar,
  Activity,
  Zap,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default async function NewPlanPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Link href="/workout" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Workout</span>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">AI Plan Creator</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your AI Training Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tell us about your goals and current fitness level. Our AI will create a personalized training plan 
            that adapts to your progress and schedule.
          </p>
        </div>

        {/* Plan Creation Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <form className="space-y-8">
            {/* Goal Selection */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                What's Your Goal?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative cursor-pointer">
                  <input type="radio" name="goal" value="5k" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full hidden"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Run a 5K</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Perfect for beginners</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="goal" value="10k" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full hidden"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Run a 10K</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Intermediate challenge</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="goal" value="half-marathon" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full hidden"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Half Marathon</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Advanced distance</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="goal" value="marathon" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full hidden"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Full Marathon</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Ultimate challenge</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="goal" value="strength" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full hidden"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Strength Training</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Build muscle & power</p>
                      </div>
                    </div>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="goal" value="general-fitness" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full hidden"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">General Fitness</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Overall health & wellness</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Current Fitness Level */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Current Fitness Level
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="relative cursor-pointer">
                  <input type="radio" name="fitness-level" value="beginner" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white">Beginner</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">New to fitness</p>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="fitness-level" value="intermediate" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white">Intermediate</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Some experience</p>
                  </div>
                </label>

                <label className="relative cursor-pointer">
                  <input type="radio" name="fitness-level" value="advanced" className="sr-only" />
                  <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <h3 className="font-medium text-gray-900 dark:text-white">Advanced</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Experienced athlete</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Schedule Preferences */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                Training Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Days per week
                  </label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>3 days</option>
                    <option>4 days</option>
                    <option>5 days</option>
                    <option>6 days</option>
                    <option>7 days</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred workout time
                  </label>
                  <select className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Early morning (5-7 AM)</option>
                    <option>Morning (7-9 AM)</option>
                    <option>Midday (12-2 PM)</option>
                    <option>Afternoon (3-5 PM)</option>
                    <option>Evening (6-8 PM)</option>
                    <option>Late evening (8-10 PM)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Additional Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Target completion date (optional)
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Any injuries or limitations?
                  </label>
                  <textarea
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Let us know about any injuries, health conditions, or physical limitations..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Equipment available
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Dumbbells</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Resistance bands</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Pull-up bar</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Gym access</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Features */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI-Powered Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Adaptive Training</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Plan adjusts based on your progress and performance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Smart Scheduling</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Workouts automatically assigned to your calendar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Progress Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">AI insights on your performance and improvements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">Recovery Optimization</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Intelligent rest days and recovery recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Create My AI Training Plan
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 