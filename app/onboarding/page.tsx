'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Target, 
  Activity, 
  Calendar, 
  Brain,
  ArrowLeft,
  ArrowRight,
  SkipForward,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
type UnitsSystem = 'metric' | 'imperial';

interface OnboardingData {
  current_fitness_level: FitnessLevel | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  injury_history: any[];
  preferences: {
    training_days: string[];
    preferred_time: string;
    goals: string[];
    units_system: UnitsSystem;
  };
}

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    current_fitness_level: null,
    age: null,
    weight: null,
    height: null,
    injury_history: [],
    preferences: {
      training_days: [],
      preferred_time: 'morning',
      goals: [],
      units_system: 'metric',
    },
  });

  const totalSteps = 4;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updatePreferences = (field: keyof OnboardingData['preferences'], value: any) => {
    setData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSkip = async () => {
    try {
      // Create a minimal profile with default values
      const minimalData = {
        current_fitness_level: 'beginner' as FitnessLevel,
        age: null,
        weight: null,
        height: null,
        injury_history: [],
        preferences: {
          training_days: [],
          preferred_time: 'morning',
          goals: [],
          units_system: 'metric' as UnitsSystem,
        },
      };

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(minimalData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Failed to save minimal profile');
        // Still redirect even if it fails
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error saving minimal profile:', error);
      // Still redirect even if it fails
      router.push('/dashboard');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to trAIner!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let's get to know you better to create personalized training plans.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What's your current fitness level?
                </label>
                <div className="grid grid-cols-1 gap-3">
                  {(['beginner', 'intermediate', 'advanced'] as FitnessLevel[]).map((level) => (
                    <label key={level} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="fitness_level"
                        value={level}
                        checked={data.current_fitness_level === level}
                        onChange={(e) => updateData('current_fitness_level', e.target.value)}
                        className="sr-only"
                      />
                      <div className={`border-2 rounded-lg p-4 transition-colors ${
                        data.current_fitness_level === level
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                            data.current_fitness_level === level
                              ? 'border-blue-500'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {data.current_fitness_level === level && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white capitalize">
                              {level}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {level === 'beginner' && 'New to fitness or getting back into it'}
                              {level === 'intermediate' && 'Some experience with regular exercise'}
                              {level === 'advanced' && 'Experienced athlete or fitness enthusiast'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Basic Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Help us understand your current stats for better recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  min="13"
                  max="120"
                  value={data.age || ''}
                  onChange={(e) => updateData('age', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  value={data.weight || ''}
                  onChange={(e) => updateData('weight', e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="70.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="100"
                  max="250"
                  value={data.height || ''}
                  onChange={(e) => updateData('height', e.target.value ? parseFloat(e.target.value) : null)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="175"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Units System
                </label>
                <select
                  value={data.preferences.units_system || 'metric'}
                  onChange={(e) => updatePreferences('units_system', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="metric">Metric (kg, cm)</option>
                  <option value="imperial">Imperial (lbs, ft/in)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Training Preferences
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your schedule and preferences.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  How many days per week do you want to train?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[3, 4, 5, 6].map((days) => (
                    <label key={days} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="training_days"
                        value={days}
                        checked={data.preferences.training_days.length === days}
                        onChange={() => updatePreferences('training_days', Array.from({length: days}, (_, i) => i.toString()))}
                        className="sr-only"
                      />
                      <div className={`border-2 rounded-lg p-3 text-center transition-colors ${
                        data.preferences.training_days.length === days
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}>
                        <span className="font-medium text-gray-900 dark:text-white">{days} days</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred workout time
                </label>
                <select
                  value={data.preferences.preferred_time}
                  onChange={(e) => updatePreferences('preferred_time', e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="early_morning">Early Morning (5-7 AM)</option>
                  <option value="morning">Morning (7-9 AM)</option>
                  <option value="midday">Midday (12-2 PM)</option>
                  <option value="afternoon">Afternoon (3-5 PM)</option>
                  <option value="evening">Evening (6-8 PM)</option>
                  <option value="late_evening">Late Evening (8-10 PM)</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                AI-Powered Features
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your profile is ready! We'll use this information to create personalized training plans.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What you'll get:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Personalized training plans based on your fitness level</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">AI-powered progress tracking and insights</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Smart scheduling that adapts to your preferences</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Recovery recommendations and injury prevention</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              trAIner
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex gap-3">
              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Complete Setup
                  <CheckCircle className="h-4 w-4" />
                </button>
              )}
              
              <button
                onClick={handleSkip}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2"
              >
                <SkipForward className="h-4 w-4" />
                Skip for now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 