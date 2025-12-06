# Deployment Guide - Netlify via GitHub

This guide will walk you through deploying your AI Collective Kenya platform to Netlify using GitHub integration.

## 📋 Prerequisites

- [x] GitHub account with repository synced
- [ ] Netlify account (free tier is sufficient)
- [ ] Supabase project set up with database migrated
- [ ] Environment variables ready

## 🚀 Deployment Steps

### Step 1: Prepare for Deployment

1. **Ensure all files are committed to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify your `.gitignore` includes**:
   ```
   .env.local
   .next
   node_modules
   ```

3. **Update Supabase redirect URLs** (important!):
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add production redirect URL: `https://your-app.netlify.app/auth/callback`

### Step 2: Deploy to Netlify

1. **Sign in to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Sign up" or "Log in"
   - Choose "Continue with GitHub"

2. **Import your project**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your AI Collective Kenya repository

3. **Configure build settings**
   
   Netlify should auto-detect Next.js, but verify:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Branch to deploy**: `main` (or your default branch)

4. **Add environment variables**
   
   Click "Show advanced" → "New variable" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://tptxvrcyssuyfdzvczxl.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   NEXT_PUBLIC_SITE_URL=https://your-app.netlify.app
   ```

   ⚠️ **Important**: Replace `your-app.netlify.app` with your actual Netlify URL after first deploy

5. **Deploy the site**
   - Click "Deploy site"
   - Wait 2-5 minutes for the build to complete
   - You'll get a random URL like `https://random-name-123456.netlify.app`

### Step 3: Configure Custom Domain (Optional)

1. **Change site name**
   - Go to Site settings → General → Site details
   - Click "Change site name"
   - Enter: `ai-collective-kenya` (or your preferred name)
   - New URL: `https://ai-collective-kenya.netlify.app`

2. **Add custom domain** (if you have one)
   - Go to Domain settings → Add custom domain
   - Enter your domain (e.g., `aicollectivekenya.org`)
   - Follow DNS configuration instructions
   - Netlify will automatically provision SSL certificate

### Step 4: Update Configuration

1. **Update Supabase URLs**
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Update Site URL to: `https://ai-collective-kenya.netlify.app`
   - Update Redirect URLs to include:
     - `https://ai-collective-kenya.netlify.app/auth/callback`
     - `https://ai-collective-kenya.netlify.app/**`

2. **Update Environment Variable**
   - Go back to Netlify → Site settings → Environment variables
   - Update `NEXT_PUBLIC_SITE_URL` to your actual Netlify URL
   - Click "Save"
   - Go to Deploys → Trigger deploy → Clear cache and deploy site

3. **Update in Code** (optional but recommended)
   - Update `COMMUNITY_LINKS.md` with production URL
   - Update `README.md` with live site link
   - Commit and push changes

### Step 5: Verify Deployment

Test these features on your live site:

- [ ] Home page loads correctly
- [ ] Registration form works
- [ ] Email confirmation is received
- [ ] Login works after email confirmation
- [ ] Dashboard loads with user data
- [ ] Admin can access admin panel
- [ ] Events, posts, partnerships display correctly
- [ ] WhatsApp, LinkedIn links work
- [ ] Privacy Policy and Terms pages load

## 🔧 Post-Deployment Configuration

### Set Up Continuous Deployment

Netlify automatically deploys when you push to GitHub:
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# Netlify automatically builds and deploys!
```

### Configure Deploy Notifications

1. Go to Site settings → Build & deploy → Deploy notifications
2. Add notifications for:
   - Deploy started
   - Deploy succeeded
   - Deploy failed
3. Choose Slack, email, or webhook

### Monitor Your Site

1. **Analytics** (Free on Netlify)
   - Go to Analytics tab
   - View page views, unique visitors, bandwidth

2. **Function Logs**
   - Go to Functions tab
   - View serverless function logs

3. **Deploy Log**
   - Go to Deploys tab
   - View build logs for debugging

## 🔐 Security Checklist

Before going live:

- [ ] All environment variables set in Netlify
- [ ] `.env.local` not committed to Git
- [ ] Supabase RLS policies active and tested
- [ ] HTTPS enabled (automatic with Netlify)
- [ ] Admin users configured in database
- [ ] Privacy Policy and Terms of Service pages live
- [ ] CORS settings reviewed in Supabase
- [ ] Rate limiting considered (Supabase project settings)

## 🐛 Troubleshooting

### Build Fails

**Check build logs**:
1. Go to Deploys → Failed deploy → Deploy log
2. Look for errors in npm install or build steps

**Common fixes**:
```bash
# Ensure package.json has all dependencies
npm install

