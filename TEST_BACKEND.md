# Test Backend API

## Test 1: Check if backend is running

Open in browser:
```
https://grocery-store-wygh.onrender.com/
```

Should show: Welcome message with API endpoints

## Test 2: Check health endpoint

```
https://grocery-store-wygh.onrender.com/health
```

Should show: Server health status

## Test 3: Test login with curl (in Command Prompt)

```bash
curl -X POST https://grocery-store-wygh.onrender.com/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@shreegrocery.com\",\"password\":\"admin123\"}"
```

## Test 4: Check if users table exists

The admin user might not exist in the Railway MySQL database!

## SOLUTION: Create admin user

We need to either:
1. Run database sync to create tables
2. Manually create the admin user
3. Add a seed script to create default users

## Quick Fix:

Add this to backend server.js to create admin user on startup if it doesn't exist.
