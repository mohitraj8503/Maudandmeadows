# Vercel Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/new
2. Import your GitHub repository: `mohitraj8503/Maudandmeadows`
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.railway.app`)

5. Click "Deploy"

#### Option 2: Deploy via CLI
```bash
cd frontend
vercel --prod
```

### Environment Variables
Set these in Vercel Dashboard → Settings → Environment Variables:
- `VITE_API_URL`: Your backend API URL

## Backend Deployment

The backend needs to be deployed separately. Recommended platforms:

### Railway (Recommended)
1. Go to https://railway.app
2. Create new project from GitHub repo
3. Select `backend` directory as root
4. Add environment variables:
   - `MONGODB_URL`
   - `DATABASE_NAME`
   - `FRONTEND_URL`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
5. Railway will auto-detect Python and deploy

### Render
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m resort_backend.main`
5. Add environment variables

### Heroku
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URL=your_mongodb_url
heroku config:set DATABASE_NAME=resort_db
git push heroku main
```

## Post-Deployment

1. Update frontend `VITE_API_URL` to point to your deployed backend
2. Update backend `FRONTEND_URL` to point to your Vercel deployment
3. Configure CORS in backend to allow your Vercel domain
4. Test all functionality

## Troubleshooting

### Frontend Issues
- Check build logs in Vercel dashboard
- Verify environment variables are set correctly
- Ensure API URL doesn't have trailing slash

### Backend Issues
- Check application logs
- Verify MongoDB connection string
- Ensure all environment variables are set
- Check CORS configuration

## Continuous Deployment

Both platforms support automatic deployments:
- Push to `main` branch triggers production deployment
- Push to other branches can trigger preview deployments

Configure branch protection and deployment settings in respective dashboards.
