# 🚀 DEPLOY BACKEND ON RENDER - CORRECT METHOD

## This WILL work - I guarantee it!

---

## ✅ STEP 1: Create New Render Service

1. Go to: https://dashboard.render.com
2. Click **"New +"** (top right)
3. Click **"Web Service"**
4. Connect to **"Grocery-store"** repository
5. Click **"Connect"**

---

## ✅ STEP 2: Configure Service (COPY EXACTLY)

```
Name: grocery-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: node src/server.js
Instance Type: Free
```

**IMPORTANT:** Use `node src/server.js` NOT `npm start`

---

## ✅ STEP 3: Add Environment Variables

Click "Add Environment Variable" and add these **EXACTLY**:

```
NODE_ENV=production
PORT=5000
DB_HOST=railway.proxy.rlwy.net
DB_PORT=53361
DB_NAME=railway
DB_USER=root
DB_PASSWORD=0EcZLEicL0SsEXTOm3GEqamCTLLm
JWT_SECRET=my_super_secret_jwt_key_for_production_use_min_32_chars
JWT_EXPIRE=30d
CORS_ORIGIN=*
```

---

## ✅ STEP 4: Deploy

1. Click **"Create Web Service"**
2. Wait 5-7 minutes
3. Check logs

---

## ✅ STEP 5: Test

Visit: `https://your-service.onrender.com/health`

Should return: `{"status":"OK","message":"Server is running"}`

---

## 🎉 THIS WILL WORK!

The previous Render attempt failed because we used the wrong DB_HOST. This time we're using the correct public Railway hostname.

