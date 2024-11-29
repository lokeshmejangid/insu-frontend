import React from 'react';
import { Grid, Paper, Typography, Box, AppBar, Toolbar, Avatar, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Change to useNavigate
import { IoLogOut } from "react-icons/io5";


import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();  // Declare navigate function

  const stats = [
    { title: 'Total Categories', value: 4, icon: '📋', color: '#2196f3' },
    { title: 'Active Policies', value: 3, icon: '📄', color: '#4caf50' },
    { title: 'Inactive Policies', value: 3, icon: '📄', color: '#f44336' },
    { title: 'Clients', value: 3, icon: '👤', color: '#ff9800' },
    { title: 'Insured Vehicle', value: 1, icon: '🚗', color: '#00bcd4' },
  ];

  const handleLogout = () => {
    // Clear user session (localStorage, cookies, etc.)
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/');  // Use navigate instead of history.push
  };

  const handleMenuClick = (route) => {
    navigate(route); // Navigate to the selected route
  };

  return (
    <div className="dashboard">
      {/* Top AppBar */}
      <AppBar position="static" className="appbar">
        <Toolbar>
          <Typography variant="h6" className="appbar-title">
            Vehicle Insurance Management System - Admin
          </Typography>
          <Avatar className="appbar-avatar">A</Avatar>
          <Typography variant="subtitle1" className="appbar-user">
            Administrator Admin
          </Typography>
          <IconButton onClick={handleLogout}> <IoLogOut className='logout'/>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar and Content */}
      <Grid container className="main-container">
        {/* Sidebar */}
        <Grid item xs={12} sm={3} md={2} className="sidebar">
          <Typography variant="h6" className="sidebar-title">
            Vehicle Insurance Management
          </Typography>
          <ul className="menu">
            <li>📊 Dashboard</li>
            <li onClick={() =>  navigate('/clients')}>👥 Client List</li>
            <li>📄 Insurances</li>
            <li>📆 Date-wise Transactions</li>
            <li>📋 Category List</li>
            <li>📋 Policies List</li>
            <li>👤 User List</li>
            <li>⚙ Settings</li>
            
          </ul>
        </Grid>

        {/* Content */}
        <Grid item xs={12} sm={9} md={10} className="content">
          <Typography variant="h4" className="welcome-title">
            Welcome to Vehicle Insurance Management System
          </Typography>
          <Grid container spacing={2} mt={2}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                <Paper className="stat-card" style={{ borderLeft: `5px solid ${stat.color}` }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item className="stat-icon-container">
                      <Typography className="stat-icon">{stat.icon}</Typography>
                    </Grid>
                    <Grid item className="stat-text">
                      <Typography className="stat-title">{stat.title}</Typography>
                      <Typography className="stat-value">{stat.value}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
