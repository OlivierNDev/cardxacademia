# 🚀 MongoDB Atlas Quick Reference

## ⚡ 5-Minute Setup Checklist

### 1. Create Cluster (2 min)
- [ ] Go to https://cloud.mongodb.com/
- [ ] Click "Create" → "M0 FREE"
- [ ] Choose region closest to Render
- [ ] Click "Create Cluster"

### 2. Network Access (30 sec)
- [ ] Click "Network Access" → "Add IP Address"
- [ ] Click "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

### 3. Database User (1 min)
- [ ] Click "Database Access" → "Add New Database User"
- [ ] Username: `cardxacademia-admin`
- [ ] Password: Generate secure password (COPY IT!)
- [ ] Privileges: "Atlas admin"
- [ ] Click "Add User"

### 4. Get Connection String (1 min)
- [ ] Click "Clusters" → "Connect" → "Connect your application"
- [ ] Driver: Python, Version: 3.6+
- [ ] Copy connection string
- [ ] Replace `<username>` and `<password>`
- [ ] **Add `/cardxacademia` before the `?`**
- [ ] URL-encode special characters in password if needed

### 5. Update Render (30 sec)
- [ ] Go to Render Dashboard → Backend Service
- [ ] Environment → Edit `MONGO_URL`
- [ ] Paste new connection string
- [ ] Save (auto-redeploys)

### 6. Verify (30 sec)
- [ ] Check Render logs for: `[MONGO] ✅ connected successfully`
- [ ] Test: `https://your-backend.onrender.com/api/health`
- [ ] Should see: `"database": "connected"`

---

## 🔗 Connection String Format

```
mongodb+srv://USERNAME:PASSWORD@CLUSTER_HOST/cardxacademia?retryWrites=true&w=majority&appName=Cardx
```

**Key Points:**
- ✅ Must include `/cardxacademia` (database name)
- ✅ No quotes, no spaces
- ✅ URL-encode special characters in password
- ✅ Starts with `mongodb+srv://`

---

## 🔐 Password URL Encoding

If password has special characters, encode them:

| Character | Encoded |
|-----------|---------|
| `@` | `%40` |
| `#` | `%23` |
| `%` | `%25` |
| `&` | `%26` |
| `/` | `%2F` |
| `:` | `%3A` |
| `?` | `%3F` |
| `=` | `%3D` |
| ` ` (space) | `%20` |

**Example:**
- Password: `My@Pass#123`
- Use in connection string: `My%40Pass%23123`

---

## 📊 Project Collections

Your database `cardxacademia` has 3 collections:

1. **`appointments`** - Appointment bookings
2. **`pilgrimage_bookings`** - Pilgrimage bookings  
3. **`status_checks`** - Health check records

*Collections are created automatically when first data is inserted.*

---

## ✅ Success Indicators

- Render logs: `[MONGO] ✅ connected successfully`
- Health endpoint: `"database": "connected"`
- Can create appointments/bookings
- Collections visible in Atlas UI

---

## 🚨 Quick Troubleshooting

| Error | Fix |
|-------|-----|
| Authentication failed | Check username/password, URL-encode special chars |
| Connection timeout | Add `0.0.0.0/0` to Network Access |
| Invalid URI | Check format, remove quotes/spaces, add `/cardxacademia` |
| Database not found | Add `/cardxacademia` before `?` in connection string |

---

## 📚 Full Guide

For detailed step-by-step instructions, see:
**MONGODB_ATLAS_FRESH_START.md**
