# 🚀 Port Management System - Free Deployment Guide

## 📋 Prerequisites
- GitHub account
- Your project pushed to GitHub
- Basic understanding of deployment platforms

## 🎯 Recommended Deployment Strategy

### **Option 1: Railway (Easiest)**
**Backend + Database + Frontend all on Railway**

### **Option 2: Render (Great Alternative)**
**Backend + Database on Render, Frontend on Vercel**

### **Option 3: Vercel + Railway (Best Performance)**
**Frontend on Vercel, Backend on Railway**

---

## 🚀 Step-by-Step Deployment

### **Step 1: Prepare Your Repository**

1. **Ensure all files are committed to GitHub**
2. **Verify these files exist in your repository:**
   - `Backend/Procfile`
   - `Backend/runtime.txt`
   - `Backend/requirements.txt` (with gunicorn)
   - `Backend/config.py` (updated for environment variables)

### **Step 2: Deploy Backend**

#### **Option A: Railway (Recommended)**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Flask app
6. Add environment variables:
   ```
   DATABASE_URL=postgresql://... (Railway provides this)
   SECRET_KEY=your-secret-key-here
   FLASK_DEBUG=False
   ```
7. Railway will automatically deploy your backend

#### **Option B: Render**

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: port-management-backend
   - **Build Command**: `pip install -r Backend/requirements.txt`
   - **Start Command**: `cd Backend && gunicorn app:app`
6. Add environment variables (same as Railway)
7. Deploy

### **Step 3: Deploy Frontend**

#### **Option A: Vercel (Recommended for Frontend)**

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Angular
   - **Root Directory**: `frontend/containers`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/containers/browser`
6. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
7. Deploy

#### **Option B: Railway Static Site**

1. In Railway dashboard, click "New Service" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `frontend/containers`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist/containers/browser`
4. Deploy

### **Step 4: Update API URLs**

After deployment, update your frontend to use the deployed backend URL:

1. Find your backend URL (e.g., `https://your-app.railway.app`)
2. Update frontend API calls to use this URL
3. Redeploy frontend if needed

---

## 🔧 Environment Variables

### **Backend Environment Variables**
```
DATABASE_URL=postgresql://username:password@host:port/database
SECRET_KEY=your-secret-key-here
FLASK_DEBUG=False
```

### **Frontend Environment Variables**
```
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🗄️ Database Setup

### **Railway PostgreSQL (Recommended)**
1. In Railway dashboard, click "New" → "Database" → "PostgreSQL"
2. Railway will provide the `DATABASE_URL`
3. Add this URL to your backend environment variables

### **Render PostgreSQL**
1. In Render dashboard, click "New" → "PostgreSQL"
2. Render will provide the `DATABASE_URL`
3. Add this URL to your backend environment variables

---

## 🔍 Troubleshooting

### **Common Issues:**

1. **Build fails**: Check if all dependencies are in `requirements.txt`
2. **Database connection fails**: Verify `DATABASE_URL` environment variable
3. **CORS errors**: Update CORS settings in `app.py` to allow your frontend domain
4. **API calls fail**: Ensure frontend is using correct backend URL

### **Debug Commands:**
```bash
# Test backend locally
cd Backend
python app.py

# Test frontend locally
cd frontend/containers
npm install
npm start

# Build frontend for production
npm run build
```

---

## 📊 Free Tier Limits

### **Railway**
- 500 hours/month free
- 512MB RAM
- Shared CPU
- PostgreSQL included

### **Render**
- 750 hours/month free
- 512MB RAM
- Shared CPU
- PostgreSQL included

### **Vercel**
- Unlimited deployments
- 100GB bandwidth/month
- Perfect for Angular apps

---

## 🎉 Success!

After deployment, you'll have:
- ✅ Backend API running on Railway/Render
- ✅ Frontend Angular app running on Vercel/Railway
- ✅ Database connected and working
- ✅ Free hosting for your entire application

Your Port Management System will be live and accessible worldwide! 🌍
