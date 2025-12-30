# CardioGuard AI - Frontend

Modern React frontend for the CardioGuard AI cardiovascular disease prediction application.

## Features

- ✨ Modern glassmorphism UI design
- 🌓 Light/Dark mode toggle
- 📱 Fully responsive (mobile & desktop)
- 🎭 Smooth animations with Framer Motion
- 🎨 Tailwind CSS for styling
- ⚡ Fast and optimized with Vite

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.jsx          # Navigation bar with theme toggle
│   ├── pages/
│   │   ├── Home.jsx             # Landing page
│   │   ├── Predict.jsx          # Prediction form and results
│   │   ├── ModelInfo.jsx        # Model details and metrics
│   │   ├── DataInsights.jsx     # Dataset statistics
│   │   └── Disclaimer.jsx       # Legal disclaimer
│   ├── context/
│   │   └── ThemeContext.jsx     # Dark mode context
│   ├── utils/
│   │   └── api.js               # API client
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind configuration
└── package.json                 # Dependencies

```

## Pages

### Home
- Hero section with project overview
- Key features showcase
- Statistics display
- Call-to-action buttons

### Predict
- Comprehensive input form for all 12 features
- Auto-calculated BMI
- Real-time prediction results
- Risk level visualization
- Probability display with animated progress bar

### Model Info
- Model type and architecture
- Hyperparameters
- Performance metrics (accuracy, precision, recall, F1-score)
- Confusion matrix
- Training methodology

### Data Insights
- Dataset overview
- Target distribution
- Gender distribution
- Feature descriptions
- Data cleaning steps

### Disclaimer
- Medical disclaimer
- Model limitations
- Intended use
- Data privacy information
- Emergency notice

## Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Routing
- **Axios** - HTTP client

## Environment Variables

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_URL=http://localhost:8000
```

## Backend Connection

The frontend is configured to connect to the backend API at `http://localhost:8000`. Make sure the backend server is running before using the prediction feature.

## Development

- Hot Module Replacement (HMR) is enabled for fast development
- ESLint is configured for code quality
- Dark mode persists in localStorage
- Responsive design tested on multiple screen sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
