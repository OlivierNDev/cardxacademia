# CardX Academia

A comprehensive platform for Islamic education and pilgrimage services.

## 📁 Project Structure

```
cardxacademia/
├── frontend/          # React frontend (deployed on Vercel)
├── backend/           # FastAPI backend (deployed on Render)
└── render.yaml        # Render deployment configuration
```

## 🚀 Quick Start

### Frontend (Local Development)
```bash
cd frontend
yarn install
yarn start
```

### Backend (Local Development)
```bash
cd backend
pip install -r requirements.txt
uvicorn server:app --host 127.0.0.1 --port 8000
```

## 📚 Documentation

- **MONGODB_ATLAS_FRESH_START.md** - Complete guide to delete and recreate MongoDB Atlas from scratch
- **MONGODB_QUICK_REFERENCE.md** - Quick 5-minute setup checklist for MongoDB Atlas
- **MONGODB_CONNECTION_REPORT.md** - Comprehensive guide for MongoDB connection issues, troubleshooting, and fixes
- **MONGODB_DIAGNOSTIC_SETUP.md** - Diagnostic logging setup for debugging MongoDB connections
- **backend/RUN_BACKEND.md** - Backend setup and running instructions
- **backend/SETUP_EMAIL.md** - Email service configuration guide

## 🔧 Environment Variables

### Backend (Render)
- `MONGO_URL` - MongoDB Atlas connection string
- `CORS_ORIGINS` - Allowed CORS origins (comma-separated)
- `RESEND_API_KEY` - Resend email service API key
- `EMAIL_ONLY_MODE` - Set to `true` to allow bookings to be submitted and emailed without MongoDB persistence
- `PORT` - Server port (automatically set by Render)

### Frontend (Vercel)
- `REACT_APP_API_URL` - Backend API URL (e.g., `https://cardxacademia.onrender.com`)

## 🌐 Deployment

- **Frontend:** Vercel (automatic deployment from GitHub)
- **Backend:** Render (automatic deployment from GitHub)

## 📖 MongoDB Connection Issues?

See **MONGODB_CONNECTION_REPORT.md** for:
- Root cause analysis
- Step-by-step fixes
- Diagnostic checklist
- Common error solutions

## 📧 Support

For deployment issues, check the MongoDB connection report and Render/Vercel logs.
