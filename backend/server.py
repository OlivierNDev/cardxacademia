from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal
from datetime import datetime, timezone, date
import uuid
import pytz
from services.email_service import EmailService

# Kigali timezone
KIGALI_TZ = pytz.timezone('Africa/Kigali')


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging first (before using logger)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL') or os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017'
if not mongo_url or mongo_url == 'mongodb://localhost:27017':
    logger.warning("⚠️ MONGO_URL not set! Using default localhost. This will fail in production.")

# Ensure connection string doesn't have trailing slash issues
mongo_url = mongo_url.rstrip('/')

# Initialize MongoDB connection (allow app to start even if connection fails)
client = None
db = None
db_name = os.environ.get('DB_NAME', 'cardxacademia')

try:
    # Connect with longer timeout for initial connection
    client = AsyncIOMotorClient(
        mongo_url, 
        serverSelectionTimeoutMS=15000,  # 15 seconds for initial connection (Render can be slow)
        connectTimeoutMS=15000
    )
    db = client[db_name]
    logger.info("✅ MongoDB connection initialized")
    logger.info(f"📦 Database: {db_name}")
except Exception as e:
    logger.error(f"❌ Failed to connect to MongoDB: {str(e)}")
    logger.error(f"📦 Connection string: {mongo_url[:50]}..." if len(mongo_url) > 50 else f"📦 Connection string: {mongo_url}")
    logger.error("Please check MONGO_URL environment variable and MongoDB Atlas settings")
    logger.warning("⚠️ App will start but database operations will fail. Retrying connection in background...")
    # Don't raise - allow app to start, we'll handle database errors gracefully
    client = None
    db = None

# Initialize Email Service
email_service = EmailService()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


# Appointment Models
class CustomerInfo(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    country: Optional[str] = Field(None, max_length=100)

class AppointmentInfo(BaseModel):
    date: date
    time: str = Field(..., pattern=r'^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')  # HH:MM format
    appointment_type: Literal["in_person", "virtual"] = "in_person"
    location: Optional[str] = Field(None, max_length=200)  # For in-person appointments
    worker: Optional[str] = Field(None, max_length=100)  # Staff member name
    service_type: Literal["visa_consultation", "admission_guidance", "general_inquiry", "work_permit", "express_entry"]
    duration: int = Field(default=30, ge=15, le=120)  # minutes, between 15 and 120
    notes: Optional[str] = Field(None, max_length=500)

class AppointmentCreate(BaseModel):
    customer: CustomerInfo
    appointment: AppointmentInfo

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer: CustomerInfo
    appointment: AppointmentInfo
    status: Literal["pending", "confirmed", "cancelled", "completed"] = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(KIGALI_TZ))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(KIGALI_TZ))
    confirmed_at: Optional[datetime] = None
    cancelled_at: Optional[datetime] = None
    email_sent: bool = False
    reminder_sent: bool = False

# Israel Pilgrimage Models
class PilgrimageCustomerInfo(BaseModel):
    fullName: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=20)
    dateOfBirth: Optional[str] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    passportNumber: Optional[str] = None
    passportExpiryDate: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    alternatePhone: Optional[str] = None

class PilgrimageBookingInfo(BaseModel):
    tourDates: str = "March 29, 2026 – April 5, 2026"
    tourCost: str = "USD $2,900"
    churchName: Optional[str] = None
    churchAddress: Optional[str] = None
    pastorName: Optional[str] = None
    pastorPhone: Optional[str] = None
    membershipYears: Optional[str] = None
    previousTravel: Optional[str] = None
    medicalConditions: Optional[str] = None
    dietaryRequirements: Optional[str] = None
    emergencyContactName: Optional[str] = None
    emergencyContactPhone: Optional[str] = None
    emergencyContactRelationship: Optional[str] = None
    specialRequests: Optional[str] = None
    howDidYouHear: Optional[str] = None

class PilgrimageBookingCreate(BaseModel):
    customer: PilgrimageCustomerInfo
    booking: PilgrimageBookingInfo

