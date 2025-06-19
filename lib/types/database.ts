export type UnitsSystem = 'metric' | 'imperial';
export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
  timezone: string;
  units_system: UnitsSystem;
}

export interface UserProfile {
  id: string;
  user_id: string;
  current_fitness_level: FitnessLevel | null;
  age: number | null;
  weight: number | null; // in kg
  height: number | null; // in cm
  injury_history: any[]; // JSONB array
  preferences: Record<string, any>; // JSONB object
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile extends User {
  profile?: UserProfile;
}

// Database schema types for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>;
      };
      user_profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;
      };
    };
    Enums: {
      units_system: UnitsSystem;
      fitness_level: FitnessLevel;
    };
  };
} 