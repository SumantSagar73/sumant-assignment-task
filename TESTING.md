# 🧪 Testing Guide - MERN E-Commerce Application

## ✅ Phase 1-5 Implementation Status

All phases are **COMPLETE** and running!

## 🖥️ Running Applications

### Backend (Port 5000)
- Status: ✅ Running
- MongoDB: ✅ Connected to Atlas
- Stripe: ✅ Configured
- Webhooks: ✅ Ready

### Frontend (Port 3001)
- Status: ✅ Running
- URL: http://localhost:3001

## 📋 Testing Checklist

### 1. Test Product Listing
- [ ] Visit http://localhost:3001
- [ ] Verify 3 products are displayed (T-Shirt ₹999, Sneakers ₹2499, Cap ₹499)
- [ ] Check product images load correctly

### 2. Test Add to Cart
- [ ] Click "Add to Cart" on any product
- [ ] Verify cart count appears in navbar
- [ ] Add multiple products
- [ ] Verify cart count updates

### 3. Test Cart Page
- [ ] Click cart icon in navbar
- [ ] Verify all added products are displayed
- [ ] Test quantity increment (+) button
- [ ] Test quantity decrement (-) button
- [ ] Verify total price updates correctly
- [ ] Test "Clear Cart" button

### 4. Test Email Validation
- [ ] Try checkout without email → Should show error
- [ ] Try invalid email (e.g., "test") → Should show error
- [ ] Enter valid email → Should proceed

### 5. Test Stripe Checkout
- [ ] Enter valid email
- [ ] Click "Proceed to Checkout"
- [ ] Verify redirect to Stripe Checkout page
- [ ] Check products and total amount are correct
- [ ] Use test card: 4242 4242 4242 4242
- [ ] Complete payment
- [ ] Verify redirect to success page

### 6. Test Order Persistence
- [ ] After checkout, check MongoDB for new order
- [ ] Verify order status is "pending" initially
- [ ] After payment, check if status updates to "success"

### 7. Test Webhook (Manual)
To test webhooks locally:

```bash
# Terminal 1: Start Stripe CLI
stripe listen --forward-to localhost:5000/api/webhook/webhook

# Terminal 2: Copy webhook secret and update .env
# STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Terminal 3: Restart server
cd server
npm run dev

# Make a test payment and watch webhook events
```

### 8. Test Cancel Flow
- [ ] Start checkout process
- [ ] Click browser back button on Stripe page
- [ ] Or click "Back" on Stripe checkout
- [ ] Verify return to cart page
- [ ] Verify cart items are still there

### 9. Test Success Page
- [ ] Complete a payment
- [ ] Verify success page shows ✓ checkmark
- [ ] Verify "Thank you" message
- [ ] Click "Continue Shopping"
- [ ] Verify redirect to homepage
- [ ] Verify cart is cleared

## 🔍 API Testing with Postman/Thunder Client

### 1. Create Checkout Session
```http
POST http://localhost:5000/api/checkout/create-checkout-session
Content-Type: application/json

{
  "email": "test@example.com",
  "cartItems": [
    {
      "id": 1,
      "name": "T-Shirt",
      "price": 999,
      "quantity": 2,
      "image": "https://via.placeholder.com/200"
    }
  ]
}
```

Expected Response:
```json
{
  "url": "https://checkout.stripe.com/...",
  "orderId": "507f1f77bcf86cd799439011"
}
```

### 2. Get All Orders
```http
GET http://localhost:5000/api/webhook/orders
```

Expected Response:
```json
[
  {
    "_id": "...",
    "email": "test@example.com",
    "items": [...],
    "totalAmount": 1998,
    "paymentStatus": "success",
    "transactionId": "cs_test_...",
    "createdAt": "2025-10-07T...",
    "updatedAt": "2025-10-07T..."
  }
]
```

### 3. Get Order by Session ID
```http
GET http://localhost:5000/api/webhook/order/cs_test_xxxxx
```

## 🐛 Common Issues & Solutions

### Issue: Webhook not receiving events
**Solution:**
1. Make sure Stripe CLI is running
2. Verify webhook secret in `.env` matches CLI output
3. Check server logs for webhook errors
4. Ensure webhook route is registered BEFORE body-parser

### Issue: Payment succeeds but order status not updated
**Solution:**
1. Check webhook endpoint is accessible
2. Verify webhook signature validation
3. Check server logs for webhook processing errors
4. Ensure MongoDB connection is active

### Issue: CORS error on checkout
**Solution:**
1. Verify `CLIENT_URL` in `.env` is `http://localhost:3001`
2. Restart server after `.env` changes

### Issue: Cart cleared before payment
**Solution:**
- Cart is stored in React Context (in-memory)
- Refreshing page will clear cart
- For production, implement localStorage or session storage

## 📊 MongoDB Queries for Verification

Connect to MongoDB Atlas or use MongoDB Compass:

```javascript
// Find all orders
db.orders.find()

// Find pending orders
db.orders.find({ paymentStatus: "pending" })

// Find successful orders
db.orders.find({ paymentStatus: "success" })

// Find orders by email
db.orders.find({ email: "test@example.com" })

// Count total orders
db.orders.countDocuments()

// Get latest order
db.orders.find().sort({ createdAt: -1 }).limit(1)
```

## 🎯 Success Criteria

✅ All phases implemented  
✅ Products display correctly  
✅ Cart functionality works  
✅ Email validation works  
✅ Stripe checkout creates session  
✅ Orders saved to MongoDB  
✅ Webhooks update order status  
✅ Success page displays after payment  
✅ No console errors  
✅ MongoDB connection stable  

## 📸 Expected Screenshots

1. **Homepage**: Product grid with 3 items
2. **Navbar**: Cart icon with badge count
3. **Cart Page**: Items with quantity controls
4. **Stripe Checkout**: Payment form with products
5. **Success Page**: Green checkmark and thank you message
6. **MongoDB**: Orders collection with documents

## 🔗 Important URLs

- Frontend: http://localhost:3001
- Backend: http://localhost:5000
- API Health: http://localhost:5000/
- Stripe Dashboard: https://dashboard.stripe.com/test/payments
- MongoDB Atlas: https://cloud.mongodb.com/

## 📝 Notes

- Always use Stripe test mode keys
- Test cards never charge real money
- Webhook events may take 1-2 seconds to process
- Check server console for real-time logs
- Use browser DevTools Network tab to debug API calls

---

**All features are implemented and ready for testing! 🚀**
