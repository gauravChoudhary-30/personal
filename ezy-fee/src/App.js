import React from 'react';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import LaunchScreen from './pages/launchScreeen';
import ProtectedRoute from './components/protectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchScreen />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
