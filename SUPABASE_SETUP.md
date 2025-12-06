# Supabase Setup Guide for AI Collective Kenya

This guide will walk you through setting up Supabase for the AI Collective Kenya platform.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the details:
   - **Name**: AI Collective Kenya
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to Kenya (e.g., Frankfurt or Singapore)
4. Click "Create new project"
5. Wait ~2 minutes for project setup

## Step 2: Get Your API Credentials

1. In your project dashboard, go to **Settings** (gear icon)
2. Click **API** in the sidebar
3. Copy these values:
   - **Project URL** (under Project URL)
   - **anon public** key (under Project API keys)
4. Paste these into your `.env.local` file

## Step 3: Run the Database Schema

1. In Supabase dashboard, click **SQL Editor** in the sidebar
2. Click "New query"
3. Open the file `supabase/schema.sql` in your project
4. Copy ALL the contents
5. Paste into the SQL Editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

This creates all your tables, security policies, and triggers!

## Step 4: Configure Authentication

### Enable Email Auth

1. Go to **Authentication** > **Settings**
2. Under **Auth Providers**, ensure Email is enabled
3. Configure Email settings:
   - **Enable email confirmations**: ON
   - **Confirm email**: ON (users must verify email)
   - **Secure email change**: ON
   - **Secure password change**: ON

### Set Redirect URLs

1. Still in Authentication > Settings
2. Scroll to **Redirect URLs**
3. Add these URLs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://yourdomain.com/auth/callback` (when deployed)

### Configure Site URL

1. Under **Site URL**, set:
   - Development: `http://localhost:3000`
   - Production: Update to your domain when deploying

## Step 5: Customize Email Templates (Optional)

1. Go to **Authentication** > **Email Templates**
2. You can customize:
   - **Confirm signup** - Email sent when user registers
   - **Magic Link** - For passwordless login (if you add this feature)
   - **Change Email Address**
   - **Reset Password**

Example customization for "Confirm signup":
```html
<h2>Welcome to AI Collective Kenya!</h2>
<p>Please confirm your email address by clicking the link below:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
<p>If you didn't sign up for AI Collective Kenya, you can safely ignore this email.</p>
```

## Step 6: Set Up Storage (Optional - for images)

If you want to allow image uploads for events:

1. Go to **Storage** in the sidebar
2. Click **New bucket**
3. Name it `events`
4. Make it **Public**
5. Click **Create bucket**

Then update your event creation form to upload images to this bucket.

## Step 7: Create Your First Admin User

### Option A: Through the App

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Join Us" and create an account
4. Check your email and confirm
5. Then follow Option B to make yourself admin

### Option B: Using SQL

1. First, register normally through the app
2. Go to **Authentication** > **Users** in Supabase
3. Find your user and copy the **UUID**
4. Go to **SQL Editor**
5. Run this query (replace with your email):

```sql
UPDATE profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

6. Refresh the app - you should now see "Admin Panel" in the dashboard!

## Step 8: Test Everything

### Test Registration Flow
1. Try registering a new user
2. Check if confirmation email arrives
3. Click the confirmation link
4. Verify you're redirected to dashboard

### Test Admin Access
1. Log in with your admin account
2. Go to Admin Panel
3. Try creating:
   - An event
   - A blog post
   - A partnership

### Test User View
1. Log out and create a regular user account
2. Confirm you can see events but not admin panel
3. Verify all links work

## Common Issues & Solutions

### "Invalid login credentials"
- Make sure email is confirmed
- Check you're using the correct password
- Try resetting password

### "403 Forbidden" or "Row Level Security"
- Make sure you ran the entire schema.sql
- Check that RLS policies were created
- Verify user has confirmed email

### Admin panel not showing
- Run the SQL query to set `is_admin = true`
- Log out and log back in
- Check browser console for errors

### Emails not sending
- Check Authentication > Settings
- Verify email provider is configured
- For production, you may need to configure SMTP

### Database connection issues
- Verify `.env.local` has correct credentials
- Make sure you copied the full anon key
- Check Project URL doesn't have trailing slash

## Security Checklist

Before going to production:

- [ ] Change database password from default
- [ ] Set up custom SMTP for emails
- [ ] Add your production domain to redirect URLs
- [ ] Review and test all RLS policies
- [ ] Set up database backups
- [ ] Enable 2FA on your Supabase account
- [ ] Review user access in Authentication > Users
- [ ] Monitor auth logs for suspicious activity

## Database Backup

Supabase automatically backs up your database, but you can also:

1. Go to **Database** > **Backups**
2. View automatic backups
3. Click **Restore** if needed

For manual backups:
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Create backup
supabase db dump > backup.sql
```

## Monitoring

### View Logs
1. Go to **Logs** in the sidebar
2. Check different log types:
   - Auth logs - Sign ins, sign ups, etc.
   - Database logs - Queries and errors
   - API logs - API requests

### Database Statistics
1. Go to **Reports**
2. View metrics:
   - Database size
   - Active connections
   - Query performance

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- GitHub Issues: Create an issue in your repo

---

**Setup complete!** 🎉 Your AI Collective Kenya platform is ready to use.
