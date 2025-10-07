# 🎥 Video Demo Script - MERN E-Commerce Application

## 📹 Recording Guidelines

**Duration:** 5-10 minutes  
**Tools:** OBS Studio, Loom, or any screen recorder  
**Resolution:** 1920x1080 (1080p)  
**Audio:** Clear microphone audio explaining each step

---

## 🎬 Demo Script

### Part 1: Introduction (30 seconds)

**Say:**
> "Hello! Today I'm presenting my MERN Stack E-Commerce application with Stripe payment integration. This is a full-stack project featuring React frontend, Node.js/Express backend, MongoDB database, and Stripe for payment processing."

**Show:**
- Project folder structure in VS Code
- README.md opened

---

### Part 2: Backend Setup (1 minute)

**Say:**
> "Let's start with the backend. I'll show the server configuration and MongoDB connection."

**Show:**
1. Open `server/server.js`
2. Highlight key parts:
   - Express setup
   - MongoDB connection
   - Stripe configuration
   - Webhook route placement
3. Open terminal showing:
   ```
   Server running on port 5000
   MongoDB connected
   ```
4. Show `.env` file (blur sensitive keys)
5. Open MongoDB Atlas dashboard showing connected database

---

### Part 3: Database Schema (30 seconds)

**Say:**
> "Here's our Order model that stores all purchase information."

**Show:**
1. Open `server/models/Order.js`
2. Highlight schema fields:
   - email
   - items
   - totalAmount
   - paymentStatus
   - transactionId
3. Show MongoDB Compass with orders collection (if any orders exist)

---

### Part 4: Frontend Overview (1 minute)

**Say:**
> "The frontend is built with React and uses Context API for state management."

**Show:**
1. Open `client/src/App.js` - show routing
2. Open `client/src/context/CartContext.js` - explain cart state
3. Show browser at http://localhost:3001
4. Open DevTools → React Components tab (if available)

---

### Part 5: Product Listing (1 minute)

**Say:**
> "Let me demonstrate the shopping flow. Here we have three products available."

**Show:**
1. Homepage with 3 products
2. Open `client/src/mockData.js` - show product data
3. Hover over products
4. Show product cards styling

---

### Part 6: Add to Cart Flow (1.5 minutes)

**Say:**
> "Now I'll add items to the cart and show the state management."

**Actions:**
1. Click "Add to Cart" on T-Shirt
   - **Point out:** Badge appears in navbar
2. Add Sneakers (2x by clicking twice)
   - **Point out:** Badge count increases to 3
3. Add Cap
   - **Point out:** Badge shows 4 items
4. Open DevTools → React DevTools → Context
   - **Show:** Cart state with items

---

### Part 7: Shopping Cart (2 minutes)

**Say:**
> "Let's view the cart and test the quantity controls."

**Actions:**
1. Click cart icon in navbar
2. Show all items in cart
3. Click "+" on Sneakers
   - **Point out:** Quantity increases, total updates
4. Click "-" on T-Shirt
   - **Point out:** Quantity decreases
5. Scroll to show total price: ₹X,XXX
6. Show email input field

---

### Part 8: Checkout Process (2 minutes)

**Say:**
> "Now I'll complete a test purchase using Stripe's test mode."

**Actions:**
1. Enter email: `demo@example.com`
2. Click "Proceed to Checkout"
3. **Show terminal:** Order created log
4. **Show MongoDB:** New order with "pending" status
5. Stripe Checkout page loads
6. **Point out:**
   - Products listed correctly
   - Total amount matches
   - Email pre-filled
7. Enter test card: `4242 4242 4242 4242`
8. Enter expiry: `12/25`
9. Enter CVC: `123`
10. Enter ZIP: `12345`
11. Click "Pay"

---

### Part 9: Webhook & Success (1.5 minutes)

**Say:**
> "After payment, Stripe sends a webhook event to update the order status."

**Show:**
1. **Terminal (if webhook running):** 
   - Stripe webhook event received
   - `checkout.session.completed`
   - Order payment successful log
2. Success page appears
   - Green checkmark
   - "Thank you for your purchase!"
3. **MongoDB Compass:**
   - Refresh orders collection
   - Show order status changed to "success"
   - Show paymentIntentId populated
