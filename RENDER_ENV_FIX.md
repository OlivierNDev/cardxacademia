# 🔧 Render Environment Variables Fix

## Issues Found

1. **CORS_ORIGINS has trailing slash** - `https://www.cardxacademia.com/` should be `https://www.cardxacademia.com`
2. **CORS_ORIGINS missing Vercel URL** - Should include your Vercel frontend URL
3. **MONGODB_URI duplicate** - Can be removed (code uses MONGO_URL)

## ✅ Fixes Applied to Code

1. ✅ **CORS handling improved** - Now strips trailing slashes automatically
2. ✅ **MongoDB connection more robust** - Better error handling, longer timeout
3. ✅ **Supports both MONGO_URL and MONGODB_URI** - Will use either one

## 📝 Update Environment Variables in Render

### Fix CORS_ORIGINS

**Current (WRONG):**
```
https://www.cardxacademia.com/
```

**Should be (CORRECT):**
```
https://www.cardxacademia.com,https://cardxacademia.com,https://cardxacademia20-git-main-zuba-houses-projects.vercel.app
```

**Steps:**
1. Go to Render → Your Backend Service → Environment
2. Find `CORS_ORIGINS`
3. Click edit
4. Change to (replace with your actual Vercel URL):
   ```
   https://www.cardxacademia.com,https://cardxacademia.com,https://your-frontend.vercel.app
   ```
5. **Remove trailing slash** from any URLs
6. **Add your Vercel frontend URL** (comma-separated, no spaces)

### Optional: Remove MONGODB_URI

Since the code now supports both, you can:
- Keep both (code will use MONGO_URL first)
- Or delete MONGODB_URI to avoid confusion

## ✅ After Updating

1. **Save environment variables** in Render
2. **Render will auto-redeploy** (or manually trigger redeploy)
3. **Check logs** - Should see:
   - `🚀 Starting CardX Academia Backend Server`
   - `✅ MongoDB connection initialized`
   - `Application startup complete`

## 🔍 Verify It's Working

1. **Check Render Logs** - No more errors
2. **Test Health Endpoint:**
   ```
   https://your-backend.onrender.com/api/health
   ```
   Should return: `{"status":"healthy",...}`

3. **Test from Frontend:**
   - Go to appointment page
   - Select a date
   - Time slots should load (may take 30-60s first time if backend was sleeping)

---

**The code fixes are already applied. Just update CORS_ORIGINS in Render and redeploy!** ✅
