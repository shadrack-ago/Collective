# Pre-Deployment Checklist ✅

Before deploying to Netlify, make sure you've completed everything on this list.

## 🗄️ Database Setup

- [ ] Supabase project created
- [ ] Database migration run successfully (`20240101000000_initial_schema.sql`)
- [ ] All 4 tables created (profiles, events, posts, partnerships)
- [ ] RLS policies enabled and tested
- [ ] Triggers and functions working
- [ ] Test user account created
- [ ] First admin user configured (set `is_admin = true`)

**Verify with this SQL:**
```sql
-- Should return 4
SELECT COUNT(*) FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'events', 'posts', 'partnerships');

-- Should return 16  
SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public';
```

## 🔐 Authentication Setup

- [ ] Email provider enabled in Supabase
- [ ] Email confirmations enabled
- [ ] Site URL set to development: `http://localhost:3000`
- [ ] Redirect URLs configured:
  - [ ] `http://localhost:3000/auth/callback`
  - [ ] `http://localhost:3000/**`
- [ ] Test registration works
- [ ] Confirmation email received
- [ ] Test login works after confirmation
- [ ] Email templates customized (optional)

## 📝 Content & Legal

- [ ] Privacy Policy page created and accessible (`/privacy`)
- [ ] Terms of Service page created and accessible (`/terms`)
- [ ] Consent checkbox on registration form working
- [ ] Footer links to Privacy and Terms added
- [ ] WhatsApp group link updated: https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J
- [ ] LinkedIn link verified
- [ ] About content reviewed and accurate

## 🎨 Platform Features

- [ ] Home page displays correctly
- [ ] Registration form working with consent
- [ ] Login form working
- [ ] Email verification flow working
- [ ] Dashboard accessible after login
- [ ] Events display on dashboard
- [ ] Community links (WhatsApp, LinkedIn) working
- [ ] Admin panel accessible for admin users
- [ ] Create event form working
- [ ] Create post form working
- [ ] Create partnership form working
- [ ] Logout functionality working

## 🔧 Environment Variables

- [ ] `.env.local` file created locally
- [ ] Supabase URL added
- [ ] Supabase anon key added
- [ ] Site URL configured
- [ ] `.env.local` added to `.gitignore`
- [ ] Never committed sensitive data to Git

**Your current environment variables:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://tptxvrcyssuyfdzvczxl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📦 Code Quality

- [ ] All dependencies installed (`npm install`)
- [ ] Project builds successfully (`npm run build`)
- [ ] No critical errors in console
- [ ] Test in dev mode (`npm run dev`)
- [ ] All pages load without 404s
- [ ] No broken links
- [ ] Images/icons display correctly

## 🔒 Security Review

- [ ] No API keys hardcoded in source code
- [ ] `.env.local` not committed to Git
- [ ] RLS policies tested and working
- [ ] Admin routes protected
- [ ] User data properly scoped
- [ ] Password requirements enforced (min 6 characters)
- [ ] HTTPS will be enabled (automatic with Netlify)

## 📱 Testing

### Test as Regular User
- [ ] Can register new account
- [ ] Receives confirmation email
- [ ] Can login after confirmation
- [ ] Can view dashboard
- [ ] Can see events
- [ ] Can see partnerships
- [ ] Can access community links
- [ ] CANNOT access admin panel
- [ ] Can logout

### Test as Admin User
- [ ] Can access admin panel
- [ ] Can create events
- [ ] Can edit events
- [ ] Can delete events
- [ ] Can create posts
- [ ] Can publish/unpublish posts
- [ ] Can create partnerships
- [ ] Can edit partnerships

## 🌐 GitHub Preparation

- [ ] All changes committed
- [ ] `.gitignore` properly configured
- [ ] Repository synced to GitHub
- [ ] Branch is up to date
- [ ] No sensitive files in repository

**Quick check:**
```bash
git status  # Should be clean
git log --oneline -5  # See recent commits
```

## 📋 Netlify Configuration

- [ ] `netlify.toml` file exists in root
- [ ] Build command: `npm run build`
- [ ] Publish directory: `.next`
- [ ] Node version: 18
- [ ] Next.js plugin configured

## 📚 Documentation

- [ ] README.md updated
- [ ] DEPLOYMENT.md reviewed
- [ ] SUPABASE_SETUP.md reviewed
- [ ] COMMUNITY_LINKS.md has correct links
- [ ] Contact information updated where needed

## 🚀 Ready for Deployment

Once all boxes are checked:

1. **Final Git Push**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Follow `DEPLOYMENT.md` step by step
   - Set environment variables in Netlify
   - Update Supabase redirect URLs with Netlify domain
   - Test thoroughly after deployment

3. **Post-Deployment**
   - [ ] Test all features on live site
   - [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL
   - [ ] Redeploy after URL update
   - [ ] Share with community!

## ⚠️ Common Issues to Check

### Before deployment, verify:
- No `console.log` statements in production code (optional cleanup)
- No TODO comments for critical features
- Error handling in place for forms
- Loading states for async operations
- Mobile responsiveness tested
- Cross-browser compatibility (Chrome, Firefox, Safari)

### Red flags (don't deploy if these exist):
- ❌ Database migration not run
- ❌ Admin access not working
- ❌ Registration flow broken
- ❌ Environment variables missing
- ❌ Build errors
- ❌ Critical features not working

## 📞 Support During Deployment

If you encounter issues:

1. **Check build logs** in Netlify deploy console
2. **Review error messages** carefully
3. **Consult DEPLOYMENT.md** troubleshooting section
4. **Test locally first** with `npm run build && npm start`
5. **Verify environment variables** are set correctly
6. **Check Supabase logs** for auth issues

## 🎉 After Successful Deployment

- [ ] Announce to WhatsApp group
- [ ] Post on LinkedIn
- [ ] Update AI Collective Global about Kenya chapter
- [ ] Document your production URL
- [ ] Set up monitoring/analytics
- [ ] Plan first event!

---

## Quick Commands Reference

```bash
# Test build locally
npm run build

# Test production build locally
npm run build && npm start

# Check Git status
git status

# Push to GitHub
git add .
git commit -m "Your message"
git push origin main

# Update dependencies (if needed)
npm update

# Check for outdated packages
npm outdated
```

---

**Status**: ⏳ In Progress → ✅ Ready for Deployment

Once everything is checked off, you're ready to deploy! 🚀

Good luck with the launch of AI Collective Kenya! 🇰🇪
