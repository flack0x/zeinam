# Mom's Corner Blog - Project Context

## Overview
A modern Next.js blog website featuring dual content sources:
1. **Database blog posts** - Traditional long-form articles stored in SQLite via Prisma
2. **Telegram channel integration** - Real-time updates from "observer_5" Telegram channel

## Tech Stack
- **Frontend**: Next.js 16.1.1 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4, custom stone color palette
- **Database**: Prisma ORM + SQLite (dev.db)
- **Fonts**: Google Fonts (Playfair Display serif + Lato sans-serif)
- **Icons**: lucide-react
- **Telegram**: Telethon (Python) for official API access

## Project Structure
```
Mama_Website/
├── prisma/
│   ├── schema.prisma          # Database schema (Post model)
│   └── dev.db                 # SQLite database
├── scripts/
│   ├── fetch-telegram.py      # Python script using Telethon API
│   └── test-telegram.js       # Node test script (deprecated)
├── public/
│   └── telegram-posts.json    # Cached Telegram data
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page (Telegram + Blog feed)
│   │   ├── layout.tsx         # Root layout
│   │   ├── about/             # About page
│   │   ├── admin/             # Admin panel (password protected)
│   │   ├── blog/[slug]/       # Dynamic blog post pages
│   │   └── contact/           # Contact page
│   ├── components/
│   │   ├── telegram-hero.tsx  # Telegram feed component ⭐
│   │   ├── header.tsx         # Navigation
│   │   └── modal.tsx          # Reusable modal
│   └── lib/
│       ├── telegram-cached.ts # Reads from cached JSON ⭐
│       ├── telegram.ts        # Old HTML scraper (deprecated)
│       └── prisma.ts          # Prisma client singleton
└── .env                       # Environment variables
```

## Database Schema
**Post Model:**
- `id` (uuid, primary key)
- `title` (string)
- `slug` (string, unique)
- `content` (string, HTML)
- `imageUrl` (string, optional)
- `published` (boolean, default false)
- `createdAt` / `updatedAt` (timestamps)

## Telegram Integration

### Current Implementation (Recommended)
**Using Official Telegram API via Telethon:**
1. Python script (`scripts/fetch-telegram.py`) fetches posts using Telethon
2. Saves to `public/telegram-posts.json`
3. Next.js reads from cached JSON via `telegram-cached.ts`
4. Run manually or via cron: `python scripts/fetch-telegram.py`

**Credentials Required:**
- `TELEGRAM_API_ID` - Get from https://my.telegram.org
- `TELEGRAM_API_HASH` - Get from https://my.telegram.org
- First run requires phone authentication (creates `session.session` file)

### Legacy Implementation (Deprecated)
- HTML scraping from `https://t.me/s/observer_5`
- Located in `src/lib/telegram.ts`
- Unreliable: wrong post ordering, mismatched images
- **DO NOT USE** - kept for reference only

## Environment Variables
```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="mama"                    # Default admin password
TELEGRAM_API_ID=38985600                 # From my.telegram.org
TELEGRAM_API_HASH=a6f0a65520198d190b3519f0bc6847d7
```

## Key Features

### Home Page (src/app/page.tsx)
1. **Telegram Section** - Shows 3 latest posts:
   - Hero post (large card)
   - 2 secondary posts (grid)
   - Posts WITH images: Show image thumbnail with overlay
   - Posts WITHOUT images: Clean text card (NO decorative thumbnail)
2. **Blog Feed** - Database posts with cover images and previews

### Admin Panel (src/app/admin/)
- Route: `/admin`
- Password auth via cookies
- Create new blog posts
- Auto-generates slugs
- Publishes immediately

### SEO Features
- Dynamic metadata for blog posts
- Open Graph tags
- JSON-LD structured data
- Auto-generated sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)

## Design System
- **Color Palette**: Stone tones (warm, neutral)
- **Typography**: Playfair Display (headings) + Lato (body)
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Telegram Cards**:
  - With media: Image + title overlay + gradient
  - Text-only: No thumbnail, clean card with date + "Text Update" badge
  - Accent colors: Rose & Indigo gradients for visual interest

## Development Commands
```bash
# Start dev server
npm run dev

# Fetch Telegram posts (first time - requires phone auth)
python scripts/fetch-telegram.py

# Database operations
npx prisma studio          # View/edit database
npx prisma migrate dev     # Run migrations
npx prisma generate        # Regenerate Prisma client

# Build for production
npm run build
npm start
```

## Important Notes
1. **Telegram posts are cached** - Run Python script to update
2. **Admin password** - Change in .env (default: "mama")
3. **Session file** - `session.session` stores Telegram auth (don't commit!)
4. **Image handling** - Remote images allowed from all HTTPS sources
5. **Revalidation** - ISR with 60-second cache on home page

## Common Tasks

### Update Telegram Posts
```bash
cd C:\Users\PC\Desktop\Mama_Website
python scripts/fetch-telegram.py
# Refresh browser to see changes
```

### Create Blog Post
1. Go to `/admin`
2. Login (password: "mama" or custom from .env)
3. Fill form and submit
4. Redirects to home with new post

### Change Admin Password
Edit `.env`:
```env
ADMIN_PASSWORD="your_secure_password_here"
```

## Troubleshooting

### Telegram fetch fails
- Check API credentials in `.env`
- Delete `session.session` and re-authenticate
- Verify channel name is correct ("observer_5")

### Images not loading
- Check `next.config.ts` allows remote image domains
- Verify image URLs are HTTPS

### Database issues
- Run `npx prisma studio` to inspect
- Check `DATABASE_URL` in `.env`
- Run `npx prisma generate` if schema changed

## Future Improvements
- [ ] Automate Telegram fetching (cron job or webhook)
- [ ] Add image upload for blog posts
- [ ] Implement user registration
- [ ] Add comments system
- [ ] Deploy to production (Vercel recommended)
- [ ] Set up CI/CD pipeline

## Project Status
✅ **Completed:**
- Next.js setup with App Router
- Prisma database integration
- Admin panel with authentication
- Blog post CRUD
- Telegram API integration (Telethon)
- Clean UI for text-only posts
- SEO optimization
- Responsive design

🎨 **Design Philosophy:**
- Clean, minimal, elegant
- Warm stone color palette
- Typography-focused
- Mobile-first responsive
- Subtle animations and transitions

---

**Created:** December 2025
**Last Updated:** December 25, 2025
**Status:** Production Ready ✨
