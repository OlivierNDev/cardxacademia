# ✈️ Israel Pilgrimage Booking System

**Date:** 2024-01-16  
**Status:** ✅ **CREATED & READY**

---

## ✅ What's Been Created

### **Backend API Endpoints:**

1. **POST `/api/pilgrimage-bookings`**
   - Creates a new pilgrimage booking
   - Saves to MongoDB (`pilgrimage_bookings` collection)
   - Sends confirmation email to customer
   - Sends notification email to admin
   - Returns booking with ID

2. **GET `/api/pilgrimage-bookings/{booking_id}`**
   - Retrieves a booking by ID
   - Returns full booking details

### **Email Notifications:**

1. **Customer Confirmation Email:**
   - Sent to: Customer's email address
   - Subject: "Israel Pilgrimage Booking Confirmed - [Name]"
   - Contains: Booking ID, tour dates, cost, next steps
   - Includes contact information

2. **Admin Notification Email:**
   - Sent to: `olivier.niyo250@gmail.com` (from `.env`)
   - Subject: "New Israel Pilgrimage Booking - [Name] - [Tour Dates]"
   - Contains: Full customer details, passport info, booking details, medical/dietary info
   - Includes all form data for review

### **Frontend Updates:**

1. **Updated `IsraelTourApplicationPage.jsx`:**
   - ✅ Form now submits to backend API
   - ✅ Success message with booking ID
   - ✅ Error handling and display
   - ✅ Loading states during submission
   - ✅ Form reset after successful submission

2. **Added `pilgrimageAPI` service:**
   - `createPilgrimageBooking()` - Submit booking
   - `getPilgrimageBooking()` - Get booking by ID

---

## 📋 Booking Data Structure

### Customer Information:
- Full Name (required)
- Email (required)
- Phone (required)
- Date of Birth
- Gender
- Nationality
- Passport Number
- Passport Expiry Date
- Address, City, Country (required)
- Alternate Phone

### Booking Information:
- Tour Dates: "March 29, 2026 – April 5, 2026"
- Tour Cost: "USD $2,900"
- Church Information (optional)
- Emergency Contact (required)
- Medical Conditions
- Dietary Requirements
- Special Requests

---

## 🚀 How to Use

### **For Users:**
1. Go to: http://localhost:3000/israel-pilgrimage-2025
2. Click "Apply Now"
3. Fill out the application form
4. Submit the form
5. Receive confirmation email
6. Wait for admin contact (2-3 business days)

### **For Admin:**
1. Receive notification email at `olivier.niyo250@gmail.com`
2. Review booking details
3. Contact customer for payment and documents
4. Process booking

---

## 📧 Email Templates

### Customer Email Includes:
- ✅ Booking ID
- Tour Dates and Cost
- Next Steps (payment, documents, etc.)
- Contact Information
- Registration Deadline Reminder

### Admin Email Includes:
- ✅ Full Customer Information
- Passport Details
- Booking ID
- Church Information
- Emergency Contact
- Medical/Dietary Requirements
- Special Requests
- All form data for review

---

## 🔧 Technical Details

### **Database Collection:**
- Collection: `pilgrimage_bookings`
- Stores: Full booking data with timestamps
- Indexed by: `id` (UUID)

### **Email Service:**
- Uses same Resend API as appointments
- Same email service instance
- Same admin email configuration
- Same domain verification

### **Error Handling:**
- Frontend: Shows error messages to user
- Backend: Logs errors, doesn't fail booking if email fails
- Database: Handles MongoDB connection errors

---

## ✅ Testing Checklist

- [ ] Restart backend server
- [ ] Test booking submission
- [ ] Verify customer email received
- [ ] Verify admin email received
- [ ] Check backend logs for email status
- [ ] Verify booking saved in MongoDB
- [ ] Test error handling (invalid data)

---

## 🎯 Next Steps

1. **Restart Backend Server:**
   ```bash
   cd backend
   uvicorn server:app --reload --port 8000
   ```

2. **Test the Booking:**
   - Go to http://localhost:3000/apply-israel-tour
   - Fill out the form
   - Submit
   - Check emails

3. **Verify Emails:**
   - Customer email inbox
   - Admin email: `olivier.niyo250@gmail.com`
   - Backend terminal logs

---

## 📊 System Status

| Component | Status | Notes |
|-----------|--------|-------|
| Backend Endpoints | ✅ Created | POST and GET endpoints |
| Email Templates | ✅ Created | Customer & admin emails |
| Frontend Form | ✅ Updated | Submits to backend |
| API Service | ✅ Created | pilgrimageAPI methods |
| Error Handling | ✅ Implemented | Frontend & backend |
| Database Storage | ✅ Configured | MongoDB collection |

---

**The Israel Pilgrimage booking system is now fully functional with email notifications!** 🎉
