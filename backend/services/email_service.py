"""
Email Service using Resend API
Handles sending emails for appointments, confirmations, and notifications
"""
import os
import logging
from typing import Dict, Optional
import resend
from datetime import datetime

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.api_key = os.environ.get('RESEND_API_KEY')
        self.from_email = os.environ.get('FROM_EMAIL', 'CardX Academia <noreply@cardxacademia.com>')
        self.admin_email = os.environ.get('ADMIN_EMAIL')
        
        if not self.admin_email:
            logger.warning("ADMIN_EMAIL not found in environment variables. Admin notifications will be disabled.")
        
        if not self.api_key:
            logger.warning("RESEND_API_KEY not found. Email service will be disabled.")
            self.client = None
        else:
            # Set API key for resend module
            resend.api_key = self.api_key
            # Use resend.emails module directly
            self.client = resend.emails
    
    def _send_email(
        self,
        to: str,
        subject: str,
        html_content: str,
        reply_to: Optional[str] = None
    ) -> bool:
        """Internal method to send email via Resend"""
        if not self.client:
            logger.error("Email service not initialized. Check RESEND_API_KEY.")
            return False
        
        # Ensure API key is set
        if not resend.api_key:
            resend.api_key = self.api_key
        
        try:
            params = {
                "from": self.from_email,
                "to": [to],
                "subject": subject,
                "html": html_content,
            }
            
            if reply_to:
                params["reply_to"] = reply_to
            
            logger.info(f"Attempting to send email to {to} with subject: {subject}")
            # Use the correct Resend API - Emails class
            from resend.emails._emails import Emails
            emails_client = Emails()
            email = emails_client.send(params)
            
            if email and email.get('id'):
                logger.info(f"✅ Email sent successfully to {to}. Email ID: {email.get('id')}")
                return True
            else:
                logger.error(f"❌ Email send returned no ID. Response: {email}")
                return False
        except Exception as e:
            logger.error(f"❌ Failed to send email to {to}: {str(e)}")
            logger.error(f"Error type: {type(e).__name__}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            return False
    
    def send_appointment_confirmation(self, appointment_data: Dict) -> bool:
        """Send confirmation email to customer after appointment booking"""
        customer_name = appointment_data.get('customer', {}).get('name', 'Valued Customer')
        customer_email = appointment_data.get('customer', {}).get('email')
        appointment_date = appointment_data.get('appointment', {}).get('date')
        appointment_time = appointment_data.get('appointment', {}).get('time')
        appointment_type = appointment_data.get('appointment', {}).get('appointment_type', 'in_person')
        location = appointment_data.get('appointment', {}).get('location', '')
        worker = appointment_data.get('appointment', {}).get('worker', '')
        service_type = appointment_data.get('appointment', {}).get('service_type', 'Consultation')
        duration = appointment_data.get('appointment', {}).get('duration', 30)
        notes = appointment_data.get('appointment', {}).get('notes', '')
        
        # Format service type for display
        service_display = service_type.replace('_', ' ').title()
        
        # Format date for display
        try:
            if isinstance(appointment_date, str):
                date_obj = datetime.fromisoformat(appointment_date.replace('Z', '+00:00'))
            else:
                date_obj = appointment_date
            formatted_date = date_obj.strftime('%B %d, %Y')
        except:
            formatted_date = str(appointment_date)
        
        html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }}
    .container {{
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }}
    .header {{
      background: linear-gradient(135deg, #14B8A6 0%, #0D9488 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }}
    .header h1 {{
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }}
    .content {{
      padding: 30px 20px;
    }}
    .greeting {{
      font-size: 16px;
      margin-bottom: 20px;
    }}
    .appointment-details {{
      background-color: #f8f9fa;
      border-left: 4px solid #14B8A6;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }}
    .appointment-details h3 {{
      margin-top: 0;
      color: #14B8A6;
      font-size: 18px;
    }}
    .detail-row {{
      margin: 12px 0;
      display: flex;
      align-items: center;
    }}
    .detail-label {{
      font-weight: 600;
      color: #555;
      min-width: 120px;
    }}
    .detail-value {{
      color: #333;
    }}
    .location {{
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
    }}
    .contact-info {{
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }}
    .contact-info p {{
      margin: 8px 0;
      color: #666;
    }}
    .footer {{
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 12px;
    }}
    .button {{
      display: inline-block;
      background-color: #14B8A6;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 20px;
      font-weight: 500;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Appointment Confirmed</h1>
    </div>
    <div class="content">
      <div class="greeting">
        <p>Dear {customer_name},</p>
        <p>Thank you for booking an appointment with <strong>CardX Academia</strong>. Your appointment has been successfully confirmed!</p>
      </div>
      
      <div class="appointment-details">
        <h3>Appointment Details</h3>
        <div class="detail-row">
          <span class="detail-label">Date:</span>
          <span class="detail-value">{formatted_date}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span class="detail-value">{appointment_time}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Service:</span>
          <span class="detail-value">{service_display}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration:</span>
          <span class="detail-value">{duration} minutes</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Type:</span>
          <span class="detail-value">{'In-Person Meeting' if appointment_type == 'in_person' else 'Virtual Meeting (Online)'}</span>
        </div>
        {f'<div class="detail-row"><span class="detail-label">Consultant:</span><span class="detail-value">{worker}</span></div>' if worker else ''}
        {f'<div class="detail-row"><span class="detail-label">Notes:</span><span class="detail-value">{notes}</span></div>' if notes else ''}
      </div>
      
      {f'''
      <div class="location">
        <h3 style="margin-top: 0; color: #14B8A6;">📍 Meeting Location</h3>
        <p style="margin: 5px 0;"><strong>CardX Academia</strong><br>
        {location if location else '1st Floor, Door F1B-013D<br>Town Center Building (TCB)<br>Kigali City, Rwanda'}</p>
      </div>
      ''' if appointment_type == 'in_person' else '''
      <div class="location">
        <h3 style="margin-top: 0; color: #14B8A6;">💻 Virtual Meeting</h3>
        <p style="margin: 5px 0;">This is a virtual appointment. You will receive a meeting link via email before your appointment time.</p>
      </div>
      '''}
      
      <div class="contact-info">
        <p><strong>Need to reschedule or cancel?</strong></p>
        <p>Please contact us at:</p>
        <p>📧 Email: <a href="mailto:info@cardxacademia.com" style="color: #14B8A6;">info@cardxacademia.com</a></p>
        <p>📞 Phone: <a href="tel:+250788603451" style="color: #14B8A6;">+250 788 603 451</a></p>
      </div>
      
      <p style="margin-top: 25px;">We look forward to meeting you and helping you achieve your goals!</p>
      <p>Best regards,<br><strong>The CardX Academia Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2024 CardX Academia. All rights reserved.</p>
      <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
    </div>
  </div>
</body>
</html>
        """
        
        subject = f"Appointment Confirmed - {formatted_date} at {appointment_time}"
        
        return self._send_email(
            to=customer_email,
            subject=subject,
            html_content=html_content,
            reply_to=self.admin_email
        )
    
    def send_admin_notification(self, appointment_data: Dict) -> bool:
        """Send notification email to admin about new appointment booking"""
        if not self.admin_email:
            logger.warning("ADMIN_EMAIL not configured. Skipping admin notification.")
            return False
            
        customer_name = appointment_data.get('customer', {}).get('name', 'Unknown')
        customer_email = appointment_data.get('customer', {}).get('email', 'Unknown')
        customer_phone = appointment_data.get('customer', {}).get('phone', 'Not provided')
        customer_country = appointment_data.get('customer', {}).get('country', 'Not provided')
        appointment_date = appointment_data.get('appointment', {}).get('date')
        appointment_time = appointment_data.get('appointment', {}).get('time')
        appointment_type = appointment_data.get('appointment', {}).get('appointment_type', 'in_person')
        location = appointment_data.get('appointment', {}).get('location', 'Not specified')
        worker = appointment_data.get('appointment', {}).get('worker', 'Not specified')
        service_type = appointment_data.get('appointment', {}).get('service_type', 'Consultation')
        duration = appointment_data.get('appointment', {}).get('duration', 30)
        notes = appointment_data.get('appointment', {}).get('notes', 'None')
        appointment_id = appointment_data.get('id', 'Unknown')
        
        # Format service type
        service_display = service_type.replace('_', ' ').title()
        
        # Format date
        try:
            if isinstance(appointment_date, str):
                date_obj = datetime.fromisoformat(appointment_date.replace('Z', '+00:00'))
            else:
                date_obj = appointment_date
            formatted_date = date_obj.strftime('%B %d, %Y')
        except:
            formatted_date = str(appointment_date)
        
        html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }}
    .header {{
      background-color: #14B8A6;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 6px 6px 0 0;
    }}
    .content {{
      background-color: #f9f9f9;
      padding: 20px;
      border: 1px solid #ddd;
    }}
    .info-section {{
      background-color: white;
      padding: 15px;
      margin: 15px 0;
      border-left: 4px solid #14B8A6;
      border-radius: 4px;
    }}
    .info-row {{
      margin: 8px 0;
    }}
    .label {{
      font-weight: bold;
      color: #555;
    }}
    .footer {{
      text-align: center;
      padding: 15px;
      color: #666;
      font-size: 12px;
    }}
  </style>
</head>
<body>
  <div class="header">
    <h2>🔔 New Appointment Booking</h2>
  </div>
  <div class="content">
    <p>A new appointment has been booked through the website.</p>
    
    <div class="info-section">
      <h3 style="margin-top: 0; color: #14B8A6;">Customer Information</h3>
      <div class="info-row"><span class="label">Name:</span> {customer_name}</div>
      <div class="info-row"><span class="label">Email:</span> <a href="mailto:{customer_email}">{customer_email}</a></div>
      <div class="info-row"><span class="label">Phone:</span> <a href="tel:{customer_phone}">{customer_phone}</a></div>
      <div class="info-row"><span class="label">Country:</span> {customer_country}</div>
    </div>
    
    <div class="info-section">
      <h3 style="margin-top: 0; color: #14B8A6;">Appointment Details</h3>
      <div class="info-row"><span class="label">Appointment ID:</span> {appointment_id}</div>
      <div class="info-row"><span class="label">Date:</span> {formatted_date}</div>
      <div class="info-row"><span class="label">Time:</span> {appointment_time}</div>
      <div class="info-row"><span class="label">Service:</span> {service_display}</div>
      <div class="info-row"><span class="label">Duration:</span> {duration} minutes</div>
      <div class="info-row"><span class="label">Type:</span> {'In-Person' if appointment_type == 'in_person' else 'Virtual (Online)'}</div>
      <div class="info-row"><span class="label">Location:</span> {location if appointment_type == 'in_person' else 'Virtual Meeting'}</div>
      <div class="info-row"><span class="label">Consultant:</span> {worker}</div>
      <div class="info-row"><span class="label">Notes:</span> {notes}</div>
    </div>
    
    <p style="margin-top: 20px;"><strong>Action Required:</strong> Please confirm this appointment in your system.</p>
  </div>
    <div class="footer">
      <p>This is an automated notification from CardX Academia booking system.</p>
    </div>
  </body>
  </html>
        """
        
        subject = f"New Appointment Booking - {customer_name} - {formatted_date}"
        
        return self._send_email(
            to=self.admin_email,
            subject=subject,
            html_content=html_content
        )
    
    def send_pilgrimage_confirmation(self, booking_data: Dict) -> bool:
        """Send confirmation email to customer after pilgrimage booking"""
        customer_name = booking_data.get('customer', {}).get('fullName', 'Valued Pilgrim')
        customer_email = booking_data.get('customer', {}).get('email')
        tour_dates = booking_data.get('booking', {}).get('tourDates', 'March 29, 2026 – April 5, 2026')
        tour_cost = booking_data.get('booking', {}).get('tourCost', 'USD $2,900')
        booking_id = booking_data.get('id', 'Unknown')
        
        # Format date
        try:
            created_at = booking_data.get('created_at')
            if isinstance(created_at, str):
                date_obj = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
            else:
                date_obj = created_at
            formatted_date = date_obj.strftime('%B %d, %Y')
        except:
            formatted_date = datetime.now().strftime('%B %d, %Y')
        
        html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }}
    .container {{
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }}
    .header {{
      background: linear-gradient(135deg, #2563EB 0%, #1E40AF 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }}
    .header h1 {{
      margin: 0;
      font-size: 28px;
      font-weight: 600;
    }}
    .content {{
      padding: 30px 20px;
    }}
    .greeting {{
      font-size: 16px;
      margin-bottom: 20px;
    }}
    .booking-details {{
      background-color: #f8f9fa;
      border-left: 4px solid #2563EB;
      padding: 20px;
      margin: 25px 0;
      border-radius: 4px;
    }}
    .booking-details h3 {{
      margin-top: 0;
      color: #2563EB;
      font-size: 18px;
    }}
    .detail-row {{
      margin: 12px 0;
      display: flex;
      align-items: center;
    }}
    .detail-label {{
      font-weight: 600;
      color: #555;
      min-width: 140px;
    }}
    .detail-value {{
      color: #333;
    }}
    .contact-info {{
      margin-top: 25px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }}
    .contact-info p {{
      margin: 8px 0;
      color: #666;
    }}
    .footer {{
      background-color: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #666;
      font-size: 12px;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✈️ Pilgrimage Booking Confirmed!</h1>
    </div>
    <div class="content">
      <div class="greeting">
        <p>Dear {customer_name},</p>
        <p>Thank you for booking the <strong>Holy Land Pilgrimage to Israel</strong> with CardX Academia & Travel Tours. Your booking has been successfully received and confirmed!</p>
      </div>
      
      <div class="booking-details">
        <h3>Booking Details</h3>
        <div class="detail-row">
          <span class="detail-label">Booking ID:</span>
          <span class="detail-value">{booking_id}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Tour Dates:</span>
          <span class="detail-value">{tour_dates}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Tour Cost:</span>
          <span class="detail-value"><strong>{tour_cost}</strong> per person</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Booking Date:</span>
          <span class="detail-value">{formatted_date}</span>
        </div>
      </div>
      
      <div class="booking-details">
        <h3>Next Steps</h3>
        <p style="margin: 8px 0;">1. Our team will review your application and contact you within 2-3 business days.</p>
        <p style="margin: 8px 0;">2. You will receive further instructions regarding payment and required documents.</p>
        <p style="margin: 8px 0;">3. Please ensure your passport is valid for at least 6 months from the travel date.</p>
        <p style="margin: 8px 0;">4. Registration deadline: <strong>March 15, 2026</strong></p>
      </div>
      
      <div class="contact-info">
        <p><strong>Questions or need assistance?</strong></p>
        <p>Please contact us at:</p>
        <p>📧 Email: <a href="mailto:tours@cardxacademia.com" style="color: #2563EB;">tours@cardxacademia.com</a></p>
        <p>📞 Phone: <a href="tel:+250788603451" style="color: #2563EB;">+250 788 603 451</a></p>
        <p>📍 Office: 1st Floor, Door F1B-013D, Town Center Building (TCB), Kigali City</p>
      </div>
      
      <p style="margin-top: 25px;">We look forward to accompanying you on this spiritual journey to the Holy Land!</p>
      <p>Blessings,<br><strong>The CardX Academia & Travel Tours Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2024 CardX Academia & Travel Tours. All rights reserved.</p>
      <p>This is an automated confirmation email. Please do not reply directly to this message.</p>
    </div>
  </div>
</body>
</html>
        """
        
        subject = f"Israel Pilgrimage Booking Confirmed - {customer_name}"
        
        return self._send_email(
            to=customer_email,
            subject=subject,
            html_content=html_content,
            reply_to=self.admin_email
        )
    
    def send_pilgrimage_admin_notification(self, booking_data: Dict) -> bool:
        """Send notification email to admin about new pilgrimage booking"""
        if not self.admin_email:
            logger.warning("ADMIN_EMAIL not configured. Skipping admin notification.")
            return False
            
        customer_name = booking_data.get('customer', {}).get('fullName', 'Unknown')
        customer_email = booking_data.get('customer', {}).get('email', 'Unknown')
        customer_phone = booking_data.get('customer', {}).get('phone', 'Not provided')
        customer_city = booking_data.get('customer', {}).get('city', 'Not provided')
        customer_country = booking_data.get('customer', {}).get('country', 'Not provided')
        passport_number = booking_data.get('customer', {}).get('passportNumber', 'Not provided')
        passport_expiry = booking_data.get('customer', {}).get('passportExpiryDate', 'Not provided')
        
        booking = booking_data.get('booking', {})
        tour_dates = booking.get('tourDates', 'March 29, 2026 – April 5, 2026')
        tour_cost = booking.get('tourCost', 'USD $2,900')
        church_name = booking.get('churchName', 'Not provided')
        emergency_contact = booking.get('emergencyContactName', 'Not provided')
        emergency_phone = booking.get('emergencyContactPhone', 'Not provided')
        medical_conditions = booking.get('medicalConditions', 'None')
        dietary_requirements = booking.get('dietaryRequirements', 'None')
        special_requests = booking.get('specialRequests', 'None')
        booking_id = booking_data.get('id', 'Unknown')
        
        # Format date
        try:
            created_at = booking_data.get('created_at')
            if isinstance(created_at, str):
                date_obj = datetime.fromisoformat(created_at.replace('Z', '+00:00'))
            else:
                date_obj = created_at
            formatted_date = date_obj.strftime('%B %d, %Y at %I:%M %p')
        except:
            formatted_date = datetime.now().strftime('%B %d, %Y at %I:%M %p')
        
        html_content = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }}
    .header {{
      background-color: #2563EB;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 6px 6px 0 0;
    }}
    .content {{
      background-color: #f9f9f9;
      padding: 20px;
      border: 1px solid #ddd;
    }}
    .info-section {{
      background-color: white;
      padding: 15px;
      margin: 15px 0;
      border-left: 4px solid #2563EB;
      border-radius: 4px;
    }}
    .info-row {{
      margin: 8px 0;
    }}
    .label {{
      font-weight: bold;
      color: #555;
    }}
    .footer {{
      text-align: center;
      padding: 15px;
      color: #666;
      font-size: 12px;
    }}
  </style>
</head>
<body>
  <div class="header">
    <h2>✈️ New Israel Pilgrimage Booking</h2>
  </div>
  <div class="content">
    <p>A new Israel Pilgrimage booking has been submitted through the website.</p>
    
    <div class="info-section">
      <h3 style="margin-top: 0; color: #2563EB;">Customer Information</h3>
      <div class="info-row"><span class="label">Name:</span> {customer_name}</div>
      <div class="info-row"><span class="label">Email:</span> <a href="mailto:{customer_email}">{customer_email}</a></div>
      <div class="info-row"><span class="label">Phone:</span> <a href="tel:{customer_phone}">{customer_phone}</a></div>
      <div class="info-row"><span class="label">City:</span> {customer_city}</div>
      <div class="info-row"><span class="label">Country:</span> {customer_country}</div>
      <div class="info-row"><span class="label">Passport Number:</span> {passport_number}</div>
      <div class="info-row"><span class="label">Passport Expiry:</span> {passport_expiry}</div>
    </div>
    
    <div class="info-section">
      <h3 style="margin-top: 0; color: #2563EB;">Booking Details</h3>
      <div class="info-row"><span class="label">Booking ID:</span> {booking_id}</div>
      <div class="info-row"><span class="label">Tour Dates:</span> {tour_dates}</div>
      <div class="info-row"><span class="label">Tour Cost:</span> {tour_cost} per person</div>
      <div class="info-row"><span class="label">Church Name:</span> {church_name}</div>
      <div class="info-row"><span class="label">Emergency Contact:</span> {emergency_contact}</div>
      <div class="info-row"><span class="label">Emergency Phone:</span> {emergency_phone}</div>
      <div class="info-row"><span class="label">Medical Conditions:</span> {medical_conditions}</div>
      <div class="info-row"><span class="label">Dietary Requirements:</span> {dietary_requirements}</div>
      <div class="info-row"><span class="label">Special Requests:</span> {special_requests}</div>
      <div class="info-row"><span class="label">Booking Date:</span> {formatted_date}</div>
    </div>
    
    <p style="margin-top: 20px;"><strong>Action Required:</strong> Please review this booking and follow up with the customer regarding payment and required documents.</p>
  </div>
  <div class="footer">
    <p>This is an automated notification from CardX Academia & Travel Tours booking system.</p>
  </div>
</body>
</html>
        """
        
        subject = f"New Israel Pilgrimage Booking - {customer_name} - {tour_dates}"
        
        return self._send_email(
            to=self.admin_email,
            subject=subject,
            html_content=html_content
        )
