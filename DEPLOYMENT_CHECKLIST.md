# ✅ Deployment Checklist

Use this checklist to ensure your site is ready for deployment on Render and Vercel.

---

## 📋 Pre-Deployment Checklist

### Code & Configuration
- [x] `render.yaml` configured with backend and frontend services
- [x] `vercel.json` created in frontend directory for React Router support
- [x] `_redirects` file created in `frontend/public/` for Netlify/Vercel
- [x] Proxy removed from `frontend/package.json` (not needed in production)
- [x] API base URL uses environment variables (`REACT_APP_API_URL`)
- [x] No hardcoded localhost URLs in production code
- [x] Backend startup command compatible with Render (`uvicorn server:app --host 0.0.0.0 --port $PORT`)

### Environment Variables Setup

#### Backend (Render)
- [ ] `MONGO_URL` - MongoDB Atlas connection string
- [ ] `DB_NAME` - Database name (default: `cardxacademia`)
- [ ] `CORS_ORIGINS` - Frontend domain(s), comma-separated
- [ ] `RESEND_API_KEY` - Resend API key for emails
- [ ] `FROM_EMAIL` - Sender email (e.g., `CardX Academia <noreply@cardxacademia.com>`)
- [ ] `ADMIN_EMAIL` - Admin notification email

#### Frontend (Vercel)
- [ ] `REACT_APP_API_URL` - Backend API URL (e.g., `https://cardxacademia-backend.onrender.com`)

### External Services
- [ ] MongoDB Atlas account created
- [ ] MongoDB Atlas cluster created and running
- [ ] MongoDB connection string obtained
- [ ] MongoDB IP whitelist configured (add `0.0.0.0/0` for all IPs)
- [ ] Resend account created
- [ ] Resend API key obtained
- [ ] Resend domain verified (if using custom domain)
- [ ] Domain DNS access (for custom domains)

---

## 🚀 Deployment Steps

### Step 1: Deploy Backend on Render
- [ ] Sign up/login to [Render Dashboard](https://dashboard.render.com)
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure service:
  - Name: `cardxacademia-backend`
  - Root Directory: `backend`
  - Environment: `Python 3`
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] Add all backend environment variables
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete
- [ ] Test backend: `https://your-backend.onrender.com/api/health`
- [ ] Copy backend URL for frontend configuration

### Step 2: Deploy Frontend on Vercel
- [ ] Sign up/login to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "Add New..." → "Project"
- [ ] Import GitHub repository
- [ ] Configure project:
  - Root Directory: `frontend`
  - Framework Preset: Create React App
  - Build Command: `npm run build` (or `yarn build`)
  - Output Directory: `build`
- [ ] Add environment variable: `REACT_APP_API_URL` = your backend URL
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Test frontend: `https://your-frontend.vercel.app`

### Step 3: Update CORS
- [ ] Go to Render backend service settings
- [ ] Update `CORS_ORIGINS` environment variable:
  ```
  https://cardxacademia.com,https://www.cardxacademia.com,https://your-frontend.vercel.app
  ```
- [ ] Save and redeploy backend

### Step 4: Custom Domains (Optional)
- [ ] **Frontend (Vercel):**
  - Go to project → Settings → Domains
  - Add `cardxacademia.com` and `www.cardxacademia.com`
  - Update DNS records as instructed
- [ ] **Backend (Render):**
  - Go to service → Settings → Custom Domains
  - Add `api.cardxacademia.com`
  - Update DNS records as instructed
  - Update `REACT_APP_API_URL` in Vercel to use custom domain

---

## ✅ Post-Deployment Verification

### Backend Tests
- [ ] Health check: `GET /api/health` returns `{"status": "healthy"}`
- [ ] Root endpoint: `GET /api/` returns `{"message": "Hello World"}`
- [ ] Database connection working (check health endpoint)
- [ ] CORS headers present in responses
- [ ] Email service configured (check health endpoint)

### Frontend Tests
- [ ] Homepage loads correctly
- [ ] All routes work (React Router)
- [ ] API calls succeed (check browser console)
- [ ] Appointment booking form loads
- [ ] Time slots load when date selected
- [ ] Form submission works
- [ ] Success messages display
- [ ] No console errors
- [ ] Mobile responsive design works

### Integration Tests
- [ ] Create appointment → Success
- [ ] Receive confirmation email
- [ ] Admin receives notification email
- [ ] Available slots update after booking
- [ ] Pilgrimage booking form works
- [ ] All forms submit correctly

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized and loading
- [ ] Videos loading (if applicable)
- [ ] No 404 errors for assets

### Security
- [ ] HTTPS enabled (automatic on both platforms)
- [ ] SSL certificate active
- [ ] No sensitive data in client-side code
- [ ] Environment variables not exposed

---

## 🐛 Common Issues & Solutions

### Backend Issues

**Problem:** Backend won't start
- Check Render logs for errors
- Verify `PORT` environment variable is available (Render provides automatically)
- Check Python version compatibility

**Problem:** Database connection fails
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check `MONGO_URL` is correct format
- Verify database user has proper permissions

**Problem:** CORS errors
- Verify `CORS_ORIGINS` includes frontend URL
- No spaces in comma-separated list
- Include protocol (`https://`)
- Redeploy after changing CORS settings

### Frontend Issues

**Problem:** API calls fail
- Verify `REACT_APP_API_URL` is set in Vercel
- Check backend URL is accessible
- Redeploy frontend after changing environment variables
- Check browser console for specific errors

**Problem:** Routes return 404
- Verify `vercel.json` rewrites are configured
- Check `_redirects` file exists in `frontend/public/`
- Ensure React Router is configured correctly

**Problem:** Build fails
- Check Node version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs for specific errors
- Try clearing build cache in Vercel

---

## 📊 Monitoring & Maintenance

### Regular Checks
- [ ] Monitor Render service uptime
- [ ] Check Vercel deployment status
- [ ] Monitor MongoDB Atlas usage
- [ ] Check Resend email delivery rates
- [ ] Review error logs weekly
- [ ] Monitor API response times

### Updates
- [ ] Keep dependencies updated
- [ ] Monitor security advisories
- [ ] Test after dependency updates
- [ ] Keep deployment documentation updated

---

## 📞 Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Resend Documentation](https://resend.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [React Router Documentation](https://reactrouter.com)

---

**Last Updated:** 2024-01-16  
**Status:** ✅ Ready for Deployment
