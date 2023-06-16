import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const [value, setValue] = useState(0);

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
      // style={{ display: 'flex', justifyContent: 'center' }}
    >
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
          icon={<RestoreIcon sx={{ color: 'white' }} />} 
        />
        <BottomNavigationAction
          label="Favorites"
          icon={<FavoriteIcon sx={{ color: 'white' }} />} 
        />
      </BottomNavigation>
      <Typography variant="h7" color="white" align="center">
        © {new Date().getFullYear()} Matan Bardugo. All rights reserved.&nbsp;
      </Typography>
    </Box>
  );
};

export default Footer;
