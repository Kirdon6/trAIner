import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Dumbbell, Brain, Target, TrendingUp, Calendar, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        {/* Navigation */}
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-bold text-xl">
              <Link href={"/"} className="flex items-center gap-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  trAIner
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {!hasEnvVars ? null : <AuthButton />}
              <ThemeSwitcher />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col gap-20 max-w-7xl p-5">
          <section className="text-center space-y-8 py-20">
            <h1 className="text-6xl font-bold tracking-tight">
              Your AI-Powered
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fitness Assistant
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Set your fitness goals and let AI create personalized training plans. 
              Track your progress with intelligent insights from Strava and other fitness apps.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/features"
                className="border border-foreground/20 hover:bg-foreground/5 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Learn More
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20">
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Choose trAIner?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center space-y-4 p-6 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">AI-Powered Plans</h3>
                <p className="text-muted-foreground">
                  Get personalized training plans created by advanced AI models based on your goals and current fitness level.
                </p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Goal-Oriented</h3>
                <p className="text-muted-foreground">
                  From 5K to marathon, strength training to recovery - we adapt your plan to any fitness goal.
                </p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Smart Analytics</h3>
                <p className="text-muted-foreground">
                  Analyze your runs and workouts with AI insights. Track progress and get recommendations for improvement.
                </p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold">Auto-Scheduling</h3>
                <p className="text-muted-foreground">
                  AI automatically assigns workouts to your calendar and adapts plans based on your progress and schedule.
                </p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Dumbbell className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold">Multi-Sport Support</h3>
                <p className="text-muted-foreground">
                  Running, strength training, flexibility, recovery - comprehensive support for all your fitness activities.
                </p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-lg border border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Adaptation</h3>
                <p className="text-muted-foreground">
                  Plans evolve as you progress. AI continuously learns from your performance to optimize your training.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform Your Fitness Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of athletes using AI to achieve their fitness goals faster and smarter.
              </p>
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Start Your AI Training Plan
              </Link>
            </div>
          </section>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
            {" "}and{" "}
            <span className="font-bold">AI</span>
          </p>
        </footer>
      </div>
    </main>
  );
}
