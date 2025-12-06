# AI Collective Kenya - Community Platform

A modern community platform built for AI Collective Kenya, featuring user authentication, event management, content publishing, and partnership showcasing.

## 🚀 Features

- **User Authentication** - Email-based registration with email confirmation via Supabase Auth
- **User Dashboard** - Personalized dashboard showing upcoming events and community links
- **Event Management** - Create and manage community events with registration links
- **Content Management** - Admin panel for creating posts and announcements
- **Partnership Showcase** - Display organizational partnerships
- **Admin Panel** - Full content management system for administrators
- **Responsive Design** - Beautiful, modern UI built with TailwindCSS and shadcn/ui

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (Radix UI)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ and npm
- A Supabase account ([sign up here](https://supabase.com))

## 🏁 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to be set up (this takes ~2 minutes)
3. Go to Project Settings > API to find your credentials

### 3. Create Database Tables

1. In your Supabase project, navigate to the SQL Editor
2. Copy the entire contents of `supabase/schema.sql`
3. Paste and run it in the SQL Editor
4. This will create all necessary tables, policies, and triggers

### 4. Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_EMAILS=your-email@example.com
```

### 5. Configure Email Authentication

1. In Supabase Dashboard, go to Authentication > Settings
2. Under **Email Auth**, enable:
   - Enable email confirmations
   - Confirm email
3. Set **Site URL** to: `http://localhost:3000` (development) or your production URL
4. Add redirect URLs:
   - `http://localhost:3000/auth/callback`
   - Your production URL + `/auth/callback`

### 6. Set Up Admin Users

After creating your first user account:

1. Go to Supabase Dashboard > Authentication > Users
2. Find your user and copy the UUID
3. Go to Table Editor > profiles
4. Find your profile row and set `is_admin` to `true`

Alternatively, run this SQL in the SQL Editor (replace with your email):

```sql
UPDATE profiles 
SET is_admin = true 
WHERE email = 'your-email@example.com';
```

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ai-collective-kenya/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── events/         # Event management
│   │   ├── posts/          # Post management
│   │   └── partnerships/   # Partnership management
│   ├── auth/               # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify-email/
│   │   └── callback/
│   ├── dashboard/          # User dashboard
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── supabase/           # Supabase client utilities
│   └── utils.ts            # Utility functions
├── types/
│   └── supabase.ts         # TypeScript types
├── supabase/
│   └── schema.sql          # Database schema
├── middleware.ts           # Auth middleware
└── README.md
```

## 🔐 Authentication Flow

1. User registers with email and password
2. Confirmation email is sent
3. User clicks confirmation link
4. User is redirected to dashboard
5. Profile is automatically created via database trigger

## 👥 User Roles

- **Regular Users**: Can view events, posts, and partnerships
- **Admin Users**: Full access to create/edit/delete all content

## 🎨 Customization

### Update Community Links

Current community links:
- **WhatsApp Group**: https://chat.whatsapp.com/H6YPQcfWQvBG81rCyKEL3J
- **LinkedIn**: https://linkedin.com/company/aicollective
- **Global Website**: https://www.aicollective.com/

To update these links, edit:
- `app/page.tsx` (home page)
- `app/dashboard/page.tsx` (user dashboard)

### Add Event Images

To add event images:
1. Set up Supabase Storage
2. Create a bucket called `events`
3. Enable public access
4. Upload images and use the public URLs in the `image_url` field

### Customize Branding

Update the site name, colors, and metadata in:
- `app/layout.tsx` - Site metadata
- `tailwind.config.ts` - Color scheme
- `app/globals.css` - Custom styles

## 📝 Common Tasks

### Adding a New Event

1. Log in as admin
2. Go to Admin Panel > Manage Events
3. Click "Create Event"
4. Fill in event details
5. Submit

### Creating a Blog Post

1. Log in as admin
2. Go to Admin Panel > Manage Posts
3. Click "Create Post"
4. Write content
5. Check "Publish immediately" if ready
6. Submit

### Adding a Partnership

1. Log in as admin
2. Go to Admin Panel > Manage Partnerships
3. Click "Add Partnership"
4. Fill in organization details
5. Submit

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env.local`
5. Deploy

Update Supabase redirect URLs to include your production URL.

### Update Production URLs

Don't forget to:
1. Update `NEXT_PUBLIC_SITE_URL` to your production domain
2. Add production URLs to Supabase redirect URLs
3. Update email templates in Supabase if needed

## 🤝 Contributing

This is a community platform for AI Collective Kenya. Contributions are welcome!

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Contact AI Collective Kenya leadership

## 📄 License

This project is private and maintained by AI Collective Kenya.

---

**Built with ❤️ for the AI Collective Kenya community**
