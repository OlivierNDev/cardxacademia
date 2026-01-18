# ✅ Render Dashboard Configuration Checklist

## 🎯 Backend Service (`cardxacademia-backend`)

### Settings → Build & Deploy

| Setting | Must Be | Current Status |
|---------|---------|----------------|
| **Service Type** | `Web Service` | ⬜ Check |
| **Environment** | `Python 3` | ⬜ Check |
| **Root Directory** | `backend` | ⬜ Check |
| **Build Command** | `pip install -r requirements.txt` | ⬜ Check |
| **Start Command** | `uvicorn server:app --host 0.0.0.0 --port $PORT` | ⬜ Check |
| **Plan** | `Starter` ($7/month) | ⬜ Check |

### Environment Variables

| Variable | Required Value | Status |
|----------|---------------|--------|
| `MONGO_URL` | `mongodb+srv://cardx_user:...@cardx.difrzao.mongodb.net/?appName=Cardx` | ⬜ Check |
| `DB_NAME` | `cardxacademia` | ⬜ Check |
| `CORS_ORIGINS` | `https://www.cardxacademia.com,https://cardxacademia.com,https://*.vercel.app` | ⬜ Check |
| `RESEND_API_KEY` | `re_avH2qdHB_BdiasBpMqkKYJDhgax3SMHv1` | ⬜ Check |
| `FROM_EMAIL` | `CardX Academia <noreply@cardxacademia.com>` | ⬜ Check |
| `ADMIN_EMAIL` | `olivier.niyo250@gmail.com` | ⬜ Check |
| `PYTHON_VERSION` | `3.11.0` | ⬜ Check |

---

## 🔍 How to Check Each Setting

### 1. Root Directory (MOST IMPORTANT)

1. Go to **Render Dashboard** → **Backend Service** → **Settings**
2. Scroll to **Build & Deploy**
3. Find **Root Directory**
4. **Must say:** `backend`
5. **If it says:** `frontend` or empty → **CHANGE IT NOW!**

### 2. Start Command

1. Same page (Settings → Build & Deploy)
2. Find **Start Command**
3. **Must be exactly:** `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. **If different:** Change it now

### 3. Environment Variables

1. Go to **Environment** tab (not Settings)
2. Check each variable in the list above
3. **If missing:** Add it
4. **If wrong:** Edit it

---

## 🚨 Critical Fixes

### Fix 1: Root Directory is Wrong

**If Root Directory ≠ `backend`:**

1. Render Dashboard → Backend Service → Settings
2. **Root Directory:** Change to `backend`
3. **Save**
4. **Manual Deploy** → **Clear build cache** → **Deploy**

### Fix 2: Start Command is Wrong

**If Start Command ≠ `uvicorn server:app --host 0.0.0.0 --port $PORT`:**

1. Render Dashboard → Backend Service → Settings
2. **Start Command:** Change to `uvicorn server:app --host 0.0.0.0 --port $PORT`
3. **Save**
4. **Manual Deploy** → **Deploy**

### Fix 3: Missing Environment Variables

**If any variable is missing:**

1. Render Dashboard → Backend Service → Environment
2. Click **+ Add Environment Variable**
3. Add the missing variable
4. **Save**
5. **Manual Deploy** → **Deploy**

---

## ✅ After Fixing

1. **Wait 2-3 minutes** for deployment
2. **Check Logs** tab - Should see:
   ```
   🚀 Starting CardX Academia Backend Server
   ✅ MongoDB connection initialized
   Application startup complete.
   INFO:     Uvicorn running on http://0.0.0.0:10000
   ```
3. **Test:** `https://cardxacademia.onrender.com/api/health`
4. **Should return:** `{"status": "healthy", ...}`

---

## 📸 Screenshot Checklist

Take screenshots of:
1. ✅ Settings → Build & Deploy (showing Root Directory)
2. ✅ Settings → Build & Deploy (showing Start Command)
3. ✅ Environment tab (showing all variables)
4. ✅ Logs tab (showing startup messages)

---

**Go through this checklist and fix any mismatches!** ✅
