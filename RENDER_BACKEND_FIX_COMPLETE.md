# 🔧 Complete Render Backend Fix Guide (Python/FastAPI)

## ❌ Current Problem: 502 Bad Gateway

The backend service on Render is returning 502 errors, which means:
- Backend is not starting correctly
- OR backend is crashing on startup
- OR wrong configuration in Render dashboard

---

## ✅ Step-by-Step Fix (Do This in Order)

### STEP 1: Verify Render Service Configuration

Go to **Render Dashboard** → **Your Backend Service** (`cardxacademia-backend`)

#### Settings → Build & Deploy

**Check these settings:**

1. **Service Type:** `Web Service` ✅
2. **Environment:** `Python 3` ✅
3. **Root Directory:** `backend` ✅ (CRITICAL - must be `backend`, not `frontend`)
4. **Build Command:** `pip install -r requirements.txt` ✅
5. **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT` ✅

**If any of these are wrong, fix them now!**

---

### STEP 2: Verify Environment Variables

Go to **Environment** tab in Render backend service

**Required Variables:**

```env
MONGO_URL=mongodb+srv://cardx_user:EYRYzK2KMYCIIysI@cardx.difrzao.mongodb.net/?appName=Cardx
DB_NAME=cardxacademia
CORS_ORIGINS=https://www.cardxacademia.com,https://cardxacademia.com,https://*.vercel.app
RESEND_API_KEY=re_avH2qdHB_BdiasBpMqkKYJDhgax3SMHv1
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=olivier.niyo250@gmail.com
PYTHON_VERSION=3.11.0
```

**Important:**
- `MONGO_URL` - Must be your MongoDB Atlas connection string
- `CORS_ORIGINS` - No trailing slashes, comma-separated
- All variables must be set (no empty values)

---

### STEP 3: Check Render Logs

Go to **Logs** tab in Render backend service

**Look for these messages:**

✅ **Good signs:**
```
🚀 Starting CardX Academia Backend Server
✅ MongoDB connection initialized
Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:10000 (Press CTRL+C to quit)
```

❌ **Bad signs:**
```
❌ Failed to connect to MongoDB
ModuleNotFoundError: No module named 'xxx'
KeyError: 'MONGO_URL'
```

**If you see errors, note them down and fix them.**

---

### STEP 4: Manual Redeploy

1. **Render Dashboard** → Backend Service
2. Click **Manual Deploy**
3. Select **Clear build cache** ✅
4. Click **Deploy latest commit**
5. Wait 2-3 minutes
6. Check **Logs** tab

---

### STEP 5: Test Backend Health

After deployment, test:

**URL:** `https://cardxacademia.onrender.com/api/health`

**Expected Response:**
```json
{
  "status": "healthy",
  "server": "running",
  "database": "connected",
  "email_service": "configured",
  "timestamp": "..."
}
```

**If you get 502:**
- Backend is still not running
- Check logs for errors
- Verify Root Directory is `backend`

**If you get 404:**
- Route might be wrong
- Check if `/api/health` exists in `server.py`

**If you get 200 but database is "not_connected":**
- MongoDB connection issue
- Check `MONGO_URL` environment variable

---

## 🔍 Common Issues & Fixes

### Issue 1: "Root Directory" is Wrong

**Symptom:** 502 errors, logs show frontend files

**Fix:**
- Render Dashboard → Settings → Build & Deploy
- **Root Directory:** Change to `backend`
- Save → Redeploy

---

### Issue 2: MongoDB Connection Fails

**Symptom:** Logs show `❌ Failed to connect to MongoDB`

**Fix:**
1. Check `MONGO_URL` in Render environment variables
2. Verify MongoDB Atlas:
   - Cluster is running
   - IP whitelist includes `0.0.0.0/0`
   - Connection string is correct
3. Test connection string locally

---

### Issue 3: Missing Dependencies

**Symptom:** `ModuleNotFoundError: No module named 'xxx'`

**Fix:**
1. Check `backend/requirements.txt` includes all dependencies
2. Verify build command: `pip install -r requirements.txt`
3. Clear build cache and redeploy

---

### Issue 4: Wrong Start Command

**Symptom:** Backend doesn't start, no logs

**Fix:**
- **Start Command** must be: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- NOT: `python server.py` or `npm start`
- The `$PORT` variable is required for Render

---

### Issue 5: CORS Errors

**Symptom:** Frontend can't connect, CORS errors in browser console

**Fix:**
1. Check `CORS_ORIGINS` in Render environment variables
2. Must include your frontend URL (Vercel URL)
3. Format: `https://www.cardxacademia.com,https://cardxacademia.com,https://*.vercel.app`
4. No trailing slashes
5. Redeploy backend after changing

---

## ✅ Verification Checklist

After fixing, verify:

- [ ] Root Directory = `backend` (not `frontend`)
- [ ] Service Type = `Web Service`
- [ ] Environment = `Python 3`
- [ ] Build Command = `pip install -r requirements.txt`
- [ ] Start Command = `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] `MONGO_URL` is set correctly
- [ ] `CORS_ORIGINS` includes frontend URLs
- [ ] All environment variables are set
- [ ] Render logs show "Application startup complete"
- [ ] `/api/health` returns 200 with JSON
- [ ] Frontend can connect (no 502 errors)

---

## 🚀 Quick Fix Summary

1. **Render Dashboard** → Backend Service → **Settings**
2. **Root Directory:** `backend` ✅
3. **Start Command:** `uvicorn server:app --host 0.0.0.0 --port $PORT` ✅
4. **Environment Variables:** All set correctly ✅
5. **Manual Deploy** → Clear cache → Deploy
6. **Test:** `https://cardxacademia.onrender.com/api/health`

---

## 📝 If Still Failing

1. **Check Render Logs** - Copy the first 20 lines
2. **Test locally** - Does `uvicorn server:app --host 0.0.0.0 --port 8000` work?
3. **Verify MongoDB** - Can you connect from your local machine?
4. **Share logs** - I can help debug specific errors

---

**After these fixes, your backend should work perfectly!** ✅
