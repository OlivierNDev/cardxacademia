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
            "tourDates": "October 6, 2026 – October 14, 2026",
            "tourCost": "USD $2,900"
        }
    }
    test("pilgrimage-bookings POST", "POST", "/api/pilgrimage-bookings", json=body)
    
    # 5. GET /api/pilgrimage-bookings (should 405 - no GET on collection)
    test("pilgrimage-bookings GET (expect 405)", "GET", "/api/pilgrimage-bookings")
    
    # 6. Registration POST (minimal valid body)
    reg_body = {
        "first_name": "Test",
        "last_name": "User",
        "fathers_name": "Father",
        "date_of_birth": "1990-01-01",
        "gender": "Male",
        "passport_no": "AB123456",
        "date_of_issue": "2020-01-01",
        "valid_through": "2030-01-01",
        "mothers_name": "Mother",
        "grandfathers_name": "Grandfather",
        "marital_status": "Single",
        "occupation": "Engineer",
        "religion": "Christian",
        "tourist_birth_country": "Rwanda",
        "country_of_present_residence": "Rwanda",
        "telephone_number": "+250788123456",
        "email": "test@example.com",
        "visited_before_israel": "no",
        "visited_other_countries": "no",
        "related_to_group_members": "no",
    }
    test("registrations POST", "POST", "/api/registrations", json=reg_body)

    print("\n=== If all return 200/201, routes and backend are OK. ===")
    print("Registration POST should succeed even without MongoDB (emails still fire).")
    print("If CONNECTION REFUSED: start backend with:")
    print("  cd backend")
    print("  uvicorn server:app --reload --port 8000")
    print("Swagger docs: http://localhost:8000/docs")

if __name__ == "__main__":
    main()
