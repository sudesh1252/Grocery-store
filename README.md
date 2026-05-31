# 🛒 Shree Grocery Store

A complete, production-ready grocery store management system built with React and Node.js.

## ✨ Features

- 📊 **Dashboard** - Real-time business overview with sales statistics
- 💳 **Billing System** - Fast invoice creation with product dropdown
- 📦 **Inventory Management** - Complete product management with stock tracking
- 📈 **Reports** - Daily, Monthly, Yearly sales reports + Inventory reports
- 📜 **Invoice History** - View and manage all past invoices
- 🔐 **Authentication** - Secure login/signup with JWT tokens
- 👤 **User Management** - Multi-user support with role-based access

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Grocery store"
```

2. **Setup Database**
```bash
# Start MySQL service
net start MySQL80

# Create database
mysql -u root -p
CREATE DATABASE shree_grocery;
exit;
```

3. **Configure Backend**
```bash
cd backend
npm install

# Create .env file
echo PORT=5000 > .env
echo DB_HOST=localhost >> .env
echo DB_USER=root >> .env
echo DB_PASSWORD=root >> .env
echo DB_NAME=shree_grocery >> .env
echo JWT_SECRET=your_jwt_secret_key_here >> .env
echo NODE_ENV=development >> .env
```

4. **Configure Frontend**
```bash
cd ../frontend
npm install
```

5. **Start the Application**
```bash
# Use the quick start script (recommended)
START_FAST.bat

# Or start manually:
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

6. **Access the Application**
- Frontend: http://localhost:3000 or http://localhost:3001
- Backend API: http://localhost:5000

## 👤 Demo Credentials

**Admin Account:**
- Email: `admin@shreegrocery.com`
- Password: `admin123`

**User Account:**
- Email: `kirolkarsudesh06@gmail.com`
- Password: `admin123`

## 📁 Project Structure

```
Grocery store/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # Entry point
│   ├── .env                # Environment variables
│   └── package.json
│
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── utils/          # Helper functions
│   │   └── App.js          # Main app component
│   └── package.json
│
├── START_FAST.bat          # Quick start script
└── README.md               # This file
```

## 🔧 Technology Stack

### Frontend
- React 18
- React Router v6
- Axios
- React Toastify
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- bcrypt

## 📖 Usage Guide

### Creating an Invoice
1. Go to **Billing** page
2. Enter customer information
3. Select products from dropdown or type manually
4. Adjust quantity and price if needed
5. Click "Add Item"
6. Review items and click "Generate Invoice"

### Managing Inventory
1. Go to **Inventory** page
2. Click "Add Product" button
3. Fill in product details (name, SKU, price, stock, etc.)
4. Click "Add Product"
5. Edit or delete products as needed

### Viewing Reports
1. Go to **Reports** page
2. Select report type:
   - **Daily** - Today's sales
   - **Monthly** - This month's sales
   - **Yearly** - This year's sales
   - **Inventory** - Current stock status
3. Print or export reports

## 🛠️ Configuration

### Backend Environment Variables
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=shree_grocery
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend API Configuration
The frontend automatically connects to `http://localhost:5000/api`

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running: `net start MySQL80`
- Verify database credentials in `.env`
- Check if port 5000 is available

### Frontend won't start
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall: `npm install`
- Check if port 3000/3001 is available

### Login not working
- Verify backend is running on port 5000
- Check browser console (F12) for errors
- Clear browser cache and cookies
- Make sure CORS is configured correctly

### Database errors
- Run database sync: Backend will auto-sync on startup
- Check MySQL service is running
- Verify database exists: `SHOW DATABASES;`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Inventory
- `GET /api/inventory` - Get all products
- `GET /api/inventory/:id` - Get single product
- `POST /api/inventory` - Create product
- `PUT /api/inventory/:id` - Update product
- `DELETE /api/inventory/:id` - Delete product

### Reports
- `GET /api/reports/daily?date=YYYY-MM-DD` - Daily report
- `GET /api/reports/monthly?year=YYYY&month=MM` - Monthly report
- `GET /api/reports/yearly?year=YYYY` - Yearly report
- `GET /api/reports/inventory` - Inventory report

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Protected routes with middleware
- Input validation on all forms
- SQL injection prevention with Sequelize ORM
- CORS configured for security

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Developed by Sudesh Kirolkar

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the backend framework
- Sequelize for the ORM
- All open-source contributors

---

**Version:** 2.0.0  
**Last Updated:** May 2026

For support or questions, please open an issue on GitHub.
