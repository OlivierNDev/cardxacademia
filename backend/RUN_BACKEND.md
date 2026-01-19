# 🚀 How to Run the Backend Server

## Prerequisites

1. **Python 3.8+** installed
2. **MongoDB** running (local or cloud)
3. **`.env` file** configured in the backend directory

---

## Step 1: Install Dependencies

Navigate to the backend directory and install required packages:

```bash
cd backend
pip install -r requirements.txt
```

**Or install manually:**
```bash
pip install fastapi uvicorn motor pymongo resend python-dateutil pytz pydantic email-validator python-dotenv
```

---

## Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=cardxacademia

# CORS Configuration (for frontend connection)
CORS_ORIGINS=http://localhost:3000

# Resend Email Service
RESEND_API_KEY=re_avH2qdHB_BdiasBpMqkKYJDhgax3SMHv1
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=info@cardxacademia.com
REPLY_TO_EMAIL=info@cardxacademia.com
```

**Note:** If using MongoDB Atlas (cloud), update `MONGO_URL` with your Atlas connection string.

---

## Step 3: Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB service is running
- Or start it manually: `mongod`

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Update `MONGO_URL` in `.env` file

---

## Step 4: Run the Backend Server

```bash
cd backend
uvicorn server:app --reload --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

---

## Step 5: Verify Backend is Running

**Test the API:**
```bash
# PowerShell
Invoke-WebRequest -Uri http://localhost:8000/api/ -UseBasicParsing

# Or open in browser:
http://localhost:8000/api/
```

**Expected Response:**
```json
{"message": "Hello World"}
```

**Health Check:**
```bash
http://localhost:8000/api/health
```

---

## Available API Endpoints

- `GET /api/` - Root endpoint
- `GET /api/health` - Health check
- `POST /api/status` - Create status check
- `GET /api/status` - Get status checks
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/available-slots` - Get available time slots
- `GET /api/appointments/{id}` - Get appointment by ID
- `PATCH /api/appointments/{id}/cancel` - Cancel appointment
- `POST /api/pilgrimage-bookings` - Create pilgrimage booking
- `GET /api/pilgrimage-bookings/{id}` - Get pilgrimage booking

---

## Troubleshooting

### Issue: "Module not found"
**Solution:** Install missing dependencies:
```bash
pip install -r requirements.txt
```

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Check if MongoDB is running
- Verify `MONGO_URL` in `.env` is correct
- For Atlas, ensure your IP is whitelisted

### Issue: "Port 8000 already in use"
**Solution:** Use a different port:
```bash
uvicorn server:app --reload --port 8001
```
Then update frontend API base URL accordingly.

### Issue: "Email service not working"
**Solution:**
- Verify `RESEND_API_KEY` in `.env` is correct
- Check `FROM_EMAIL` and `ADMIN_EMAIL` are set

---

## Running in Production

For production, use:
```bash
uvicorn server:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## Quick Start (All Commands)

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create .env file (manually)
# Copy the .env content from Step 2 above

# 4. Start MongoDB (if local)
# Or use MongoDB Atlas

# 5. Start backend server
uvicorn server:app --reload --port 8000
```

---

## Notes

- The `--reload` flag enables auto-reload on code changes (development only)
- Keep the terminal window open while the server is running
- Press `Ctrl+C` to stop the server
- Backend runs on `http://localhost:8000`
- Frontend should connect to `http://localhost:8000` (configured in frontend API service)
