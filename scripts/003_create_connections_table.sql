-- Create connections table for relationship stages
CREATE TABLE IF NOT EXISTS public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  user2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  connection_stage TEXT DEFAULT 'handshake', -- handshake, communication, face2face
  connection_type TEXT DEFAULT 'dating', -- dating, friendship, social, casual, networking
  progress_score INTEGER DEFAULT 0,
  last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  milestones JSONB DEFAULT '[]',
  ai_insights JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- Enable RLS
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "connections_select_own" ON public.connections 
  FOR SELECT USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "connections_insert_own" ON public.connections 
  FOR INSERT WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "connections_update_own" ON public.connections 
  FOR UPDATE USING (auth.uid() = user1_id OR auth.uid() = user2_id);
