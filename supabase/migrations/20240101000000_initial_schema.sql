-- AI Collective Kenya - Initial Database Migration
-- This migration creates all tables, RLS policies, triggers, and functions

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Profiles table - extends auth.users with additional user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  organization TEXT,
  role TEXT,
  is_admin BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Events table - stores community events
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  registration_link TEXT,
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed')) DEFAULT 'upcoming' NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT valid_event_date CHECK (event_date > created_at)
);

-- Posts table - stores blog posts and announcements
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT title_length CHECK (char_length(title) >= 3)
);

-- Partnerships table - stores organizational partnerships
CREATE TABLE IF NOT EXISTS public.partnerships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT name_length CHECK (char_length(name) >= 2),
  CONSTRAINT valid_website_url CHECK (website_url IS NULL OR website_url ~ '^https?://')
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin) WHERE is_admin = true;
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at DESC);

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON public.events(created_by);
CREATE INDEX IF NOT EXISTS idx_events_upcoming ON public.events(event_date) WHERE status = 'upcoming';

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_posts_created_by ON public.posts(created_by);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC) WHERE published = true;

-- Partnerships indexes
CREATE INDEX IF NOT EXISTS idx_partnerships_created_at ON public.partnerships(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES - PROFILES
-- ============================================================================

-- Anyone can view profiles
CREATE POLICY "profiles_select_policy" 
  ON public.profiles 
  FOR SELECT 
  USING (true);

-- Users can insert their own profile
CREATE POLICY "profiles_insert_policy" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "profiles_update_policy" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users cannot delete their own profile (handled by auth.users CASCADE)
CREATE POLICY "profiles_delete_policy" 
  ON public.profiles 
  FOR DELETE 
  USING (false);

-- ============================================================================
-- RLS POLICIES - EVENTS
-- ============================================================================

-- Everyone can view events
CREATE POLICY "events_select_policy" 
  ON public.events 
  FOR SELECT 
  USING (true);

-- Authenticated users can create events
CREATE POLICY "events_insert_policy" 
  ON public.events 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Event creators and admins can update events
CREATE POLICY "events_update_policy" 
  ON public.events 
  FOR UPDATE 
  TO authenticated
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Event creators and admins can delete events
CREATE POLICY "events_delete_policy" 
  ON public.events 
  FOR DELETE 
  TO authenticated
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- ============================================================================
-- RLS POLICIES - POSTS
-- ============================================================================

-- Everyone can view published posts, authenticated users can view all
CREATE POLICY "posts_select_policy" 
  ON public.posts 
  FOR SELECT 
  USING (
    published = true OR 
    auth.role() = 'authenticated'
  );

-- Authenticated users can create posts
CREATE POLICY "posts_insert_policy" 
  ON public.posts 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Post creators and admins can update posts
CREATE POLICY "posts_update_policy" 
  ON public.posts 
  FOR UPDATE 
  TO authenticated
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Post creators and admins can delete posts
CREATE POLICY "posts_delete_policy" 
  ON public.posts 
  FOR DELETE 
  TO authenticated
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- ============================================================================
-- RLS POLICIES - PARTNERSHIPS
-- ============================================================================

-- Everyone can view partnerships
CREATE POLICY "partnerships_select_policy" 
  ON public.partnerships 
  FOR SELECT 
  USING (true);

-- Only admins can create partnerships
CREATE POLICY "partnerships_insert_policy" 
  ON public.partnerships 
  FOR INSERT 
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Only admins can update partnerships
CREATE POLICY "partnerships_update_policy" 
  ON public.partnerships 
  FOR UPDATE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Only admins can delete partnerships
CREATE POLICY "partnerships_delete_policy" 
  ON public.partnerships 
  FOR DELETE 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, organization, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'organization', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to set published_at when post is published
CREATE OR REPLACE FUNCTION public.handle_post_published()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.published = true AND (OLD.published = false OR OLD.published IS NULL) THEN
    NEW.published_at = TIMEZONE('utc'::text, NOW());
  ELSIF NEW.published = false THEN
    NEW.published_at = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at on profiles
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to update updated_at on events
DROP TRIGGER IF EXISTS on_events_updated ON public.events;
CREATE TRIGGER on_events_updated
  BEFORE UPDATE ON public.events
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to update updated_at on posts
DROP TRIGGER IF EXISTS on_posts_updated ON public.posts;
CREATE TRIGGER on_posts_updated
  BEFORE UPDATE ON public.posts
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to set published_at on posts
DROP TRIGGER IF EXISTS on_post_published ON public.posts;
CREATE TRIGGER on_post_published
  BEFORE INSERT OR UPDATE ON public.posts
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_post_published();

-- Trigger to update updated_at on partnerships
DROP TRIGGER IF EXISTS on_partnerships_updated ON public.partnerships;
CREATE TRIGGER on_partnerships_updated
  BEFORE UPDATE ON public.partnerships
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- GRANTS (ensure proper permissions)
-- ============================================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;

-- Grant all on tables to authenticated users
GRANT ALL ON public.profiles TO postgres, service_role;
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;

GRANT ALL ON public.events TO postgres, service_role;
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;

GRANT ALL ON public.posts TO postgres, service_role;
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.posts TO authenticated;

GRANT ALL ON public.partnerships TO postgres, service_role;
GRANT SELECT ON public.partnerships TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.partnerships TO authenticated;

-- ============================================================================
-- COMMENTS (for documentation)
-- ============================================================================

COMMENT ON TABLE public.profiles IS 'User profiles extending auth.users with additional information';
COMMENT ON TABLE public.events IS 'Community events with registration and status tracking';
COMMENT ON TABLE public.posts IS 'Blog posts and announcements with publish/draft status';
COMMENT ON TABLE public.partnerships IS 'Organizational partnerships and collaborations';

COMMENT ON COLUMN public.profiles.is_admin IS 'Admin flag for content management access';
COMMENT ON COLUMN public.events.status IS 'Event status: upcoming, ongoing, or completed';
COMMENT ON COLUMN public.posts.published IS 'Whether the post is published and visible to public';
COMMENT ON COLUMN public.posts.published_at IS 'Timestamp when post was first published';

-- ============================================================================
-- INITIAL DATA (Optional - uncomment if needed)
-- ============================================================================

-- Insert sample partnership (uncomment if needed)
-- INSERT INTO public.partnerships (name, description, website_url) VALUES
-- ('AI Collective Global', 'Parent organization connecting AI communities worldwide', 'https://www.aicollective.com');

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Display success message
DO $$
BEGIN
  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Tables created: profiles, events, posts, partnerships';
  RAISE NOTICE 'RLS policies enabled and configured';
  RAISE NOTICE 'Triggers and functions created';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Configure authentication in Supabase dashboard';
  RAISE NOTICE '2. Set up your first admin user';
  RAISE NOTICE '3. Test the application';
END $$;
