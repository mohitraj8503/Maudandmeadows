# Maudandmeadows Repository Structure

## 📁 Organized Monorepo Layout

```
Maudandmeadows/
│
├── 📱 frontend/                    # React Frontend Application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── admin/            # Admin-specific components
│   │   │   ├── home/             # Home page sections
│   │   │   ├── layout/           # Layout components
│   │   │   └── ui/               # Shadcn UI components
│   │   ├── pages/                # Page components
│   │   │   ├── admin/            # Admin dashboard pages
│   │   │   └── *.tsx             # Guest-facing pages
│   │   ├── lib/                  # Utilities
│   │   │   ├── api-client.ts     # API client
│   │   │   └── utils.ts          # Helper functions
│   │   ├── types/                # TypeScript types
│   │   ├── context/              # React contexts
│   │   └── hooks/                # Custom React hooks
│   ├── public/                   # Static assets
│   ├── tests/                    # Frontend tests
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── vercel.json              # Vercel deployment config
│   └── .env.example             # Environment variables template
│
├── 🔧 backend/                     # FastAPI Backend Application
│   ├── api/                      # Vercel serverless functions
│   │   └── index.py             # Entry point for Vercel
│   ├── routes/                   # API route handlers
│   │   ├── accommodations.py
│   │   ├── bookings.py
│   │   ├── packages.py
│   │   ├── wellness.py
│   │   ├── experiences.py
│   │   ├── gallery.py
│   │   ├── navigation.py
│   │   └── ...
│   ├── lib/                      # Utility libraries
│   │   ├── locks.py             # Locking mechanisms
│   │   ├── webhooks.py          # Webhook handlers
│   │   └── ota_adapters.py      # OTA integrations
│   ├── scripts/                  # Database utilities
│   │   ├── create_indexes.py
│   │   ├── seed_*.py            # Data seeding scripts
│   │   └── ...
│   ├── tests/                    # Backend tests
│   ├── main.py                   # FastAPI application entry
│   ├── database.py               # MongoDB connection
│   ├── models.py                 # Pydantic models
│   ├── utils.py                  # Helper functions
│   ├── requirements.txt          # Python dependencies
│   ├── vercel.json              # Vercel deployment config
│   ├── Procfile                 # For Railway/Heroku
│   ├── runtime.txt              # Python version
│   └── .env.example             # Environment variables template
│
├── 📚 docs/                        # Documentation
│   ├── DEPLOYMENT.md            # Deployment guide
│   ├── ENVIRONMENT_VARIABLES.md # Environment setup guide
│   ├── BACKEND_ENV.txt          # Backend env template
│   └── VERCEL_ENV.txt           # Vercel env template
│
├── 📄 Root Files
│   ├── README.md                # Main project documentation
│   ├── CONTRIBUTING.md          # Contribution guidelines
│   ├── CHANGELOG.md             # Version history
│   ├── LICENSE                  # License file
│   ├── .gitignore              # Git ignore rules
│   └── package.json            # Root package.json (monorepo)
│
└── 🔒 Environment Files (not in git)
    ├── frontend/.env
    └── backend/.env
```

## 🎯 Key Features of This Structure

### ✅ Monorepo Benefits
- **Single Repository**: Both frontend and backend in one place
- **Shared Configuration**: Common git, CI/CD, and documentation
- **Atomic Commits**: Change both frontend and backend together
- **Easier Deployment**: Deploy from single source

### ✅ Clear Separation
- **Frontend**: Complete React application with its own dependencies
- **Backend**: Independent FastAPI application
- **Docs**: Centralized documentation
- **No Duplication**: Clean, organized structure

### ✅ Deployment Ready
- **Vercel**: Both apps configured for Vercel deployment
- **Environment Variables**: Templates provided for all environments
- **Documentation**: Complete guides for setup and deployment

## 🚀 Quick Commands

### Development
```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev

# Run frontend only
npm run dev:frontend

# Run backend only
npm run dev:backend
```

### Deployment
```bash
# Deploy both
npm run deploy

# Deploy frontend only
npm run deploy:frontend

# Deploy backend only
npm run deploy:backend
```

## 📊 Repository Stats

- **Total Files**: ~500+
- **Frontend Components**: 50+
- **Backend Routes**: 15+
- **Documentation**: Comprehensive
- **Tests**: Included
- **Deployment**: Production-ready

## 🔗 Live URLs

- **Frontend**: https://frontend-flame-delta-12.vercel.app
- **Backend**: https://backend-peach-alpha-79.vercel.app
- **GitHub**: https://github.com/mohitraj8503/Maudandmeadows

---

**Last Updated**: January 6, 2026
**Version**: 1.0.0
**Status**: ✅ Production Ready
