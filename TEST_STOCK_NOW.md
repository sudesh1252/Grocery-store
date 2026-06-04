# 🧪 Quick Stock Test - Do This Now!

**Time needed:** 3 minutes

---

## ✅ Test 1: Check Stock Cards (1 minute)

### Steps:
1. Open: https://grocery-store-wheat-psi.vercel.app/inventory
2. Press **F12** to open console
3. Look at the console logs

### What You Should See:

#### In Console:
```
🔍 API Response: {success: true, count: 2, data: Array(2)}
📦 Products Data: Array(2)
📊 Total products: 2

📦 Basmati Rice: {
  stock: 100,
  minStock: 10,
  raw_stock: 100,
  raw_minStock: 10,
  isLowStock: false,    ← FALSE because 100 > 10
  isOutOfStock: false
}

📦 Oil: {
  stock: 100,
  minStock: 10,
  raw_stock: 100,
  raw_minStock: 10,
  isLowStock: false,    ← FALSE because 100 > 10
  isOutOfStock: false
}

📊 Final Stats: {
  total: 2,
  lowStock: 0,        ← Should be 0 if both have stock > minStock
  outOfStock: 0,      ← Should be 0 if none are out
  totalValue: 149000
}
```

#### On Page:
- **Total Products:** 2
- **Low Stock:** 0 (because both have stock=100 which is > minStock=10)
- **Out of Stock:** 0
- **Total Value:** ₹1,49,000

---

## ✅ Test 2: Create Low Stock Product (2 minutes)

### Steps:
1. Click **+ Add Product**
2. Fill in:
   - **Name:** Sugar
   - **SKU:** SUG001
   - **Category:** Groceries
   - **Selling Price:** 50
   - **Stock:** 5 ← **This is LOW**
   - **Min Stock:** 10 ← **Threshold**
3. Click **Add Product**

### Expected Result:
- New product appears
- **Low Stock card should now show: 1**
- Sugar should have **YELLOW badge** (not green, not red)

### In Console:
```
📦 Sugar: {
  stock: 5,
  minStock: 10,
  isLowStock: true,    ← TRUE because 5 > 0 AND 5 <= 10
  isOutOfStock: false
}

⚠️ Low Stock: Sugar - Stock: 5, MinStock: 10

📊 Final Stats: {
  total: 3,
  lowStock: 1,        ← NOW SHOULD BE 1
  outOfStock: 0
}
```

---

## ✅ Test 3: Create Out of Stock Product (1 minute)

### Steps:
1. Click **+ Add Product**
2. Fill in:
   - **Name:** Salt
   - **SKU:** SAL001
   - **Category:** Groceries
   - **Selling Price:** 20
   - **Stock:** 0 ← **OUT OF STOCK**
   - **Min Stock:** 10
3. Click **Add Product**

### Expected Result:
- New product appears
- **Out of Stock card should now show: 1**
- Salt should have **RED badge**

### In Console:
```
📦 Salt: {
  stock: 0,
  minStock: 10,
  isLowStock: false,
  isOutOfStock: true    ← TRUE because stock === 0
}

🚫 Out of Stock: Salt - Stock: 0

📊 Final Stats: {
  total: 4,
  lowStock: 1,
  outOfStock: 1,        ← NOW SHOULD BE 1
  totalValue: 149250
}
```

---

## ✅ Test 4: Test Stock Warning in Billing (1 minute)

### Steps:
1. Go to: https://grocery-store-wheat-psi.vercel.app/billing
2. In the dropdown, try to select products:

### Expected Results:

