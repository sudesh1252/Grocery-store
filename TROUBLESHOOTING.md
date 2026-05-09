# 🔧 Troubleshooting Guide - Shree Grocery Store

Common issues and their solutions.

---

## 🚨 Installation Issues

### ❌ "npm: command not found" or "npm is not recognized"

**Problem:** Node.js is not installed or not in PATH

**Solution:**
1. Download Node.js from: https://nodejs.org/
2. Install it (use default settings)
3. Restart your terminal/command prompt
4. Test: `node --version`

---

### ❌ "npm install" fails or shows errors

**Problem:** Network issues or corrupted cache

**Solution 1 - Clear npm cache:**
```bash
npm cache clean --force
npm install
```

**Solution 2 - Delete and reinstall:**
```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install

# Mac/Linux
rm -rf node_modules
rm package-lock.json
npm install
```

**Solution 3 - Use different registry:**
```bash
npm install --registry=https://registry.npmjs.org/
```

---

### ❌ "Permission denied" or "EACCES" error

**Problem:** Insufficient permissions

**Solution (Mac/Linux):**
```bash
sudo npm install
```

**Solution (Windows):**
- Run Command Prompt as Administrator
- Then run: `npm install`

---

## 🌐 Server Issues

### ❌ "Port 3000 already in use"

**Problem:** Another application is using port 3000

**Solution 1 - Find and kill process:**

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Solution 2 - Use different port:**
```bash
# Set PORT environment variable
# Windows:
set PORT=3001 && npm start

# Mac/Linux:
PORT=3001 npm start
```

---

### ❌ "Port 5000 already in use" (Backend)

**Problem:** Another application is using port 5000

**Solution:**
1. Open `backend/.env`
2. Change: `PORT=5000` to `PORT=5001`
3. Open `frontend/.env`
4. Change: `REACT_APP_API_URL=http://localhost:5000/api` to `http://localhost:5001/api`
5. Restart both servers

---

### ❌ Server starts but browser shows blank page

**Problem:** Build issue or cache problem

**Solution:**
```bash
# Stop server (Ctrl + C)
# Clear cache and restart
npm start
```

**If still blank:**
1. Open browser
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Look for error messages
5. Share the error for help

---

## 🗄️ MySQL Issues

### ❌ "Cannot connect to MySQL"

**Problem:** MySQL service not running

**Solution:**

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

**Check if running:**
```bash
mysql -u root -p
```

---

### ❌ "Access denied for user 'root'"

**Problem:** Wrong password in .env file

**Solution:**
1. Open `backend/.env`
2. Update `DB_PASSWORD=your_actual_password`
3. Test login: `mysql -u root -p`
4. Restart backend server

---

### ❌ "Unknown database 'shree_grocery'"

**Problem:** Database not created

**Solution:**
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE shree_grocery;

# Verify
SHOW DATABASES;

# Exit
EXIT;
```

---

### ❌ "ER_NOT_SUPPORTED_AUTH_MODE"

**Problem:** MySQL 8+ authentication issue

**Solution:**
```bash
# Login to MySQL
mysql -u root -p

