# 🗄️ MySQL Setup Guide for Shree Grocery Store

This guide will help you set up MySQL database for the project.

---

## ✅ Step 1: Verify MySQL Installation

Open your terminal/command prompt and check if MySQL is installed:

```bash
mysql --version
```

**Expected output**: `mysql Ver 8.x.x` or similar

---

## 🚀 Step 2: Start MySQL Service

### Windows:
```bash
# MySQL should start automatically
# Or manually start from Services app
# Or use command:
net start MySQL80
```

### Mac:
```bash
# If installed via Homebrew:
brew services start mysql

# Or:
mysql.server start
```

### Linux:
```bash
sudo systemctl start mysql
# Or:
sudo service mysql start
```

---

## 🔐 Step 3: Login to MySQL

```bash
mysql -u root -p
```

**Enter your MySQL root password** when prompted.

**If you don't have a password set:**
```bash
mysql -u root
```

---

## 📊 Step 4: Create Database

Once logged into MySQL, run these commands:

```sql
-- Create database for the project
CREATE DATABASE shree_grocery;

-- Verify database was created
SHOW DATABASES;

-- You should see 'shree_grocery' in the list

-- Exit MySQL
EXIT;
```

---

## ⚙️ Step 5: Update Backend .env File

Open `backend/.env` and update these values:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=shree_grocery
DB_USER=root
DB_PASSWORD=your_actual_mysql_password
```

**Important**: Replace `your_actual_mysql_password` with your real MySQL password!

**If you don't have a password**, leave it empty:
```env
DB_PASSWORD=
```

---

## ✅ Step 6: Test Connection

After updating .env file:

```bash
# Navigate to backend folder
cd backend

# Install dependencies (if not done already)
npm install

# Start backend server
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

---

## 🗂️ Database Tables (Auto-Created)

When you start the backend, Sequelize will automatically create these tables:

1. **users** - Stores user accounts (for authentication)
   - id, name, email, password, role, createdAt, updatedAt

2. **invoices** - Stores invoice records
   - id, invoiceNumber, customerName, customerPhone, subtotal, tax, total, userId, createdAt, updatedAt

3. **invoice_items** - Stores individual items in each invoice
   - id, name, quantity, price, total, invoiceId, createdAt, updatedAt

---

## 🐛 Common Issues & Solutions

### Issue 1: "Access denied for user 'root'"
**Solution**: Wrong password in .env file
```bash
# Reset MySQL root password or use correct password
# Update DB_PASSWORD in backend/.env
```

### Issue 2: "Unknown database 'shree_grocery'"
**Solution**: Database not created
```bash
mysql -u root -p
CREATE DATABASE shree_grocery;
EXIT;
```

### Issue 3: "Can't connect to MySQL server"
**Solution**: MySQL service not running
```bash
# Windows: net start MySQL80
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql
```

### Issue 4: "ER_NOT_SUPPORTED_AUTH_MODE"
**Solution**: MySQL 8+ authentication issue
```sql
-- Login to MySQL and run:
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### Issue 5: Port 3306 already in use
**Solution**: Change MySQL port
```env
# In backend/.env
DB_PORT=3307
```

---

## 🔍 Verify Database Tables

After starting the backend successfully, verify tables were created:

```bash
mysql -u root -p
USE shree_grocery;
SHOW TABLES;
```

**Expected output:**
```
+---------------------------+
| Tables_in_shree_grocery   |
+---------------------------+
| users                     |
| invoices                  |
| invoice_items             |
+---------------------------+
```

---

## 📝 Optional: Create MySQL User (Recommended for Production)

Instead of using root, create a dedicated user:

```sql
-- Login as root
mysql -u root -p

-- Create new user
CREATE USER 'shree_admin'@'localhost' IDENTIFIED BY 'strong_password_here';

-- Grant privileges
GRANT ALL PRIVILEGES ON shree_grocery.* TO 'shree_admin'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

Then update `backend/.env`:
```env
DB_USER=shree_admin
DB_PASSWORD=strong_password_here
```

---

## ✅ MySQL Setup Complete!

Once you see:
- ✅ MySQL service running
- ✅ Database `shree_grocery` created
- ✅ Backend connects successfully
- ✅ Tables auto-created

**You're ready to proceed!**

---

## 🎯 Quick Reference Commands

```bash
# Start MySQL
# Windows: net start MySQL80
# Mac: brew services start mysql
# Linux: sudo systemctl start mysql

# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE shree_grocery;

# Show databases
SHOW DATABASES;

# Use database
USE shree_grocery;

# Show tables
SHOW TABLES;

# Exit MySQL
EXIT;
```

---

**MySQL setup complete? Reply "MYSQL READY" to continue with the project!**
