# Complete Setup Guide

## 1. Prerequisites

Install:

- Node.js 20+ (recommended LTS)
- npm 10+
- MySQL 8.0
- Git
- A Firebase project
- A Railway account

Check versions:

```bash
node -v
npm -v
mysql --version
```

## 2. Project structure

```text
abhisek-portfolio-saas/
├── client/                 # React + Vite + Tailwind
├── server/                 # Express API
├── database/
│   └── schema.sql          # MySQL schema + seed
├── .gitignore
├── README.md
├── SETUP.md
└── railway.json
```

## 3. Create the local database

Open MySQL:

```bash
mysql -u root -p
```

Run:

```sql
CREATE DATABASE abhisek_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE abhisek_portfolio;
SOURCE /absolute/path/to/abhisek-portfolio-saas/database/schema.sql;
```

Or from your terminal:

```bash
mysql -u root -p abhisek_portfolio < database/schema.sql
```

## 4. Configure Firebase Authentication

1. Open Firebase Console.
2. Create a project.
3. Add a Web App.
4. Go to Authentication -> Sign-in method.
5. Enable Google provider.
6. Add your local development domain if Firebase asks for authorized domains.
7. Go to Project settings -> General -> Your apps -> Web app and copy the Firebase web configuration.
8. Go to Project settings -> Service accounts.
9. Generate a new private key for the Admin SDK.
10. Keep that service-account JSON private. Never commit it.

The frontend uses Google OAuth through Firebase:

```text
Browser -> Firebase Google sign-in -> Firebase ID token -> Express API
```

The backend verifies the token using Firebase Admin SDK.

## 5. Configure the server

Copy:

```bash
cp server/.env.example server/.env
```

Set:

```env
PORT=5000
NODE_ENV=development

CLIENT_URL=http://localhost:5173

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=abhisek_portfolio
DB_SSL=false

FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
```

For `FIREBASE_PRIVATE_KEY`, preserve the `\n` characters exactly as shown.

## 6. Configure the React app

Copy:

```bash
cp client/.env.example client/.env
```

Set:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Firebase web configuration is safe to expose in a browser app. Firebase service-account credentials are NOT.

## 7. Install dependencies

From the project root:

```bash
npm install --prefix server
npm install --prefix client
```

Or:

```bash
cd server && npm install
cd ../client && npm install
```

## 8. Start the API

```bash
cd server
npm run dev
```

API health check:

```text
http://localhost:5000/api/health
```

## 9. Start the React app

In another terminal:

```bash
cd client
npm run dev
```

Open:

```text
http://localhost:5173
```

## 10. Make your Firebase account an admin

The database has an `admins` table.

After signing in with Google, copy your Firebase user UID from Firebase Authentication -> Users.

Then run:

```sql
USE abhisek_portfolio;

INSERT INTO admins (firebase_uid, email, display_name)
VALUES ('YOUR_FIREBASE_UID', 'your-google-email@example.com', 'Abhisek K');
```

The API checks this table before allowing admin operations.

## 11. Admin panel

Open:

```text
http://localhost:5173/admin
```

Features:

- Dashboard
- Edit portfolio profile
- Manage projects
- Manage skills
- Manage experience
- Review client project inquiries
- Delete projects
- Sign out

## 12. Client project intake

Public route:

```text
http://localhost:5173/contact
```

A client can submit:

- Name
- Email
- Company
- Project title
- Project type
- Budget
- Timeline
- Description
- Required features

Submissions are stored in MySQL and appear in the admin dashboard.

## 13. Build for production

Frontend:

```bash
cd client
npm run build
```

Backend:

```bash
cd server
npm start
```

The frontend build is in:

```text
client/dist
```

## 14. Railway deployment

### Database

1. Create a Railway project.
2. Add a MySQL database/service.
3. Wait for the database to provision.
4. Copy the Railway MySQL connection values into your server variables.

Depending on Railway's current UI, variables may be exposed as:

```env
MYSQLHOST
MYSQLPORT
MYSQLUSER
MYSQLPASSWORD
MYSQLDATABASE
```

The server supports these as fallbacks.

### API service

Create a Railway service from this repository and set the service root directory to:

```text
server
```

Set:

```env
NODE_ENV=production
CLIENT_URL=https://YOUR-FRONTEND-DOMAIN

DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_USER=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
DB_NAME=${{MySQL.MYSQLDATABASE}}
DB_SSL=true

FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
```

Run the database schema against Railway MySQL once:

```bash
mysql -h RAILWAY_HOST -P RAILWAY_PORT -u RAILWAY_USER -p RAILWAY_DATABASE < database/schema.sql
```

### Frontend service

Create another Railway service using the `client` directory.

Set:

```env
VITE_API_URL=https://YOUR-API-DOMAIN/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Build command:

```bash
npm run build
```

Start command:

```bash
npm run preview -- --host 0.0.0.0 --port $PORT
```

For a larger deployment, serve `client/dist` with a dedicated static hosting/CDN service.

## 15. Firebase production domains

Add your deployed frontend domain to Firebase Authentication authorized domains.

For example:

```text
your-portfolio.up.railway.app
```

Also configure the OAuth provider's authorized domain/redirect requirements if Firebase presents them.

## 16. CORS

Set:

```env
CLIENT_URL=https://your-frontend-domain.example
```

Do not use `*` in production.

## 17. Security checklist

Before production:

- Use a strong MySQL password.
- Never commit `.env`.
- Never commit Firebase service-account JSON.
- Restrict Firebase OAuth authorized domains.
- Use HTTPS.
- Keep admin access based on Firebase UID + database allow-list.
- Consider adding rate limiting and a transactional email provider.
- Add backups for production MySQL.
- Rotate Firebase service-account keys if they are ever exposed.
- Add audit logging if multiple admins will manage content.
- Consider image/object storage for project screenshots.

## 18. API endpoints

Public:

```text
GET  /api/portfolio
GET  /api/projects
GET  /api/projects/:id
POST /api/inquiries
GET  /api/skills
GET  /api/experience
```

Protected admin:

```text
GET    /api/admin/dashboard
PUT    /api/admin/profile
POST   /api/admin/projects
PUT    /api/admin/projects/:id
DELETE /api/admin/projects/:id
POST   /api/admin/skills
DELETE /api/admin/skills/:id
POST   /api/admin/experience
DELETE /api/admin/experience/:id
GET    /api/admin/inquiries
PATCH  /api/admin/inquiries/:id
```

The admin endpoints require:

```text
Authorization: Bearer <Firebase ID token>
```

## 19. Common troubleshooting

### "Admin access denied"

The signed-in Firebase UID is not in the `admins` table.

Run:

```sql
SELECT * FROM admins;
```

Then insert your UID.

### Firebase login fails

Check:

- Google provider is enabled.
- Firebase authorized domains include your frontend host.
- `VITE_FIREBASE_*` values are correct.
- Browser console for Firebase errors.

### API cannot connect to MySQL

Check:

- MySQL is running.
- Port is usually `3306`.
- Database exists.
- Credentials match `server/.env`.

### Production DB SSL issue

Railway/MySQL deployments can require TLS. Set:

```env
DB_SSL=true
```

If your specific Railway MySQL endpoint provides a CA certificate, add the appropriate CA configuration to the DB client before deployment.

## 20. Suggested next production upgrades

- Image uploads using S3/Cloudinary
- Rich project editor
- Blog/CMS module
- Contact email notifications
- Analytics dashboard
- Role-based admin permissions
- API rate limiting
- CSRF strategy if using cookies in the future
- Automated migrations with Prisma/Knex
- Automated tests and CI/CD
