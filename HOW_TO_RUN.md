# 🚀 How to Run Shree Grocery Store Project

Complete step-by-step guide to run the project on your local machine.

---

## ⚠️ IMPORTANT: Current Status

**Frontend:** ✅ 100% Complete and Ready  
**Backend:** ⏳ Not yet built (Phase 4 pending)

**What this means:**
- You can run the frontend and see the beautiful UI
- API calls will fail until backend is built
- Login/Signup won't work yet (no backend)
- You can navigate and see all pages

---

## 📋 Prerequisites

Make sure you have these installed:

### 1. Node.js (v16 or higher)
```bash
node --version
```
If not installed: Download from https://nodejs.org/

### 2. MySQL (v8 or higher)
```bash
mysql --version
```
If not installed: Download from https://dev.mysql.com/downloads/mysql/

### 3. npm (comes with Node.js)
```bash
npm --version
```

---

## 🎯 OPTION 1: Run Frontend Only (Current State)

This will let you see and test the UI.

### Step 1: Navigate to Frontend Folder
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

**This will install:**
- React
- React Router
- Tailwind CSS
- Axios
- React Icons
- React Toastify
- And other dependencies

**Wait time:** 2-3 minutes

### Step 3: Start Frontend Server
```bash
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view shree-grocery-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Step 4: Open Browser
Browser should automatically open to: **http://localhost:3000**

### What You'll See:
- ✅ Login page (UI only, won't work without backend)
- ✅ Signup page (UI only)
- ✅ Beautiful interface
- ❌ API calls will fail (expected)

### To Stop Frontend:
Press `Ctrl + C` in terminal

---

## 🎯 OPTION 2: Run Complete Project (After Backend is Built)

**Note:** Backend is not built yet. This is for after Phase 4.

### Step 1: Setup MySQL Database

#### 1.1 Start MySQL Service

**Windows:**
```bash
net start MySQL80
```

**Mac:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

#### 1.2 Create Database
```bash
# Login to MySQL
mysql -u root -p
# Enter your MySQL password

# Create database
CREATE DATABASE shree_grocery;

# Verify
SHOW DATABASES;

# Exit
EXIT;
```

### Step 2: Setup Backend

#### 2.1 Navigate to Backend
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

**This will install:**
- Express
- Sequelize
- MySQL2
- JWT
- bcrypt
- And other dependencies

#### 2.3 Configure Environment Variables

Open `backend/.env` and update:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=shree_grocery
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
JWT_SECRET=shree_grocery_super_secret_key_2026_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**⚠️ IMPORTANT:** Replace `YOUR_MYSQL_PASSWORD_HERE` with your actual MySQL password!

#### 2.4 Start Backend Server
```bash
npm run dev
```

**Expected output:**
```
✅ MySQL Database Connected Successfully
📊 Database: shree_grocery
🖥️  Host: localhost:3306
📋 Database tables synchronized
🚀 Server running on port 5000
```

**Keep this terminal open!**

### Step 3: Setup Frontend

#### 3.1 Open New Terminal
Don't close the backend terminal. Open a **new terminal window**.

#### 3.2 Navigate to Frontend
```bash
cd frontend
```

#### 3.3 Install Dependencies (if not done)
```bash
npm install
```

#### 3.4 Verify Environment Variables

Open `frontend/.env` and check:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### 3.5 Start Frontend Server
```bash
npm start
```

**Expected output:**
```
Compiled successfully!
Local: http://localhost:3000
```

**Browser will automatically open!**

### Step 4: Use the Application

Now you can:
1. ✅ Create an account (Signup)
2. ✅ Login
3. ✅ View Dashboard
4. ✅ Create Invoices
5. ✅ View History
6. ✅ Search Invoices
7. ✅ Delete Invoices

---

## 🖥️ Running Terminals

You should have **2 terminals running**:

### Terminal 1 - Backend
```
Location: backend/
Command: npm run dev
Status: Running on port 5000
```

### Terminal 2 - Frontend
```
Location: frontend/
Command: npm start
Status: Running on port 3000
```

---

## 🌐 Access URLs

Once both are running:

- **Frontend (UI):** http://localhost:3000
- **Backend (API):** http://localhost:5000
- **API Test:** http://localhost:5000/api (should show welcome message)

---

## 🐛 Common Issues & Solutions

### Issue 1: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue 2: "Port 3000 already in use"
**Solution:**
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue 3: "Port 5000 already in use"
**Solution:** Change PORT in `backend/.env` to 5001 or another port

### Issue 4: "Cannot connect to MySQL"
**Solution:**
- Check if MySQL is running
- Verify credentials in `backend/.env`
- Test MySQL connection: `mysql -u root -p`

### Issue 5: "Module not found"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue 6: Frontend shows blank page
**Solution:**
- Check browser console for errors (F12)
- Clear browser cache
- Restart frontend server

### Issue 7: "CORS error"
**Solution:**
- Verify CLIENT_URL in `backend/.env` matches frontend URL
- Restart backend server

---

## 🔄 Restart Instructions

### To Restart Backend:
```bash
# In backend terminal
Ctrl + C  (stop)
npm run dev  (start again)
```

### To Restart Frontend:
```bash
# In frontend terminal
Ctrl + C  (stop)
npm start  (start again)
```

### To Restart MySQL:
```bash
# Windows
net stop MySQL80
net start MySQL80

# Mac
brew services restart mysql

# Linux
sudo systemctl restart mysql
```

---

## 📱 Testing the Application

### Test Signup:
1. Go to http://localhost:3000/signup
2. Enter name, email, password
3. Click "Create Account"
4. Should redirect to dashboard

### Test Login:
1. Go to http://localhost:3000/login
2. Enter email and password
3. Click "Sign In"
4. Should redirect to dashboard

### Test Billing:
1. Click "Billing" in sidebar
2. Enter customer name
3. Add items (name, quantity, price)
4. Click "Generate Invoice"
5. Should save and redirect to history

### Test History:
1. Click "History" in sidebar
2. See all invoices
3. Search by customer name
4. Click "View" to see details
5. Click "Delete" to remove invoice

---

## 🎯 Quick Start Commands

### First Time Setup:
```bash
# Backend
cd backend
npm install
# Update .env file with MySQL password
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Daily Use (After Setup):
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

---

## 📊 Project Status Check

### ✅ Frontend is Ready:
- All pages created
- UI is complete
- Responsive design
- Animations working

### ⏳ Backend Pending:
- Server setup needed
- Database models needed
- API routes needed
- Authentication needed

---

## 🚀 Next Steps

### Current State:
You can run frontend and see the UI, but functionality won't work without backend.

### To Make it Fully Functional:
Reply with **"BUILD BACKEND"** or **"START PHASE 4"** and I'll create the complete backend system!

---

## 💡 Tips

1. **Always run backend first**, then frontend
2. **Keep both terminals open** while using the app
3. **Check terminal logs** if something doesn't work
4. **Clear browser cache** if you see old data
5. **Use Chrome DevTools** (F12) to debug issues

---

## 📞 Need Help?

If you encounter issues:
1. Check the error message in terminal
2. Check browser console (F12)
3. Verify MySQL is running
4. Verify .env files are correct
5. Try restarting both servers

---

**Ready to build the backend and make everything work?**  
Reply with **"BUILD BACKEND"** to continue! 🚀
