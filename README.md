# 🛒 MERN E-Commerce with Stripe Integration

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js (MERN), featuring Stripe payment integration and webhook handling.

## ✨ Features

### Phase 1: Setup & Configuration ✅
- Express.js server with MongoDB Atlas connection
- Environment variables configuration
- CORS and body-parser middleware
- Stripe integration setup

### Phase 2: Frontend Product UI ✅
- React product listing with mock data
- Global Cart Context for state management
- Add to cart functionality
- Real-time cart count in navbar
- Responsive product grid

### Phase 3: Cart & Checkout Flow ✅
- Shopping cart page with quantity controls
- Email validation
- Axios integration for API calls
- Checkout flow with Stripe redirect

### Phase 4: Stripe Checkout Integration ✅
- Stripe Checkout Session creation
- Dynamic product line items
- Success/Cancel URL handling
- INR currency support

### Phase 5: Webhook & Order Management ✅
- MongoDB Order model
- Webhook endpoint for Stripe events
- Payment status tracking (pending/success/failed)
- Order persistence in database

## 🚀 Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Stripe SDK
- Dotenv for environment variables

## 📁 Project Structure

```
sumant-assignment-task/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartPage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductList.jsx
│   │   │   └── SuccessPage.jsx
│   │   ├── context/
│   │   │   └── CartContext.js
│   │   ├── utils/
│   │   │   └── axios.js
│   │   ├── App.js
│   │   ├── mockData.js
│   │   └── index.js
│   └── package.json
│
└── server/                    # Node.js backend
    ├── config/
    │   └── db.js             # MongoDB connection
    ├── models/
    │   └── Order.js          # Order schema
    ├── routes/
    │   ├── checkoutRoutes.js # Checkout API
    │   └── webhookRoutes.js  # Webhook handler
    ├── .env                  # Environment variables
    ├── .env.example          # Environment template
    ├── server.js             # Express app
    └── package.json
```

## ⚙️ Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
CLIENT_URL=http://localhost:3001
```

## 📦 Installation

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm start
```

## 🔧 API Endpoints

### Checkout Routes
- **POST** `/api/checkout/create-checkout-session`
  - Body: `{ cartItems, email }`
  - Returns: `{ url, orderId }`

### Webhook Routes
- **POST** `/api/webhook/webhook`
  - Stripe webhook endpoint
  - Handles: `checkout.session.completed`, `payment_intent.payment_failed`

- **GET** `/api/webhook/order/:sessionId`
  - Get order by Stripe session ID

- **GET** `/api/webhook/orders`
  - Get all orders (for admin/testing)

## 🎯 Stripe Webhook Events Handled

1. **checkout.session.completed**
   - Updates order status to `success`
   - Stores payment intent ID

2. **payment_intent.payment_failed**
   - Updates order status to `failed`

3. **checkout.session.async_payment_failed**
   - Updates order status to `failed`

## 🧪 Testing Stripe Webhooks

### Option 1: Stripe CLI (Recommended for local testing)

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login to Stripe:
   ```bash
   stripe login
   ```
3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:5000/api/webhook/webhook
   ```
4. Copy the webhook signing secret (whsec_...) to `.env` as `STRIPE_WEBHOOK_SECRET`

### Option 2: Using ngrok (For production-like testing)

1. Install ngrok: https://ngrok.com/
2. Start ngrok:
   ```bash
   ngrok http 5000
   ```
3. Copy the HTTPS URL
4. Go to Stripe Dashboard → Webhooks → Add endpoint
5. Add endpoint: `https://your-ngrok-url/api/webhook/webhook`
6. Select events: `checkout.session.completed`, `payment_intent.payment_failed`
7. Copy webhook signing secret to `.env`

## 💳 Stripe Test Cards

Use these test card numbers in Stripe Checkout:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0027 6000 3184

Expiry: Any future date  
CVC: Any 3 digits  
ZIP: Any 5 digits

## 🗃️ Database Schema

### Order Model
```javascript
{
  email: String (required),
  items: Array (required),
  totalAmount: Number (required),
  paymentStatus: String (enum: pending/success/failed),
  transactionId: String (required),
  stripeSessionId: String,
  paymentIntentId: String,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🌐 Application Flow

1. User browses products on homepage
2. User adds products to cart
3. User navigates to cart page
4. User enters email and clicks "Proceed to Checkout"
5. Backend creates Stripe Checkout Session and saves order as `pending`
6. User is redirected to Stripe payment page
7. User completes payment
8. Stripe sends webhook to backend
9. Backend updates order status to `success`
10. User is redirected to success page

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure your IP is whitelisted in MongoDB Atlas
- Check if password contains special characters (URL encode them)
- Verify connection string format

### Stripe Webhook Not Working
- Ensure webhook secret is correctly set in `.env`
- Check if webhook endpoint is registered in Stripe Dashboard
- Use Stripe CLI for local testing
- Verify webhook route is before body-parser middleware in `server.js`

### CORS Errors
- Ensure `CLIENT_URL` in `.env` matches your frontend URL
- Check CORS middleware is properly configured

## 📝 License

MIT

## 👨‍💻 Author

Sumant - MERN Stack Developer

---

**Happy Coding! 🚀**
