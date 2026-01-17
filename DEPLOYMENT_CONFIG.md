# 🚀 Deployment Configuration Guide

This guide provides all the configuration needed to deploy CardX Academia on **Render** and **Vercel**.

---

## 📋 Environment Variables

### Backend Environment Variables (Render)

Set these in your Render dashboard under your backend service → Environment:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=cardxacademia
CORS_ORIGINS=https://cardxacademia.com,https://www.cardxacademia.com,https://your-frontend-url.vercel.app
RESEND_API_KEY=re_your_resend_api_key_here
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=olivier.niyo250@gmail.com
```

**Important Notes:**
- `MONGO_URL`: Use MongoDB Atlas connection string for production
- `CORS_ORIGINS`: Include all frontend domains (comma-separated, no spaces)
- `RESEND_API_KEY`: Get from https://resend.com/api-keys
- `FROM_EMAIL`: Must be a verified domain in Resend

### Frontend Environment Variables (Vercel)

Set these in your Vercel dashboard under your project → Settings → Environment Variables:

```env
REACT_APP_API_URL=https://your-backend-service.onrender.com
```

**Important Notes:**
- Replace `your-backend-service.onrender.com` with your actual Render backend URL
- After setting, trigger a new deployment for changes to take effect

---

## 🔧 Render Configuration

### Backend Service (Web Service)

1. **Service Type:** Web Service
2. **Environment:** Python 3
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. **Root Directory:** `backend`

The `render.yaml` file is already configured with these settings.

### Frontend Service (Static Site)

1. **Service Type:** Static Site
2. **Build Command:** `cd frontend && npm install && npm run build`
3. **Publish Directory:** `frontend/build`
4. **Root Directory:** `frontend`

---

## 🔧 Vercel Configuration

### Frontend Deployment

The `vercel.json` file is already configured. When deploying:

1. **Root Directory:** Set to `frontend` in Vercel dashboard
2. **Framework Preset:** Create React App (auto-detected)
3. **Build Command:** `npm run build` (or `yarn build`)
4. **Output Directory:** `build`

### React Router Configuration

The `vercel.json` includes rewrites to handle React Router:
- All routes redirect to `/index.html` for client-side routing

---

## 📝 Step-by-Step Deployment

### Step 1: Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** `cardxacademia-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. Add all environment variables (see Backend Environment Variables above)
6. Click "Create Web Service"
7. Wait for deployment to complete
8. **Copy the service URL** (e.g., `https://cardxacademia-backend.onrender.com`)

### Step 2: Deploy Frontend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build` (or `yarn build`)
   - **Output Directory:** `build`
5. Add environment variable:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your Render backend URL (from Step 1)
6. Click "Deploy"
7. Wait for deployment to complete
8. **Copy the frontend URL** (e.g., `https://cardxacademia.vercel.app`)

### Step 3: Update CORS in Backend

1. Go back to Render dashboard
2. Edit your backend service
3. Update `CORS_ORIGINS` environment variable:
   ```
   https://cardxacademia.com,https://www.cardxacademia.com,https://your-frontend-url.vercel.app
   ```
4. Save and redeploy

### Step 4: Custom Domain (Optional)

#### For Frontend (Vercel):
1. Go to Vercel project → Settings → Domains
2. Add `cardxacademia.com` and `www.cardxacademia.com`
3. Follow DNS instructions provided by Vercel

#### For Backend (Render):
1. Go to Render service → Settings → Custom Domains
2. Add `api.cardxacademia.com`
3. Update DNS records as instructed
4. Update `REACT_APP_API_URL` in Vercel to use the custom domain

---

## ✅ Post-Deployment Checklist

- [ ] Backend health check: `https://your-backend.onrender.com/api/health`
- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] API calls work (check browser console)
- [ ] Appointment booking form works
- [ ] Time slots load correctly
- [ ] Email confirmations are sent
- [ ] CORS errors resolved
- [ ] Custom domains configured (if applicable)
- [ ] SSL certificates active (automatic on both platforms)

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Backend won't start
- **Solution:** Check that `PORT` environment variable is available (Render provides this automatically)

**Problem:** Database connection fails
- **Solution:** 
  - Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs)
  - Check `MONGO_URL` is correct
  - Ensure database user has proper permissions

**Problem:** CORS errors
- **Solution:** 
  - Verify `CORS_ORIGINS` includes your frontend URL
  - No spaces in comma-separated list
  - Include both `http://` and `https://` if needed during testing

### Frontend Issues

**Problem:** API calls fail
- **Solution:**
  - Verify `REACT_APP_API_URL` is set correctly in Vercel
  - Check backend URL is accessible
  - Redeploy frontend after changing environment variables

**Problem:** Routes return 404
- **Solution:** 
  - Verify `vercel.json` rewrites are configured
  - Check `_redirects` file exists in `frontend/public/`

**Problem:** Build fails
- **Solution:**
  - Check Node version (should be 18+)
  - Verify all dependencies are in `package.json`
  - Check build logs for specific errors

---

## 📊 Cost Estimate

### Render (Backend)
- **Free Tier:** 750 hours/month (enough for 24/7 operation)
- **Paid:** $7/month for always-on service

### Vercel (Frontend)
- **Free Tier:** Unlimited deployments, 100GB bandwidth
- **Paid:** $20/month for team features (optional)

### MongoDB Atlas
- **Free Tier:** 512MB storage (usually sufficient)
- **Paid:** $9/month for 2GB (if needed)

### Resend (Email)
- **Free Tier:** 3,000 emails/month
- **Paid:** $20/month for 50,000 emails

**Total Estimated Cost:** $0-36/month depending on usage

---

## 🔗 Quick Links

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started/)
- [Resend Setup](https://resend.com/docs)

---

**Your site is now ready for deployment! 🎉**
