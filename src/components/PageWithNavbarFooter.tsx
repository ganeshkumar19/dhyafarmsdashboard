import React, { useState } from 'react';
import { Box, CssBaseline, Grid, Toolbar } from '@mui/material';
import AppNavbar from './AppNavbar';
import DrawerMenu from './DrawerMenu';

interface PageWithNavbarDrawerProps {
  component: React.ComponentType;
}

const PageWithNavbarDrawer: React.FC<PageWithNavbarDrawerProps> = ({ component: Component }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppNavbar />

      {/* Grid Layout for Sidebar and Main Content */}
      <Grid container> {/* Adjust margin to prevent AppBar overlap */}
        
        {/* Sidebar for md+ devices (Hidden in xs) */}
        <Grid item xs={0} md={2} sx={{ display: { xs: 'none', md: 'block', zIndex: -999 } }}>
          <DrawerMenu mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        </Grid>

        {/* Main Content (Takes full width on mobile, 8 columns on md+) */}
        <Grid item xs={12} md={10}>
          <Component />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageWithNavbarDrawer;
