import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TestListPage from './pages/TestListPage';
import TestSolvePage from './pages/TestSolvePage';
import AdminTestCreatePage from './pages/AdminTestCreatePage';
import ResultsPage from './pages/ResultsPage';
import './App.css'; 
import ResultsDetailPage from './pages/ResultsDetailPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tests" element={<TestListPage />} />
        <Route path="/tests/:id" element={<TestSolvePage />} />
        <Route path="/admin/create-test" element={<AdminTestCreatePage />} />
        <Route path="/results/detail" element={<ResultsDetailPage />} />

<Route path="/results" element={<ResultsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
