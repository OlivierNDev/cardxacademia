# 🏗️ CardX Academia - Complete Project Overview

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                    (Visits your website)                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTPS
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (React)                              │
│                    Deployed on: Vercel                           │
│                    URL: https://your-site.vercel.app            │
│                                                                  │
│  Components:                                                    │
│  - HomePage                                                     │
│  - AppointmentPage (booking form)                              │
│  - PilgrimagePage (pilgrimage booking)                          │
│  - TestimonialsPage                                             │
│  - SearchModal (site search)                                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ API Calls (HTTP/HTTPS)
                             │ REACT_APP_API_URL
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    BACKEND (FastAPI)                             │
│                    Deployed on: Render                          │
│                    URL: https://your-backend.onrender.com        │
│                                                                  │
│  API Endpoints:                                                 │
│  - POST /api/appointments (create appointment)                  │
│  - GET /api/appointments/available-slots                       │
│  - POST /api/pilgrimage-bookings (create booking)              │
│  - GET /api/health (health check)                               │
│                                                                  │
│  Services:                                                       │
│  - EmailService (sends confirmation emails via Resend)          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ MongoDB Connection (TCP)
                             │ MONGO_URL
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    MONGODB ATLAS                                 │
│                    Cloud Database                                │
│                    Database: cardxacademia                      │
│                                                                  │
│  Collections:                                                   │
│  - appointments (appointment bookings)                          │
│  - pilgrimage_bookings (pilgrimage bookings)                    │
│  - status_checks (health check records)                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Example: Booking an Appointment

### Step 1: User Fills Form
```
User → Frontend (AppointmentPage)
- Enters: name, email, phone, service type, date, time
- Clicks "Book Appointment"
```

### Step 2: Frontend Sends Request
```
Frontend → Backend API
POST https://your-backend.onrender.com/api/appointments
Body: {
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service_type": "Quran Classes",
  "appointment_type": "in_person",
  "date": "2024-01-20",
  "time": "10:00"
}
```

### Step 3: Backend Processes Request
```
Backend (FastAPI)
1. Validates the data
2. Checks if slot is available
3. Creates appointment record
4. Saves to MongoDB
5. Sends confirmation email via Resend
6. Returns success response
```

### Step 4: Backend Saves to MongoDB
```
Backend → MongoDB Atlas
Database: cardxacademia
Collection: appointments
Document: {
  "id": "unique-id",
  "name": "John Doe",
  "email": "john@example.com",
  ...
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Step 5: Backend Sends Email
```
Backend → Resend Email Service
- Sends confirmation email to user
- Sends notification email to admin
```

### Step 6: Response to User
```
Backend → Frontend
Response: {
  "id": "unique-id",
  "status": "confirmed",
  "message": "Appointment booked successfully"
}

