# Database Migrations

This directory contains Supabase database migrations for the AI Collective Kenya platform.

## Migration Files

### `20240101000000_initial_schema.sql`
The initial migration that creates the complete database schema including:
- **Tables**: profiles, events, posts, partnerships
- **RLS Policies**: Row-level security for all tables
- **Functions**: Auto-update timestamps, profile creation, post publishing
- **Triggers**: Automatic profile creation on signup, timestamp updates
- **Indexes**: Performance optimization for common queries
- **Constraints**: Data validation and integrity checks

## How to Apply Migrations

### Option 1: Supabase Dashboard (Recommended for first-time setup)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New query**
4. Copy the contents of `20240101000000_initial_schema.sql`
5. Paste and click **Run** (or press Cmd/Ctrl + Enter)
6. You should see success messages in the output

### Option 2: Supabase CLI (For development workflow)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (replace with your project ref)
supabase link --project-ref your-project-ref

# Apply all migrations
supabase db push

# Or apply a specific migration
supabase db push --include-all
```

### Option 3: Manual SQL Execution

If you prefer to run SQL manually:

```bash
# Using psql (if you have direct database access)
psql -h db.your-project-ref.supabase.co -U postgres -d postgres -f supabase/migrations/20240101000000_initial_schema.sql
```

## Verify Migration Success

After running the migration, verify it worked:

### Check Tables

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'events', 'posts', 'partnerships');
```

You should see all 4 tables listed.

### Check RLS Policies

```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

You should see policies for select, insert, update, and delete on each table.

### Check Triggers

```sql
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY event_object_table;
```

You should see triggers for updated_at and profile creation.

### Check Functions

```sql
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_type = 'FUNCTION';
```

You should see the handle_updated_at, handle_new_user, and handle_post_published functions.

## Creating New Migrations

When you need to modify the database schema:

### Using Supabase CLI

```bash
# Create a new migration file
supabase migration new your_migration_name

# This creates: supabase/migrations/[timestamp]_your_migration_name.sql
# Edit the file with your SQL changes
# Then push it:
supabase db push
```

### Migration Naming Convention

Use descriptive names with timestamp prefix:
- `20240101000000_initial_schema.sql`
- `20240115120000_add_event_categories.sql`
- `20240201093000_add_user_notifications.sql`

### Example: Adding a new column

```sql
-- Migration: 20240115120000_add_event_categories.sql

-- Add category column to events table
ALTER TABLE public.events 
ADD COLUMN category TEXT CHECK (category IN ('workshop', 'meetup', 'conference', 'hackathon'));

-- Create index for better performance
CREATE INDEX idx_events_category ON public.events(category);

-- Add comment for documentation
COMMENT ON COLUMN public.events.category IS 'Event category type';
```

## Rollback Migrations

If you need to rollback a migration:

### Manual Rollback

Create a rollback migration that reverses the changes:

```sql
-- Migration: 20240115120001_rollback_event_categories.sql

-- Remove index
DROP INDEX IF EXISTS idx_events_category;

-- Remove column
ALTER TABLE public.events DROP COLUMN IF EXISTS category;
```

### Using Supabase CLI

```bash
# Reset to a specific migration
supabase db reset --linked

# This will drop and recreate the database with all migrations
```

## Best Practices

1. **Always test migrations locally first**
   - Use Supabase local development
   - Test on a staging project before production

2. **Make migrations atomic**
   - Each migration should be a complete, self-contained change
   - Include both forward and reverse operations

3. **Include comments**
   - Document why the change is being made
   - Add SQL comments for complex operations

4. **Version control**
   - Commit migration files to Git
   - Never modify an already-applied migration

5. **Backup before major changes**
   ```bash
   # Create backup before migration
   supabase db dump > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

## Troubleshooting

### Migration fails with "relation already exists"

The table or object already exists. Either:
- Use `CREATE TABLE IF NOT EXISTS`
- Drop the existing object first
- Skip this migration if already applied

### RLS policies not working

Check:
```sql
-- Ensure RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- View all policies
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### Trigger not firing

Check:
```sql
-- List all triggers
SELECT * FROM information_schema.triggers 
WHERE trigger_schema = 'public';

-- Check trigger function exists
SELECT * FROM pg_proc WHERE proname LIKE 'handle_%';
```

### Permission errors

Ensure grants are properly set:
```sql
-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
```

## Migration Status

| Migration | Applied | Date | Notes |
|-----------|---------|------|-------|
| `20240101000000_initial_schema.sql` | ✅ | TBD | Initial database setup |

## Additional Resources

- [Supabase Migrations Documentation](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
