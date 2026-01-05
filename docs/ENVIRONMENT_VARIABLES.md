# Environment Variables Guide

This document lists all required environment variables for the Maud & Meadows platform.

## Frontend Environment Variables

### Local Development (.env)
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:8000
```

### Vercel Production
Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_URL` | `https://your-backend-url.com` | Your deployed backend API URL (Railway/Render/Heroku) |

**Important**: 
- Do NOT include trailing slash in the URL
- Example: `https://maudandmeadows-backend.railway.app`
- NOT: `https://maudandmeadows-backend.railway.app/`

---

## Backend Environment Variables

### Local Development (.env)
Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/
DATABASE_NAME=resort_db

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Payment Gateway (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Optional: Admin API Key
ADMIN_API_KEY=your_secure_admin_key
```

### Production Deployment (Railway/Render/Heroku)

Set these in your deployment platform's environment variables section:

#### Required Variables:

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `MONGODB_URL` | `mongodb+srv://user:pass@cluster.mongodb.net/` | MongoDB connection string |
| `DATABASE_NAME` | `resort_db` | Database name in MongoDB |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |

#### Payment Integration (Required for bookings):

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `RAZORPAY_KEY_ID` | `rzp_live_xxxxx` or `rzp_test_xxxxx` | Razorpay API Key ID |
| `RAZORPAY_KEY_SECRET` | `your_secret_key` | Razorpay API Secret |

#### Optional Variables:

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `ADMIN_API_KEY` | `your_secure_key` | Admin API authentication key |
| `ENVIRONMENT` | `production` | Environment identifier |

---

## How to Get These Values

### 1. MongoDB Connection String

**Option A: MongoDB Atlas (Recommended - Free Tier Available)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Example: `mongodb+srv://admin:mypassword@cluster0.abc123.mongodb.net/`

**Option B: Local MongoDB**
- Use: `mongodb://localhost:27017/`

### 2. Razorpay Credentials

1. Go to https://razorpay.com/
2. Sign up for an account
3. Navigate to Settings → API Keys
4. Generate Test/Live keys
5. Copy both `Key ID` and `Key Secret`

**Test Mode Keys** (for development):
- Start with `rzp_test_`
- Use for testing without real payments

**Live Mode Keys** (for production):
- Start with `rzp_live_`
- Use for real transactions

### 3. Frontend URL

- **Local**: `http://localhost:3000`
- **Production**: Your Vercel deployment URL (e.g., `https://maudandmeadows.vercel.app`)

---

## Setting Environment Variables

### Vercel (Frontend)
1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Key**: Variable name (e.g., `VITE_API_URL`)
   - **Value**: The actual value
   - **Environment**: Select Production, Preview, Development as needed
4. Click **Save**
5. Redeploy your application

### Railway (Backend)
1. Go to your project in Railway Dashboard
2. Click on your service
3. Go to **Variables** tab
4. Click **New Variable**
5. Add each variable (key-value pair)
6. Railway will auto-redeploy

### Render (Backend)
1. Go to your service in Render Dashboard
2. Click **Environment** tab
3. Add each variable in the **Environment Variables** section
4. Click **Save Changes**
5. Render will auto-redeploy

### Heroku (Backend)
```bash
# Via CLI
heroku config:set MONGODB_URL="your_mongodb_url"
heroku config:set DATABASE_NAME="resort_db"
heroku config:set FRONTEND_URL="https://your-app.vercel.app"
heroku config:set RAZORPAY_KEY_ID="your_key_id"
heroku config:set RAZORPAY_KEY_SECRET="your_secret"

# Or via Dashboard
# Settings → Config Vars → Reveal Config Vars → Add
```

---

## Security Best Practices

### ✅ DO:
- Use environment variables for ALL sensitive data
- Use different credentials for development and production
- Keep `.env` files in `.gitignore` (already configured)
- Use strong, unique passwords for MongoDB
- Rotate API keys periodically
- Use Razorpay test keys during development

### ❌ DON'T:
- Commit `.env` files to Git
- Share API keys publicly
- Use production keys in development
- Hardcode credentials in source code
- Use weak passwords

---

## Verification Checklist

### Before Deploying Frontend:
- [ ] Backend is deployed and accessible
- [ ] `VITE_API_URL` points to deployed backend URL
- [ ] No trailing slashes in URLs

### Before Deploying Backend:
- [ ] MongoDB cluster is created and accessible
- [ ] `MONGODB_URL` is correct and tested
- [ ] `FRONTEND_URL` will match Vercel deployment
- [ ] Razorpay keys are valid (test mode for staging)
- [ ] All required variables are set

### After Deployment:
- [ ] Test API connection from frontend
- [ ] Verify CORS is working (no errors in browser console)
- [ ] Test a booking flow end-to-end
- [ ] Check payment integration (use test mode first)
- [ ] Monitor application logs for errors

---

## Troubleshooting

### Frontend can't connect to backend:
- Check `VITE_API_URL` is set correctly
- Verify backend is running and accessible
- Check browser console for CORS errors
- Ensure no trailing slash in API URL

### Backend database connection fails:
- Verify `MONGODB_URL` is correct
- Check MongoDB cluster is running
- Ensure IP whitelist includes your deployment platform
- Test connection string locally first

### Payment integration not working:
- Verify Razorpay keys are correct
- Check if using test/live keys appropriately
- Review Razorpay dashboard for error logs
- Ensure webhook URLs are configured (if using)

### CORS errors:
- Verify `FRONTEND_URL` matches your Vercel domain exactly
- Check backend CORS configuration in `main.py`
- Ensure protocol (http/https) matches

---

## Quick Reference

### Minimum Required for Local Development:
```env
# Frontend
VITE_API_URL=http://localhost:8000

# Backend
MONGODB_URL=mongodb://localhost:27017/
DATABASE_NAME=resort_db
FRONTEND_URL=http://localhost:3000
```

### Minimum Required for Production:
```env
# Frontend (Vercel)
VITE_API_URL=https://your-backend.railway.app

# Backend (Railway/Render/Heroku)
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DATABASE_NAME=resort_db
FRONTEND_URL=https://your-app.vercel.app
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
```

---

## Need Help?

- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Razorpay Docs: https://razorpay.com/docs/
- Vercel Docs: https://vercel.com/docs/concepts/projects/environment-variables
- Railway Docs: https://docs.railway.app/develop/variables
