import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ChefsPage from './pages/ChefsPage';
import ChefDetailPage from './pages/ChefDetailPage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './hooks/useAuth';
import styles from './App.module.css';

// Protected Route Component - Redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route - Redirects to dashboard if already authenticated
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

// Main App Content
const AppContent = () => {
  return (
    <Routes>
      {/* Public Routes - Everyone can access */}
      <Route path="/" element={<HomePage />} />
      <Route path="/chefs" element={<ChefsPage />} />
      <Route path="/chef/:id" element={<ChefDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
      {/* Auth Routes - Redirect to dashboard if already logged in */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />
      
      {/* Protected Routes - Require Authentication */}
      <Route 
        path="/booking/:chefId" 
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback Route - 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// 404 Not Found Page Component
const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFoundContent}>
        <div className={styles.notFoundIcon}>
          <i className="fas fa-utensils"></i>
        </div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className={styles.homeLink}>
          <i className="fas fa-home"></i>
          Back to Home
        </a>
      </div>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>
        <i className="fas fa-utensil-spoon"></i>
        <i className="fas fa-utensils"></i>
      </div>
      <p>Loading Origin Foods...</p>
    </div>
  );
};

// Main App Component
function App() {
  const [loading, setLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.app}>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <MainLayout>
            <AppContent />
          </MainLayout>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
