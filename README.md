# 🌊 The Whimsical Water Park — Registration System

Registration system for **Sunshine Wave Water Park** at One Bangkok Park, April 10-15, 2026.

## Tech Stack
- **Next.js 14** (App Router) + TypeScript
- **Vercel Postgres** — Database
- **NextAuth.js** — Admin authentication
- **Resend** — Email confirmations
- **TailwindCSS** — Styling

## Features
- 📝 Multi-step registration form (PDPA consent → Info → Date/Time → Rules)
- 📅 Date & time slot selection with live capacity display
- 🔒 Max 30 registrations per slot, max 2 rounds per member per day
- 📧 Email confirmation after registration
- 🔐 Admin dashboard with login (view registrations by date)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
Copy `.env.example` to `.env.local` and fill in values:
```bash
cp .env.example .env.local
```

Required variables:
- `POSTGRES_URL` — Vercel Postgres connection string
- `NEXTAUTH_SECRET` — Random secret for NextAuth (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — Your app URL (e.g. `http://localhost:3000`)
- `ADMIN_USERNAME` — Admin login username
- `ADMIN_PASSWORD` — Admin login password
- `RESEND_API_KEY` — Resend API key for emails
- `EMAIL_FROM` — Sender email address

### 3. Setup database
```bash
npm run db:setup
```

### 4. Run locally
```bash
npm run dev
```

### 5. Deploy to Vercel
1. Push to GitHub
2. Import project in Vercel
3. Add Vercel Postgres storage
4. Set environment variables
5. Deploy

## Routes
| Route | Description |
|-------|-------------|
| `/` | Registration form |
| `/thank-you` | Confirmation page |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |

## Admin Access
Default credentials: `admin` / `changeme123` (change via env vars)
