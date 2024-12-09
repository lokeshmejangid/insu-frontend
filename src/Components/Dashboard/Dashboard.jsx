import React, { useEffect, useState } from 'react';
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
import { getAllDashboard } from '../../Services/Api';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [dashboard, setDashboard] = useState({
    activePoliciesCount: 0,
    inactivePoliciesCount: 0,
    clientsCount: 0,
    insuredVehicleCount: 0,
    barChartData: [],
    lineChartData: [],
  });

  const getDashboard = async () => {
    try {
      setLoading(true); // Start loading
      const result = await getAllDashboard();
      setDashboard(result.data);
      toast.success(result.message, { position: "top-center" });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  }

  useEffect(() => {
    getDashboard();
  }, [])


  const stats = [
    { title: 'Active Policies', value: dashboard.activePoliciesCount, icon: <MdLocalPolice size={24} />, color: '#4caf50' },
    { title: 'Inactive Policies', value: dashboard.inactivePoliciesCount, icon: <MdOutlineLocalPolice size={24} />, color: '#f44336' },
    { title: 'Clients', value: dashboard.clientsCount, icon: <FaUsers size={24} />, color: '#ff9800' },
    { title: 'Insured Vehicle', value: dashboard.insuredVehicleCount, icon: <FaAddressCard size={24} />, color: '#00bcd4' },
  ];

  return (
    <div className="dashboard">
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <Grid container className="main-container">
        {/* Stats Cards */}
        <Grid item xs={12} className="content">
          <Typography variant="h4" className="welcome-title">
            Welcome to Vehicle Insurance Management System
          </Typography>
          <ToastContainer />
          <Grid container spacing={2} mt={0}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper className="stat-card" style={{ borderLeft: `5px solid ${stat.color}`, padding: '1em'}}>
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
        <Grid container spacing={3} mt={0}>
          {/* Bar Chart */}
          <Grid item xs={12} md={6}>
            <Paper>
              <Typography variant="h6" gutterBottom style={{ padding: '16px' }}>
                Policy Status Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300} className="pad-5-2">
                <BarChart data={dashboard.barChartData}>
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
              <ResponsiveContainer width="100%" height={300} className="pad-5-2">
                <LineChart data={dashboard.lineChartData}>
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
