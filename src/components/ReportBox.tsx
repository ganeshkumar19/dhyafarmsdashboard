import React from 'react'
import PROFILE from '../assets/images/profile.png'
import PRO from '../assets/images/reports.png'
import SETTINGS from '../assets/images/im2.png'
import { Avatar, Box, Grid, Typography } from '@mui/material'

const ReportBox = () => {
  return (
   <Box sx={{ width: "100%", mt: 4, px: 2 }}>
    <Grid container sx={{mx: 'auto'}}>
        <Grid item xs={12} sx={{my: 1}}>
        <Box
          sx={{
            backgroundColor: "var(--secondary-color)", // Using your CSS variable
            padding: "20px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
         <Avatar
            src={PROFILE}
            alt="Reports"
            sx={{ width: 40, height: 40 }}
          />

          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "white",
              margin: 0,
              padding: 0,
            }}
          >
            Reports
          </Typography>
        </Box>
        </Grid>
        <Grid item xs={12} sx={{my: 1}}>
        <Box
          sx={{
            backgroundColor: "var(--secondary-color)", // Using your CSS variable
            padding: "20px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
         <Avatar
            src={SETTINGS}
            alt="Profile"
            sx={{ width: 40, height: 40 }}
          />

          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "white",
              margin: 0,
              padding: 0,
            }}
          >
            Profile
          </Typography>
        </Box>
        </Grid>
        <Grid item xs={12} sx={{my: 1}}>
        <Box
          sx={{
            backgroundColor: "var(--secondary-color)", // Using your CSS variable
            padding: "20px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
         <Avatar
            src={PRO}
            alt="settings"
            sx={{ width: 40, height: 40 }}
          />

          <Typography
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "white",
              margin: 0,
              padding: 0,
            }}
          >
            Settings
          </Typography>
        </Box>
        </Grid>
    </Grid>
   </Box>
  )
}

export default ReportBox