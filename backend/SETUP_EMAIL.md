# Email Service Setup Guide

## Resend API Key Configuration

Your Resend API key has been configured. Follow these steps to complete the setup:

### 1. Create `.env` file in the `backend` directory

Create a file named `.env` in the `backend` folder with the following content:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=cardxacademia

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Resend Email Service
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=info@cardxacademia.com
REPLY_TO_EMAIL=info@cardxacademia.com
```

**Email Configuration:**
- `FROM_EMAIL`: The "from" address shown in emails (noreply address)
- `ADMIN_EMAIL`: Email address for admin notifications
- `REPLY_TO_EMAIL`: The "reply-to" address (defaults to `info@cardxacademia.com` if not set)
```

### 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

This will install:
- `resend>=2.0.0` - Resend email service
- `python-dateutil>=2.8.2` - Date handling
- `pytz>=2024.1` - Timezone support

### 3. Verify Domain in Resend (Important!)

Before sending emails, you need to:

1. Go to [Resend Dashboard](https://resend.com/domains)
2. Add your domain: `cardxacademia.com`
3. Add the DNS records provided by Resend to your domain
4. Wait for domain verification (usually takes a few minutes)

**For Testing:**
- You can use Resend's test domain: `onboarding@resend.dev`
- Or use your verified email address for testing

### 4. Update Email Addresses

Once your domain is verified, update the `.env` file:

```env
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=info@cardxacademia.com
REPLY_TO_EMAIL=info@cardxacademia.com
```

**Note:** 
- `FROM_EMAIL`: The "from" address shown in emails (noreply address)
- `ADMIN_EMAIL`: Email address for admin notifications
- `REPLY_TO_EMAIL`: The "reply-to" address (defaults to `info@cardxacademia.com` if not set)

### 5. Test the Email Service

Start your backend server:

```bash
cd backend
uvicorn server:app --reload --port 8000
```

The email service will automatically initialize when the server starts.

## API Endpoints Available

### Create Appointment
```
POST /api/appointments
```

### Get Available Time Slots
```
GET /api/appointments/available-slots?date=2024-02-15&service_type=visa_consultation
```

### Get Appointment by ID
```
GET /api/appointments/{appointment_id}
```

### Cancel Appointment
```
PATCH /api/appointments/{appointment_id}/cancel
```

## Email Templates

The system automatically sends:

1. **Customer Confirmation Email** - Sent to the customer when appointment is booked
2. **Admin Notification Email** - Sent to admin email when new appointment is created

Both emails are HTML formatted and include all appointment details.

## Troubleshooting

### Email not sending?
1. Check that `RESEND_API_KEY` is set correctly in `.env`
2. Verify your domain in Resend dashboard
3. Check server logs for error messages
4. Make sure the email addresses are valid

### Domain not verified?
- Use `onboarding@resend.dev` for testing
- Or use your personal email that's verified in Resend

## Security Notes

⚠️ **Important:** Never commit the `.env` file to git. It contains your API key.

The `.env` file is already in `.gitignore` to prevent accidental commits.
