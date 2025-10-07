# 🚀 Deployment Guide - MERN E-Commerce Application

## 📋 Table of Contents
1. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment)
2. [Backend Deployment (Render/Heroku)](#backend-deployment)
3. [Database Setup (MongoDB Atlas)](#database-setup)
4. [Stripe Configuration](#stripe-configuration)
5. [Environment Variables](#environment-variables)
6. [Post-Deployment Testing](#post-deployment-testing)

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Prepare the Build:**
```bash
cd client
npm run build
```

2. **Deploy to Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# Project name: mern-ecommerce-client
# Directory: ./client
```

3. **Configure Environment:**
- No environment variables needed for client
- Backend URL will be updated after backend deployment

4. **Get Deployment URL:**
- Vercel will provide: `https://your-app.vercel.app`

### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build and Deploy:**
```bash
cd client
npm run build
netlify deploy --prod
```

3. **Configure:**
- Build command: `npm run build`
- Publish directory: `build`

---

## ⚙️ Backend Deployment

### Option 1: Render (Free Tier Available)

1. **Create Account:** https://render.com

2. **Create New Web Service:**
- Connect GitHub repository
- Root directory: `server`
- Build command: `npm install`
- Start command: `npm start`

3. **Environment Variables:**
Add all variables from `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
CLIENT_URL=https://your-frontend.vercel.app
```

4. **Get Backend URL:**
- Render provides: `https://your-api.onrender.com`

### Option 2: Heroku

1. **Install Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login and Create App:**
```bash
heroku login
cd server
heroku create your-app-name
```

3. **Set Environment Variables:**
```bash
heroku config:set MONGO_URI="your_mongodb_uri"
heroku config:set STRIPE_SECRET_KEY="sk_live_..."
heroku config:set STRIPE_PUBLISHABLE_KEY="pk_live_..."
heroku config:set STRIPE_WEBHOOK_SECRET="whsec_..."
heroku config:set CLIENT_URL="https://your-frontend.vercel.app"
```

4. **Deploy:**
```bash
git push heroku main
```

### Option 3: Railway

1. **Create Account:** https://railway.app

2. **New Project:**
- Import from GitHub
- Select `server` directory

3. **Configure:**
- Start command: `npm start`
- Add environment variables

---

## 🗄️ Database Setup

### MongoDB Atlas (Already Configured)

1. **Whitelist IP Addresses:**
   - MongoDB Atlas → Network Access
   - Add: `0.0.0.0/0` (Allow from anywhere)
   - **Note:** In production, restrict to your server IPs

2. **Create Database User:**
   - Database Access → Add New User
   - Username/Password authentication
   - Grant read/write permissions

3. **Connection String:**
   - Update in backend `.env`
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

---

## 💳 Stripe Configuration

### Switch to Live Mode

1. **Get Live Keys:**
   - Stripe Dashboard → Developers → API Keys
   - Toggle: "Viewing test data" → "Viewing live data"
   - Copy Live keys (start with `sk_live_` and `pk_live_`)

2. **Configure Webhooks:**
   - Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://your-backend.onrender.com/api/webhook/webhook`
   - Select events:
     - `checkout.session.completed`
     - `payment_intent.payment_failed`
     - `checkout.session.async_payment_failed`
   - Copy webhook signing secret (`whsec_...`)

3. **Update Environment Variables:**
   - Backend: Add `STRIPE_WEBHOOK_SECRET`
   - Test webhook: Stripe CLI or Dashboard

---

## 🔧 Environment Variables

### Backend (.env)
```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# Stripe (LIVE KEYS for production)
STRIPE_SECRET_KEY=sk_live_your_actual_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_secret

# Frontend URL
CLIENT_URL=https://your-frontend-app.vercel.app
```

### Frontend
Update `client/src/utils/axios.js`:
```javascript
import axios from 'axios';

export default axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || 'https://your-backend.onrender.com/api'
});
```

Or create `.env` in client:
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 🔄 Update Frontend to Use Production Backend

1. **Update axios.js:**
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 
                process.env.NODE_ENV === 'production' 
                  ? 'https://your-backend.onrender.com/api'
                  : 'http://localhost:5000/api';

export default axios.create({ 
  baseURL: API_URL
});
```

2. **Rebuild and Redeploy Frontend:**
```bash
cd client
npm run build
vercel --prod
```

---

## ✅ Post-Deployment Checklist

### Backend Health Check
- [ ] Visit `https://your-backend.onrender.com/`
- [ ] Should return: `{"message":"Server is running"}`
- [ ] Check logs for "MongoDB connected"

### Frontend Check
- [ ] Visit `https://your-frontend.vercel.app`
- [ ] Products display correctly
- [ ] Can add to cart
- [ ] Cart count updates

### Payment Flow Test
- [ ] Use Stripe test cards in test mode
- [ ] Or use real card in live mode (small amount)
- [ ] Verify redirect to success page
- [ ] Check MongoDB for order creation

### Webhook Verification
- [ ] Make a test payment
- [ ] Check Stripe Dashboard → Webhooks → Logs
- [ ] Verify webhook received (200 status)
- [ ] Check MongoDB: order status = "success"

### Error Monitoring
- [ ] Check Render/Heroku logs for errors
- [ ] Monitor MongoDB Atlas metrics
- [ ] Review Stripe Dashboard for failed payments

---

## 🐛 Common Deployment Issues

### CORS Error
**Problem:** Frontend can't access backend

**Solution:**
```javascript
// server/server.js
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### Webhook Signature Failed
**Problem:** Webhook verification failing

**Solution:**
- Ensure raw body for webhook route
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check webhook endpoint URL matches exactly

### MongoDB Connection Timeout
**Problem:** Can't connect to database

**Solution:**
- Whitelist `0.0.0.0/0` in Network Access
- Check connection string format
- Verify username/password are correct
- URL-encode special characters in password

### Build Fails on Vercel
**Problem:** Frontend build errors

**Solution:**
```bash
# Local test
cd client
npm run build

# Fix any warnings/errors
# Then redeploy
```

---

## 📊 Monitoring & Analytics

### Backend Monitoring
- **Render:** Built-in metrics and logs
- **Heroku:** Heroku Metrics (paid) or LogDNA
- **Alternative:** Use Sentry for error tracking

### Database Monitoring
- **MongoDB Atlas:** Performance metrics
- **Alerts:** Set up for high usage

### Payment Monitoring
- **Stripe Dashboard:** Real-time payment tracking
- **Radar:** Fraud detection (automatic)

---

## 🔒 Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use platform's secret management
   - Rotate keys periodically

2. **HTTPS:**
   - Both Vercel and Render provide HTTPS automatically
   - Verify SSL certificates are valid

3. **Rate Limiting:**
```javascript
// server/server.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

4. **Input Validation:**
   - Already implemented email validation
   - Consider adding Joi or express-validator

5. **MongoDB:**
   - Use least-privilege access
   - Enable MongoDB Atlas encryption
   - Regular backups

---

## 💰 Cost Estimate

### Free Tier Setup
- **Frontend (Vercel):** Free
- **Backend (Render):** Free (with limitations)
- **Database (MongoDB Atlas):** Free (512MB)
- **Stripe:** Pay-as-you-go (transaction fees only)

**Total:** $0/month + Stripe fees (2.9% + 30¢ per transaction)

### Paid Tier (Recommended for Production)
- **Frontend (Vercel Pro):** $20/month
- **Backend (Render Standard):** $7/month
- **Database (MongoDB Atlas M10):** $57/month
- **Stripe:** Same transaction fees

**Total:** ~$84/month + transaction fees

---

## 🚀 Quick Deploy Commands

```bash
# Deploy everything in order

# 1. Deploy Backend
cd server
git push render main  # or heroku main

# 2. Get backend URL and update client
# Update client/src/utils/axios.js with backend URL

# 3. Deploy Frontend
cd ../client
vercel --prod

# 4. Configure Stripe webhook
# Add frontend URL to Stripe Dashboard

# 5. Test end-to-end
# Make a purchase and verify
```

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com/
- **Stripe Integration:** https://stripe.com/docs/payments/checkout

---

## ✅ Deployment Complete!

Your MERN E-Commerce app is now live! 🎉

**Next Steps:**
1. Set up custom domain
2. Add Google Analytics
3. Implement email notifications
4. Add product images to cloud storage
5. Set up automated backups
6. Monitor performance and optimize

---

*Last Updated: October 7, 2025*
