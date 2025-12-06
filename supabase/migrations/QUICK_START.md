# Quick Start - Database Setup

## 🚀 Quick Setup (5 minutes)

### Step 1: Run the Migration

**Copy and paste this entire file into Supabase SQL Editor:**

Open: `supabase/migrations/20240101000000_initial_schema.sql`

1. Login to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New query**
5. Copy the ENTIRE contents of `20240101000000_initial_schema.sql`
6. Paste into the SQL Editor
7. Click **Run** or press `Ctrl/Cmd + Enter`
8. Wait for "Migration completed successfully!" message

### Step 2: Verify Tables Created

Run this query in SQL Editor:

```sql
SELECT 
  table_name,
  (SELECT count(*) FROM information_schema.columns 
   WHERE table_schema = 'public' AND columns.table_name = tables.table_name) as column_count
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'events', 'posts', 'partnerships')
ORDER BY table_name;
```

Expected output:
```
table_name    | column_count
--------------+-------------
events        | 10
partnerships  | 6
posts         | 9
profiles      | 10
```

### Step 3: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Enable **Email** provider (should be on by default)
3. Under **Email Auth**:
   - ✅ Enable email confirmations
   - ✅ Confirm email
4. Set **Site URL**: `http://localhost:3000`
5. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/**` (for development)

### Step 4: Test Everything

Run these queries to ensure everything is set up:

```sql
-- 1. Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
-- All should show 't' (true)

-- 2. Count policies (should have ~16)
SELECT COUNT(*) as policy_count 
FROM pg_policies 
WHERE schemaname = 'public';

-- 3. Check triggers exist (should have 6)
SELECT COUNT(*) as trigger_count 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- 4. Check functions exist (should have 3)
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_type = 'FUNCTION'
ORDER BY routine_name;
```

## 🎯 Common Operations

### Make Yourself Admin

After registering through the app, run:

```sql
-- Option 1: By email
UPDATE profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';

-- Option 2: By user ID (from Authentication > Users)
UPDATE profiles 
SET is_admin = true 
WHERE id = 'user-uuid-here';

-- Verify
SELECT email, is_admin FROM profiles WHERE is_admin = true;
```

### Add Sample Data (Optional)

```sql
-- Add a sample upcoming event
INSERT INTO events (title, description, event_date, location, status)
VALUES (
  'AI Kenya Kickoff Meetup',
  'Join us for our inaugural meetup to discuss AI trends and opportunities in Kenya.',
  NOW() + INTERVAL '7 days',
  'iHub Nairobi',
  'upcoming'
);

-- Add a sample partnership
INSERT INTO partnerships (name, description, website_url)
VALUES (
  'AI Collective Global',
  'The global AI Collective community connecting AI pioneers worldwide.',
  'https://www.aicollective.com'
);

-- Add a sample published post
INSERT INTO posts (title, content, excerpt, published)
VALUES (
  'Welcome to AI Collective Kenya!',
  'We are excited to launch the Kenyan chapter of AI Collective...',
  'Introducing AI Collective Kenya - a community for AI pioneers in Kenya.',
  true
);
```

### View All Data

```sql
-- See all profiles
SELECT email, full_name, is_admin, created_at FROM profiles;

-- See all events
SELECT title, event_date, status, location FROM events ORDER BY event_date;

-- See all posts
SELECT title, published, created_at FROM posts ORDER BY created_at DESC;

-- See all partnerships
SELECT name, website_url FROM partnerships;
```

### Reset Data (Development Only!)

```sql
-- ⚠️ WARNING: This deletes ALL data!
TRUNCATE events, posts, partnerships RESTART IDENTITY CASCADE;
-- Note: Don't truncate profiles as it's linked to auth.users
```

## 🔒 Security Check

Verify RLS is working:

```sql
-- Check each table has policies
SELECT 
  tablename,
  COUNT(*) as policy_count
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- Expected output:
-- events        | 4
-- partnerships  | 4
-- posts         | 4
-- profiles      | 4
```

## 🐛 Troubleshooting

### Issue: "relation already exists"

**Solution**: Tables already created. You can either:
- Skip the migration (already done)
- Drop tables first (⚠️ deletes data):
  ```sql
  DROP TABLE IF EXISTS events, posts, partnerships, profiles CASCADE;
  ```

### Issue: RLS policies preventing access

**Solution**: Check if user is authenticated:
```sql
-- Run as authenticated user in SQL Editor
SELECT auth.uid(); -- Should return your user ID

-- If null, you're running as postgres role
-- Switch to "User" mode in SQL Editor settings
```

### Issue: Profile not created on signup

**Solution**: Check trigger exists:
```sql
SELECT * FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- If missing, recreate:
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();
```

### Issue: Can't see admin panel

**Solution**: Verify admin status:
```sql
-- Check if you're admin
SELECT is_admin FROM profiles WHERE email = 'your-email@example.com';

-- If false, update it:
UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';

-- Then logout and login again in the app
```

## 📊 Monitoring Queries

### Active Users Count

```sql
SELECT COUNT(*) as total_users FROM profiles;
SELECT COUNT(*) as admin_users FROM profiles WHERE is_admin = true;
```

### Upcoming Events

```sql
SELECT 
  title,
  event_date,
  location,
  EXTRACT(DAY FROM (event_date - NOW())) as days_until
FROM events 
WHERE status = 'upcoming' 
  AND event_date > NOW()
ORDER BY event_date;
```

### Recently Published Posts

```sql
SELECT 
  title,
  published_at,
  created_at
FROM posts 
WHERE published = true
ORDER BY published_at DESC
LIMIT 5;
```

### Database Size

```sql
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## ✅ Setup Checklist

- [ ] Migration file executed successfully
- [ ] All 4 tables created (profiles, events, posts, partnerships)
- [ ] RLS enabled on all tables
- [ ] All policies created (16 total)
- [ ] All triggers created (6 total)
- [ ] All functions created (3 total)
- [ ] Email authentication configured
- [ ] Site URL and redirect URLs set
- [ ] First user registered through app
- [ ] First user made admin
- [ ] Admin panel accessible
- [ ] Can create events, posts, partnerships

## 🎉 You're Done!

Your database is now fully set up and ready to use. Head back to the app and start creating content!

**Next steps:**
1. Register your account in the app
2. Make yourself admin using SQL above
3. Login and access the Admin Panel
4. Create your first event
5. Add partnerships
6. Publish posts

For more help, see:
- `README.md` - Full setup guide
- `SUPABASE_SETUP.md` - Detailed Supabase configuration
- `migrations/README.md` - Migration management guide
