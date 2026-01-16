# Appointment Booking System - Implementation Plan

## 📋 Current State Analysis

### What Exists:
- ✅ FastAPI backend with MongoDB
- ✅ Basic contact form (frontend only, no backend integration)
- ✅ Navigation link to `/appointment` (but no page exists)
- ✅ Contact info: `info@cardxacademia.com`, `+250788603451`

### What's Missing:
- ❌ Appointment booking page/component
- ❌ Backend API endpoints for appointments
- ❌ Database schema for appointments
- ❌ Email service integration
- ❌ Calendar/time slot management
- ❌ Email templates
- ❌ Appointment confirmation system

---

## 🏗️ System Architecture

### Flow Diagram:
```
User → Frontend Form → Backend API → MongoDB → Email Service → Customer Email
                                    ↓
                              Admin Notification
```

### Components Needed:

1. **Frontend:**
   - Appointment booking form component
   - Calendar/time picker
   - Service type selection
   - Confirmation page

2. **Backend:**
   - Appointment CRUD API endpoints
   - Email service integration
   - Time slot validation
   - Conflict checking

3. **Database:**
   - `appointments` collection
   - Appointment status tracking

4. **Email Service:**
   - Customer confirmation email
   - Admin notification email
   - Reminder emails (optional)

---

## 📧 Email Service Recommendations

### Option 1: **SendGrid** (Recommended for Production)
**Pros:**
- ✅ Industry standard, very reliable
- ✅ 100 emails/day free tier
- ✅ Excellent deliverability
- ✅ Good documentation
- ✅ Transactional email templates
- ✅ Webhook support for tracking
- ✅ Python SDK available

**Cons:**
- ⚠️ Can be expensive at scale ($19.95/month for 50k emails)
- ⚠️ Setup requires domain verification

**Setup:**
```bash
pip install sendgrid
```

**Cost:** Free tier: 100 emails/day | Paid: $19.95/month for 50,000 emails

---

### Option 2: **Resend** (Modern Alternative)
**Pros:**
- ✅ Modern API, great developer experience
- ✅ 3,000 emails/month free
- ✅ React Email support (great for templates)
- ✅ Simple setup
- ✅ Good deliverability

**Cons:**
- ⚠️ Newer service (less established than SendGrid)
- ⚠️ Limited features compared to SendGrid

**Setup:**
```bash
pip install resend
```

**Cost:** Free tier: 3,000 emails/month | Paid: $20/month for 50,000 emails

---

### Option 3: **AWS SES** (Cost-Effective for Scale)
**Pros:**
- ✅ Very cheap ($0.10 per 1,000 emails)
- ✅ Highly scalable
- ✅ Part of AWS ecosystem
- ✅ Good for high volume

**Cons:**
- ⚠️ More complex setup
- ⚠️ Requires AWS account
- ⚠️ Initial sandbox mode (can only send to verified emails)

**Setup:**
```bash
pip install boto3
```

**Cost:** $0.10 per 1,000 emails (extremely cheap)

---

### Option 4: **Mailgun** (Developer-Friendly)
**Pros:**
- ✅ 5,000 emails/month free
- ✅ Good API
- ✅ Webhook support
- ✅ Good documentation

**Cons:**
- ⚠️ Less popular than SendGrid
- ⚠️ Domain verification required

**Cost:** Free tier: 5,000 emails/month | Paid: $35/month for 50,000 emails

---

## 🎯 Recommended Choice: **SendGrid** or **Resend**

**For Your Use Case:**
- **SendGrid** if you want proven reliability and don't mind the setup
- **Resend** if you want modern API and easier setup

**My Recommendation:** Start with **Resend** (easier setup, good free tier), then migrate to SendGrid if you need more features.

---

## 📊 Database Schema

### MongoDB Collection: `appointments`

```javascript
{
  "_id": ObjectId("..."),
  "id": "uuid-string",  // Human-readable ID
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+250788123456",
    "country": "Rwanda"
  },
  "appointment": {
    "date": "2024-02-15",
    "time": "10:00",
    "timezone": "Africa/Kigali",
    "duration": 30,  // minutes
    "service_type": "visa_consultation" | "admission_guidance" | "general_inquiry"
  },
  "status": "pending" | "confirmed" | "cancelled" | "completed",
  "notes": "Customer wants to discuss Canada visa",
  "created_at": ISODate("2024-01-15T10:00:00Z"),
  "updated_at": ISODate("2024-01-15T10:00:00Z"),
  "confirmed_at": ISODate("2024-01-15T10:05:00Z") | null,
  "cancelled_at": ISODate(...) | null,
  "email_sent": true,
  "reminder_sent": false
}
```

