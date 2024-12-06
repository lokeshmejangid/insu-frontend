import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Drawer, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Common/Logo/Logo.jsx';
import { MdDashboard } from "react-icons/md";
import { FaUsers } from 'react-icons/fa';
import { AiFillInsurance } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { MdCategory } from "react-icons/md";
import { MdPolicy } from "react-icons/md";


const Sidebar = ({ open }) => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 60,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          boxShadow: '3px 0 5px -2px rgba(0,0,0,0.3)',
          overflowX: 'hidden',
          background: 'purple',
          color: '#fff'
        },
      }}
    >
      <Box sx={{ overflow: 'hidden' }}>
        <Logo open={open} />
        <List
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            justifyContent: `center`,
            maxHeight: open ? 'calc(100vh - 150px)' : 'calc(100vh - 80px)',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '1px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '1px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {[
            { text: 'Dashboard', icon: <MdDashboard color='#fff' fontSize='25px' />, path: '/' },
            { text: 'Category', icon: <MdCategory color='#fff' fontSize='25px' />, path: '/insuranceCategory' },
            { text: 'Policies List', icon: <MdPolicy color='#fff' fontSize='25px' />, path: '/policiesList' },
            { text: 'Insurance', icon: <AiFillInsurance color='#fff' fontSize='25px' />, path: '/insurance' },
            { text: 'Clients', icon: <FaUsers color='#fff' fontSize='25px' />, path: '/clients' },
            
            { text: 'Transarion', icon: <GrTransaction color='#fff' fontSize='25px' />, path: '/transation' },
            
          ].map((item, index) => (
            <ListItem button key={index} onClick={() => handleNavigation(item.path)} style={{display: 'flex', gap: '10px', cursor:'pointer'}}>
              <ListItemIcon style={{minWidth: '0'}}>{item.icon}</ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;