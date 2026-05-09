# 🚀 Quick Reference Guide

## ⚡ Quick Start (3 Steps)

1. **Setup** → Double-click `SETUP_COMPLETE_PROJECT.bat`
2. **Database** → Double-click `CREATE_DATABASE.bat`
3. **Run** → Double-click `RUN_COMPLETE_APP.bat`

**Done!** Open http://localhost:3000

---

## 🔑 Default Access

**First Time:**
- Click "Sign Up"
- Create your account
- Login with your credentials

---

## 📱 Main Features

### 1. Dashboard
- View sales statistics
- See today's revenue
- Check recent invoices
- Quick navigation

### 2. Billing
- Search products
- Add to cart
- Enter customer details
- Generate & print invoice

### 3. Inventory
- Add/Edit/Delete products
- Filter by category/stock
- Export to CSV
- View stock alerts

### 4. Reports
- Daily (hourly breakdown)
- Monthly (daily breakdown)
- Yearly (monthly breakdown)
- Print/Export reports

### 5. History
- View all invoices
- Search invoices
- Print past invoices

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search | `Ctrl + /` |
| Close Modal | `Esc` |
| Navigate | `Tab` |
| Print | `Ctrl + P` |
| New Product | `Ctrl + N` |
| Export | `Ctrl + E` |

---

## 🎨 Color Indicators

### Stock Status
- 🟢 **Green** = Good stock (above minimum)
- 🟡 **Yellow** = Low stock (at or below minimum)
- 🔴 **Red** = Out of stock (zero)

### UI Colors
- **Blue/Cyan** = Primary actions
- **Green** = Success/Export
- **Red** = Delete/Danger
- **Yellow** = Warning/Alert

---

## 📊 Quick Stats

### Dashboard Shows:
- Total Sales (all-time)
- Total Invoices
- Today's Revenue
- Today's Invoices

### Inventory Shows:
- Total Products
- Low Stock Count
- Out of Stock Count
- Total Inventory Value

---

## 🔧 Common Tasks

### Create Invoice
1. Go to Billing
2. Search & add products
3. Enter customer name
4. Click "Generate Invoice"
5. Print

### Add Product
1. Go to Inventory
2. Click "Add Product"
3. Fill required fields:
   - Name
   - SKU
   - Category
   - Price
   - Stock
4. Click "Add Product"

### View Report
1. Go to Reports
2. Select type (Daily/Monthly/Yearly)
3. Choose date/month/year
4. View charts
5. Print if needed

### Export Inventory
1. Go to Inventory
2. Apply filters (optional)
3. Click "Export"
4. CSV downloads

---

## 🐛 Quick Fixes

### Backend Won't Start
```bash
cd backend
npm install
npm run dev
```

### Frontend Won't Start
```bash
cd frontend
npm install
npm start
```

### Database Error
1. Check MySQL is running
2. Verify password in `backend/.env`
3. Run `CREATE_DATABASE.bat`

### Products Not Saving
- Ensure all required fields filled
- Check category is selected
- Verify SKU is unique

---

## 📁 Important Files

### Configuration
- `backend/.env` - Backend settings
- `frontend/src/services/api.js` - API URL

### Scripts
- `RUN_COMPLETE_APP.bat` - Start everything
- `START_BACKEND.bat` - Backend only
- `START_FRONTEND.bat` - Frontend only

### Documentation
- `README.md` - Full documentation
- `USER_GUIDE.md` - User manual
- `PRODUCTION_CHECKLIST.md` - Deployment guide

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| Health Check | http://localhost:5000/health |

---

## 📞 Quick Help

### Error Messages
- **"User already exists"** → Use different email
- **"Invalid credentials"** → Check email/password
- **"Product with SKU exists"** → Use unique SKU
- **"Database connection error"** → Check MySQL

### Tips
- Use unique SKUs for products
- Set minimum stock levels
- Export inventory regularly
- Print invoices immediately
- Check reports daily

---

## 🎯 Best Practices

### Daily
- ✅ Check dashboard stats
- ✅ Review low stock alerts
- ✅ Create invoices promptly
- ✅ Print all invoices

### Weekly
- ✅ Export inventory backup
- ✅ Review weekly reports
- ✅ Update product prices
- ✅ Check stock levels

### Monthly
- ✅ Generate monthly report
- ✅ Analyze sales trends
- ✅ Reorder products
- ✅ Clean old data

---

## 🔒 Security Tips

- ✅ Use strong passwords
- ✅ Logout when done
- ✅ Don't share credentials
- ✅ Keep software updated
- ✅ Backup regularly

---

## 📈 Performance Tips

- ✅ Use filters to narrow results
- ✅ Search instead of scrolling
- ✅ Close unused tabs
- ✅ Clear browser cache if slow
- ✅ Use latest browser version

---

## 🎓 Learning Path

### Beginner (Day 1)
1. Create account
2. Add 5 products
3. Create first invoice
4. View dashboard

### Intermediate (Week 1)
1. Use all filters
2. Export inventory
3. Generate reports
4. Search invoices

### Advanced (Month 1)
1. Optimize workflow
2. Use keyboard shortcuts
3. Analyze reports
4. Manage inventory efficiently

---

## 📋 Checklist

### Before Starting Business
- [ ] Create user account
- [ ] Add all products
- [ ] Set minimum stock levels
- [ ] Test invoice creation
- [ ] Test printing
- [ ] Train staff

### Daily Operations
- [ ] Check dashboard
- [ ] Review stock alerts
- [ ] Create invoices
- [ ] Print invoices
- [ ] Update stock

### End of Day
- [ ] Check today's revenue
- [ ] Generate daily report
- [ ] Count cash
- [ ] Backup data

---

## 🆘 Emergency Contacts

### Technical Issues
- Check documentation
- Review error messages
- Restart application
- Contact support

### Data Issues
- Check database connection
- Verify credentials
- Restore from backup
- Contact admin

---

## 💡 Pro Tips

1. **Speed Up Billing**
   - Memorize common SKUs
   - Use search efficiently
   - Keep products organized

2. **Manage Inventory**
   - Set realistic minimum stocks
   - Check alerts daily
   - Export weekly backups

3. **Use Reports**
   - Check daily for trends
   - Compare months
   - Plan based on data

4. **Stay Organized**
   - Use categories properly
   - Keep SKUs consistent
   - Update prices regularly

---

## 🎉 Success Metrics

### You're Doing Great If:
- ✅ Creating invoices quickly
- ✅ No stock-outs
- ✅ Accurate inventory
- ✅ Regular backups
- ✅ Using reports for decisions

---

**Remember:** Practice makes perfect! The more you use the system, the faster and more efficient you'll become.

**Need Help?** Check the full USER_GUIDE.md for detailed instructions.

---

**Quick Reference Version:** 1.0.0  
**Last Updated:** May 9, 2026  
**Status:** Complete ✅