### Indexes:
```javascript
// For fast lookups
db.appointments.createIndex({ "appointment.date": 1, "appointment.time": 1 })
db.appointments.createIndex({ "customer.email": 1 })
db.appointments.createIndex({ "status": 1 })
db.appointments.createIndex({ "created_at": -1 })
```

---

## 🔌 API Endpoints Needed

### 1. **Create Appointment**
```
POST /api/appointments
Request Body:
{
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+250788123456",
    "country": "Rwanda"
  },
  "appointment": {
    "date": "2024-02-15",
    "time": "10:00",
    "service_type": "visa_consultation",
    "notes": "Optional notes"
  }
}

Response:
{
  "id": "uuid",
  "status": "pending",
  "message": "Appointment created successfully",
  "confirmation_email_sent": true
}
```

### 2. **Get Available Time Slots**
```
GET /api/appointments/available-slots?date=2024-02-15&service_type=visa_consultation

Response:
{
  "date": "2024-02-15",
  "available_slots": [
    "09:00", "09:30", "10:00", "10:30", "11:00",
    "14:00", "14:30", "15:00", "15:30", "16:00"
  ]
}
```

### 3. **Get Appointment by ID**
```
GET /api/appointments/{appointment_id}

Response:
{
  "id": "uuid",
  "customer": {...},
  "appointment": {...},
  "status": "confirmed"
}
```

### 4. **Cancel Appointment**
```
PATCH /api/appointments/{appointment_id}/cancel

Response:
{
  "id": "uuid",
  "status": "cancelled",
  "cancelled_at": "2024-01-15T10:00:00Z"
}
```

### 5. **Admin: List All Appointments**
```
GET /api/admin/appointments?status=pending&date_from=2024-01-01&date_to=2024-12-31

Response:
{
  "appointments": [...],
  "total": 50,
  "page": 1
}
```

### 6. **Admin: Confirm Appointment**
```
PATCH /api/admin/appointments/{appointment_id}/confirm

Response:
{
  "id": "uuid",
  "status": "confirmed",
  "confirmed_at": "2024-01-15T10:00:00Z"
}
```

---

## 📧 Email Templates

### 1. **Customer Confirmation Email**
**Subject:** Appointment Confirmed - CardX Academia

**Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #14B8A6; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; }
    .appointment-details { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #14B8A6; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Appointment Confirmed</h1>
    </div>
    <div class="content">
      <p>Dear {{customer_name}},</p>
      <p>Thank you for booking an appointment with CardX Academia. Your appointment has been confirmed.</p>
      
      <div class="appointment-details">
        <h3>Appointment Details:</h3>
        <p><strong>Date:</strong> {{appointment_date}}</p>
        <p><strong>Time:</strong> {{appointment_time}}</p>
        <p><strong>Service:</strong> {{service_type}}</p>
        <p><strong>Duration:</strong> {{duration}} minutes</p>
      </div>
      
      <p><strong>Location:</strong><br>
      1st Floor, Door F1B-013D,<br>
      Town Center Building (TCB),<br>
      Kigali City, Rwanda</p>
      
      <p>If you need to reschedule or cancel, please contact us at:</p>
      <p>Email: info@cardxacademia.com<br>
      Phone: +250788603451</p>
      
      <p>We look forward to meeting you!</p>
      <p>Best regards,<br>CardX Academia Team</p>
    </div>
    <div class="footer">
      <p>© 2024 CardX Academia. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
```

### 2. **Admin Notification Email**
**Subject:** New Appointment Booking - {{customer_name}}

**Body:**
```html
New appointment booking received:

Customer: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}

Appointment Date: {{appointment_date}}
Time: {{appointment_time}}
Service: {{service_type}}

Notes: {{notes}}

View in admin panel: {{admin_url}}
```

### 3. **Reminder Email** (Optional - 24 hours before)
**Subject:** Reminder: Your Appointment Tomorrow - CardX Academia

---

## 🛠️ Implementation Steps

### Phase 1: Backend Setup (Week 1)

#### Step 1: Install Dependencies
```bash
cd backend
pip install sendgrid  # or resend
pip install python-dateutil  # for date handling
pip install pytz  # for timezone handling
```

#### Step 2: Environment Variables
Add to `backend/.env`:
```env
# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@cardxacademia.com
ADMIN_EMAIL=info@cardxacademia.com

# Or SendGrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@cardxacademia.com
SENDGRID_ADMIN_EMAIL=info@cardxacademia.com

