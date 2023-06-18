import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { StatusContext } from '../context/StatusContext';

const Footer = () => {
  const { updateStatus } = useContext(StatusContext);
  const [value, setValue] = useState(0);
  const location = useLocation();
  const currentUrl = location.pathname;

  useEffect(() => {
    updateStatus(value === 0 ? true : false);
  }, [updateStatus, value]);

  return (
    <Box
      position="fixed"
      gap="30px"
      alignItems="center"
      bottom={0}
      left={0}
      width="100%"
      display="flex"
      bgcolor="transparent"
      justifyContent="center"
      sx={{
        padding: "5px",
        background: "rgba(255, 255, 255, 0.2)",
        borderRadius: "10px",
        backdropFilter: "blur(5px)",
      }}
    >
      {currentUrl !== '/' && (
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{ backgroundColor: 'transparent' }}
        >
          <BottomNavigationAction
            label="Recents"
            icon={<RestoreIcon sx={{ color: 'black' }} />}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon sx={{ color: 'black' }} />}
          />
        </BottomNavigation>
      )}
      <Typography variant="h7" color="black" align="center" style={{ marginBottom: '10px' }}>
        © {new Date().getFullYear()} Matan Bardugo. All rights reserved.&nbsp;
      </Typography>
    </Box>
  );
};

export default Footer;
