# 🚀 Render Deployment Guide

## **Step 1: Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your repositories

## **Step 2: Create Web Service**
1. Click "New" → "Web Service"
2. Connect your GitHub repository: `yasserbounaim06/Port-Management-System`
3. Configure the service:

### **Service Configuration:**
- **Name:** `port-management-backend`
- **Environment:** `Python 3`
- **Root Directory:** `Backend`
- **Build Command:** `pip install -r requirements-deploy.txt`
- **Start Command:** `python app.py`

## **Step 3: Environment Variables**
Add these environment variables in Render dashboard:

```
DATABASE_URL=mysql://root:yasser@localhost/container_tracker
SECRET_KEY=your-secret-key-here
FLASK_DEBUG=False
```

## **Step 4: Deploy**
1. Click "Create Web Service"
2. Render will start building and deploying
3. Wait for deployment to complete
4. Note your service URL (e.g., `https://your-app.onrender.com`)

## **Step 5: Deploy Frontend**
1. Click "New" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `port-management-frontend`
   - **Build Command:** `cd frontend/containers && npm install && npm run build`
   - **Publish Directory:** `frontend/containers/dist/containers/browser`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

## **Troubleshooting:**
- If build fails, check the logs for specific errors
- Ensure all Windows-specific packages are removed from requirements
- Verify environment variables are set correctly
- **Important:** Set Root Directory to `Backend` and use `python app.py`
