# Pashe Achi - Social Development Events Platform

**Live site:** https://YOUR-VERCEL-URL.vercel.app

Pashe Achi ("I am beside you") is a community platform where people create, join and track
social service events: clothes distribution, tree plantation, blood donation, clean-ups and more.

## Features
- Email/password and Google login with Better Auth. Password rule: uppercase + lowercase + 6 or more characters
- JWT-protected Express API; only the creator can update or delete their own events
- Create events with validation. Past dates are rejected on both the client and the server
- Upcoming events page with search and event-type filter; past events never appear
- One-click Join Event with duplicate protection, plus a Joined Events page sorted by date
- Manage Events page to update or delete your own events
- Light/dark theme toggle, loading skeletons, profile view and update
- Fully responsive layout, toast notifications instead of browser alerts

## Tech stack
Next.js (App Router), TypeScript, Tailwind CSS, DaisyUI, Better Auth (MongoDB adapter), JWT,
Express.js, MongoDB.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in the values
3. Start the API server (separate repo) on port 5000
4. `npm run dev`