# Test build locally
npm run build

# Check Node version matches (18+)
node --version
```

### Environment Variables Not Working

1. Verify variables are prefixed with `NEXT_PUBLIC_` for client-side
2. Trigger a new deploy after adding variables
3. Clear build cache: Deploys → Clear cache and deploy

### Authentication Not Working

1. **Check Supabase redirect URLs**:
   - Must include your Netlify URL
   - Must end with `/auth/callback`

2. **Verify Site URL**:
   - Check `NEXT_PUBLIC_SITE_URL` in Netlify environment variables
   - Should match your Netlify domain

3. **Test email confirmation**:
   - Check spam folder
   - Verify Supabase email settings
   - Check email templates in Supabase

### Page Not Found (404)

1. Check `netlify.toml` is in repository root
2. Verify redirect rules are correct
3. Clear cache and redeploy

### API Routes Not Working

For Next.js API routes on Netlify:
1. Ensure `@netlify/plugin-nextjs` is in netlify.toml
2. API routes should work automatically
3. Check function logs in Netlify dashboard

## 📊 Performance Optimization

### Enable Netlify Features

1. **Asset Optimization**
   - Site settings → Build & deploy → Post processing
   - Enable: Bundle CSS, Minify CSS, Minify JS
   - Enable: Image optimization (if needed)

2. **Forms** (if you add contact forms later)
   - Netlify Forms automatically work with HTML forms
   - Add `netlify` attribute to form tag

3. **Split Testing** (A/B testing)
   - Available on Pro plan
   - Test different versions of pages

### Caching Strategy

Our `netlify.toml` already includes:
- Static assets cached for 1 year
- Security headers
- Proper redirects

## 🔄 Rollback if Needed

If something goes wrong:

1. Go to Deploys tab
2. Find a previous successful deploy
3. Click options (•••) → Publish deploy
4. Previous version is now live

## 📈 Next Steps

After successful deployment:

1. **Share Your Site**
   - Update WhatsApp group with live link
   - Post on LinkedIn
   - Share with AI Collective Global

2. **Monitor Performance**
   - Check Netlify Analytics
   - Review Supabase usage
   - Monitor user sign-ups

3. **Iterate and Improve**
   - Gather user feedback
   - Add new features
   - Update content regularly

4. **Backup Strategy**
   - Supabase automatically backs up data
   - Keep Git history clean
   - Document major changes

## 🆘 Support

**Netlify Issues**:
- Netlify Support: https://answers.netlify.com/
- Documentation: https://docs.netlify.com/

**Supabase Issues**:
- Supabase Support: https://supabase.com/support
- Discord: https://discord.supabase.com/

**Platform Issues**:
- Check GitHub repository issues
- Contact AI Collective Kenya leadership

---

## Quick Reference

### Useful Commands

```bash
# Test build locally
npm run build
npm start

# Check for errors
npm run lint

# Update dependencies
npm update

# Force redeploy on Netlify (after environment change)
# Site settings → Build & deploy → Trigger deploy → Clear cache
```

### Important URLs

- **Netlify Dashboard**: https://app.netlify.com
- **GitHub Repo**: [Your repository URL]
- **Supabase Dashboard**: https://app.supabase.com
- **Live Site**: [Will be generated after deploy]

### Environment Variables Template

Save this for quick reference:
```env
NEXT_PUBLIC_SUPABASE_URL=https://tptxvrcyssuyfdzvczxl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdHh2cmN5c3N1eWZkenZjenhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5NzY2MzAsImV4cCI6MjA4MDU1MjYzMH0.6qLJX4zPf9Y8Gi1hd7vtzlvQq6pyGybiPDds-ZD_4rE
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
```

---

**You're ready to deploy! 🚀**

Follow these steps carefully, and your AI Collective Kenya platform will be live in minutes!
