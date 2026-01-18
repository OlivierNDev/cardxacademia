# 🔧 Fix Render Frontend Memory Error

## Problem

Render is trying to run `npm run start` (development server) instead of just building for production. This causes:
- JavaScript heap out of memory errors
- Frontend service trying to run dev server (wrong for static sites)

## ✅ Solution

**Static sites on Render should ONLY build, not start.**

### Option 1: Use render.yaml (Recommended)

The `render.yaml` is already configured correctly:
- `type: static` ✅
- `buildCommand` ✅
- **No startCommand** ✅ (static sites don't need it)

**If Render is still running `npm run start`:**

1. **Check Render Dashboard:**
   - Go to your frontend service
   - **Settings** → **Build & Deploy**
   - Make sure:
     - **Service Type:** `Static Site` (not Web Service)
     - **Build Command:** `cd frontend && export NODE_OPTIONS="--max-old-space-size=4096" && yarn install && yarn build`
     - **Publish Directory:** `frontend/build`
     - **Start Command:** Should be **EMPTY** or **NOT SET** for static sites

2. **If Start Command is set:**
   - **Delete it** or set it to empty string
   - Static sites don't need a start command

### Option 2: Manual Fix in Render Dashboard

1. Go to **Render Dashboard** → Your Frontend Service
2. Click **Settings**
3. Scroll to **Build & Deploy**
4. **Service Type:** Must be `Static Site`
5. **Build Command:**
   ```
   cd frontend && export NODE_OPTIONS="--max-old-space-size=4096" && yarn install && yarn build
   ```
6. **Publish Directory:** `frontend/build`
7. **Start Command:** **DELETE THIS** or leave empty
8. **Environment Variables:**
   - `NODE_OPTIONS` = `--max-old-space-size=4096`
   - `REACT_APP_API_URL` = Your backend URL
   - `NODE_VERSION` = `22.22.0`
9. **Save** and **Redeploy**

---

## 🔍 Why This Happens

Render might auto-detect `package.json` scripts and try to run `npm run start` if:
- Service type is set to "Web Service" instead of "Static Site"
- A start command is explicitly set
- Render's auto-detection picks up the start script

**Static sites:**
- ✅ Build once → Serve static files
- ❌ Don't run a server

**Web services:**
- ✅ Build → Run a server (start command)

---

## ✅ Verification

After fixing, the build logs should show:

```
Running build command: cd frontend && export NODE_OPTIONS="--max-old-space-size=4096" && yarn install && yarn build
...
Compiled successfully!
...
Build complete!
```

**NOT:**
```
Running 'npm run start'
Starting the development server...
```

---

## 🚀 Quick Fix Steps

1. **Render Dashboard** → Frontend Service → **Settings**
2. **Service Type:** `Static Site` ✅
3. **Start Command:** **DELETE/EMPTY** ✅
4. **Build Command:** `cd frontend && export NODE_OPTIONS="--max-old-space-size=4096" && yarn install && yarn build`
5. **Save** → **Manual Deploy** → **Deploy latest commit**

---

**After this fix, Render will only build (not start) and the memory error will be gone!** ✅
