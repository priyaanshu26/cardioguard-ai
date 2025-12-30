# CardioGuard AI - Deployment Guide

This guide will help you deploy CardioGuard AI online for free.

## 🚀 Recommended Deployment Stack

- **Backend**: [Render](https://render.com) or [Railway](https://railway.app) (Free tier)
- **Frontend**: [Vercel](https://vercel.com) (Free tier)

---

## 📦 Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Create a `.gitignore` file** in the project root (if not exists):
   ```
   __pycache__/
   *.py[cod]
   *$py.class
   *.so
   .Python
   venv/
   env/
   .env
   .venv
   *.pkl
   *.csv
   node_modules/
   dist/
   build/
   .DS_Store
   ```

2. **Update `backend/main.py`** - The CORS is already set to allow all origins (`"*"`), which is good for deployment.

### Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Click "New +" → "Web Service"

### Step 3: Deploy Backend

1. **Connect your GitHub repository** or use "Deploy from Git URL"
2. **Configure the service**:
   - **Name**: `cardioguard-ai-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main` or `master`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables** (if needed):
   - Click "Advanced" → "Add Environment Variable"
   - Add any secrets if you have them

4. **Click "Create Web Service"**

5. **Wait for deployment** (5-10 minutes)

6. **Copy your backend URL**: `https://cardioguard-ai-backend.onrender.com`

### Important Notes for Render:
- ⚠️ Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- You need to upload `cardio_model.pkl` to the repository (if it's not too large)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update Frontend Configuration

1. **Update `frontend/src/utils/api.js`** to use environment variable:

```javascript
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_URL,
});

export const predict = (data) => api.post('/api/predict', data);
export const getModelInfo = () => api.get('/api/model-info');
export const getMetrics = () => api.get('/api/metrics');
export const getDataStats = () => api.get('/api/data-stats');

export default api;
```

2. **Create `.env.production` in frontend folder**:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New..." → "Project"

### Step 3: Deploy Frontend

1. **Import your Git repository**
2. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**:
   - Add `VITE_API_URL` = `https://your-backend-url.onrender.com`

4. **Click "Deploy"**

5. **Wait for deployment** (2-3 minutes)

6. **Your app is live!** 🎉

---

## 🔧 Alternative: Railway (Backend)

Railway is another excellent option with a generous free tier.

### Steps:

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. **Configure**:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Railway will auto-detect Python and install dependencies
7. Click on your service → "Settings" → "Generate Domain"
8. Copy the domain URL

---

## 🔧 Alternative: Netlify (Frontend)

### Steps:

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. **Configure**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
6. **Environment variables**:
   - Add `VITE_API_URL` with your backend URL
7. Click "Deploy site"

---

## 📝 Important Considerations

### Model File Size
- `cardio_model.pkl` is ~18MB
- GitHub has a 100MB file limit (you're fine)
- If larger, consider:
  - Using Git LFS (Large File Storage)
  - Storing model in cloud storage (AWS S3, Google Cloud Storage)
  - Using model compression

### CORS Configuration
- Already configured to allow all origins (`"*"`)
- For production, update to specific frontend URL:
  ```python
  allow_origins=["https://your-frontend.vercel.app"]
  ```

### Free Tier Limitations

**Render Free Tier:**
- ✅ 750 hours/month
- ⚠️ Sleeps after 15 min inactivity
- ✅ Automatic SSL
- ✅ Custom domains

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL
- ✅ Custom domains

**Railway Free Tier:**
- ✅ $5 credit/month
- ✅ No sleep
- ✅ Automatic SSL

---

## 🚀 Quick Deployment Checklist

### Backend (Render):
- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Configure build & start commands
- [ ] Deploy and get URL

### Frontend (Vercel):
- [ ] Update `api.js` to use environment variable
- [ ] Create `.env.production` with backend URL
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Configure build settings
- [ ] Add environment variable
- [ ] Deploy

### Post-Deployment:
- [ ] Test all pages
- [ ] Test prediction functionality
- [ ] Check mobile responsiveness
- [ ] Update README with live URLs
- [ ] Share with others! 🎉

---

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🆘 Troubleshooting

### Backend Issues:
- **500 Error**: Check if model file is uploaded
- **CORS Error**: Verify CORS settings in `main.py`
- **Slow response**: Free tier wakes from sleep (normal)

### Frontend Issues:
- **API not connecting**: Check `VITE_API_URL` environment variable
- **Build fails**: Ensure all dependencies in `package.json`
- **404 on refresh**: Configure redirects (Vercel handles automatically)

### Model Loading Issues:
- Ensure `cardio_model.pkl` is in the repository
- Check file path in `main.py` (use relative path)
- Verify file is not in `.gitignore`

---

## 💡 Pro Tips

1. **Use GitHub for deployment** - Automatic deployments on push
2. **Enable preview deployments** - Test before going live
3. **Monitor usage** - Stay within free tier limits
4. **Add custom domain** - Both Vercel and Render support this
5. **Set up analytics** - Track usage with Vercel Analytics

---

## 📧 Support

If you encounter issues:
- Check deployment logs in Render/Vercel dashboard
- Verify environment variables are set correctly
- Test API endpoints directly using the backend URL
- Check browser console for errors

Good luck with your deployment! 🚀
