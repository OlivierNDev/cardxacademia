# 🚀 CardX Academia - Complete Deployment Guide

## 📋 Tech Stack Summary

### **Frontend**
- **Framework:** React 19.0.0
- **Build Tool:** Create React App (CRA) with CRACO
- **Routing:** React Router DOM 7.5.1
- **Styling:** Tailwind CSS 3.4.17
- **UI Components:** Radix UI (comprehensive component library)
- **Icons:** Lucide React
- **HTTP Client:** Axios 1.8.4
- **Form Handling:** React Hook Form 7.56.2
- **Date Handling:** date-fns 4.1.0
- **Package Manager:** Yarn 1.22.22

### **Backend**
- **Framework:** FastAPI 0.110.1
- **Server:** Uvicorn 0.25.0 (ASGI server)
- **Database:** MongoDB (via Motor 3.3.1 - async driver)
- **Email Service:** Resend 2.0.0
- **Validation:** Pydantic 2.6.4
- **Timezone:** pytz 2024.1
- **Language:** Python 3.8+

### **Infrastructure Requirements**
- **Database:** MongoDB (local or MongoDB Atlas)
- **Email:** Resend API account
- **Domain:** cardxacademia.com (you have this)
- **Hosting:** 
  - Frontend: Static hosting (Vercel, Netlify, AWS S3, etc.)
  - Backend: Python hosting (Railway, Render, DigitalOcean, AWS, etc.)

---

## 📁 Project Structure

```
cardxacademia/
├── frontend/              # React application
│   ├── public/           # Static files (logo, videos)
│   │   └── videos/       # Testimonial videos
│   ├── src/
│   │   ├── components/   # React components (58 files)
│   │   ├── pages/        # Page components (13 files)
│   │   ├── services/     # API service layer
│   │   └── data/         # Mock data
│   ├── package.json      # Frontend dependencies
│   └── tailwind.config.js
│
├── backend/              # FastAPI application
│   ├── server.py        # Main API server
│   ├── services/
│   │   └── email_service.py
│   ├── requirements.txt # Python dependencies
│   └── .env            # Environment variables (create this)
│
└── testimony/           # Video files (source)
```

---

## 🌐 Deployment Options

### **Option 1: Recommended (Easiest)**
- **Frontend:** Vercel or Netlify (free, automatic deployments)
- **Backend:** Railway or Render (free tier available)
- **Database:** MongoDB Atlas (free tier)

### **Option 2: Professional**
- **Frontend:** AWS S3 + CloudFront
- **Backend:** AWS EC2 or Elastic Beanstalk
- **Database:** MongoDB Atlas

### **Option 3: Budget-Friendly**
- **Frontend:** Netlify (free)
- **Backend:** DigitalOcean Droplet ($6/month)
- **Database:** MongoDB Atlas (free tier)

---

## 📝 Pre-Deployment Checklist

### ✅ Required Accounts
- [ ] MongoDB Atlas account (free tier)
- [ ] Resend account (for emails)
- [ ] Domain DNS access (cardxacademia.com)
- [ ] Hosting provider accounts (Vercel/Netlify + Railway/Render)

### ✅ Environment Variables Needed

**Backend `.env` file:**
```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=cardxacademia
CORS_ORIGINS=https://cardxacademia.com,https://www.cardxacademia.com
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=olivier.niyo250@gmail.com
```

**Frontend Environment Variables:**
```env
REACT_APP_API_URL=https://api.cardxacademia.com
# OR
REACT_APP_BACKEND_URL=https://api.cardxacademia.com
```

---

## 🚀 Step-by-Step Deployment Guide

### **Phase 1: Database Setup (MongoDB Atlas)**

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free account
   - Create a new cluster (free tier: M0)

2. **Configure Database**
   - Create database user
   - Whitelist IP addresses (or 0.0.0.0/0 for all)
   - Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/`

3. **Update Backend `.env`**
   ```env
   MONGO_URL=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/
   DB_NAME=cardxacademia
   ```

---

### **Phase 2: Backend Deployment**

#### **Option A: Railway (Recommended - Easy)**

1. **Sign up at Railway.app**
   - Connect GitHub account
   - Create new project

2. **Deploy Backend**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Select `backend` folder as root
   - Railway auto-detects Python

3. **Configure Environment Variables**
   - Go to project settings → Variables
   - Add all variables from `.env` file:
     ```
     MONGO_URL=mongodb+srv://...
     DB_NAME=cardxacademia
     CORS_ORIGINS=https://cardxacademia.com
     RESEND_API_KEY=re_...
     FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
     ADMIN_EMAIL=olivier.niyo250@gmail.com
     ```

4. **Set Start Command**
   - In Railway settings, set start command:
     ```
     uvicorn server:app --host 0.0.0.0 --port $PORT
     ```

5. **Get Backend URL**
   - Railway provides: `https://your-app.railway.app`
   - Note this URL for frontend configuration

#### **Option B: Render**

1. **Sign up at Render.com**
2. **Create Web Service**
   - Connect GitHub repo
   - Select `backend` folder
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
3. **Add Environment Variables** (same as Railway)
4. **Get Backend URL**: `https://your-app.onrender.com`

---

### **Phase 3: Frontend Deployment**

#### **Option A: Vercel (Recommended)**

1. **Sign up at Vercel.com**
   - Connect GitHub account

