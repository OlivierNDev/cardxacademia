# 🚀 Vercel Deployment Setup Guide

Step-by-step instructions for setting up your Vercel project.

---

## 📝 Vercel Project Configuration

Fill out the form with these **exact values**:

### 1. **Project Name**
```
cardxacademia
```
✅ Already correct - keep as is

---

### 2. **Framework Preset**
Click the dropdown and select:
```
Create React App
```
❌ **Don't use "Other"** - Select "Create React App" from the dropdown

---

### 3. **Root Directory**
Change from `./` to:
```
frontend
```
❌ Current: `./`  
✅ **Change to:** `frontend`

**Why?** Your React app is in the `frontend` folder, not the root.

---

### 4. **Build Command**
Change to:
```
yarn build
```
or if you prefer npm:
```
npm run build
```
❌ Current: `npm run vercel-build` or `npm run build`  
✅ **Change to:** `yarn build` (since you're using yarn)

**Note:** Since your `package.json` uses yarn (see packageManager field), use `yarn build`

---

### 5. **Output Directory**
Change from `public` to:
```
build
```
❌ Current: `public` if it exists, or `.`  
✅ **Change to:** `build`

**Why?** Create React App builds to the `build` folder, not `public`.

---

### 6. **Install Command**
Keep as is (it's already correct):
```
yarn install
```
✅ Already correct - Vercel will auto-detect yarn from your `package.json`

---

### 7. **Environment Variables** ⚠️ **IMPORTANT**

Click **"Add Environment Variable"** and add:

**Key:**
```
REACT_APP_API_URL
```

**Value:**
```
https://your-backend-service.onrender.com
```

**⚠️ Important:** 
- Replace `your-backend-service.onrender.com` with your **actual Render backend URL**
- If you haven't deployed the backend yet, you can:
  1. Deploy backend first, get the URL, then come back and add this
  2. Or add a placeholder now and update it later

**Example:**
```
Key: REACT_APP_API_URL
Value: https://cardxacademia-backend.onrender.com
```

---

## 📋 Complete Form Summary

Here's what your form should look like:

| Field | Value |
|-------|-------|
| **Project Name** | `cardxacademia` |
| **Framework Preset** | `Create React App` |
| **Root Directory** | `frontend` |
| **Build Command** | `yarn build` |
| **Output Directory** | `build` |
| **Install Command** | `yarn install` (auto-detected) |
| **Environment Variables** | `REACT_APP_API_URL` = `https://your-backend.onrender.com` |

---

## ✅ After Filling the Form

1. **Click "Deploy"** button
2. **Wait for build** (usually 2-5 minutes)
3. **Check build logs** for any errors
4. **Visit your site** at the provided Vercel URL

---

## 🔍 What Happens Next

1. Vercel will:
   - Clone your GitHub repository
   - Navigate to `frontend` directory
   - Run `yarn install`
   - Run `yarn build`
   - Deploy the `build` folder
   - Use `vercel.json` for routing configuration

2. Your `frontend/vercel.json` will automatically:
   - Configure React Router rewrites
   - Set up cache headers
   - Handle all routes correctly

---

## ⚠️ Common Issues & Solutions

### Issue: Build fails with "Cannot find module"
**Solution:** Make sure **Root Directory** is set to `frontend`

### Issue: Routes return 404
**Solution:** The `vercel.json` file should handle this automatically. If not, check that it's in the `frontend` directory.

### Issue: API calls fail
**Solution:** 
- Verify `REACT_APP_API_URL` is set correctly
- Make sure backend is deployed and accessible
- Check browser console for CORS errors

### Issue: "Output Directory not found"
**Solution:** Make sure **Output Directory** is set to `build` (not `public`)

---

## 🔄 Updating Environment Variables Later

If you need to update `REACT_APP_API_URL` after deployment:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Edit `REACT_APP_API_URL`
4. Click **Save**
5. Go to **Deployments** tab
6. Click **Redeploy** on the latest deployment

---

## 📝 Quick Checklist

Before clicking "Deploy", verify:

- [ ] Framework Preset: **Create React App**
- [ ] Root Directory: **frontend**
- [ ] Build Command: **yarn build**
- [ ] Output Directory: **build**
- [ ] Environment Variable: **REACT_APP_API_URL** added (with your backend URL)

---

## 🎉 You're Ready!

Once you fill out the form with these values, click **"Deploy"** and your site will be live in minutes!

**Need help?** Check the build logs in Vercel dashboard if anything goes wrong.
