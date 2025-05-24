import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Home, Water, Agriculture, Settings } from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <Home /> },
  { text: 'Ponds', icon: <Water /> },
  { text: 'Farms', icon: <Agriculture /> },
  { text: 'Settings', icon: <Settings /> },
];

const DrawerMenu: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' }, // Hide on mobile, show on md+
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: '#A4D6F8', // Background color
          overflowX: 'hidden', // Prevent horizontal scroll
        },
      }}
      open
    >
      <Box sx={{ width: '100%', height: '100vh' }}>
        <Toolbar />
        <List>
          {menuItems.map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: 'black' }}>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'black', fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;

