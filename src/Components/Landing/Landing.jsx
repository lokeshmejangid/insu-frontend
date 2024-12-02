import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Typography
} from "@mui/material";
import './Landing.css';
import { useNavigate } from 'react-router-dom';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../Services/Api";

const Landing = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;

    if (name === "txtUserName") {
      setUserName(value);
    } else if (name === "txtPassword") {
      setPassword(value);
    } else {
      //todo
    }
  };

  // const loginValidation = () => {
  //   if (userName.trim() === "") {
  //     setError("User name can not be empty");
  //   } else if (password === "") {
  //     setError("Password can not be empty");
  //   } else if (password > 5) {
  //     setError("Password can not be less 6 char");
  //   } else {
  //     setError("");
  //     return true;
  //   }
  // };

  const clearData = () => {
    setPassword("");
    setUserName("");
    
  };

  const loginUser = async (payload) => {
    try {
      const response = await login(payload);
      console.log(response);
      clearData();
      navigate("/");

    } catch (error) {
      // if (error.response.status !== undefined && error.response.status === 400)
      //   toast.error(error.response.data.msg, { position: "top-center" });
      // else console.log(error);
    }
  };
  
  const handleSubmit = () => {
    //if (loginValidation()) {
      const payload = {
        username: userName,
        password
      };

      loginUser(payload);
    //}
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
                id="txtUserName"
                name="txtUserName"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mt: 1 }}
                value={userName}
                onChange={handleChangeLogin}
              />

              <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
                <InputLabel htmlFor="txtPasswordLogin">Password</InputLabel>
                <OutlinedInput
                  id="txtPassword"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleChangeLogin}
                  name="txtPassword"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Button fullWidth variant="contained" className="login-button" onClick={handleSubmit} sx={{ mt: 2 }}>
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
