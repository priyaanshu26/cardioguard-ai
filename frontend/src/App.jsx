import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predict from './pages/Predict';
import ModelInfo from './pages/ModelInfo';
import DataInsights from './pages/DataInsights';
import Disclaimer from './pages/Disclaimer';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/predict" element={<Predict />} />
              <Route path="/model-info" element={<ModelInfo />} />
              <Route path="/data-insights" element={<DataInsights />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
