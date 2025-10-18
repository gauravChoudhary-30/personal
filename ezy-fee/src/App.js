import React from 'react';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import LaunchScreen from './pages/launchScreeen';
import Student from './pages/student';
import ProtectedRoute from './components/protectedRoutes';
import Payment from './pages/student/payment';
import AddStudent from './pages/addStudent';
import AllStudents from './pages/allStudents';

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
        <Route 
          path="/student/payment" 
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-student" 
          element={
            <ProtectedRoute>
              <AddStudent />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/all-students" 
          element={
            <ProtectedRoute>
              <AllStudents />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