2. **Import Project**
   - Click "New Project"
   - Select your repository
   - Set root directory: `frontend`

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build` (or `yarn build`)
   - Output Directory: `build`
   - Install Command: `npm install` (or `yarn install`)

4. **Add Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   # OR
   REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Vercel provides: `https://your-app.vercel.app`

#### **Option B: Netlify**

1. **Sign up at Netlify.com**
2. **New Site from Git**
   - Connect GitHub
   - Select repository
   - Base directory: `frontend`
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `build`
3. **Add Environment Variables** (same as Vercel)
4. **Deploy**

---

### **Phase 4: Domain Configuration**

#### **For Frontend (cardxacademia.com)**

**Vercel:**
1. Go to project settings → Domains
2. Add `cardxacademia.com` and `www.cardxacademia.com`
3. Update DNS records as instructed:
   - Add A record: `@` → Vercel IP
   - Add CNAME: `www` → cname.vercel-dns.com

**Netlify:**
1. Go to Domain settings
2. Add custom domain: `cardxacademia.com`
3. Follow DNS instructions

#### **For Backend (api.cardxacademia.com - Optional)**

**Railway:**
1. Go to project settings → Domains
2. Add custom domain: `api.cardxacademia.com`
3. Update DNS:
   - Add CNAME: `api` → your-railway-domain.railway.app

**Render:**
1. Go to service settings → Custom Domains
2. Add domain: `api.cardxacademia.com`
3. Follow DNS instructions

#### **DNS Records Summary**

Add these DNS records in your domain provider:

```
Type    Name    Value
A       @       [Vercel/Netlify IP]
CNAME   www     [Vercel/Netlify CNAME]
CNAME   api     [Backend service URL]
```

---

### **Phase 5: Update Frontend API URL**

After backend is deployed:

1. **Update Frontend Environment Variable**
   - In Vercel/Netlify dashboard
   - Go to Environment Variables
   - Update `REACT_APP_API_URL` to your backend URL
   - Redeploy frontend

2. **Or Update `frontend/src/services/api.js`**
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 
                        process.env.REACT_APP_BACKEND_URL || 
                        'https://api.cardxacademia.com';
   ```

---

### **Phase 6: Final Configuration**

1. **Update CORS in Backend**
   - Ensure `CORS_ORIGINS` includes:
     ```
     https://cardxacademia.com,https://www.cardxacademia.com
     ```

2. **Test Deployment**
   - Visit: https://cardxacademia.com
   - Test appointment booking
   - Test form submissions
   - Check email delivery

3. **SSL/HTTPS**
   - Vercel/Netlify: Automatic SSL (free)
   - Railway/Render: Automatic SSL (free)

---

## 🔧 Production Optimizations

### **Frontend**
1. **Build Optimization**
   ```bash
   cd frontend
   npm run build
   # Creates optimized build in /build folder
   ```

2. **Environment Variables**
   - Use production API URL
   - Enable production mode

3. **Performance**
   - Images optimized
   - Code splitting enabled
   - Lazy loading for routes

### **Backend**
1. **Production Server**
   ```bash
   uvicorn server:app --host 0.0.0.0 --port $PORT --workers 4
   ```

2. **Security**
   - Use environment variables (never commit `.env`)
   - Enable CORS only for your domain
   - Use HTTPS only

3. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor API response times
   - Database connection pooling

---

## 📊 Cost Estimate

### **Free Tier (Recommended Start)**
- **Frontend (Vercel/Netlify):** FREE
- **Backend (Railway/Render):** FREE (limited hours/month)
- **MongoDB Atlas:** FREE (512MB storage)
- **Resend:** FREE (3,000 emails/month)
- **Domain:** Your existing domain
- **Total:** $0/month

### **Production Tier**
- **Frontend:** $0-20/month
- **Backend:** $5-20/month
- **MongoDB Atlas:** $0-9/month (free tier usually sufficient)
- **Resend:** $0-20/month (based on email volume)
- **Total:** ~$5-70/month

---

## 🐛 Troubleshooting

### **Frontend Issues**
- **Build fails:** Check Node version (use Node 18+)
- **API calls fail:** Verify `REACT_APP_API_URL` is set
- **Routing issues:** Ensure all routes redirect to `index.html`

### **Backend Issues**
- **Database connection fails:** Check MongoDB Atlas IP whitelist
- **CORS errors:** Verify `CORS_ORIGINS` includes frontend domain
- **Email not sending:** Verify Resend API key is correct

### **Domain Issues**
- **DNS not propagating:** Wait 24-48 hours
- **SSL certificate:** Usually automatic, wait a few minutes

---

## 📞 Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **FastAPI Docs:** https://fastapi.tiangolo.com
- **React Docs:** https://react.dev

---

## ✅ Post-Deployment Checklist

- [ ] Frontend accessible at https://cardxacademia.com
- [ ] Backend API responding at backend URL
- [ ] Appointment booking works
- [ ] Email confirmations sending
- [ ] All forms submitting correctly
- [ ] Videos loading properly
- [ ] Social media links working
- [ ] Mobile responsive design verified
- [ ] SSL certificate active (HTTPS)
- [ ] Analytics tracking (optional)

---

## 🎯 Quick Start Commands

### **Local Development**
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8000

# Frontend
cd frontend
npm install
npm start
```

### **Production Build**
```bash
# Frontend
cd frontend
npm run build
# Deploy /build folder

# Backend
# Deploy entire backend folder
# Set environment variables in hosting platform
```

---

**Your site is ready to deploy! 🚀**

For domain: **cardxacademia.com**
