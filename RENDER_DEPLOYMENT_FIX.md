# 🔧 Render Deployment Fix - CardX Academia

## Problem
Render is looking for `package.json` in the root directory, but it's located in the `frontend/` subdirectory.

**Error:**
```
npm error path /opt/render/project/src/package.json
npm error errno -2
npm error enoent Could not read package.json
```

## Solution: Update Render Dashboard Settings

### Step 1: Update Build Command
In your Render dashboard, go to your **Static Site** service settings:

1. Navigate to: **Settings** → **Build & Deploy**
2. Update the **Build Command** to:
   ```bash
   cd frontend && npm install && npm run build
   ```

### Step 2: Update Publish Directory
1. In the same settings page
2. Update **Publish Directory** to:
   ```
   frontend/build
   ```

### Step 3: Set Root Directory (Optional but Recommended)
1. In **Settings** → **Build & Deploy**
2. Set **Root Directory** to:
   ```
   frontend
   ```
3. If you set Root Directory to `frontend`, then:
   - **Build Command** should be: `npm install && npm run build`
   - **Publish Directory** should be: `build`

## Alternative: Use render.yaml (If Supported)

I've created a `render.yaml` file in the root. If Render supports it, it should automatically use these settings:

```yaml
services:
  - type: web
    name: cardxacademia-frontend
    env: node
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: ./frontend/build
```

## Recommended Settings Summary

### Option A: Root Directory = `frontend`
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`
- **Node Version:** `22.22.0` (or latest LTS)

### Option B: Root Directory = Root (default)
- **Root Directory:** (leave empty or `/`)
- **Build Command:** `cd frontend && npm install && npm run build`
- **Publish Directory:** `frontend/build`
- **Node Version:** `22.22.0` (or latest LTS)

## Environment Variables

Make sure to add these in Render dashboard → **Environment**:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
# OR
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

## After Updating Settings

1. Click **Manual Deploy** → **Deploy latest commit**
2. Watch the build logs
3. Verify the build succeeds

## Expected Build Output

You should see:
```
✓ Building...
✓ Compiled successfully
✓ Build folder ready
```

## Troubleshooting

If build still fails:
1. Check Node version matches (22.22.0)
2. Verify all dependencies in `frontend/package.json`
3. Check build logs for specific errors
4. Try clearing build cache in Render settings
