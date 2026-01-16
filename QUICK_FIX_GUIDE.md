# 🚨 QUICK FIX GUIDE - Get System Working

## Current Issues Found:

1. ❌ **Backend server NOT running** (port 8000)
2. ❌ **`.env` file MISSING** in backend folder
3. ❌ **Dependencies NOT installed** (resend, fastapi, etc.)
4. ⚠️ **MongoDB status unknown**

---

## 🔧 STEP-BY-STEP FIX

### Step 1: Create `.env` File

**You need to manually create this file** (I cannot create it due to security restrictions):

**Location:** `backend/.env`

**Copy and paste this content:**
```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=cardxacademia

# CORS Configuration
CORS_ORIGINS=http://localhost:3000

# Resend Email Service
RESEND_API_KEY=re_avH2qdHB_BdiasBpMqkKYJDhgax3SMHv1
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=olivier.niyo250@gmail.com
```

**How to create:**
1. Open `backend` folder
2. Create new file named `.env` (with the dot at the beginning)
3. Paste the content above
4. Save the file

---

### Step 2: Install Backend Dependencies

Run this command:
```bash
cd backend
pip install fastapi uvicorn motor pymongo resend python-dateutil pytz pydantic email-validator python-dotenv
```

**Or install from requirements.txt (after removing emergentintegrations):**
```bash
cd backend
pip install -r requirements.txt
```

---

### Step 3: Start MongoDB (If Not Using Cloud)

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service
- Or use: `mongod` command

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `MONGO_URL` in `.env` file

---

### Step 4: Start Backend Server

```bash
cd backend
uvicorn server:app --reload --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Keep this terminal window open!**

---

### Step 5: Verify Frontend is Running

Frontend should already be running on `http://localhost:3000`

If not, start it:
```bash
cd frontend
npm start
```

---

### Step 6: Test the System

1. **Open browser:** `http://localhost:3000/appointment`
2. **Check browser console (F12)** for errors
3. **Try to:**
   - Select a date
   - See if time slots load
   - Fill in the form
   - Submit appointment

---

## 🐛 Common Errors & Solutions

### Error: "ModuleNotFoundError: No module named 'resend'"
**Solution:** Run `pip install resend`

### Error: "Cannot connect to backend"
**Solution:** 
1. Check backend is running: `netstat -ano | findstr :8000`
2. Check `.env` file exists
3. Check CORS_ORIGINS includes `http://localhost:3000`

### Error: "MongoDB connection failed"
**Solution:**
1. Start MongoDB service
2. Or use MongoDB Atlas (cloud)
3. Update `MONGO_URL` in `.env`

### Error: "Email service disabled"
**Solution:**
1. Check `.env` file has `RESEND_API_KEY`
2. Verify API key is correct
3. Check backend logs

### Error: "Time slots not loading"
**Solution:**
1. Check backend is running
2. Check browser console for API errors
3. Check backend terminal for errors

---

## ✅ Verification Checklist

- [ ] `.env` file created in `backend/` folder
- [ ] All dependencies installed (`pip install -r requirements.txt`)
- [ ] MongoDB running (local or Atlas)
- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] Can access `http://localhost:3000/appointment`
- [ ] Time slots load when selecting date
- [ ] Can submit appointment form
- [ ] Emails are sent (check inbox)

---

## 📞 If Still Not Working

1. **Check backend terminal** for error messages
2. **Check browser console (F12)** for frontend errors
3. **Check network tab** in browser DevTools
4. **Verify ports:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`
5. **Test backend directly:**
   ```bash
   curl http://localhost:8000/api/
   # Should return: {"message": "Hello World"}
   ```

---

**Once all steps are completed, the system should be fully operational!** 🚀
