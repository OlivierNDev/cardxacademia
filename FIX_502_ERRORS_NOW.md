# 🚨 Fix 502 Errors - Step-by-Step Guide

## ❌ Current Problem

You're getting **502 Bad Gateway** errors because the backend service on Render is not configured correctly.

---

## ✅ FIX IT NOW (Follow These Steps Exactly)

### STEP 1: Open Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **backend service** (`cardxacademia-backend`)
3. Click **Settings** (left sidebar)

---

### STEP 2: Fix Root Directory (CRITICAL!)

1. Scroll to **Build & Deploy** section
2. Find **Root Directory** field
3. **Current value might be:** `frontend` or empty
4. **Change it to:** `backend`
5. Click **Save Changes**

**This is the #1 cause of 502 errors!**

---

### STEP 3: Fix Start Command

1. Still in **Build & Deploy** section
2. Find **Start Command** field
3. **Must be exactly:**
   ```
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
4. If it's different, change it now
5. Click **Save Changes**

---

### STEP 4: Verify Build Command

1. Still in **Build & Deploy** section
2. Find **Build Command** field
3. **Must be:**
   ```
   pip install -r requirements.txt
   ```
4. If it's different, change it
5. Click **Save Changes**

---

### STEP 5: Check Environment Variables

1. Click **Environment** tab (left sidebar)
2. Verify these variables exist:

   **Required:**
   - `MONGO_URL` = `mongodb+srv://cardx_user:EYRYzK2KMYCIIysI@cardx.difrzao.mongodb.net/?appName=Cardx`
   - `DB_NAME` = `cardxacademia`
   - `CORS_ORIGINS` = `https://www.cardxacademia.com,https://cardxacademia.com,https://*.vercel.app`
   - `RESEND_API_KEY` = `re_avH2qdHB_BdiasBpMqkKYJDhgax3SMHv1`
   - `FROM_EMAIL` = `CardX Academia <noreply@cardxacademia.com>`
   - `ADMIN_EMAIL` = `olivier.niyo250@gmail.com`
   - `PYTHON_VERSION` = `3.11.0`

3. **If any are missing:** Click **+ Add** and add them
4. **If any are wrong:** Click **Edit** and fix them

---

### STEP 6: Manual Redeploy

1. Click **Manual Deploy** (top right)
2. Check **Clear build cache** ✅
3. Click **Deploy latest commit**
4. Wait 2-3 minutes

---

### STEP 7: Check Logs

1. Click **Logs** tab (left sidebar)
2. Look for these messages:

   **✅ Good (Backend is working):**
   ```
   🚀 Starting CardX Academia Backend Server
   ✅ MongoDB connection initialized
   Application startup complete.
   INFO:     Uvicorn running on http://0.0.0.0:10000
   ```

   **❌ Bad (Backend is failing):**
   ```
   ❌ Failed to connect to MongoDB
   ModuleNotFoundError
   KeyError: 'MONGO_URL'
   ```

3. **If you see errors:** Note them down and fix the issue

---

### STEP 8: Test Backend

1. Open browser
2. Visit: `https://cardxacademia.onrender.com/api/health`
3. **Expected:** JSON response like:
   ```json
   {
     "status": "healthy",
     "server": "running",
     "database": "connected"
   }
   ```
4. **If 502:** Go back to Step 2 (Root Directory is wrong)
5. **If 404:** Route might be wrong, but less likely
6. **If 200:** ✅ Backend is working!

---

## 🔍 Common Issues

### Issue: Still Getting 502 After Fix

**Check:**
1. Root Directory = `backend` ✅
2. Start Command = `uvicorn server:app --host 0.0.0.0 --port $PORT` ✅
3. Service Type = `Web Service` ✅
4. Environment = `Python 3` ✅

**If all correct:**
- Check Logs tab for errors
- Verify MongoDB connection (MONGO_URL)
- Try redeploying again

---

### Issue: MongoDB Connection Fails

**Symptoms:** Logs show `❌ Failed to connect to MongoDB`

**Fix:**
1. Check `MONGO_URL` in Environment variables
2. Verify MongoDB Atlas:
   - Cluster is running
   - IP whitelist includes `0.0.0.0/0`
3. Test connection string locally

---

### Issue: Module Not Found

**Symptoms:** `ModuleNotFoundError: No module named 'xxx'`

**Fix:**
1. Check `backend/requirements.txt` has all dependencies
2. Verify Build Command = `pip install -r requirements.txt`
3. Clear build cache and redeploy

---

## ✅ Success Checklist

After fixing, you should have:

- [ ] Root Directory = `backend` ✅
- [ ] Start Command = `uvicorn server:app --host 0.0.0.0 --port $PORT` ✅
- [ ] Build Command = `pip install -r requirements.txt` ✅
- [ ] All environment variables set ✅
- [ ] Logs show "Application startup complete" ✅
- [ ] `/api/health` returns 200 ✅
- [ ] Frontend can connect (no 502 errors) ✅

---

## 🚀 Quick Summary

**The #1 fix:** Change **Root Directory** from `frontend` to `backend`

**Then:** Verify Start Command, Environment Variables, and redeploy

**That's it!** After these fixes, your backend will work. ✅

---

## 📞 Still Need Help?

If you've done all steps and still get 502:

1. **Copy the first 20 lines from Render Logs**
2. **Screenshot your Settings → Build & Deploy page**
3. **Share them** and I'll help debug further

But 99% of the time, it's the **Root Directory** being wrong! 🔧
