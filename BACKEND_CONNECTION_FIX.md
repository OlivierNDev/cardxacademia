# 🔧 Backend Connection Fix Guide

## Problem
The frontend is timing out when trying to connect to the backend API. Error: "timeout of 10000ms exceeded"

## Root Causes

1. **Environment Variable Not Set**: `REACT_APP_API_URL` is not configured in Vercel
2. **Backend Sleeping**: Render free tier services spin down after inactivity
3. **Timeout Too Short**: 10 seconds isn't enough for Render's cold start

## ✅ Fixes Applied

1. ✅ **Increased timeout** from 10s to 30s (Render free tier can take 30-60s to wake up)
2. ✅ **Better error messages** to help diagnose the issue
3. ✅ **Debug logging** in development mode

## 🔧 How to Fix

### Step 1: Get Your Backend URL

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Find your backend service (e.g., `cardxacademia-backend`)
3. Copy the service URL (e.g., `https://cardxacademia-backend.onrender.com`)

### Step 2: Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`cardxacademia2.0`)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** Your Render backend URL (e.g., `https://cardxacademia-backend.onrender.com`)
   - **Environment:** Production, Preview, Development (select all)
6. Click **Save**

### Step 3: Redeploy Frontend

1. Go to **Deployments** tab in Vercel
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger automatic deployment

### Step 4: Wake Up Backend (If Sleeping)

If your backend is on Render free tier:

1. Go to Render dashboard
2. Click on your backend service
3. The service will wake up automatically when you visit it
4. Or manually trigger it by visiting: `https://your-backend.onrender.com/api/health`

**Note:** Render free tier services spin down after 15 minutes of inactivity. The first request after spinning down can take 30-60 seconds.

## ✅ Verify It's Working

1. **Check Browser Console** (F12)
   - You should see: `🔗 API Base URL: https://your-backend.onrender.com`
   - No more timeout errors

2. **Test Appointment Page**
   - Go to `/appointment`
   - Select a date
   - Time slots should load (may take 30-60s on first request if backend was sleeping)

3. **Test Backend Health**
   - Visit: `https://your-backend.onrender.com/api/health`
   - Should return: `{"status":"healthy","server":"running",...}`

## 🐛 Troubleshooting

### Issue: Still Getting Timeout

**Solution:**
1. Verify backend is running: Visit `https://your-backend.onrender.com/api/health`
2. Check CORS settings in backend: Make sure `CORS_ORIGINS` includes your Vercel domain
3. Wait 30-60 seconds for Render to wake up (first request after sleep)

### Issue: "Cannot connect to server"

**Solution:**
1. Check if `REACT_APP_API_URL` is set correctly in Vercel
2. Make sure you redeployed after adding the environment variable
3. Check browser console for the actual API URL being used

### Issue: CORS Errors

**Solution:**
1. Go to Render dashboard → Your backend service → Environment
2. Update `CORS_ORIGINS` to include:
   ```
   https://your-frontend.vercel.app,https://cardxacademia.com,https://www.cardxacademia.com
   ```
3. Redeploy backend

## 📝 Quick Checklist

- [ ] Backend deployed on Render
- [ ] Backend URL copied (e.g., `https://cardxacademia-backend.onrender.com`)
- [ ] `REACT_APP_API_URL` set in Vercel environment variables
- [ ] Frontend redeployed after setting environment variable
- [ ] Backend is awake (visit health endpoint)
- [ ] CORS configured correctly

## 💡 Pro Tip: Keep Backend Awake

To prevent backend from sleeping (Render free tier):

1. **Upgrade to paid plan** ($7/month) - Always-on service
2. **Use a ping service** (like UptimeRobot) to ping your backend every 5 minutes
3. **Accept the delay** - First request after sleep takes 30-60s, subsequent requests are fast

---

**After completing these steps, your backend connection should work!** 🎉
