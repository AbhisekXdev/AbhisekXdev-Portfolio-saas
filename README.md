# Abhisek Portfolio SaaS

A production-oriented portfolio CMS/SaaS starter with:

- React + Vite + Tailwind CSS frontend
- Node.js + Express REST API
- MySQL 8.0 local development and Railway MySQL-compatible production database
- Firebase Authentication with Google OAuth
- Firebase ID-token verification on the Express API
- Admin dashboard for profile, skills, experience, projects, and inquiry management
- Public responsive portfolio
- Client project-intake form
- Protected admin routes
- SQL schema + seed data
- Railway deployment configuration

## Architecture

```text
React/Vite/Tailwind
       |
       | Firebase Auth (Google OAuth)
       v
Express REST API ---- MySQL 8.0 / Railway MySQL
       |
       +---- verifies Firebase ID token
       |
       +---- Admin CRUD / Client inquiries
```

## Important

This repository is generated from the portfolio/application specification supplied for this project. It is a complete starter implementation, not a copy of an earlier application codebase.

See `SETUP.md` for the complete local + Firebase + Railway setup.
