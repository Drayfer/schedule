import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import LoginPage from './components/pages/LoginPage';
import FirstPage from './components/pages/FirstPage';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={'Not Found'} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
