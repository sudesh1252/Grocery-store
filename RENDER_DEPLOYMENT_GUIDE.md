# 🚀 Render.com Deployment Guide - Shree Grocery Store Backend

## ✅ FIXED: npm Install Error

**Problem 1**: npm install was failing on Render with error: `npm error A complete log of this run can be found in: /root/.npm/_logs/...`

**Solution 1**: Updated `.npmrc` file to include SSL and registry configuration needed for deployment.

**Problem 2**: Docker build failing with `npm ci` error: `failed to solve: process "/bin/sh -c npm ci --only=production" did not complete successfully: exit code: 1`

**Solution 2**: 
- Updated `Dockerfile` to use `npm install` instead of `npm ci`
- Added SSL configuration in Dockerfile
- Created `.dockerignore` file to optimize build
- Created `render.yaml` for native Node.js deployment (alternative to Docker)

---

## 📋 Step-by-Step Deployment Instructions

### Step 1: Push Updated Code to GitHub

The `.npmrc`, `Dockerfile`, and `render.yaml` files have been updated. Now push the changes:

```bash
cd "c:\Users\kirol\OneDrive\Desktop\Grocery store"
git add backend/.npmrc backend/src/server.js backend/Dockerfile backend/.dockerignore backend/render.yaml
git commit -m "Fix: Docker build and npm install for Render deployment"
git push origin main
```

### Step 2: Configure Render Web Service

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click "New +" → "Web Service"**
3. **Connect Your Repository** (if not already connected)
4. **Configure the service**:

#### Basic Settings:
- **Name**: `shree-grocery-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., Singapore, Oregon)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANT**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node src/server.js`

#### Instance Type:
- **Free** (for testing) or **Starter** (for production)

### Step 3: Add Environment Variables

Click **"Advanced"** and add these environment variables:

| Variable Name | Value |
|--------------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `DB_HOST` | `tramway.proxy.rlwy.net` |
| `DB_PORT` | `53361` |
| `DB_USER` | `root` |
| `DB_PASSWORD` | `BEoZLEtEaLGSqIrVEbeJlGIdgKkTEqfw` |
| `DB_NAME` | `railway` |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-this-in-production-2024` |
| `CLIENT_URL` | `http://localhost:3000` (update later with frontend URL) |

⚠️ **IMPORTANT**: 
- Make sure `DB_PORT` is set to `53361` (Railway MySQL port)
- Keep `JWT_SECRET` secure and unique
- Update `CLIENT_URL` after deploying frontend

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Run `npm install` in the `backend` folder
   - Start the server with `node src/server.js`
3. Wait 2-5 minutes for deployment to complete

### Step 5: Verify Deployment

Once deployed, you'll get a URL like: `https://shree-grocery-backend.onrender.com`

Test these endpoints:

1. **Root endpoint**:
   ```
   https://your-app-name.onrender.com/
   ```
   Should return: Welcome message with API documentation

2. **Health check**:
   ```
   https://your-app-name.onrender.com/health
   ```
   Should return: Server health status

3. **Test login** (using Postman or curl):
   ```bash
   curl -X POST https://your-app-name.onrender.com/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@shreegrocery.com","password":"admin123"}'
   ```

---

## 🔧 Troubleshooting

### Error: "npm ci" failed with exit code 1

**Symptoms**: Build fails with `failed to solve: process "/bin/sh -c npm ci --only=production" did not complete successfully`

**Cause**: Render detected Dockerfile and tried to use `npm ci` which requires exact package-lock.json match

**Solution**: ✅ Already fixed in updated Dockerfile - uses `npm install` instead

**Alternative**: Delete Dockerfile and let Render use native Node.js build (recommended for simpler deployments)

### If Build Still Fails:

1. **Check Build Logs** in Render dashboard
2. **Verify Root Directory** is set to `backend`
3. **Check Node Version**: Render uses Node 18+ by default (compatible)

### If Database Connection Fails:

1. **Verify Railway MySQL is running**
2. **Check all DB_* environment variables** are correct
3. **Test Railway connection** from local machine first:
   ```bash
   mysql -h tramway.proxy.rlwy.net -P 53361 -u root -p railway
   ```

### If CORS Errors Occur:

1. **Update CLIENT_URL** environment variable with your frontend URL
2. **Redeploy** the service (Render auto-redeploys on env changes)

---

## 📊 Database Setup (Railway MySQL)

Your Railway MySQL is already configured:

- **Host**: `tramway.proxy.rlwy.net`
- **Port**: `53361`
- **User**: `root`
- **Password**: `BEoZLEtEaLGSqIrVEbeJlGIdgKkTEqfw`
- **Database**: `railway`
- **Public URL**: `mysql://root:BEoZLEtEaLGSqIrVEbeJlGIdgKkTEqfw@tramway.proxy.rlwy.net:53361/railway`

The backend will automatically:
- Connect to Railway MySQL on startup
- Create tables if they don't exist
- Sync database models

---

## 🎯 Next Steps After Backend Deployment

1. **Update Frontend Configuration**:
   - Update `REACT_APP_API_URL` in frontend to point to Render URL
   - Example: `https://shree-grocery-backend.onrender.com`

2. **Deploy Frontend** (Options):
   - **Vercel** (Recommended for React): https://vercel.com
   - **Netlify**: https://netlify.com
   - **Render Static Site**: https://render.com

3. **Update CORS**:
   - After frontend deployment, update `CLIENT_URL` in Render environment variables
   - Add frontend URL to allowed origins

4. **Test Full Application**:
   - Login from deployed frontend
   - Create products
   - Generate invoices
   - Check reports

---

## 📝 Important Notes

- **Free Tier Limitation**: Render free tier spins down after 15 minutes of inactivity
  - First request after inactivity takes 30-60 seconds (cold start)
  - Upgrade to Starter plan ($7/month) for always-on service

- **Database**: Railway MySQL is always running (no cold starts)

- **Logs**: View real-time logs in Render dashboard under "Logs" tab

- **Auto-Deploy**: Render automatically redeploys when you push to GitHub

---

## ✅ Deployment Checklist

- [x] Updated `.npmrc` with SSL configuration
- [x] Updated CORS to support production URLs
- [ ] Push code to GitHub
- [ ] Create Render Web Service
- [ ] Set Root Directory to `backend`
- [ ] Add all environment variables (especially `DB_PORT=53361`)
- [ ] Deploy and wait for build to complete
- [ ] Test API endpoints
- [ ] Verify database connection
- [ ] Update frontend with backend URL
- [ ] Deploy frontend
- [ ] Update `CLIENT_URL` in Render
- [ ] Test full application flow

---

## 🆘 Need Help?

If you encounter any issues:

1. **Check Render Logs**: Dashboard → Your Service → Logs tab
2. **Check Railway MySQL**: Ensure database is running
3. **Verify Environment Variables**: All DB_* variables must be correct
4. **Test Locally First**: Ensure backend works with Railway MySQL locally

---

**Last Updated**: May 31, 2026
**Status**: Ready for deployment ✅