class PilgrimageBooking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer: PilgrimageCustomerInfo
    booking: PilgrimageBookingInfo
    status: Literal["pending", "confirmed", "cancelled"] = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(KIGALI_TZ))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(KIGALI_TZ))
    email_sent: bool = False

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.get("/health")
async def health_check():
    """Health check endpoint to verify server and database connectivity"""
    health_status = {
        "status": "healthy",
        "server": "running",
        "database": "unknown",
        "email_service": "unknown",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
    
    # Check MongoDB connection
    if db is None:
        health_status["database"] = "not_connected"
        health_status["status"] = "degraded"
        health_status["message"] = "MongoDB connection failed at startup"
    else:
        try:
            await asyncio.wait_for(db.command("ping"), timeout=3.0)
            health_status["database"] = "connected"
        except asyncio.TimeoutError:
            health_status["database"] = "timeout"
            health_status["status"] = "degraded"
        except Exception as e:
            health_status["database"] = f"error: {str(e)[:100]}"
            health_status["status"] = "degraded"
    
    # Check email service
    if email_service.client:
        health_status["email_service"] = "configured"
    else:
        health_status["email_service"] = "not_configured"
    
    return health_status

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Appointment Endpoints
@api_router.post("/appointments", response_model=Appointment, status_code=201)
async def create_appointment(appointment_data: AppointmentCreate):
    """Create a new appointment and send confirmation emails"""
    try:
        if db is None:
            raise HTTPException(
                status_code=503,
                detail="Database connection unavailable. Please try again in a few moments."
            )
        
        # Check for conflicting appointments
        appointment_date_str = appointment_data.appointment.date.isoformat()
        existing = await db.appointments.find_one({
            "appointment.date": appointment_date_str,
            "appointment.time": appointment_data.appointment.time,
            "status": {"$in": ["pending", "confirmed"]}
        })
        
        if existing:
            raise HTTPException(
                status_code=400,
                detail="This time slot is already booked. Please choose another time."
            )
        
        # Create appointment object
        appointment = Appointment(
            customer=appointment_data.customer,
            appointment=appointment_data.appointment
        )
        
        # Convert to dict for MongoDB (with timezone handling)
        doc = appointment.model_dump()
        doc['appointment']['date'] = appointment_date_str
        # Store datetimes in Kigali timezone
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        doc['timezone'] = 'Africa/Kigali'  # Store timezone info
        
        # Save to database
        result = await db.appointments.insert_one(doc)
        
        # Send emails
        email_sent = False
        try:
            logger.info(f"📧 Starting email sending process for appointment {appointment.id}")
            
            # Send confirmation to customer
            logger.info(f"📧 Sending confirmation email to customer: {appointment_data.customer.email}")
            customer_email_sent = email_service.send_appointment_confirmation(doc)
            
            # Send notification to admin
            logger.info(f"📧 Sending admin notification email")
            admin_email_sent = email_service.send_admin_notification(doc)
            
            if customer_email_sent and admin_email_sent:
                email_sent = True
                # Update email_sent status
                await db.appointments.update_one(
                    {"id": appointment.id},
                    {"$set": {"email_sent": True}}
                )
                logger.info(f"✅ Both emails sent successfully for appointment {appointment.id}")
            elif customer_email_sent:
                email_sent = True
                await db.appointments.update_one(
                    {"id": appointment.id},
                    {"$set": {"email_sent": True}}
                )
                logger.warning(f"⚠️ Customer email sent but admin email failed for appointment {appointment.id}")
            elif admin_email_sent:
                logger.warning(f"⚠️ Admin email sent but customer email failed for appointment {appointment.id}")
            else:
                logger.error(f"❌ Both emails failed to send for appointment {appointment.id}")
        except Exception as e:
            logger.error(f"❌ Error sending emails for appointment {appointment.id}: {str(e)}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            # Don't fail the appointment creation if email fails
        
        return appointment
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating appointment: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create appointment")


@api_router.get("/appointments/available-slots")
async def get_available_slots(date_str: str, service_type: str, appointment_type: str = "in_person"):
    """Get available time slots for a given date"""
    try:
        # Parse date with validation
        try:
            appointment_date = datetime.fromisoformat(date_str).date()
        except ValueError:
            raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
        
        date_str_iso = appointment_date.isoformat()
        logger.info(f"📅 Getting available slots for {date_str_iso}, service: {service_type}, type: {appointment_type}")
        
        # Check if database is available
        if db is None:
            logger.warning("⚠️ Database not connected - returning all slots as available")
            appointments = []
        else:
            # Get all appointments for this date with timeout and error handling
            appointments = []
            try:
                # Use asyncio.wait_for to add timeout (8 seconds - increased for Render)
                appointments = await asyncio.wait_for(
                    db.appointments.find({
                        "appointment.date": date_str_iso,
                        "status": {"$in": ["pending", "confirmed"]}
                    }).to_list(1000),
                    timeout=8.0
                )
                logger.info(f"✅ Found {len(appointments)} existing appointments for {date_str_iso}")
            except asyncio.TimeoutError:
                logger.warning(f"⚠️ MongoDB query timeout for date {date_str_iso} - returning all slots as available")
                # Return all slots as available if database timeout
                appointments = []
            except Exception as e:
                logger.error(f"❌ MongoDB error getting appointments: {str(e)}")
                logger.error(f"Error type: {type(e).__name__}")
                # Return all slots as available if database error (graceful degradation)
                appointments = []
        
        # Define available time slots (9 AM to 5 PM, 30-minute intervals)
        all_slots = []
        for hour in range(9, 17):  # 9 AM to 4:30 PM
            for minute in [0, 30]:
                all_slots.append(f"{hour:02d}:{minute:02d}")
        
        # Get booked slots (handle missing data gracefully)
        booked_slots = set()
        for appt in appointments:
            try:
                if appt.get('appointment', {}).get('time'):
                    booked_slots.add(appt['appointment']['time'])
            except (KeyError, TypeError):
                logger.warning(f"⚠️ Skipping invalid appointment data: {appt.get('id', 'unknown')}")
                continue
        
        # Calculate available slots
        available_slots = [slot for slot in all_slots if slot not in booked_slots]
        
        logger.info(f"✅ Returning {len(available_slots)} available slots out of {len(all_slots)} total")
        
        return {
            "date": date_str_iso,
            "service_type": service_type,
            "available_slots": available_slots,
            "total_slots": len(all_slots),
            "booked_slots": len(booked_slots),
            "available_count": len(available_slots)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Error getting available slots: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        # Return default slots instead of failing completely
        all_slots = [f"{hour:02d}:{minute:02d}" for hour in range(9, 17) for minute in [0, 30]]
        return {
            "date": date_str if 'date_str' in locals() else date_str_iso if 'date_str_iso' in locals() else "",
            "service_type": service_type,
            "available_slots": all_slots,  # Return all slots as available on error
            "total_slots": len(all_slots),
            "booked_slots": 0,
            "available_count": len(all_slots),
            "error": "Database connection issue - showing all slots as available"
        }


@api_router.get("/appointments/{appointment_id}", response_model=Appointment)
async def get_appointment(appointment_id: str):
    """Get appointment by ID"""
    appointment = await db.appointments.find_one({"id": appointment_id}, {"_id": 0})
    
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    # Convert date string back to date object for response
    if isinstance(appointment.get('appointment', {}).get('date'), str):
        appointment['appointment']['date'] = datetime.fromisoformat(
            appointment['appointment']['date']
        ).date()
    
    # Convert datetime strings back to datetime objects
    for field in ['created_at', 'updated_at', 'confirmed_at', 'cancelled_at']:
        if appointment.get(field) and isinstance(appointment[field], str):
            appointment[field] = datetime.fromisoformat(appointment[field])
    
    return appointment


@api_router.patch("/appointments/{appointment_id}/cancel", response_model=Appointment)
async def cancel_appointment(appointment_id: str):
    """Cancel an appointment"""
    appointment = await db.appointments.find_one({"id": appointment_id}, {"_id": 0})
    
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    if appointment.get('status') == 'cancelled':
        raise HTTPException(status_code=400, detail="Appointment is already cancelled")
    
    # Update appointment
    update_data = {
        "status": "cancelled",
        "cancelled_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.appointments.update_one(
        {"id": appointment_id},
        {"$set": update_data}
    )
    
    # Get updated appointment
    updated = await db.appointments.find_one({"id": appointment_id}, {"_id": 0})
    
    # Convert for response
    if isinstance(updated.get('appointment', {}).get('date'), str):
        updated['appointment']['date'] = datetime.fromisoformat(
            updated['appointment']['date']
        ).date()
    
    for field in ['created_at', 'updated_at', 'confirmed_at', 'cancelled_at']:
        if updated.get(field) and isinstance(updated[field], str):
            updated[field] = datetime.fromisoformat(updated[field])
    
    return updated


# Israel Pilgrimage Booking Endpoints
@api_router.post("/pilgrimage-bookings", response_model=PilgrimageBooking, status_code=201)
async def create_pilgrimage_booking(booking_data: PilgrimageBookingCreate):
    """Create a new Israel Pilgrimage booking and send confirmation emails"""
    try:
        if db is None:
            raise HTTPException(
                status_code=503,
                detail="Database connection unavailable. Please try again in a few moments."
            )
        
        # Create booking object
        booking = PilgrimageBooking(
            customer=booking_data.customer,
            booking=booking_data.booking
        )
        
        # Convert to dict for MongoDB
        doc = booking.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        doc['updated_at'] = doc['updated_at'].isoformat()
        doc['timezone'] = 'Africa/Kigali'
        
        # Save to database
        result = await db.pilgrimage_bookings.insert_one(doc)
        
        # Send emails
        email_sent = False
        try:
            logger.info(f"📧 Starting email sending process for pilgrimage booking {booking.id}")
            
            # Send confirmation to customer
            logger.info(f"📧 Sending confirmation email to customer: {booking_data.customer.email}")
            customer_email_sent = email_service.send_pilgrimage_confirmation(doc)
            
            # Send notification to admin
            logger.info(f"📧 Sending admin notification email for pilgrimage booking")
            admin_email_sent = email_service.send_pilgrimage_admin_notification(doc)
            
            if customer_email_sent and admin_email_sent:
                email_sent = True
                await db.pilgrimage_bookings.update_one(
                    {"id": booking.id},
                    {"$set": {"email_sent": True}}
                )
                logger.info(f"✅ Both emails sent successfully for pilgrimage booking {booking.id}")
            elif customer_email_sent:
                email_sent = True
                await db.pilgrimage_bookings.update_one(
                    {"id": booking.id},
                    {"$set": {"email_sent": True}}
                )
                logger.warning(f"⚠️ Customer email sent but admin email failed for pilgrimage booking {booking.id}")
            elif admin_email_sent:
                logger.warning(f"⚠️ Admin email sent but customer email failed for pilgrimage booking {booking.id}")
            else:
                logger.error(f"❌ Both emails failed to send for pilgrimage booking {booking.id}")
        except Exception as e:
            logger.error(f"❌ Error sending emails for pilgrimage booking {booking.id}: {str(e)}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            # Don't fail the booking creation if email fails
        
        return booking
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating pilgrimage booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create pilgrimage booking")


@api_router.get("/pilgrimage-bookings/{booking_id}", response_model=PilgrimageBooking)
async def get_pilgrimage_booking(booking_id: str):
    """Get pilgrimage booking by ID"""
    if db is None:
        raise HTTPException(status_code=503, detail="Database connection unavailable. Please try again in a few moments.")
    booking = await db.pilgrimage_bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if not booking:
        raise HTTPException(status_code=404, detail="Pilgrimage booking not found")
    
    # Convert datetime strings back to datetime objects
    for field in ['created_at', 'updated_at']:
        if booking.get(field) and isinstance(booking[field], str):
            booking[field] = datetime.fromisoformat(booking[field])
    
    return booking

# Include the router in the main app
app.include_router(api_router)

# CORS configuration - strip whitespace and trailing slashes
cors_origins_str = os.environ.get('CORS_ORIGINS', '*')
cors_origins = [origin.strip().rstrip('/') for origin in cors_origins_str.split(',')] if cors_origins_str != '*' else ['*']

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Log startup info
logger.info("🚀 Starting CardX Academia Backend Server")
logger.info(f"📦 MongoDB URL: {'***' if mongo_url and 'mongodb+srv' in mongo_url else mongo_url if mongo_url else 'NOT SET'}")
logger.info(f"📦 Database Name: {os.environ.get('DB_NAME', 'cardxacademia')}")
logger.info(f"📦 CORS Origins: {cors_origins}")
logger.info(f"📦 Python Version: {os.sys.version}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
