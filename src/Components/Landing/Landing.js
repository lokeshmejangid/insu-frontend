import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    const handleSubmit = ()=> {
        navigate('/dashboard');

    }
  return (
    <Grid
      container
      spacing={0}
      className="login"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={11} sm={4}>
        <Typography variant="h4" align="center" className="login-title">
          Vehicle Insurance Management System
        </Typography>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <form>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
              />
              <Button fullWidth variant="contained" className="login-button" onClick={handleSubmit}>
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Landing;
