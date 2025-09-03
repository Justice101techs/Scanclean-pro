import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import QRPage from './pages/QRPage.jsx';
import OCRPage from './pages/OCRPage.jsx';
import ImageEnhancerPage from './pages/ImageEnhancerPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  const { theme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/image-enhancer" element={<ImageEnhancerPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/qr" element={
              <ProtectedRoute>
                <QRPage />
              </ProtectedRoute>
            } />
            <Route path="/ocr" element={
              <ProtectedRoute>
                <OCRPage />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;