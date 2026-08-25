"""Tour registration API routes."""

import logging
import os
from datetime import datetime
from typing import List, Optional

import pytz
from fastapi import APIRouter, Header, HTTPException, Query
from fastapi.responses import Response

from registration.export import (
    export_registrations_pdf,
    export_registrations_xlsx,
    export_single_registration_pdf,
)
from registration.models import Registration, RegistrationCreate

logger = logging.getLogger(__name__)

KIGALI_TZ = pytz.timezone("Africa/Kigali")
COLLECTION_NAME = "tour_registrations"

router = APIRouter(prefix="/registrations", tags=["registrations"])


def _get_db():
    """Import db from server at runtime to avoid circular imports."""
    from server import db

    return db


def _get_email_service():
    from server import email_service

    return email_service


def _verify_admin_token(x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token")):
    admin_secret = os.environ.get("ADMIN_SECRET", "").strip()
    if not admin_secret:
        raise HTTPException(
            status_code=503,
            detail="Admin portal is not configured. Set ADMIN_SECRET environment variable.",
        )
    if not x_admin_token or x_admin_token != admin_secret:
        raise HTTPException(status_code=401, detail="Invalid or missing admin token.")


def _serialize_registration(registration: Registration) -> dict:
    doc = registration.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    doc["updated_at"] = doc["updated_at"].isoformat()
    return doc


def _deserialize_datetime_fields(doc: dict) -> dict:
    for field in ("created_at", "updated_at"):
        if doc.get(field) and isinstance(doc[field], str):
            doc[field] = datetime.fromisoformat(doc[field])
    return doc


@router.post("", response_model=Registration, status_code=201)
async def create_registration(data: RegistrationCreate):
    """Submit a tour registration.

    MongoDB is optional: persist when connected; always send confirmation emails
    (customer + admin) even if the DB is down or MONGO_URL is missing.
    """
    db = _get_db()
    db_available = db is not None

    now = datetime.now(KIGALI_TZ)
    registration = Registration.from_create(data, created_at=now)
    doc = _serialize_registration(registration)
    doc["timezone"] = "Africa/Kigali"

    if db_available:
        try:
            await db[COLLECTION_NAME].insert_one(doc)
            logger.info("Tour registration saved: %s", registration.id)
        except Exception as exc:
            # Do not block submission if persistence fails — emails still go out.
            logger.error("Tour registration DB save failed (continuing with emails): %s", exc)
            db_available = False
    else:
        logger.info(
            "MongoDB unavailable: accepting registration %s in email-only mode",
            registration.id,
        )

    try:
        email_service = _get_email_service()
        customer_sent = email_service.send_registration_confirmation(doc)
        admin_sent = email_service.send_registration_admin_notification(doc)

        email_updates = {}
        if customer_sent:
            email_updates["customer_email_sent"] = True
            registration.customer_email_sent = True
        if admin_sent:
            email_updates["admin_email_sent"] = True
            registration.admin_email_sent = True
        if customer_sent or admin_sent:
            email_updates["email_sent"] = True
            registration.email_sent = True

        if email_updates and db_available:
            try:
                await db[COLLECTION_NAME].update_one(
                    {"id": registration.id},
                    {"$set": email_updates},
                )
            except Exception as exc:
                logger.error("Failed to update registration email flags: %s", exc)
    except Exception as exc:
        logger.error("Registration email notification failed: %s", exc)

    return registration


@router.get("", response_model=List[Registration])
async def list_registrations(
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
    limit: int = Query(500, ge=1, le=2000),
    skip: int = Query(0, ge=0),
):
    """List all registrations (admin only). Empty when DB is unavailable."""
    _verify_admin_token(x_admin_token)
    db = _get_db()
    if db is None:
        return []

    cursor = (
        db[COLLECTION_NAME]
        .find({}, {"_id": 0})
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
    )
    docs = await cursor.to_list(limit)
    return [_deserialize_datetime_fields(doc) for doc in docs]


@router.get("/count")
async def count_registrations(
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
):
    """Return total registration count (admin only). Zero when DB is unavailable."""
    _verify_admin_token(x_admin_token)
    db = _get_db()
    if db is None:
        return {"count": 0}
    total = await db[COLLECTION_NAME].count_documents({})
    return {"count": total}


@router.get("/export/xlsx")
async def export_all_registrations_xlsx(
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
):
    """Download all registrations as Excel (admin only). Empty file when no DB."""
    _verify_admin_token(x_admin_token)
    db = _get_db()
    docs = []
    if db is not None:
        docs = await db[COLLECTION_NAME].find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    content = export_registrations_xlsx(docs)
    return Response(
        content=content,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": 'attachment; filename="tour-registrations.xlsx"'},
    )


@router.get("/export/pdf")
async def export_all_registrations_pdf(
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
):
    """Download all registrations as PDF (admin only). Empty file when no DB."""
    _verify_admin_token(x_admin_token)
    db = _get_db()
    docs = []
    if db is not None:
        docs = await db[COLLECTION_NAME].find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    content = export_registrations_pdf(docs)
    return Response(
        content=content,
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="tour-registrations.pdf"'},
    )


@router.get("/{registration_id}", response_model=Registration)
async def get_registration(
    registration_id: str,
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
):
    """Get a single registration (admin only)."""
    _verify_admin_token(x_admin_token)
    db = _get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database connection unavailable.")

    doc = await db[COLLECTION_NAME].find_one({"id": registration_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Registration not found.")
    return _deserialize_datetime_fields(doc)


@router.get("/{registration_id}/export/xlsx")
async def export_registration_xlsx(
    registration_id: str,
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
):
    """Download a single registration as Excel (admin only)."""
    _verify_admin_token(x_admin_token)
    db = _get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database connection unavailable.")

    doc = await db[COLLECTION_NAME].find_one({"id": registration_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Registration not found.")

    content = export_registrations_xlsx([doc])
    filename = f"registration-{registration_id[:8]}.xlsx"
    return Response(
        content=content,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/{registration_id}/export/pdf")
async def export_registration_pdf(
    registration_id: str,
    x_admin_token: Optional[str] = Header(None, alias="X-Admin-Token"),
):
    """Download a single registration as PDF (admin only)."""
    _verify_admin_token(x_admin_token)
    db = _get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database connection unavailable.")

    doc = await db[COLLECTION_NAME].find_one({"id": registration_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Registration not found.")

    content = export_single_registration_pdf(doc)
    filename = f"registration-{registration_id[:8]}.pdf"
    return Response(
        content=content,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
