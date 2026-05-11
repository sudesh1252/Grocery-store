# 🔐 Forgot Password Feature - Complete Setup Guide

## ✅ What I've Added:

### Backend:
1. ✅ Password Reset Controller (`backend/src/controllers/passwordResetController.js`)
2. ✅ Email Service (`backend/src/utils/emailService.js`)
3. ✅ Updated User Model with reset token fields
4. ✅ Added password reset routes to auth routes
5. ✅ Added nodemailer dependency

### Frontend:
1. ✅ Forgot Password Page (`frontend/src/pages/ForgotPassword.jsx`)
2. ✅ Reset Password Page (`frontend/src/pages/ResetPassword.jsx`)
3. ✅ Added "Forgot Password?" link to Login page
4. ✅ Added routes in App.jsx

---

## 🚀 HOW TO USE:

### STEP 1: Install Backend Dependencies

```bash
cd backend
npm install nodemailer
```

### STEP 2: Update Database (Add Reset Token Fields)

Run this command to add the new fields to the users table:

```bash
cd backend
node -e "const {sequelize} = require('./src/config/db'); sequelize.sync({alter: true}).then(() => {console.log('✅ Database updated!'); process.exit(0);});"
```

### STEP 3: Configure Email (Optional)

**For Development (No Email):**
- Leave `EMAIL_ENABLED=false` in `.env`
- Reset links will be logged to console
- You can copy the link from console and paste in browser

**For Production (Real Emails):**

1. **Using Gmail:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Generate App Password
   - Update `.env`:
     ```
     EMAIL_ENABLED=true
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-app-password
     EMAIL_FROM=your-email@gmail.com
     EMAIL_FROM_NAME=Shree Grocery Store
     FRONTEND_URL=http://localhost:3000
     ```

2. **Using SendGrid (Recommended for Production):**
   ```
   EMAIL_ENABLED=true
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your-sendgrid-api-key
   EMAIL_FROM=noreply@yourdomain.com
   EMAIL_FROM_NAME=Shree Grocery Store
   ```

### STEP 4: Restart Backend

```bash
cd backend
npm start
```

### STEP 5: Test the Feature

1. **Go to Login Page**: http://localhost:3000/login
2. **Click "Forgot Password?"** link
3. **Enter your email** and click "Send Reset Link"
4. **Check console** (if EMAIL_ENABLED=false) for the reset URL
5. **Copy the reset URL** and paste in browser
6. **Enter new password** and submit
7. **Login with new password**

---

## 📧 HOW IT WORKS:

### User Flow:

1. **User clicks "Forgot Password?"** on login page
2. **Enters email address** and submits
3. **System generates secure reset token** (valid for 1 hour)
4. **Email sent with reset link** (or logged to console in dev mode)
5. **User clicks link** → Redirected to Reset Password page
6. **Token verified** → User can enter new password
7. **Password updated** → User can login with new password

### Security Features:

- ✅ Reset tokens are hashed before storing in database
- ✅ Tokens expire after 1 hour
- ✅ Tokens are single-use (deleted after password reset)
- ✅ Email existence not revealed (security best practice)
- ✅ Password must be at least 6 characters
- ✅ Passwords are hashed with bcrypt

---

## 🧪 TESTING:

### Test Scenario 1: Successful Reset

1. Go to: http://localhost:3000/forgot-password
2. Enter: `test@example.com`
3. Check console for reset URL
4. Copy URL and open in browser
5. Enter new password: `newpassword123`
6. Confirm password: `newpassword123`
7. Click "Reset Password"
8. Should redirect to login
9. Login with new password

### Test Scenario 2: Expired Token

1. Request password reset
2. Wait 1 hour
3. Try to use the reset link
4. Should show "Token expired" error

### Test Scenario 3: Invalid Token

1. Try to access: http://localhost:3000/reset-password/invalid-token
2. Should show "Invalid reset link" error

---

## 🎨 UI FEATURES:

### Forgot Password Page:
- ✅ Beautiful gradient background
- ✅ Email input with validation
- ✅ Loading state during submission
- ✅ Success message with instructions
- ✅ "Back to Login" link

### Reset Password Page:
- ✅ Token verification on load
- ✅ Password strength indicator
- ✅ Show/hide password toggle
- ✅ Password confirmation
- ✅ Real-time password match validation
- ✅ Success message with auto-redirect
- ✅ Security tips

### Login Page:
- ✅ "Forgot Password?" link added next to password field
- ✅ Styled to match existing design

---

## 📝 API ENDPOINTS:

### POST /api/auth/forgot-password
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If an account exists with this email, you will receive a password reset link."
}
```

### GET /api/auth/verify-reset-token/:token
**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "email": "user@example.com"
}
```

### POST /api/auth/reset-password/:token
**Request:**
```json
{
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful! You can now login with your new password."
}
```

---

## 🔧 TROUBLESHOOTING:

### Issue 1: Email Not Sending

**Solution:**
- Check `EMAIL_ENABLED=true` in `.env`
- Verify email credentials are correct
- Check Gmail App Password (not regular password)
- Check console for error messages

### Issue 2: Reset Link Not Working

**Solution:**
- Check token hasn't expired (1 hour limit)
- Verify `FRONTEND_URL` in backend `.env`
- Check browser console for errors

### Issue 3: Database Error

**Solution:**
- Run database sync command (Step 2)
- Check MySQL is running
- Verify database connection in `.env`

---

## 📧 EMAIL TEMPLATE:

The password reset email includes:
- ✅ Professional HTML design
- ✅ Gradient header with lock icon
- ✅ Clear reset button
- ✅ Clickable reset URL
- ✅ Security warnings
- ✅ Expiry information (1 hour)
- ✅ Password tips
- ✅ Responsive design

---

## 🎯 PRODUCTION CHECKLIST:

Before deploying to production:

- [ ] Set `EMAIL_ENABLED=true`
- [ ] Configure real SMTP credentials
- [ ] Update `FRONTEND_URL` to production URL
- [ ] Test email delivery
- [ ] Test reset flow end-to-end
- [ ] Monitor email logs
- [ ] Set up email rate limiting (optional)
- [ ] Configure SPF/DKIM records for email domain

---

## 🚀 QUICK START:

```bash
# 1. Install dependencies
cd backend
npm install

# 2. Update database
node -e "const {sequelize} = require('./src/config/db'); sequelize.sync({alter: true}).then(() => {console.log('✅ Done!'); process.exit(0);});"

# 3. Restart backend
npm start

# 4. Test it!
# Go to: http://localhost:3000/login
# Click "Forgot Password?"
```

---

## ✅ FEATURE COMPLETE!

The forgot password feature is now fully integrated and ready to use!

**Key Features:**
- 🔐 Secure token-based password reset
- 📧 Professional email templates
- ⏰ 1-hour token expiry
- 🎨 Beautiful UI with animations
- 🔒 Security best practices
- 📱 Responsive design
- ✅ Full error handling

**Test it now and let me know if you need any adjustments!** 🎉

