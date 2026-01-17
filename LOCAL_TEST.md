# Local test guide – backend & frontend

## Backend is FastAPI (Python), not Express

- Routes are in `backend/server.py`
- `api_router` has `prefix="/api"`
- `POST /api/pilgrimage-bookings` and `GET /api/appointments/available-slots` exist

## 1. Test backend only

### 1.1 Start backend

```bash
cd backend
# Optional: copy .env.example to .env and set MONGO_URL, etc.
pip install -r requirements.txt
uvicorn server:app --reload --port 8000
```

You should see:

- `🚀 Starting CardX Academia Backend Server`
- `✅ MongoDB connection initialized` (or a MongoDB error if not configured)

### 1.2 Run route test script

In another terminal:

```bash
cd backend
python test_routes_local.py
```

Expected:

- `GET /api/` -> 200, `{"message": "Hello World"}`
- `GET /api/health` -> 200, JSON with `status`, `database`, etc.
- `GET /api/appointments/available-slots?date_str=...` -> 200, `available_slots` array
- `POST /api/pilgrimage-bookings` -> 201 (if MongoDB is connected) or 503 (if `db` is None)
- `GET /api/pilgrimage-bookings` -> 405 (only POST is defined for that path)

If you get “CONNECTION REFUSED”, the backend is not running on `http://localhost:8000`.

### 1.3 Manual curl checks

```bash
# Root
curl -s http://localhost:8000/api/

# Health
curl -s http://localhost:8000/api/health

# Slots
curl -s "http://localhost:8000/api/appointments/available-slots?date_str=2026-01-20&service_type=visa_consultation"

# Pilgrimage (minimal)
curl -s -X POST http://localhost:8000/api/pilgrimage-bookings \
  -H "Content-Type: application/json" \
  -d '{"customer":{"fullName":"Test","email":"a@b.com","phone":"+250788111111"},"booking":{"tourDates":"March 29, 2026 – April 5, 2026","tourCost":"USD $2,900"}}'
```

## 2. Test frontend against local backend

### 2.1 Point frontend to local backend

Create `frontend/.env.local` (or set in your shell):

```env
REACT_APP_API_URL=http://localhost:8000
```

No trailing slash.

### 2.2 Start frontend

```bash
cd frontend
yarn install
yarn start
```

### 2.3 In the app

1. **Appointment page**  
   - Pick a date.  
   - You should get time slots from `GET /api/appointments/available-slots`.  
   - If you see “timeout” or “No available slots” and the backend logs show the request, the route is fine; the problem is response format or frontend parsing.

2. **Israel Pilgrimage / Holy Land**  
   - Fill the form and submit.  
   - It should call `POST /api/pilgrimage-bookings`.  
   - Check Network tab: request to `http://localhost:8000/api/pilgrimage-bookings`, method POST, status 201 (or 503 if DB is down, or 422 if validation fails).

## 3. API base URL and paths

- Frontend `api.js` uses `baseURL = REACT_APP_API_URL` (trailing slash is stripped).
- Requests use paths like `/api/appointments/...` and `/api/pilgrimage-bookings`.
- Full URLs:
  - `http://localhost:8000/api/appointments/available-slots?...`
  - `http://localhost:8000/api/pilgrimage-bookings`

These must match the FastAPI routes in `server.py` (with `prefix="/api"`).

## 4. “Cannot POST /api/pilgrimage-bookings”

That message is from **Express**, not FastAPI. FastAPI would return JSON, e.g.:

- 404: `{"detail":"Not Found"}`
- 405: `{"detail":"Method Not Allowed"}`

If you see “Cannot POST /api/pilgrimage-bookings”:

- You might be hitting an **old Express** app or another service.
- Or a proxy in front of the real backend is answering with that.

Check:

- Browser / Postman: exact URL you call (and that it’s the Render backend, not a different host).
- Render: service that serves `cardxacademia.onrender.com` is the **Python/FastAPI** one (from `render.yaml` / `uvicorn server:app`), not a Node/Express app.

## 5. Checklist

- [ ] Backend: `uvicorn server:app --reload --port 8000` runs without crash.
- [ ] `GET /api/` and `GET /api/health` return 200 and JSON.
- [ ] `GET /api/appointments/available-slots?date_str=...&service_type=...` returns 200 and `available_slots`.
- [ ] `POST /api/pilgrimage-bookings` with a valid body returns 201 or 503 (or 422 if you change the body).
- [ ] Frontend `REACT_APP_API_URL=http://localhost:8000` and `yarn start`; appointment and pilgrimage flows hit the above endpoints.
- [ ] On Render: `REACT_APP_API_URL=https://cardxacademia.onrender.com` (or your real backend URL) and CORS allows your frontend origin.

After that, if something still fails, note: exact URL, method, request body, and response (status + body) from either the test script, curl, or the browser Network tab.
