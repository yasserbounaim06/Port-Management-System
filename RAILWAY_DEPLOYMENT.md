# 🚀 Railway Deployment Guide - MySQL Version

## 🎯 **Complete Railway Deployment (Everything on Railway)**

### **What You'll Deploy:**
- ✅ **Backend**: Flask API with ML/AI capabilities
- ✅ **Frontend**: Angular application
- ✅ **Database**: MySQL (PlanetScale or external)
- ✅ **All on Railway's free tier**

---

## 📋 **Step 1: Database Setup**

### **Option A: PlanetScale (Recommended - Free MySQL)**

1. **Go to [planetscale.com](https://planetscale.com)**
2. **Sign up with GitHub**
3. **Create a new database:**
   - Click "New Database"
   - Name: `port-management-db`
   - Region: Choose closest to you
4. **Get your connection string:**
   - Go to "Connect" tab
   - Copy the connection string
   - Format: `mysql://username:password@host:port/database`

### **Option B: Keep Your Existing MySQL**
- Use your current MySQL setup
- Update Railway environment variables to point to your MySQL server

---

## 🚀 **Step 2: Deploy Backend on Railway**

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Create new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
4. **Railway will auto-detect your Flask app**
5. **Add environment variables:**
   ```
   DATABASE_URL=mysql://your-mysql-connection-string
   SECRET_KEY=your-secret-key-here
   FLASK_DEBUG=False
   ```

---

## 🌐 **Step 3: Deploy Frontend on Railway**

1. **In Railway dashboard, click "New Service"**
2. **Select "Static Site"**
3. **Configure:**
   - **Repository**: Your GitHub repo
   - **Root Directory**: `frontend/containers`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist/containers/browser`
4. **Add environment variable:**
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

---

## 🔧 **Step 4: Environment Variables**

### **Backend Environment Variables:**
```
DATABASE_URL=mysql://username:password@host:port/database
SECRET_KEY=your-secret-key-here
FLASK_DEBUG=False
```

### **Frontend Environment Variables:**
```
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🗄️ **MySQL Database Setup**

### **If using PlanetScale:**
1. Create database in PlanetScale
2. Get connection string
3. Add to Railway environment variables

### **If using external MySQL:**
1. Ensure your MySQL server is accessible
2. Update Railway environment variables
3. Test connection

---

## 🔍 **Troubleshooting MySQL**

### **Common MySQL Issues:**

1. **Connection fails:**
   - Check MySQL server is running
   - Verify connection string format
   - Ensure MySQL allows external connections

2. **Database not found:**
   - Create database: `CREATE DATABASE container_tracker;`
   - Run migrations: `flask db upgrade`

3. **Permission denied:**
   - Grant permissions: `GRANT ALL ON container_tracker.* TO 'user'@'%';`

### **Test MySQL Connection:**
```bash
# Test locally first
cd Backend
python -c "from app import db; print('Database connected!')"
```

---

## 📊 **Railway Free Tier Limits**

- **500 hours/month** (enough for 24/7 deployment)
- **512MB RAM** (sufficient for your app)
- **Shared CPU** (handles ML workloads)
- **Unlimited bandwidth**
- **Custom domains** (free)

---

## 🎉 **Deployment Checklist**

### **Before Deployment:**
- [ ] Code pushed to GitHub
- [ ] MySQL database ready
- [ ] Environment variables prepared
- [ ] Local testing completed

### **After Deployment:**
- [ ] Backend API accessible
- [ ] Frontend loading correctly
- [ ] Database connected
- [ ] API calls working
- [ ] ML/AI features functional

---

## 🚀 **Quick Start Commands**

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

## 🌍 **Your App Will Be Live At:**

- **Backend API**: `https://your-app.railway.app`
- **Frontend**: `https://your-frontend.railway.app`
- **Database**: Connected and working

**Everything deployed for FREE on Railway!** 🎉
