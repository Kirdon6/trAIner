import { createClient } from './server';
import { User, UserProfile } from '@/lib/types/database';

export async function createUserRecord(userId: string, email: string, fullName?: string) {
  const supabase = await createClient();
  
  // First check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('id', userId)
    .single();

  if (existingUser) {
    // User already exists, return it
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return user;
  }

  // Create new user record
  const { data, error } = await supabase
    .from('users')
    .insert({
      id: userId,
      email: email,
      full_name: fullName || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating user record:', error);
    throw error;
  }

  return data;
}

export async function getUserWithProfile(userId: string) {
  const supabase = await createClient();
  
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (userError) {
    console.error('Error fetching user:', userError);
    throw userError;
  }

  const { data: profile, error: profileError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (profileError && profileError.code !== 'PGRST116') {
    // PGRST116 is "not found" error, which is expected if no profile exists
    console.error('Error fetching user profile:', profileError);
    throw profileError;
  }

  return {
    ...user,
    profile: profile || null,
  };
}

export async function createUserProfile(userId: string, profileData: Partial<UserProfile>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      user_id: userId,
      current_fitness_level: profileData.current_fitness_level || null,
      age: profileData.age || null,
      weight: profileData.weight || null,
      height: profileData.height || null,
      injury_history: profileData.injury_history || [],
      preferences: profileData.preferences || {},
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }

  return data;
}

export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update(profileData)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }

  return data;
}

export async function upsertUserProfile(userId: string, profileData: Partial<UserProfile>) {
  const supabase = await createClient();
  
  // First try to update existing profile
  const { data: existingProfile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (existingProfile) {
    return updateUserProfile(userId, profileData);
  } else {
    return createUserProfile(userId, profileData);
  }
} 