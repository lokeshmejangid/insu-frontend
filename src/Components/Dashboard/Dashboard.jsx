import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { FaUsers } from 'react-icons/fa';
import { MdCategory, MdLocalPolice, MdOutlineLocalPolice } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";

const Dashboard = () => {
  const stats = [
    { title: 'Active Policies', value: 3, icon: <MdLocalPolice size={24} />, color: '#4caf50' },
    { title: 'Inactive Policies', value: 3, icon: <MdOutlineLocalPolice size={24} />, color: '#f44336' },
    { title: 'Clients', value: 3, icon: <FaUsers size={24} />, color: '#ff9800' },
    { title: 'Insured Vehicle', value: 1, icon: <FaAddressCard size={24} />, color: '#00bcd4' },
  ];

  const barChartData = [
    { name: 'Jan', Active: 20, Inactive: 5 },
    { name: 'Feb', Active: 30, Inactive: 10 },
    { name: 'Mar', Active: 40, Inactive: 8 },
    { name: 'Apr', Active: 35, Inactive: 12 },
  ];

  const lineChartData = [
    { month: 'Jan', Clients: 15, Policies: 10 },
    { month: 'Feb', Clients: 25, Policies: 15 },
    { month: 'Mar', Clients: 35, Policies: 20 },
    { month: 'Apr', Clients: 45, Policies: 30 },
  ];

  return (
    <div className="dashboard">
      <Grid container className="main-container">
        {/* Stats Cards */}
        <Grid item xs={12} className="content">
          <Typography variant="h4" className="welcome-title">
            Welcome to Vehicle Insurance Management System
          </Typography>
          <Grid container spacing={2} mt={2}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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

        {/* Charts */}
        <Grid container spacing={3} mt={4}>
          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6" gutterBottom style={{ padding: '16px' }}>
                Policy Status Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Active" fill="#4caf50" />
                  <Bar dataKey="Inactive" fill="#f44336" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6" gutterBottom style={{ padding: '16px' }}>
                Client & Policy Growth
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Clients" stroke="#2196f3" />
                  <Line type="monotone" dataKey="Policies" stroke="#ff9800" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