# Run this command
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
EXIT;
```

---

## 🔐 Authentication Issues

### ❌ Login doesn't work

**Current Status:** Backend not built yet, so login won't work.

**After backend is built:**
1. Check if backend is running (port 5000)
2. Check browser console (F12) for errors
3. Verify API URL in `frontend/.env`

---

### ❌ "Network Error" or "Failed to fetch"

**Problem:** Backend not running or wrong URL

**Solution:**
1. Check if backend is running: http://localhost:5000
2. Verify `frontend/.env` has correct API URL
3. Check CORS settings in backend

---

## 🎨 UI/Display Issues

### ❌ Styles not loading / Page looks broken

**Problem:** Tailwind CSS not compiled

**Solution:**
```bash
# Stop server (Ctrl + C)
# Reinstall dependencies
npm install
# Restart
npm start
```

---

### ❌ Icons not showing

**Problem:** React Icons not installed

**Solution:**
```bash
npm install react-icons
npm start
```

---

### ❌ Toast notifications not appearing

**Problem:** React Toastify not configured

**Solution:**
```bash
npm install react-toastify
npm start
```

---

## 📱 Browser Issues

### ❌ Browser doesn't open automatically

**Solution:**
- Manually open browser
- Go to: http://localhost:3000

---

### ❌ "This site can't be reached"

**Problem:** Server not running

**Solution:**
1. Check terminal - is server running?
2. Look for "Compiled successfully" message
3. If not, restart: `npm start`

---

### ❌ Old data showing / Changes not reflecting

**Problem:** Browser cache

**Solution:**
1. Hard refresh: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
2. Or clear browser cache
3. Or open in Incognito/Private mode

---

## 🐛 Runtime Errors

### ❌ "Module not found: Can't resolve..."

**Problem:** Missing dependency or wrong import path

**Solution:**
```bash
npm install
```

**If specific module:**
```bash
npm install <module-name>
```

---

### ❌ "React Hook useEffect has a missing dependency"

**Problem:** ESLint warning (not critical)

**Solution:** This is just a warning, app will still work. Can be ignored for now.

---

### ❌ "Cannot read property of undefined"

**Problem:** Trying to access data before it's loaded

**Solution:** This is expected when backend is not running. Will be fixed once backend is built.

---

## 💾 Data Issues

### ❌ Data not saving

**Current Status:** Backend not built yet, so data won't save.

**After backend is built:**
1. Check if backend is running
2. Check browser console for errors
3. Verify database connection

---

### ❌ Data not loading

**Current Status:** Backend not built yet, so data won't load.

**After backend is built:**
1. Check if backend is running
2. Check if database has data
3. Check API endpoints

---

## 🔄 General Solutions

### Solution 1: Restart Everything
```bash
# Stop all servers (Ctrl + C in each terminal)
# Restart backend
cd backend
npm run dev

# Restart frontend (new terminal)
cd frontend
npm start
```

---

### Solution 2: Clean Install
```bash
# Delete node_modules
rm -rf node_modules
rm package-lock.json

# Reinstall
npm install

# Start
npm start
```

---

### Solution 3: Check Logs
1. **Terminal logs:** Look for error messages
2. **Browser console:** Press F12, check Console tab
3. **Network tab:** Press F12, check Network tab for failed requests

---

## 📞 Still Having Issues?

### Before Asking for Help:

1. ✅ Check which phase you're on (Frontend only? Or Backend built?)
2. ✅ Copy the exact error message
3. ✅ Note what you were trying to do
4. ✅ Check if backend is running (if applicable)
5. ✅ Check browser console (F12)

### Information to Provide:

- Operating System (Windows/Mac/Linux)
- Node.js version (`node --version`)
- npm version (`npm --version`)
- Exact error message
- What you were trying to do
- Screenshot (if possible)

---

## ✅ Quick Diagnostic Checklist

Run these commands to check your setup:

```bash
# Check Node.js
node --version
# Should show: v16.x.x or higher

# Check npm
npm --version
# Should show: 8.x.x or higher

# Check MySQL (if backend is built)
mysql --version
# Should show: mysql Ver 8.x.x

# Check if frontend dependencies are installed
cd frontend
ls node_modules
# Should show many folders

# Check if backend dependencies are installed (if backend is built)
cd backend
ls node_modules
# Should show many folders
```

---

## 🎯 Most Common Issues Summary

| Issue | Quick Fix |
|-------|-----------|
| npm not found | Install Node.js |
| Port in use | Kill process or use different port |
| Blank page | Clear cache, restart server |
| MySQL error | Start MySQL service |
| Login doesn't work | Backend not built yet (expected) |
| Styles broken | Reinstall dependencies |
| Module not found | Run `npm install` |

---

**Still stuck?** Reply with your error message and I'll help! 🚀
