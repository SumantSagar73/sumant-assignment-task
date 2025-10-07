# ⚡ QUICK START GUIDE

## 🎯 Current Status

✅ **Backend Server:** Running on http://localhost:5000  
✅ **Frontend Client:** Running on http://localhost:3001  
✅ **MongoDB:** Connected to Atlas  
✅ **Stripe:** Configured with test keys  

---

## 🚀 How to Test the Application RIGHT NOW

### Step 1: Open the App
```
Open your browser and go to:
http://localhost:3001
```

### Step 2: Shop & Add to Cart
1. You'll see 3 products (T-Shirt, Sneakers, Cap)
2. Click "Add to Cart" on any product
3. Notice the cart count badge appears in the navbar

### Step 3: View Your Cart
1. Click the cart icon (🛒) in the navbar
2. See all your items
3. Try the +/- buttons to change quantities
4. Watch the total price update

### Step 4: Checkout
1. Enter your email (e.g., `test@example.com`)
2. Click "Proceed to Checkout"
3. You'll be redirected to Stripe's payment page

### Step 5: Complete Payment
1. Use this test card number: `4242 4242 4242 4242`
2. Expiry: Any future date (e.g., `12/25`)
3. CVC: Any 3 digits (e.g., `123`)
4. ZIP: Any 5 digits (e.g., `12345`)
5. Click "Pay"

### Step 6: Success!
1. You'll be redirected to the success page
2. See the green checkmark ✓
3. Your cart is now empty
4. Order is saved in MongoDB!

---

## 🔍 Verify Order in Database

### Option 1: MongoDB Atlas Dashboard
1. Go to https://cloud.mongodb.com/
2. Login with your credentials
3. Browse Collections → `orders`
4. See your newly created order

### Option 2: API Call
```bash
# Get all orders
curl http://localhost:5000/api/webhook/orders
```

Or open in browser:
```
http://localhost:5000/api/webhook/orders
```

---

## 🧪 Test Stripe Webhooks (Optional)

### Install Stripe CLI
1. Download from: https://stripe.com/docs/stripe-cli
2. Install and login:
```bash
stripe login
```

### Forward Webhooks to Local Server
```bash
stripe listen --forward-to localhost:5000/api/webhook/webhook
```

### Update Webhook Secret
1. Copy the webhook signing secret from the CLI output (starts with `whsec_`)
2. Open `server/.env`
3. Update `STRIPE_WEBHOOK_SECRET=whsec_your_secret_here`
4. Server will auto-restart (nodemon)

### Test Payment with Webhooks
1. Make a test payment as described above
2. Watch the Stripe CLI terminal - you'll see events!
3. Check server console - you'll see "Order payment successful"
4. Check MongoDB - order status changed to "success"

---

## 📱 Available Routes

### Frontend Routes
- `/` - Homepage with products
- `/cart` - Shopping cart
- `/success` - Payment success page

### Backend Routes
- `GET /` - Health check
- `POST /api/checkout/create-checkout-session` - Create payment
- `POST /api/webhook/webhook` - Stripe webhooks
- `GET /api/webhook/orders` - List all orders
- `GET /api/webhook/order/:sessionId` - Get specific order

---

## 🎨 Product List

| Product  | Price  | Description |
|----------|--------|-------------|
| T-Shirt  | ₹999   | Cotton tee  |
| Sneakers | ₹2499  | Sports shoes|
| Cap      | ₹499   | Baseball cap|

---

## 🐛 Troubleshooting

### Frontend not loading?
```bash
cd client
npm start
```

### Backend not responding?
```bash
cd server
npm run dev
```

### Both servers stop?
Check if ports 3001 and 5000 are available:
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3001
```

### Clear Cart Not Working?
- It's working! The cart is in memory (React Context)
- Refresh page will also clear it

---

## ✅ What's Working

✓ Product display  
✓ Add to cart  
✓ Cart count badge  
✓ Quantity controls  
✓ Email validation  
✓ Stripe checkout  
✓ Payment processing  
✓ Order creation  
✓ Success redirect  
✓ Cart clearing  
✓ Webhook handling (with Stripe CLI)  
✓ MongoDB persistence  

---

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add product categories
- [ ] Implement user authentication
- [ ] Add product search
- [ ] Implement discount codes
- [ ] Add order history page
- [ ] Email notifications
- [ ] Payment receipts
- [ ] Product reviews
- [ ] Admin dashboard
- [ ] Deploy to production

---

## 📞 Support

If something's not working:

1. **Check server console** - Look for errors
2. **Check browser console** - Press F12
3. **Check network tab** - See API calls
4. **Verify .env file** - All variables set correctly
5. **Restart both servers** - `npm run dev` and `npm start`

---

## 🎉 Enjoy Your MERN E-Commerce App!

**You now have a fully functional e-commerce application with:**
- Product listing ✅
- Shopping cart ✅
- Stripe payments ✅
- Order management ✅
- Database persistence ✅

**Happy Shopping! 🛍️**

---

*Pro Tip: Open MongoDB Compass and connect to your Atlas cluster to see orders in real-time!*
