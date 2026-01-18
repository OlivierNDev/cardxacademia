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

# MongoDB connection - will be initialized in startup event
client = None
db = None
db_name = os.environ.get('DB_NAME', 'cardxacademia')

def validate_mongo_url(url):
    """Validate MongoDB connection string format"""
    if not url:
        return False, "URL is empty"
    if not url.startswith(('mongodb://', 'mongodb+srv://')):
        return False, "URL must start with mongodb:// or mongodb+srv://"
    # Check if database name is included (should have /database_name before ?)
    if 'mongodb+srv://' in url or 'mongodb://' in url:
        # Extract the part after the host
        if '@' in url:
            after_host = url.split('@')[1]
        else:
            after_host = url.split('//')[1]
        
        # Check if there's a database name (path after host)
        if '/' in after_host:
            db_part = after_host.split('/')[1].split('?')[0]
            if not db_part:
                return False, "Database name is missing (should be: mongodb+srv://.../database_name)"
    return True, "Valid"

async def connect_to_mongodb(max_retries=3, retry_delay=2):
    """Connect to MongoDB with retry logic"""
    global client, db
    
    # Get MongoDB URL from environment (supports both MONGO_URL and MONGODB_URI)
    mongo_url = os.environ.get('MONGO_URL') or os.environ.get('MONGODB_URI')
    
    if not mongo_url or mongo_url == 'mongodb://localhost:27017':
        logger.error("❌ MONGO_URL not set! Using default localhost. This will fail in production.")
        logger.error("⚠️ Please set MONGO_URL environment variable in Render Dashboard")
        mongo_url = 'mongodb://localhost:27017'
    
    # Validate connection string format
    is_valid, validation_msg = validate_mongo_url(mongo_url)
    if not is_valid:
        logger.error(f"❌ Invalid MongoDB connection string: {validation_msg}")
        logger.error("⚠️ Connection string should be: mongodb+srv://user:pass@cluster.net/database_name")
        return False
    
    # Ensure connection string doesn't have trailing slash issues
    mongo_url = mongo_url.rstrip('/')
    
    # Extract host for logging (without credentials)
    try:
        if 'mongodb+srv://' in mongo_url:
            host_part = mongo_url.split('@')[1].split('/')[0].split('?')[0] if '@' in mongo_url else '***'
        elif 'mongodb://' in mongo_url:
            host_part = mongo_url.split('@')[1].split('/')[0].split('?')[0] if '@' in mongo_url else mongo_url.split('//')[1].split('/')[0].split('?')[0]
        else:
            host_part = '***'
    except:
        host_part = '***'
    
    logger.info(f"🔌 Attempting to connect to MongoDB at: {host_part}")
    
    # Retry logic
    for attempt in range(1, max_retries + 1):
        try:
            logger.info(f"🔄 MongoDB connection attempt {attempt}/{max_retries}")
            
            # Configure client with appropriate settings
            client_options = {
                'serverSelectionTimeoutMS': 10000,  # 10 seconds
                'connectTimeoutMS': 10000,
            }
            
            # For mongodb+srv, ensure TLS is enabled
            if 'mongodb+srv://' in mongo_url:
                client_options['tls'] = True
                client_options['tlsAllowInvalidCertificates'] = False
            
            # Create client
            client = AsyncIOMotorClient(mongo_url, **client_options)
            db = client[db_name]
            
            # Test connection with ping
            await asyncio.wait_for(db.command("ping"), timeout=5.0)
            
            logger.info("✅ MongoDB connection established successfully")
            logger.info(f"📦 Database: {db_name}")
            logger.info(f"📦 Host: {host_part}")
            return True
            
        except asyncio.TimeoutError:
            logger.warning(f"⏱️ MongoDB connection timeout (attempt {attempt}/{max_retries})")
            if client:
                client.close()
                client = None
                db = None
        except Exception as e:
            error_msg = str(e)
            logger.error(f"❌ MongoDB connection failed (attempt {attempt}/{max_retries}): {error_msg}")
            
            # Provide specific error guidance
            if "bad auth" in error_msg.lower() or "authentication failed" in error_msg.lower():
                logger.error("🔐 Authentication failed! Check:")
                logger.error("   1. MongoDB Atlas → Database Access → Verify username/password")
                logger.error("   2. Reset password if needed")
                logger.error("   3. Update MONGO_URL in Render with correct credentials")
            elif "timeout" in error_msg.lower():
                logger.error("⏱️ Connection timeout! Check:")
                logger.error("   1. MongoDB Atlas cluster is running (not paused)")
                logger.error("   2. Network Access allows 0.0.0.0/0")
                logger.error("   3. Connection string format is correct")
            elif "not found" in error_msg.lower() or "dns" in error_msg.lower():
                logger.error("🌐 DNS/Network error! Check:")
                logger.error("   1. Connection string hostname is correct")
                logger.error("   2. MongoDB Atlas cluster exists and is active")
            
            if client:
                try:
                    client.close()
                except:
                    pass
                client = None
                db = None
            
            # Wait before retry (exponential backoff)
            if attempt < max_retries:
                wait_time = retry_delay * attempt
                logger.info(f"⏳ Waiting {wait_time}s before retry...")
                await asyncio.sleep(wait_time)
    
    logger.error("❌ Failed to connect to MongoDB after all retries")
    logger.error("⚠️ App will start but database operations will fail")
    logger.error("📖 See MONGODB_CONNECTION_REPORT.md for troubleshooting guide")
    return False

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
    global client, db
    
    try:
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
            health_status["message"] = "MongoDB connection not established. Retrying in background..."
        else:
            try:
                await asyncio.wait_for(db.command("ping"), timeout=3.0)
                health_status["database"] = "connected"
            except asyncio.TimeoutError:
                health_status["database"] = "timeout"
                health_status["status"] = "degraded"
                health_status["message"] = "MongoDB ping timeout"
            except Exception as e:
                error_msg = str(e)[:100]
                health_status["database"] = f"error: {error_msg}"
                health_status["status"] = "degraded"
                health_status["message"] = error_msg
                
                # If connection is broken, reset
                if "not connected" in error_msg.lower() or "connection" in error_msg.lower():
                    logger.warning("🔄 Connection appears broken, resetting...")
                    if client:
                        try:
                            client.close()
                        except:
                            pass
                    client = None
                    db = None
        
        # Check email service
        try:
            if hasattr(email_service, 'client') and email_service.client:
                health_status["email_service"] = "configured"
            else:
                health_status["email_service"] = "not_configured"
        except Exception as e:
            logger.warning(f"Error checking email service: {str(e)}")
            health_status["email_service"] = "unknown"
        
        return health_status
    except Exception as e:
        logger.error(f"❌ Health check error: {str(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        return {
            "status": "error",
            "server": "running",
            "database": "unknown",
            "email_service": "unknown",
            "error": str(e)[:200],
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

@api_router.post("/health/reconnect")
async def reconnect_mongodb():
    """Manual endpoint to trigger MongoDB reconnection"""
    logger.info("🔄 Manual MongoDB reconnection requested")
    success = await connect_to_mongodb(max_retries=3, retry_delay=2)
    
    if success:
        return {
            "status": "success",
            "message": "MongoDB connection established",
            "database": db_name
        }
    else:
        return {
            "status": "failed",
            "message": "Failed to connect to MongoDB after retries"
        }

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
mongo_url_env = os.environ.get('MONGO_URL') or os.environ.get('MONGODB_URI') or 'NOT SET'
if mongo_url_env != 'NOT SET' and 'mongodb+srv' in mongo_url_env:
    logger.info(f"📦 MongoDB URL: *** (mongodb+srv connection)")
else:
    logger.info(f"📦 MongoDB URL: {mongo_url_env}")
logger.info(f"📦 Database Name: {os.environ.get('DB_NAME', 'cardxacademia')}")
logger.info(f"📦 CORS Origins: {cors_origins}")
logger.info(f"📦 Python Version: {os.sys.version}")

@app.on_event("startup")
async def startup_db_client():
    """Initialize MongoDB connection on app startup"""
    try:
        logger.info("🔄 Initializing MongoDB connection...")
        success = await connect_to_mongodb(max_retries=3, retry_delay=2)
        
        # If connection failed, start background retry task
        if not success:
            logger.info("🔄 Starting background MongoDB reconnection task...")
            asyncio.create_task(background_reconnect_mongodb())
    except Exception as e:
        logger.error(f"❌ Startup error: {str(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        # Don't crash the app, just log the error

async def background_reconnect_mongodb():
    """Background task to retry MongoDB connection periodically"""
    global client, db
    
    while True:
        try:
            # Wait 30 seconds before retrying
            await asyncio.sleep(30)
            
            # Only retry if not connected
            if db is None:
                logger.info("🔄 Background: Retrying MongoDB connection...")
                success = await connect_to_mongodb(max_retries=2, retry_delay=3)
                if success:
                    logger.info("✅ Background: MongoDB connection restored!")
                    break
        except Exception as e:
            logger.error(f"❌ Background reconnection error: {str(e)}")
            # Continue the loop even if there's an error

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close MongoDB connection on app shutdown"""
    global client
    if client:
        logger.info("🔌 Closing MongoDB connection...")
        try:
            client.close()
        except Exception as e:
            logger.error(f"Error closing MongoDB connection: {str(e)}")
