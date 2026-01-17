# 🔍 Email Debugging Guide

**Date:** 2024-01-16  
**Status:** Domain Verified ✅ - Testing Email Sending

---

## ✅ Domain Status

**Domain:** `cardxacademia.com`  
**Status:** ✅ **VERIFIED** in Resend Dashboard  
**Region:** North Virginia (us-east-1)

---

## 🔧 Code Fix Applied

**File:** `backend/services/email_service.py`

**Fixed:**
```python
# BEFORE (WRONG):
email = resend.emails.send(params)  # ❌ Module, not callable

# AFTER (CORRECT):
from resend.emails._emails import Emails
emails_client = Emails()
email = emails_client.send(params)  # ✅ Correct API usage
```

**Status:** ✅ **FIXED**

---

## 🧪 Testing Steps

### 1. **Restart Backend Server** (REQUIRED)

The code fix requires a server restart:

```bash
cd backend
# Stop current server (Ctrl+C)
uvicorn server:app --reload --port 8000
```

### 2. **Check Backend Logs When Booking**

When you book an appointment, watch the backend terminal for:

**Success indicators:**
- `📧 Starting email sending process for appointment [id]`
- `📧 Sending confirmation email to customer: [email]`
- `📧 Sending admin notification email`
- `✅ Email sent successfully to [email]. Email ID: [id]`
- `✅ Both emails sent successfully for appointment [id]`

**Error indicators:**
- `❌ Failed to send email to [email]: [error message]`
- `❌ Email send returned no ID. Response: [response]`
- `❌ Both emails failed to send for appointment [id]`

### 3. **Test Email Service Directly**

Create a simple test script:

```python
# test_email_simple.py
from dotenv import load_dotenv
from pathlib import Path
import os
load_dotenv(Path('.env'))

from services.email_service import EmailService

es = EmailService()
if es.client:
    result = es._send_email(
        to="olivier.niyo250@gmail.com",
        subject="Test Email",
        html_content="<h1>Test</h1><p>This is a test email.</p>"
    )
    print("Email sent:", result)
else:
    print("Email service not initialized")
```

Run:
```bash
cd backend
python test_email_simple.py
```

---

## 🔍 Common Issues & Solutions

### Issue 1: "Email service not initialized"
**Cause:** `RESEND_API_KEY` not set or invalid  
**Solution:** Check `.env` file has correct `RESEND_API_KEY`

### Issue 2: "Email send returned no ID"
**Cause:** Resend API returned error or unexpected response  
**Solution:** Check Resend dashboard logs for API errors

### Issue 3: "Failed to send email" with error
**Cause:** Various (domain, API key, rate limit, etc.)  
**Solution:** Check error message in logs for specific issue

### Issue 4: No logs at all
**Cause:** Email service not being called  
**Solution:** Check if appointment creation is reaching email sending code

---

## 📋 Checklist

- [ ] Backend server restarted (to load fixed code)
- [ ] Domain verified in Resend ✅ (Already done)
- [ ] API key set in `.env`
- [ ] Test appointment booked
- [ ] Backend logs checked for email attempts
- [ ] Email inboxes checked (customer & admin)
- [ ] Spam folders checked

---

## 🚀 Next Steps

1. **Restart backend server** (CRITICAL - code won't work until restart)
2. **Book a test appointment**
3. **Watch backend terminal** for email logs
4. **Check email inboxes** (including spam)
5. **Report any errors** you see in logs

---

**The domain is verified and code is fixed. Restart the backend server and test!**