# Existing
MONGO_URL=mongodb://...
DB_NAME=cardxacademia
CORS_ORIGINS=http://localhost:3000,https://cardxacademia.com
```

#### Step 3: Create Email Service Module
Create `backend/services/email_service.py`:
```python
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.api_key = os.environ.get('SENDGRID_API_KEY')
        self.from_email = os.environ.get('SENDGRID_FROM_EMAIL', 'noreply@cardxacademia.com')
        self.admin_email = os.environ.get('SENDGRID_ADMIN_EMAIL', 'info@cardxacademia.com')
        self.client = SendGridAPIClient(self.api_key) if self.api_key else None
    
    async def send_appointment_confirmation(self, appointment_data):
        """Send confirmation email to customer"""
        # Implementation here
        pass
    
    async def send_admin_notification(self, appointment_data):
        """Send notification to admin"""
        # Implementation here
        pass
```

#### Step 4: Create Appointment Models
Add to `backend/server.py`:
```python
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Literal
from datetime import date, time

class CustomerInfo(BaseModel):
    name: str
    email: EmailStr
    phone: str
    country: Optional[str] = None

class AppointmentInfo(BaseModel):
    date: date
    time: str  # Format: "HH:MM"
    service_type: Literal["visa_consultation", "admission_guidance", "general_inquiry"]
    duration: int = 30  # minutes
    notes: Optional[str] = None

class AppointmentCreate(BaseModel):
    customer: CustomerInfo
    appointment: AppointmentInfo

class Appointment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer: CustomerInfo
    appointment: AppointmentInfo
    status: Literal["pending", "confirmed", "cancelled", "completed"] = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    email_sent: bool = False
```

#### Step 5: Create API Endpoints
Add appointment routes to `backend/server.py`:
```python
@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    # Validate time slot availability
    # Create appointment in MongoDB
    # Send confirmation email
    # Send admin notification
    pass

@api_router.get("/appointments/available-slots")
async def get_available_slots(date: str, service_type: str):
    # Get all appointments for the date
    # Calculate available slots
    # Return available times
    pass
```

### Phase 2: Frontend Setup (Week 1-2)

#### Step 1: Create Appointment Page
Create `frontend/src/pages/AppointmentPage.jsx`:
- Calendar component for date selection
- Time slot picker
- Service type selector
- Customer information form
- Submit button

#### Step 2: Create API Service
Create `frontend/src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const appointmentAPI = {
  createAppointment: async (data) => {
    return axios.post(`${API_BASE_URL}/api/appointments`, data);
  },
  getAvailableSlots: async (date, serviceType) => {
    return axios.get(`${API_BASE_URL}/api/appointments/available-slots`, {
      params: { date, service_type: serviceType }
    });
  }
};
```

#### Step 3: Update Routing
Update `frontend/src/App.js`:
```javascript
import AppointmentPage from './pages/AppointmentPage';

<Route path="/appointment" element={<AppointmentPage />} />
```

### Phase 3: Testing & Refinement (Week 2)

- Test email delivery
- Test time slot conflicts
- Test form validation
- Test error handling
- Test on mobile devices

---

## 🔐 Security Considerations

1. **Rate Limiting:** Limit appointment creation per IP/email
2. **Input Validation:** Validate all form inputs
3. **Time Slot Validation:** Prevent double-booking
4. **Email Verification:** Optional - verify customer email
5. **CAPTCHA:** Add to prevent spam bookings

---

## 📈 Future Enhancements

1. **Calendar Integration:** Google Calendar sync
2. **SMS Notifications:** Twilio integration
3. **Reminder Emails:** 24h before appointment
4. **Rescheduling:** Allow customers to reschedule
5. **Video Call Links:** For online consultations
6. **Payment Integration:** For paid consultations
7. **Multi-language:** Support Kinyarwanda, French, English

---

## 💰 Cost Estimation

### Email Service:
- **Resend:** Free (3,000/month) or $20/month (50,000)
- **SendGrid:** Free (100/day) or $19.95/month (50,000)

### Development Time:
- Backend: 2-3 days
- Frontend: 2-3 days
- Testing: 1-2 days
- **Total: 5-8 days**

---

## 🚀 Quick Start with Resend

1. **Sign up:** https://resend.com
2. **Get API key:** Dashboard → API Keys
3. **Verify domain:** Add DNS records
4. **Install:**
   ```bash
   pip install resend
   ```
5. **Use:**
   ```python
   import resend
   resend.api_key = "re_xxxxx"
   resend.Emails.send({
     "from": "noreply@cardxacademia.com",
     "to": ["customer@example.com"],
     "subject": "Appointment Confirmed",
     "html": "<h1>Your appointment is confirmed!</h1>"
   })
   ```

---

## 📝 Next Steps

1. ✅ Choose email service (Resend recommended)
2. ✅ Set up email service account
3. ✅ Create backend API endpoints
4. ✅ Create frontend appointment page
5. ✅ Test end-to-end flow
6. ✅ Deploy and monitor

---

*Last Updated: 2024*
