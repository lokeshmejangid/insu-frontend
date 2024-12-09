import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdLogout } from 'react-icons/md';
import { IoIosNotifications } from "react-icons/io";
const Header = ({ onToggleSidebar, onLogout, sidebarOpen }) => {

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: `calc(100% - ${sidebarOpen ? 240 : 60}px)`, ml: `${sidebarOpen ? 240 : 60}px`, transition: 'width 0.3s, margin-left 0.3s', background: '#fff', color: 'purple' }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
          sx={{ mr: 2 }}
        >
          <GiHamburgerMenu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit" startIcon={<IoIosNotifications />} />
        <Button color="inherit" startIcon={<MdLogout />} onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
