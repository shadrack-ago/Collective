# AI Collective Kenya - Community Links & Configuration

## 🔗 Official Links

### Social Media & Communication
- **WhatsApp Group**: https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J
- **LinkedIn**: https://linkedin.com/company/aicollective
- **Global AI Collective**: https://www.aicollective.com/

### Platform Links (After Deployment)
- **Production URL**: TBD (update after deployment)
- **Site URL**: `http://localhost:3000` (development)

## 📝 Where These Links Are Used

### WhatsApp Group Link
Located in:
- `app/page.tsx` - Line ~108 (Home page CTA section)
- `app/dashboard/page.tsx` - Line ~191 (Dashboard community section)

### LinkedIn Link
Located in:
- `app/page.tsx` - Line ~102 (Home page CTA section)
- `app/dashboard/page.tsx` - Line ~185 (Dashboard community section)

### Global Website Link
Located in:
- `app/page.tsx` - Line ~114 (Home page CTA section)
- `app/dashboard/page.tsx` - Line ~197 (Dashboard community section)
- `app/layout.tsx` - Metadata references

## 🔧 How to Update Links

### Update WhatsApp Link
```typescript
// Find and replace in both files:
// OLD: href="https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J"
// NEW: href="your-new-whatsapp-link"

// Files to update:
// 1. app/page.tsx
// 2. app/dashboard/page.tsx
```

### Update LinkedIn Link
```typescript
// Current: https://linkedin.com/company/aicollective
// Update in: app/page.tsx and app/dashboard/page.tsx
```

### Add More Social Links

To add Twitter/X, Instagram, etc.:

```typescript
// In app/page.tsx and app/dashboard/page.tsx, add:
<Link href="https://twitter.com/your-handle" target="_blank">
  <Button variant="outline" size="lg" className="gap-2">
    <Twitter className="h-5 w-5" /> {/* Import from lucide-react */}
    Twitter
  </Button>
</Link>
```

## 📊 Admin Configuration

### Admin Emails
Set in `.env.local`:
```env
ADMIN_EMAILS=your-email@example.com,another-admin@example.com
```

### Supabase Configuration
```env
NEXT_PUBLIC_SUPABASE_URL=https://tptxvrcyssuyfdzvczxl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎯 Quick Actions

### Add yourself as admin
```sql
-- Run in Supabase SQL Editor
UPDATE profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

### Update site metadata
Edit `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'AI Collective Kenya',
  description: 'Your updated description here',
}
```

### Change WhatsApp Group (if group changes)
1. Get new WhatsApp invite link
2. Update in `app/page.tsx` (line ~108)
3. Update in `app/dashboard/page.tsx` (line ~191)
4. Update this file

## 📱 Social Media Strategy

### Recommended Additions
Consider adding these platforms:
- **Twitter/X**: For updates and engagement
- **Instagram**: For event photos
- **YouTube**: For recorded sessions
- **Discord**: For async discussions
- **Telegram**: As WhatsApp alternative

### Implementation Template
```typescript
// Add to your Button import from lucide-react
import { Twitter, Instagram, Youtube } from 'lucide-react'

// Add to the community links section:
<Link href="https://twitter.com/..." target="_blank">
  <Button variant="outline" size="lg" className="gap-2">
    <Twitter className="h-5 w-5" />
    Twitter
  </Button>
</Link>
```

## 🔄 Update Checklist

When updating community links:
- [ ] Update `app/page.tsx`
- [ ] Update `app/dashboard/page.tsx`
- [ ] Update this file (COMMUNITY_LINKS.md)
- [ ] Update README.md if needed
- [ ] Test links work correctly
- [ ] Verify links open in new tab
- [ ] Update any marketing materials

## 📞 Contact Information

### For Platform Issues
- Create GitHub issue in your repository
- Contact platform maintainer

### For Community Questions
- Post in WhatsApp group
- Reach out on LinkedIn
- Email: TBD (add your community email)

## 🌍 Kenya Chapter Info

### Location
- Primary City: Nairobi
- Meeting Hub: TBD (add your usual venue)

### Event Schedule
- Regular meetups: TBD (add frequency)
- Workshops: TBD
- Hackathons: TBD

### Community Guidelines
Link to guidelines: TBD (create and add link)

---

**Last Updated**: December 2024
**Maintained by**: AI Collective Kenya Leadership
