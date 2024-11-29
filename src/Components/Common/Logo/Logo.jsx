import React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
const Logo = ({ open }) => {


  if (open === undefined) {
    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="center" py={2} style={{ height: `150px` }}>
          <img src='./images/logo.jpg' alt="Logo" style={{ maxHeight: `100%`, maxWidth: `100%` }} />
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Box display="flex" alignItems="center" justifyContent="center" py={2} style={{ height: `${open ? `150px` : `80px`}`, transition: 'height 0.3s' }}>
          <img src='./images/logo.jpg' alt="Logo" style={{ maxHeight: `80%`, maxWidth: `80%` }} />
        </Box>
      </>
    )
  }
};

export default Logo;
