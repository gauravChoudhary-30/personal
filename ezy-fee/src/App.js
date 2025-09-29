import React from 'react';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import LaunchScreen from './pages/launchScreeen';
import Student from './pages/student';
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
        <Route 
          path="/student" 
          element={
            <ProtectedRoute>
              <Student />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
