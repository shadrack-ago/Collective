-- AI Collective Kenya - Database Schema
-- 
-- NOTE: This file is kept for backward compatibility.
-- For new setups, use the migration file instead:
-- supabase/migrations/20240101000000_initial_schema.sql
--
-- That file includes additional features:
-- - Better organized structure
-- - More comprehensive RLS policies  
-- - Additional constraints and validation
-- - Performance indexes
-- - Detailed comments
--
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  organization TEXT,
  role TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  image_url TEXT,
  registration_link TEXT,
  status TEXT CHECK (status IN ('upcoming', 'ongoing', 'completed')) DEFAULT 'upcoming',
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create partnerships table
CREATE TABLE IF NOT EXISTS public.partnerships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Events are viewable by everyone" 
  ON public.events FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert events" 
  ON public.events FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own events or admins can update any" 
  ON public.events FOR UPDATE 
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Users can delete their own events or admins can delete any" 
  ON public.events FOR DELETE 
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Posts policies
CREATE POLICY "Published posts are viewable by everyone" 
  ON public.posts FOR SELECT 
  USING (published = true OR auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert posts" 
  ON public.posts FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own posts or admins can update any" 
  ON public.posts FOR UPDATE 
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Users can delete their own posts or admins can delete any" 
  ON public.posts FOR DELETE 
  USING (
    auth.uid() = created_by OR 
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Partnerships policies
CREATE POLICY "Partnerships are viewable by everyone" 
  ON public.partnerships FOR SELECT 
  USING (true);

CREATE POLICY "Only admins can insert partnerships" 
  ON public.partnerships FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Only admins can update partnerships" 
  ON public.partnerships FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Only admins can delete partnerships" 
  ON public.partnerships FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = TIMEZONE('utc'::text, NOW());
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partnerships_updated_at BEFORE UPDATE ON public.partnerships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(published);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON public.profiles(is_admin);
