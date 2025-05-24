import React from "react";
import { Box, Grid } from "@mui/material";

const CameraInput: React.FC = () => {
  return (
    <Box sx={{ width: "100%", mt: 2, px: 2 }}>
      <Grid
        container
        sx={{
          backgroundColor: "white",
          minHeight: "220px",
          borderRadius: "20px",
          boxShadow: "rgba(241, 239, 239, 0.35) 0px 8px 15px",
        }}
      >
        <Grid item xs={12}>
          {/* Add camera input elements here */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CameraInput;