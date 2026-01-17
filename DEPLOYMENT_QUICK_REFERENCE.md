# 🚀 Quick Deployment Reference - CardX Academia

## Tech Stack at a Glance

| Component | Technology | Version |
|-----------|-----------|---------|
| **Frontend** | React | 19.0.0 |
| **Build Tool** | CRA + CRACO | - |
| **Styling** | Tailwind CSS | 3.4.17 |
| **Backend** | FastAPI | 0.110.1 |
| **Server** | Uvicorn | 0.25.0 |
| **Database** | MongoDB | (Atlas) |
| **Email** | Resend | 2.0.0 |

---

## Recommended Deployment Stack

```
Frontend:  Vercel/Netlify (FREE)
Backend:   Railway/Render (FREE tier)
Database:  MongoDB Atlas (FREE tier)
Domain:    cardxacademia.com (you have this)
```

---

## Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
DB_NAME=cardxacademia
CORS_ORIGINS=https://cardxacademia.com,https://www.cardxacademia.com
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=CardX Academia <noreply@cardxacademia.com>
ADMIN_EMAIL=olivier.niyo250@gmail.com
```

### Frontend
```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

---

## Deployment Steps (5 Minutes)

1. **MongoDB Atlas** → Create cluster → Get connection string
2. **Railway** → Deploy backend → Add env vars → Get URL
3. **Vercel** → Deploy frontend → Add `REACT_APP_API_URL` → Deploy
4. **Domain** → Point DNS to Vercel → Wait for SSL
5. **Done!** → Visit https://cardxacademia.com

---

## Project Structure

```
cardxacademia/
├── frontend/     → Deploy to Vercel/Netlify
└── backend/      → Deploy to Railway/Render
```

---

## Build Commands

**Frontend:**
```bash
cd frontend
npm install
npm run build
# Deploy /build folder
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
# Deploy entire folder
# Set start command: uvicorn server:app --host 0.0.0.0 --port $PORT
```

---

## DNS Records

```
Type    Name    Value
A       @       [Vercel IP]
CNAME   www     [Vercel CNAME]
CNAME   api     [Backend URL] (optional)
```

---

## Cost: $0/month (Free Tier)

- Vercel: Free
- Railway: Free (limited)
- MongoDB Atlas: Free (512MB)
- Resend: Free (3,000 emails/month)

---

**Full guide:** See `DEPLOYMENT_GUIDE.md`
