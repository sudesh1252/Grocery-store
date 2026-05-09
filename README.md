# 🛒 Shree Grocery Store - Professional Billing System

A complete, production-ready grocery store billing and inventory management system built with modern technologies.

## 🌟 Features

### 📊 Dashboard
- Real-time sales statistics
- Today's revenue and invoices
- Quick action cards
- Recent invoices overview

### 💰 Billing System
- Fast product search and selection
- Real-time price calculation
- Tax management (GST)
- Customer information
- Print invoice functionality
- Invoice number auto-generation

### 📦 Inventory Management
- Add, edit, delete products
- Real-time stock tracking
- Low stock alerts
- Category management
- CSV export functionality
- Advanced filtering and sorting
- Stock value calculations

### 📈 Reports & Analytics
- Daily sales reports (hourly breakdown)
- Monthly sales reports (daily breakdown)
- Yearly sales reports (monthly breakdown)
- Visual charts and graphs
- Export and print functionality
- Recent invoices tracking

### 📜 Invoice History
- View all past invoices
- Search by invoice number or customer
- Filter by date range
- Detailed invoice view
- Print past invoices

### 🔐 Authentication
- Secure user registration
- JWT-based authentication
- Protected routes
- User profile management

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **React Icons** - Icons
- **React Toastify** - Notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** (optional) - [Download](https://git-scm.com/)

## 🚀 Quick Start

### Method 1: Automated Setup (Recommended)

1. **Run Complete Setup**
   ```bash
   # Double-click this file:
   SETUP_COMPLETE_PROJECT.bat
   ```

2. **Create MySQL Database**
   ```bash
   # Double-click this file:
   CREATE_DATABASE.bat
   ```

3. **Run the Application**
   ```bash
   # Double-click this file:
   RUN_COMPLETE_APP.bat
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Method 2: Manual Setup

#### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

#### Step 2: Configure Environment

Create `backend/.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=shree_grocery
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d
```

#### Step 3: Create Database

**Option A: Using MySQL Command Line**
```sql
CREATE DATABASE shree_grocery;
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Run: `CREATE DATABASE shree_grocery;`

#### Step 4: Start Servers

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend (in new terminal):**
```bash
cd frontend
npm start
```

## 📱 Usage Guide

### First Time Setup

1. **Create an Account**
   - Go to http://localhost:3000
   - Click "Sign Up"
   - Enter your details
   - Click "Create Account"

2. **Login**
   - Enter your email and password
   - Click "Login"

3. **Add Products to Inventory**
   - Go to "Inventory" from sidebar
   - Click "Add Product"
   - Fill in product details
   - Click "Add Product"

4. **Create Your First Invoice**
   - Go to "Billing" from sidebar
   - Search and add products
   - Enter customer details
   - Click "Generate Invoice"

### Daily Operations

#### Creating an Invoice
1. Navigate to **Billing** page
2. Search for products by name or SKU
3. Click on products to add them
4. Adjust quantities if needed
5. Enter customer name and phone
6. Review total amount
7. Click "Generate Invoice"
8. Print or save the invoice

#### Managing Inventory
1. Navigate to **Inventory** page
2. View all products with stock levels
3. Use filters to find specific products
4. Edit products by clicking the blue edit button
5. Delete products by clicking the red delete button
6. Export inventory to CSV for backup

#### Viewing Reports
1. Navigate to **Reports** page
2. Select report type (Daily/Monthly/Yearly)
3. Choose date/month/year
4. View charts and statistics
5. Print or export reports

#### Checking History
1. Navigate to **History** page
2. View all past invoices
3. Search by invoice number or customer
4. Click on invoice to view details
5. Print past invoices if needed

## 🎨 UI/UX Features

### Professional Design
- Modern gradient color scheme (Blue/Cyan)
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive navigation
- Clean and organized interface

### User Experience
- Real-time updates
- Instant search results
- Toast notifications for all actions
- Loading states for better feedback
- Confirmation dialogs for critical actions
- Keyboard shortcuts support

### Accessibility
- High contrast colors
- Clear typography
- Proper form labels
- Error messages
- Success feedback

## 📊 Database Schema

### Users Table
- id, name, email, password, role, timestamps

### Products Table
- id, name, sku, barcode, category, description
- unit, purchasePrice, sellingPrice
- stock, minStock, maxStock
- supplier, supplierContact, expiryDate
- status, userId, timestamps

### Invoices Table
- id, invoiceNumber, customerName, customerPhone
- subtotal, tax, total
- userId, timestamps

### InvoiceItems Table
- id, name, quantity, price, total
- invoiceId, timestamps

### StockMovements Table
- id, productId, type, quantity
- previousStock, newStock, reason
- referenceType, referenceId
- userId, timestamps

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- SQL injection prevention (Sequelize ORM)
- XSS protection
- CORS configuration
- Environment variables for sensitive data

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database credentials in `.env`
- Ensure database `shree_grocery` exists
- Check if port 5000 is available

### Frontend won't start
- Check if backend is running
- Verify port 3000 is available
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

### Database connection error
- Verify MySQL is running
- Check username and password
- Ensure database exists
- Check firewall settings

### Products not saving
- Check all required fields are filled
- Verify category is selected
- Check SKU is unique
- Ensure backend is running

## 📁 Project Structure

```
shree-grocery-store/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── inventoryController.js
│   │   ├── invoiceController.js
│   │   └── reportController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validator.js
│   ├── models/
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Invoice.js
│   │   ├── InvoiceItem.js
│   │   └── StockMovement.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── invoiceRoutes.js
│   │   └── reportRoutes.js
│   ├── utils/
│   │   ├── generateInvoiceNumber.js
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   └── dashboard/
│   │   │       └── StatCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Billing.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Inventory.jsx
│   │   │   └── Reports.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── invoiceService.js
│   │   │   └── reportService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── CREATE_DATABASE.bat
├── RUN_COMPLETE_APP.bat
├── SETUP_COMPLETE_PROJECT.bat
├── START_BACKEND.bat
├── START_FRONTEND.bat
└── README.md
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Inventory
- `GET /api/inventory` - Get all products
- `GET /api/inventory/:id` - Get single product
- `POST /api/inventory` - Create product
- `PUT /api/inventory/:id` - Update product
- `DELETE /api/inventory/:id` - Delete product
- `POST /api/inventory/:id/adjust-stock` - Adjust stock
- `GET /api/inventory/alerts/low-stock` - Get low stock products

### Invoices
- `GET /api/invoices` - Get all invoices
- `GET /api/invoices/:id` - Get single invoice
- `POST /api/invoices` - Create invoice
- `GET /api/invoices/stats` - Get dashboard stats

### Reports
- `GET /api/reports/daily/:date` - Get daily report
- `GET /api/reports/monthly/:year/:month` - Get monthly report
- `GET /api/reports/yearly/:year` - Get yearly report

## 🎯 Future Enhancements

- [ ] Barcode scanner integration
- [ ] Multi-store support
- [ ] Employee management
- [ ] Supplier management
- [ ] Purchase order system
- [ ] Email notifications
- [ ] SMS integration
- [ ] Mobile app (React Native)
- [ ] Cloud deployment
- [ ] Backup and restore
- [ ] Advanced analytics
- [ ] Customer loyalty program

## 👥 Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Review the documentation
3. Contact support team

## 📄 License

This project is proprietary software for Shree Grocery Store.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MySQL team
- Tailwind CSS creators
- All open-source contributors

---

**Version:** 1.0.0  
**Last Updated:** May 9, 2026  
**Status:** Production Ready ✅

Made with ❤️ for Shree Grocery Store
