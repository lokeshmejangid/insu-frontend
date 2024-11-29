import React from 'react';
import { Grid, Paper, Typography, Box, AppBar, Toolbar, Avatar, Button, IconButton } from '@mui/material';



import './Dashboard.css';

const Dashboard = () => {

  const stats = [
    { title: 'Total Categories', value: 4, icon: '📋', color: '#2196f3' },
    { title: 'Active Policies', value: 3, icon: '📄', color: '#4caf50' },
    { title: 'Inactive Policies', value: 3, icon: '📄', color: '#f44336' },
    { title: 'Clients', value: 3, icon: '👤', color: '#ff9800' },
    { title: 'Insured Vehicle', value: 1, icon: '🚗', color: '#00bcd4' },
  ];


  return (
    <div className="dashboard">

      <Grid container className="main-container">

        {/* Content */}
        <Grid item xs={12} className="content">
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
