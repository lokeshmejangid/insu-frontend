import React, { useState } from 'react';
import Sidebar from './Components/Layout/Sidebar/Sidebar.jsx';
import Header from './Components/Layout/Header/Header.jsx';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import Clients from './Components/Client/Clients';

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate('/signin');
  };

  const isAuthRoute = location.pathname === '/signin' ||
    location.pathname === '/forgot-password' ||
    location.pathname === '/otp-verification' ||
    location.pathname === '/new-password' ||
    location.pathname === '*';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {!isAuthRoute && (
        <>
          <Header onToggleSidebar={handleToggleSidebar} onLogout={handleLogout} sidebarOpen={sidebarOpen} />
          <Sidebar open={sidebarOpen} />
        </>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isAuthRoute ? '40px' : '40px 40px',
          position: isAuthRoute ? 'relative' : 'absolute',
          top: isAuthRoute ? '0' : '64px',
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          bgcolor: '#f5f5f5',
          transition: 'all 0.3s',
          width: isAuthRoute ? '100%' : `calc(100% - ${sidebarOpen ? '240px' : '60px'})`,
          ml: isAuthRoute ? '0' : sidebarOpen ? '240px' : '60px',
        }}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/signin" element='' />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;