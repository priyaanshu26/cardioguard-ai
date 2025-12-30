# 🚀 Quick Deployment Steps

## Prerequisites
- GitHub account
- Git installed locally
- Code pushed to GitHub repository

## Step 1: Deploy Backend to Render (5 minutes)

1. **Go to [render.com](https://render.com)** and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. **Configure**:
   ```
   Name: cardioguard-ai-backend
   Root Directory: backend
   Runtime: Python 3
   Build Command: pip install -r requirements.txt
   Start Command: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
5. Click **"Create Web Service"**
6. **Copy your backend URL** (e.g., `https://cardioguard-ai-backend.onrender.com`)

## Step 2: Deploy Frontend to Vercel (3 minutes)

1. **Update `.env.production`** with your backend URL:
   ```
   VITE_API_URL=https://cardioguard-ai-backend.onrender.com
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub

3. Click **"Add New..."** → **"Project"**

4. Import your GitHub repository

5. **Configure**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

6. **Add Environment Variable**:
   ```
   VITE_API_URL = https://cardioguard-ai-backend.onrender.com
   ```

7. Click **"Deploy"**

8. **Done!** Your app is live 🎉

## Step 3: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://cardioguard-ai.vercel.app`)
2. Test all pages
3. Try making a prediction
4. Check mobile responsiveness

## Important Notes

⚠️ **First Request**: Render free tier sleeps after 15 min - first request takes ~30 seconds

✅ **CORS**: Already configured to accept all origins

✅ **Model File**: Ensure `cardio_model.pkl` is in your GitHub repo

## Troubleshooting

**Backend not responding?**
- Check Render logs
- Verify model file is uploaded
- Wait 30 seconds for cold start

**Frontend can't connect?**
- Verify `VITE_API_URL` in Vercel environment variables
- Check browser console for errors
- Ensure backend URL is correct

## Next Steps

- [ ] Add custom domain (optional)
- [ ] Set up monitoring
- [ ] Share your live app!
- [ ] Add to portfolio

---

**Your app will be live at:**
- Frontend: `https://your-app.vercel.app`
- Backend API: `https://your-backend.onrender.com`

Good luck! 🚀
