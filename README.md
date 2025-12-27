# Zeina's Corner

A vintage-styled personal website built with Next.js, featuring blog posts, Telegram integration, and a warm nostalgic aesthetic inspired by classic storefronts.

## Features

- **Vintage Storefront Design**: Rich teal and cream color palette with decorative elements
- **Blog System**: Create and manage blog posts with Prisma
- **Telegram Integration**: Automatically fetches and displays latest posts from Telegram channel
- **Admin Panel**: Manage blog content
- **Contact Form**: Get in touch with visitors
- **Responsive Design**: Mobile-first approach with beautiful layouts

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3 (for Telegram fetching)
- PostgreSQL database (for production) or SQLite (for development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your credentials:
   - `DATABASE_URL`: Your database connection string
   - `TELEGRAM_API_ID`: Get from https://my.telegram.org
   - `TELEGRAM_API_HASH`: Get from https://my.telegram.org
   - `CRON_SECRET`: Random secret string for cron authentication

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Telegram Integration

The site automatically fetches posts from your Telegram channel every 30 minutes via Vercel Cron.

### Manual Telegram Fetch

To manually fetch Telegram posts:
```bash
python scripts/fetch-telegram.py
```

### Vercel Deployment Setup

When deploying to Vercel:

1. Add all environment variables from `.env` to your Vercel project settings
2. Make sure to set `CRON_SECRET` in Vercel environment variables
3. The cron job will automatically run every 30 minutes to fetch new Telegram posts
4. Monitor cron job execution in Vercel dashboard

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin panel
│   ├── api/            # API routes (including Telegram refresh)
│   ├── blog/           # Blog pages
│   └── page.tsx        # Homepage
├── components/
│   ├── header.tsx      # Navigation header
│   └── telegram-hero.tsx # Telegram posts display
└── lib/
    ├── prisma.ts       # Database client
    └── telegram-cached.ts # Telegram data loader
```

## Color Palette

The site uses a vintage storefront aesthetic with:
- **Vintage Teal**: #5F9EA0 and variants
- **Warm Cream**: #f5e6d3 and variants

All colors are defined as CSS custom properties in `src/app/globals.css`.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

Private project for personal use.
