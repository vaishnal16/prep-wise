import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';
import RoadmapPage from './pages/RoadmapPage';
import Authpages from './pages/Authpages';
import Dashboard from './pages/Dashboard';


export default function App() {
  return (
    <>
    {/* <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="http://localhost:8501"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Streamlit UI"
      ></iframe>
    </div> */}


    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authpages />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
          />
      </Routes>
    </Router>
    </>
  )
}
