-- Projects built on Windsurf (and others)
-- Visibility: authenticated users only (dashboard context)
-- Author can insert/update/delete own; Admin can feature or delete any

-- 1) Enum for built_on (use DO block for idempotency)
DO $$
BEGIN
  CREATE TYPE public.project_built_on AS ENUM ('windsurf', 'other');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END$$;

-- 2) Projects table
CREATE TABLE IF NOT EXISTS public.project_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  overview TEXT NOT NULL,
  live_url TEXT NOT NULL,
  github_url TEXT,
  built_on public.project_built_on NOT NULL,
  built_on_other_text TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT project_live_url_format CHECK (live_url ~ '^https?://'),
  CONSTRAINT project_github_url_format CHECK (github_url IS NULL OR github_url ~ '^https?://'),
  CONSTRAINT built_on_other_required CHECK (
    (built_on = 'other' AND built_on_other_text IS NOT NULL AND char_length(trim(built_on_other_text)) > 0)
    OR (built_on = 'windsurf' AND built_on_other_text IS NULL)
  )
);

-- 3) Triggers (reuse existing handle_updated_at function if present)
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_project_submissions_updated ON public.project_submissions;
CREATE TRIGGER on_project_submissions_updated
  BEFORE UPDATE ON public.project_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 4) Indexes for sorting and common filters
CREATE INDEX IF NOT EXISTS idx_project_submissions_featured_created
  ON public.project_submissions (is_featured DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_project_submissions_user
  ON public.project_submissions (user_id);

-- 5) RLS
ALTER TABLE public.project_submissions ENABLE ROW LEVEL SECURITY;

-- Select: authenticated users only (dashboard visibility)
DROP POLICY IF EXISTS "projects_select_authenticated" ON public.project_submissions;
CREATE POLICY "projects_select_authenticated"
  ON public.project_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert: authenticated users can insert their own rows
DROP POLICY IF EXISTS "projects_insert_own" ON public.project_submissions;
CREATE POLICY "projects_insert_own"
  ON public.project_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Update: owners can update their rows
DROP POLICY IF EXISTS "projects_update_owner" ON public.project_submissions;
CREATE POLICY "projects_update_owner"
  ON public.project_submissions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update: admins can update any (e.g., feature toggle)
DROP POLICY IF EXISTS "projects_update_admin" ON public.project_submissions;
CREATE POLICY "projects_update_admin"
  ON public.project_submissions
  FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = TRUE
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.is_admin = TRUE
  ));

-- Delete: owners or admins
DROP POLICY IF EXISTS "projects_delete_owner_or_admin" ON public.project_submissions;
CREATE POLICY "projects_delete_owner_or_admin"
  ON public.project_submissions
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id OR EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.is_admin = TRUE
    )
  );

-- 6) Grants (keep consistent with your existing pattern)
GRANT ALL ON public.project_submissions TO postgres, service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_submissions TO authenticated;

-- 7) Comment docs
COMMENT ON TABLE public.project_submissions IS 'User-submitted projects (Windsurf or other). Visible to authenticated users; authors own rows; admins can feature/delete.';
COMMENT ON COLUMN public.project_submissions.is_featured IS 'Admin-controlled feature flag for prioritized listing.';
COMMENT ON TYPE public.project_built_on IS 'Built on Windsurf or Other.';
