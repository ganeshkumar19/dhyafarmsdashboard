import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Menu, Home, Water, Agriculture, Settings } from "@mui/icons-material";
import NAVFISH from "../assets/images/navfish.png";

const drawerWidth = 240;

const menuItems = [
  { text: 'Home', icon: <Home /> },
  { text: 'Ponds', icon: <Water /> },
  { text: 'Farms', icon: <Agriculture /> },
  { text: 'Settings', icon: <Settings /> },
];

const AppNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "var(--secondary-color)", height: "60px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Hamburger Menu for Mobile */}
          <IconButton 
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }} // Show only on small screens
          >
            <Menu />
          </IconButton>

          {/* App Title */}
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'var(--font-family)',
              fontWeight: 500,
              display : {xs: 'none' ,md: 'block'},
              fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px" },
              color: "#ffffff",
            }}
          >
            AquaIntelliSuite Dashboard
          </Typography>

          {/* User Info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: 'var(--font-family)',
                  fontWeight: 400,
                  fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "18px" },
                  color: "#fff",
                }}
              >
                Darshan
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 300,
                  fontSize: { xs: "11px", sm: "13px", md: "15px", lg: "17px" },
                  color: "#ffffff",
                }}
              >
                Admin
              </Typography>
            </Box>

            {/* User Avatar */}
            <Avatar
              src={NAVFISH}
              alt="User"
              sx={{
                width: { xs: 30, sm: 35, md: 40 },
                height: { xs: 30, sm: 35, md: 40 },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer (Off-canvas menu) */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ [`& .MuiDrawer-paper`]: { width: drawerWidth, bgcolor: "#A4D6F8" , display: { md: 'none' } } }}
      >
        <List>
          {menuItems.map(({ text, icon }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemIcon sx={{ color: 'black' }}>{icon}</ListItemIcon>
                <ListItemText primary={text} sx={{ color: 'black', fontWeight: 'bold' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default AppNavbar;