4. Click "Continue Shopping"
   - Returns to homepage
   - Cart badge gone (cleared)

---

### Part 10: Cancel Flow (30 seconds)

**Say:**
> "Let me show what happens if a user cancels payment."

**Actions:**
1. Add an item to cart
2. Start checkout with email
3. On Stripe page, click browser back button
4. Cancel page appears
5. Click "Return to Cart"
6. Items still in cart

---

### Part 11: API Testing (1 minute)

**Say:**
> "The backend also provides API endpoints for order management."

**Show:**
1. Open Postman/Thunder Client/Browser
2. GET `http://localhost:5000/api/webhook/orders`
3. Show JSON response with all orders
4. Point out key fields:
   - Order ID
   - Email
   - Items array
   - Total amount
   - Payment status
   - Timestamps

---

### Part 12: Code Highlights (1 minute)

**Say:**
> "Let me highlight some key code implementations."

**Show:**
1. **Checkout Route** (`checkoutRoutes.js`):
   - Order creation
   - Stripe session creation
   - Line items mapping
2. **Webhook Handler** (`webhookRoutes.js`):
   - Signature verification
   - Event handling
   - Order status updates
3. **Cart Context** (`CartContext.js`):
   - Add/Remove functions
   - Total calculations

---

### Part 13: Conclusion (30 seconds)

**Say:**
> "This application demonstrates a complete e-commerce flow with:
> - Product browsing and cart management
> - Secure Stripe payment processing
> - Webhook-based order updates
> - MongoDB persistence
> - Clean React architecture
> 
> Thank you for watching! All code is available on GitHub."

**Show:**
- GitHub repository
- README.md
- Star/Fork buttons

---

## 📋 Pre-Recording Checklist

- [ ] Both servers running (backend & frontend)
- [ ] MongoDB connected
- [ ] Browser at homepage (localhost:3001)
- [ ] Clear cart before starting
- [ ] MongoDB Compass open
- [ ] VS Code with project open
- [ ] Terminal visible
- [ ] Postman/API client ready
- [ ] Test Stripe cards handy
- [ ] DevTools accessible
- [ ] Good microphone audio
- [ ] No sensitive data visible (blur .env)

---

## 🎯 Key Points to Emphasize

1. **Full-stack architecture** - MERN implementation
2. **State management** - React Context API
3. **Payment integration** - Stripe Checkout & Webhooks
4. **Database persistence** - MongoDB with proper schema
5. **Error handling** - Validation and user feedback
6. **Production-ready** - Environment variables, proper structure

---

## 🔧 Troubleshooting During Recording

### If Stripe webhook not working:
- Skip webhook verification temporarily
- Show Stripe Dashboard webhook logs instead
- Explain it would work with CLI/production webhook

### If MongoDB connection fails:
- Show code that handles connection
- Explain retry logic
- Have backup screenshots

### If payment takes long:
- Explain Stripe test mode processing
- Keep talking about implementation
- Show code while waiting

---

## 📤 After Recording

1. **Edit video:**
   - Remove long loading times
   - Add text overlays for key concepts
   - Blur any sensitive information
   - Add intro/outro slides

2. **Upload to:**
   - YouTube (unlisted)
   - Loom
   - Google Drive
   - Vimeo

3. **Add to README:**
   - Video demo link
   - Thumbnail image
   - Timestamp chapters

---

## 🎬 Sample Video Description

```
MERN Stack E-Commerce with Stripe Integration - Full Stack Project

📹 Timestamps:
0:00 - Introduction
0:30 - Backend Setup
1:30 - Database Schema
2:00 - Frontend Overview
3:00 - Product Listing
4:00 - Add to Cart
5:30 - Shopping Cart
7:30 - Checkout Process
9:00 - Webhook & Success
10:30 - API Endpoints
11:30 - Code Highlights
12:30 - Conclusion

🛠️ Tech Stack:
- React 18
- Node.js + Express
- MongoDB Atlas
- Stripe Payments
- React Router
- Axios
- Context API

📁 GitHub: [Add your repo link]
📖 Documentation: Complete README included

#MERN #ReactJS #NodeJS #Stripe #MongoDB #FullStack #WebDevelopment
```

---

**Good luck with your demo! 🎥✨**
