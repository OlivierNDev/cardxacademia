# 🔧 Fix Render 502 Bad Gateway Error

## Problem
Your backend on Render is returning **502 Bad Gateway**, which means the service is crashing on startup.

## Common Causes

1. **Missing Environment Variables** (Most Common)
2. **MongoDB Connection Failing**
3. **Python Import Errors**
4. **Missing Dependencies**

---

## ✅ Step-by-Step Fix

### Step 1: Check Render Logs

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your backend service (`cardxacademia-backend`)
3. Go to **Logs** tab
4. **Look for error messages** - this will tell you exactly what's wrong

**Common errors you might see:**
- `ModuleNotFoundError` - Missing dependency
- `Connection refused` - MongoDB connection issue
- `KeyError` - Missing environment variable
- `ImportError` - Code issue

---

### Step 2: Verify Environment Variables

Go to Render → Your Backend Service → **Environment** tab

**Required Environment Variables:**

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=cardxacademia
CORS_ORIGINS=https://your-frontend.vercel.app,https://cardxacademia.com
RESEND_API_KEY=re_your_api_key_here
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=olivier.niyo250@gmail.com
```

**⚠️ CRITICAL:** `MONGO_URL` is **REQUIRED**. If it's missing, the backend will crash.

---

### Step 3: Check MongoDB Atlas Connection

1. **Verify MongoDB Atlas is accessible:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Check your cluster is running
   - Verify IP whitelist includes `0.0.0.0/0` (all IPs)

2. **Test connection string:**
   - Copy your `MONGO_URL` from Render
   - Make sure it's in format: `mongodb+srv://username:password@cluster.mongodb.net/`
   - No spaces, no quotes

---

### Step 4: Check Python Version

In Render → Environment Variables, make sure:
- `PYTHON_VERSION=3.11.0` (or compatible version)

---

### Step 5: Verify Start Command

In Render → Settings → **Start Command**, it should be:
```
uvicorn server:app --host 0.0.0.0 --port $PORT
```

**NOT:**
- `python server.py` ❌
- `uvicorn server:app` (missing host/port) ❌

---

### Step 6: Check Build Logs

1. Go to **Logs** tab
2. Scroll to the **build** section (not runtime)
3. Look for:
   - `Successfully installed...` ✅
   - `ERROR: Could not find a version...` ❌
   - `ModuleNotFoundError` ❌

---

## 🐛 Common Errors & Fixes

### Error: "ModuleNotFoundError: No module named 'motor'"

**Fix:**
- Check `requirements.txt` includes all dependencies
- Verify build completed successfully
- Check Python version compatibility

### Error: "Connection refused" or MongoDB errors

**Fix:**
1. Verify `MONGO_URL` is set correctly
2. Check MongoDB Atlas IP whitelist
3. Test connection string locally

### Error: "KeyError: 'MONGO_URL'"

**Fix:**
- Add `MONGO_URL` environment variable in Render
- Make sure there are no typos
- Redeploy after adding

### Error: Import errors

**Fix:**
- Check `backend/services/email_service.py` exists
- Verify all imports in `server.py` are correct
- Check file structure matches

---

## 🔍 Quick Diagnostic Checklist

- [ ] Backend service exists in Render dashboard
- [ ] Service is set to "Web Service" (not Static Site)
- [ ] Root Directory is set to `backend`
- [ ] Build Command: `pip install -r requirements.txt`
- [ ] Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] `MONGO_URL` environment variable is set
- [ ] `DB_NAME` environment variable is set
- [ ] `CORS_ORIGINS` environment variable is set
- [ ] Python version is set (3.11.0)
- [ ] Build logs show successful installation
- [ ] Runtime logs show server starting

---

## 🚀 Quick Fix Steps

1. **Check Logs First** - This tells you the exact problem
2. **Add Missing Environment Variables** - Especially `MONGO_URL`
3. **Verify MongoDB Atlas** - Cluster running, IP whitelisted
4. **Redeploy** - After fixing environment variables

---

## 📝 If Still Failing

1. **Share the error from Render logs** - The exact error message
2. **Check if backend works locally:**
   ```bash
   cd backend
   pip install -r requirements.txt
   # Set environment variables
   uvicorn server:app --host 0.0.0.0 --port 8000
   ```

3. **Test MongoDB connection:**
   ```python
   from motor.motor_asyncio import AsyncIOMotorClient
   client = AsyncIOMotorClient("your-mongo-url")
   # Should not throw error
   ```

---

## 💡 Pro Tip

**Most 502 errors are caused by missing `MONGO_URL`**. Always check that first!

---

**After fixing, the backend should start successfully and return 200 OK instead of 502!** ✅