#### When selecting Salt (Stock=0):
- ❌ Option should be **DISABLED** (can't click)
- Text shows: `⛔ OUT OF STOCK Salt - ₹20 (Stock: 0)`
- Color: **RED**

#### When selecting Sugar (Stock=5):
- ✅ Can select
- Shows toast: "⚠️ Sugar is LOW ON STOCK (Only 5 remaining)"
- Text shows: `⚠️ LOW STOCK Sugar - ₹50 (Stock: 5)`
- Color: **ORANGE**
- Below dropdown shows: "⚠️ LOW STOCK: Only 5 units available"

#### When selecting Basmati Rice (Stock=100):
- ✅ Can select
- No warning
- Text shows: `✓ Basmati Rice - ₹1500 (Stock: 100)`
- Color: **GREEN**
- Below dropdown shows: "✓ 100 units available"

---

## ✅ Test 5: Test Stock Validation (2 minutes)

### Steps:
1. Select **Sugar** (Stock=5)
2. Change **Quantity** to **10**
3. Click **Add Item**

### Expected Result:
❌ **ERROR Toast:**
"Cannot add 10 Sugar. Only 5 available in stock!"

### Try Again:
1. Change **Quantity** to **5**
2. Click **Add Item**

### Expected Result:
⚠️ **WARNING Toast:**
"This will use all available stock of Sugar!"

✅ **SUCCESS Toast:**
"Item added"

---

## ✅ Test 6: Test Stock Deduction (2 minutes)

### Before:
1. Note Basmati Rice stock: **100**

### Create Invoice:
1. In Billing page
2. Add customer name: **Test Customer**
3. Select **Basmati Rice**
4. Quantity: **10**
5. Click **Add Item**
6. Click **Generate Invoice**
7. Wait for success message
8. Go to **Inventory** page

### After:
Check Basmati Rice stock:
- **Expected:** 90 (100 - 10 = 90)
- Badge should still be **GREEN** (90 > 10)

### In Console:
```
📦 Basmati Rice: {
  stock: 90,          ← Updated from 100
  minStock: 10,
  isLowStock: false,  ← Still false (90 > 10)
  isOutOfStock: false
}
```

---

## ✅ Test 7: Test Filters (1 minute)

### Steps:
1. Click **Filters** button
2. Under **Stock Status**, try each:

### Expected Results:

**All Stock:**
- Shows all 4 products (Basmati Rice, Oil, Sugar, Salt)

**Good Stock:**
- Shows only: Basmati Rice (90), Oil (100)
- Both have stock > minStock

**Low Stock:**
- Shows only: Sugar (5)
- Has 0 < stock <= minStock

**Out of Stock:**
- Shows only: Salt (0)
- Has stock === 0

---

## 🎯 Success Criteria

After all tests, you should have:

- ✅ **Total Products:** 4
- ✅ **Low Stock:** 1 (Sugar with stock=5)
- ✅ **Out of Stock:** 1 (Salt with stock=0)
- ✅ **Good Stock:** 2 (Basmati Rice=90, Oil=100)

### Stock Colors:
- 🟢 **Green:** Basmati Rice (90), Oil (100)
- 🟡 **Yellow:** Sugar (5)
- 🔴 **Red:** Salt (0)

### Billing Dropdown:
- 🟢 Basmati Rice - selectable, no warning
- 🟢 Oil - selectable, no warning
- 🟡 Sugar - selectable, shows warning
- 🔴 Salt - **DISABLED**, cannot select

---

## ❌ If Something Is Wrong

### Issue: All cards show 0
**Solution:**
1. Check console for logs
2. Might need to hard refresh: **Ctrl+F5**
3. Check if backend deployed: https://dashboard.render.com

### Issue: Stock colors all green
**Solution:**
1. Check minStock values (should be 10)
2. Check console logs for actual calculations
3. Verify stock values are numbers, not strings

### Issue: Can select out-of-stock items
**Solution:**
1. Hard refresh billing page
2. Check if frontend deployed: https://vercel.com/dashboard
3. Wait 2 minutes for deployment

---

## ⏱️ Total Test Time: ~10 minutes

**All tests passing = Stock management is working perfectly!** 🎉

---

## 📸 What to Look For

### Inventory Page:
```
┌─────────────────────────────────┐
│  Low Stock        Out of Stock  │
│     1 ⚠️              1 🚫       │
└─────────────────────────────────┘

Product List:
🟢 Basmati Rice - Stock: 90
🟢 Oil - Stock: 100
🟡 Sugar - Stock: 5  ← YELLOW
🔴 Salt - Stock: 0   ← RED
```

### Billing Page Dropdown:
```
┌──────────────────────────────────┐
│ ✓ Basmati Rice - ₹1500 (90)     │
│ ✓ Oil - ₹1000 (100)              │
│ ⚠️ Sugar - ₹50 (5) ← ORANGE      │
│ ⛔ Salt - ₹20 (0) ← RED, DISABLED│
└──────────────────────────────────┘
```

---

**Do these tests now and everything should work!** ✨
