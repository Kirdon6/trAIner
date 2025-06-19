import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { upsertUserProfile } from '@/lib/supabase/auth-helpers';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate required fields
    if (!body.current_fitness_level) {
      return NextResponse.json({ error: 'Fitness level is required' }, { status: 400 });
    }

    // Create or update user profile
    const profile = await upsertUserProfile(user.id, {
      current_fitness_level: body.current_fitness_level,
      age: body.age,
      weight: body.weight,
      height: body.height,
      injury_history: body.injury_history || [],
      preferences: {
        training_days: body.preferences?.training_days || [],
        preferred_time: body.preferences?.preferred_time || 'morning',
        goals: body.preferences?.goals || [],
        units_system: body.preferences?.units_system || 'metric',
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json(
      { error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    return NextResponse.json({ profile: profile || null });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
} 