Frontend → User
- Shows success message
- Redirects to confirmation page
```

---

## 📁 Project Structure Explained

```
cardxacademia/
│
├── frontend/                    # React Frontend Application
│   ├── public/                  # Static files (images, etc.)
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── Navbar.jsx       # Navigation bar
│   │   │   ├── SearchModal.jsx  # Search functionality
│   │   │   └── TestimonialsSection.jsx
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── AppointmentPage.jsx
│   │   │   └── TestimonialsPage.jsx
│   │   ├── services/
│   │   │   └── api.js           # API client (Axios)
│   │   └── App.jsx              # Main app component
│   ├── package.json             # Dependencies
│   └── vercel.json              # Vercel deployment config
│
├── backend/                     # FastAPI Backend Application
│   ├── services/
│   │   └── email_service.py    # Email sending service
│   ├── server.py                # Main FastAPI app
│   ├── requirements.txt         # Python dependencies
│   └── .env                     # Local environment variables
│
├── render.yaml                  # Render deployment config
├── README.md                    # Project documentation
└── MONGODB_*.md                 # MongoDB setup guides
```

---

## 🗄️ Database Schema

### Database: `cardxacademia`

#### Collection: `appointments`
```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string",
  "phone": "string",
  "service_type": "string",
  "appointment_type": "in_person | online",
  "date": "YYYY-MM-DD",
  "time": "HH:MM",
  "status": "pending | confirmed | cancelled",
  "created_at": "ISO datetime",
  "updated_at": "ISO datetime"
}
```

#### Collection: `pilgrimage_bookings`
```json
{
  "id": "string (UUID)",
  "name": "string",
  "email": "string",
  "phone": "string",
  "pilgrimage_type": "string",
  "departure_date": "YYYY-MM-DD",
  "return_date": "YYYY-MM-DD",
  "number_of_people": "integer",
  "status": "pending | confirmed | cancelled",
  "created_at": "ISO datetime",
  "updated_at": "ISO datetime"
}
```

#### Collection: `status_checks`
```json
{
  "timestamp": "ISO datetime",
  "status": "healthy | degraded | error",
  "database": "connected | not_connected",
  "email_service": "configured | not_configured"
}
```

---

## 🔧 Environment Variables Explained

### Frontend (Vercel)
```env
REACT_APP_API_URL=https://your-backend.onrender.com
```
- **Purpose:** Tells frontend where to send API requests
- **Used in:** `frontend/src/services/api.js`

### Backend (Render)
```env
MONGO_URL=mongodb+srv://user:pass@cluster.net/cardxacademia?...
```
- **Purpose:** MongoDB connection string
- **Used in:** `backend/server.py` - connects to MongoDB Atlas

```env
DB_NAME=cardxacademia
```
- **Purpose:** Database name (defaults to `cardxacademia` if not set)
- **Used in:** `backend/server.py`

```env
CORS_ORIGINS=https://your-site.vercel.app,https://www.your-site.com
```
- **Purpose:** Allows frontend to make API calls (security)
- **Used in:** `backend/server.py` - CORS middleware

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
```
- **Purpose:** API key for sending emails
- **Used in:** `backend/services/email_service.py`

```env
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=admin@example.com
```
- **Purpose:** Email configuration
- **Used in:** `backend/services/email_service.py`

---

## 🚀 Deployment Flow

### 1. Code Push
```
Developer → GitHub
git push origin main
```

### 2. Automatic Deployment
```
GitHub → Vercel (Frontend)
GitHub → Render (Backend)
```

### 3. Build Process
```
Vercel:
- yarn install
- yarn build
- Deploy build/ folder

Render:
- pip install -r requirements.txt
- uvicorn server:app --host 0.0.0.0 --port $PORT
```

### 4. Services Running
```
Frontend: https://your-site.vercel.app
Backend: https://your-backend.onrender.com
Database: MongoDB Atlas (cloud)
```

---

## 🔐 Security & Configuration

### CORS (Cross-Origin Resource Sharing)
- **Why:** Browser security - prevents unauthorized sites from accessing your API
- **Config:** `CORS_ORIGINS` in Render
- **Effect:** Only listed domains can make API calls

### MongoDB Network Access
- **Why:** Security - prevents unauthorized connections
- **Config:** MongoDB Atlas → Network Access
- **For Development:** Allow `0.0.0.0/0` (all IPs)
- **For Production:** Whitelist only Render IPs

### Environment Variables
- **Why:** Keep secrets out of code
- **Storage:** 
  - Local: `.env` file (not committed to Git)
  - Production: Render/Vercel dashboard
- **Never commit:** Passwords, API keys, connection strings

---

## 📊 Monitoring & Health Checks

### Health Endpoint
```
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "server": "running",
  "database": "connected",
  "email_service": "configured",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Use Cases:**
- Monitor backend status
- Check MongoDB connection
- Verify email service configuration

---

## 🎯 Key Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | React | User interface |
| Backend | FastAPI (Python) | API server |
| Database | MongoDB Atlas | Data storage |
| Email | Resend | Send emails |
| Frontend Host | Vercel | Frontend deployment |
| Backend Host | Render | Backend deployment |
| API Client | Axios | HTTP requests |
| Styling | Tailwind CSS | UI styling |

---

## 📝 Next Steps After MongoDB Setup

1. ✅ **MongoDB Atlas** - Fresh cluster created and connected
2. ✅ **Render** - Backend deployed and healthy
3. ✅ **Vercel** - Frontend deployed
4. ✅ **Test** - Create an appointment to verify everything works
5. ✅ **Monitor** - Check health endpoint regularly

---

**Your project is now ready! 🎉**
