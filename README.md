# Maud & Meadows - Complete Full-Stack Application
## mohitraj-edits

**Single Unified Folder** - All frontend + backend files merged together

---

## 🎯 What's This?

This is a **complete, production-ready full-stack application** with:
- ✅ React Frontend (in `src/`)
- ✅ FastAPI Backend (in `resort_backend/` and `api/`)
- ✅ All dependencies
- ✅ All documentation
- ✅ Ready to deploy to Vercel

**Everything you need is in THIS ONE FOLDER!**

---

## 📁 Folder Structure

```
mohitraj-edits/
├── src/                      # React Frontend Code
├── resort_backend/           # Python Backend Code
├── api/                      # Vercel Serverless API
├── public/                   # Static Assets
├── docs/                     # Documentation
├── package.json              # Frontend Dependencies
├── requirements.txt          # Backend Dependencies
├── vercel.json              # Deployment Config
└── README.md                # This file
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

### 2. Set Environment Variables

Create `.env` file:
```env
VITE_API_URL=http://localhost:8000
MONGODB_URL=your_mongodb_url
DATABASE_NAME=resort_db
```

### 3. Run Locally

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
python -m resort_backend.main
```

---

## 🌐 Deploy to Vercel

```bash
vercel --prod
```

That's it! One command deploys everything.

---

## 📊 What's Included

### Frontend
- React 18 + Vite
- Tailwind CSS + Shadcn UI
- Framer Motion animations
- TanStack Query
- React Router
- TypeScript

### Backend
- FastAPI
- MongoDB integration
- Razorpay payments
- JWT authentication
- RESTful API
- Swagger docs

### Features
- Guest booking system
- Admin dashboard
- Cottage management
- Wellness programs
- Dining menu
- Gallery
- Reviews
- Payments

---

## 🔧 Environment Variables

### Required
- `MONGODB_URL` - MongoDB connection string
- `DATABASE_NAME` - Database name (default: resort_db)
- `VITE_API_URL` - Backend API URL

### Optional
- `RAZORPAY_KEY_ID` - For payments
- `RAZORPAY_KEY_SECRET` - For payments
- `FRONTEND_URL` - For CORS

---

## 📚 Documentation

All documentation is in the `docs/` folder:
- `DEPLOYMENT.md` - How to deploy
- `ENVIRONMENT_VARIABLES.md` - Environment setup
- `STRUCTURE.md` - Code structure
- `BACKEND_ENV.txt` - Backend env template
- `VERCEL_ENV.txt` - Vercel env template

---

## 🎉 Status

✅ **Production Ready**  
✅ **Fully Tested**  
✅ **Deployed & Live**  
✅ **Complete Documentation**  

---

## 🌐 Live Demo

**URL**: https://frontend-flame-delta-12.vercel.app

---

## 👨‍💻 Author

**Mohit Raj**  
GitHub: [@mohitraj8503](https://github.com/mohitraj8503)

---

## 📝 License

Proprietary - All rights reserved

---

**Last Updated**: January 6, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
