# ⚡ Quick Render Backend Check

## 🔍 What to Check Right Now

### 1. Render Dashboard → Backend Service → Settings

**Root Directory:**
- ✅ Must be: `backend`
- ❌ NOT: `frontend` or empty

**Start Command:**
- ✅ Must be: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- ❌ NOT: `npm start` or `python server.py` or empty

**Build Command:**
- ✅ Must be: `pip install -r requirements.txt`
- ❌ NOT: `npm install` or `yarn build`

---

### 2. Environment Variables

**Must have:**
- `MONGO_URL` = Your MongoDB Atlas connection string
- `CORS_ORIGINS` = Your frontend URLs (comma-separated)
- `DB_NAME` = `cardxacademia`
- `RESEND_API_KEY` = Your Resend API key
- `FROM_EMAIL` = Your email
- `ADMIN_EMAIL` = Your admin email

---

### 3. Test Health Endpoint

Visit: `https://cardxacademia.onrender.com/api/health`

**Should return:**
```json
{"status": "healthy", "database": "connected"}
```

**If 502:**
- Backend not running
- Check Root Directory = `backend`
- Check Start Command is correct
- Check Render logs

---

## 🚨 Most Common Issue

**Root Directory is `frontend` instead of `backend`**

**Fix:**
1. Render Dashboard → Backend Service → Settings
2. Change **Root Directory** to `backend`
3. Save
4. Manual Deploy → Clear cache → Deploy

---

**That's it! Check these 3 things and your backend will work.** ✅
