#!/usr/bin/env python3
"""
Local script to test backend API routes.
Run with: python test_routes_local.py
Ensure backend is running: uvicorn server:app --reload --port 8000
"""
import requests
import json
import sys

BASE = "http://localhost:8000"

def test(name, method, path, **kwargs):
    url = f"{BASE}{path}"
    try:
        r = requests.request(method, url, timeout=10, **kwargs)
        print(f"{method} {path} -> {r.status_code}")
        if r.text:
            try:
                print(f"  Body: {json.dumps(r.json(), indent=2)[:500]}")
            except Exception:
                print(f"  Body: {r.text[:300]}")
        return r.status_code
    except requests.exceptions.ConnectionError:
        print(f"{method} {path} -> CONNECTION REFUSED (is backend running on {BASE}?)")
        return -1
    except Exception as e:
        print(f"{method} {path} -> ERROR: {e}")
        return -1

def main():
    print("=== Backend route tests ===\n")
    
    # 1. Root
    test("root", "GET", "/api/")
    
    # 2. Health
    test("health", "GET", "/api/health")
    
    # 3. Available slots (GET)
    test("available-slots", "GET", "/api/appointments/available-slots?date_str=2026-01-20&service_type=visa_consultation&appointment_type=in_person")
    
    # 4. Pilgrimage POST (minimal valid body)
    body = {
        "customer": {
            "fullName": "Test User",
            "email": "test@example.com",
            "phone": "+250788123456"
        },
        "booking": {
            "tourDates": "March 29, 2026 – April 5, 2026",
            "tourCost": "USD $2,900"
        }
    }
    test("pilgrimage-bookings POST", "POST", "/api/pilgrimage-bookings", json=body)
    
    # 5. GET /api/pilgrimage-bookings (should 405 - no GET on collection)
    test("pilgrimage-bookings GET (expect 405)", "GET", "/api/pilgrimage-bookings")
    
    print("\n=== If all return 200/201 (or 405 for GET pilgrimage), routes and backend are OK. ===")
    print("If CONNECTION REFUSED: start backend with: cd backend && uvicorn server:app --reload --port 8000")

if __name__ == "__main__":
    main()
