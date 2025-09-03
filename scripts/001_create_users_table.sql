-- Create users profile table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  phone_number TEXT,
  location TEXT,
  bio TEXT,
  interests TEXT[],
  occupation TEXT,
  education TEXT,
  relationship_goals TEXT,
  connection_type TEXT DEFAULT 'dating',
  subscription_tier TEXT DEFAULT 'standard',
  ai_portrait_style TEXT,
  ai_portrait_url TEXT,
  verification_status TEXT DEFAULT 'pending',
  kyc_verified BOOLEAN DEFAULT FALSE,
  profile_completeness INTEGER DEFAULT 0,
  ai_compatibility_score DECIMAL(3,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "profiles_select_own" ON public.profiles 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles 
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_own" ON public.profiles 
  FOR DELETE USING (auth.uid() = id);

-- Allow users to view other profiles for matching (limited fields)
CREATE POLICY "profiles_select_public" ON public.profiles 
  FOR SELECT USING (
    auth.uid() IS NOT NULL AND 
    verification_status = 'verified'
  );
