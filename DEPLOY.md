# Deployment Guide - Render.com

## Quick Deploy (5 minutes)

### Option 1: Using Render Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   cd /tmp/clinic-system
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Render.com:**
   - Visit: https://render.com
   - Sign up with GitHub
   - Click "New +" → "Blueprint"
   - Connect your GitHub repo
   - Render will auto-detect `render.yaml` and deploy everything

3. **Wait 5-10 minutes** for deployment to complete

4. **Get your URL:**
   - Frontend: `https://clinic-frontend.onrender.com`
   - Backend: `https://clinic-backend.onrender.com`

### Option 2: Manual Setup (Alternative)

If you prefer manual control:

#### 1. Create PostgreSQL Database
- Dashboard → New → PostgreSQL
- Name: `clinic-db`
- Plan: Free
- Copy the **Internal Database URL**

#### 2. Deploy Backend
- Dashboard → New → Web Service
- Connect GitHub repo
- Settings:
  - **Name:** clinic-backend
  - **Root Directory:** backend
  - **Build Command:** `npm install && npm run build`
  - **Start Command:** `npm start`
  - **Environment Variables:**
    - `DATABASE_URL`: [Paste Internal Database URL]
    - `JWT_SECRET`: [Any random string]
    - `NODE_ENV`: production

#### 3. Deploy Frontend
- Dashboard → New → Static Site
- Connect GitHub repo
- Settings:
  - **Name:** clinic-frontend
  - **Root Directory:** frontend
  - **Build Command:** `npm install && npm run build`
  - **Publish Directory:** dist

## After Deployment

### Initialize Database
SSH into backend service and run:
```bash
npm run migrate
```

Or run the init script manually through Render shell.

### Update Frontend API URL
The frontend needs to know the backend URL. Update `frontend/src/services/api.ts`:
```typescript
const api = axios.create({
  baseURL: 'https://YOUR-BACKEND-URL.onrender.com/api',
});
```

## Free Tier Limitations
- Backend sleeps after 15 min of inactivity (takes 30s to wake up)
- 750 hours/month free
- Perfect for testing with your friend!

## Troubleshooting
- Check logs in Render dashboard
- Ensure DATABASE_URL is set correctly
- Make sure backend is running before frontend

Your friend will be able to access it 24/7 at the Render URL! 🚀
