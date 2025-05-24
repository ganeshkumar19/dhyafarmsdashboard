import React from "react";
import { Box, Grid, TextField, Button } from "@mui/material";

const ChatBox: React.FC = () => {
  return (
    <Box sx={{ width: "100%", mt: 4, px: 2 }}>
      <Grid
        container
        justifyContent="center"
        alignItems="flex-end"
        sx={{
          backgroundColor: "white",
          minHeight: "250px",
          borderRadius: "20px",
          boxShadow: "rgba(241, 239, 239, 0.35) 0px 8px 15px",
          padding: 2,
        }}
      >
        <Grid item xs={12} sx={{display: 'flex',  justifyContent:"center", alignItems: 'center'}}>
          <Box sx={{ position: "relative", maxWidth: "500px", width: "100%" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              InputProps={{
                sx: {
                  borderRadius: "50px",
                  border: "2px solid #0B7ABF",
                  fontFamily: "var(--font-family)",
                  fontSize: "10px",
                  fontWeight: "var(--font-weight-medium)",
                  padding: "10px",
                  "& .MuiInputBase-root": { height: "30px" }, 
                    "& .MuiOutlinedInput-input": {
                      padding: "5px 10px", // 
                    },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                position: "absolute",
                right: "5px",
                top: "50%",
                transform: "translateY(-50%)",
                borderRadius: "50px",
                backgroundColor: "#3381BF",
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: { xs: "12px", sm: "14px" }, // Responsive font size
                paddingX: { xs: "10px", sm: "20px" },
                paddingY: "3px",
                "&:hover": { backgroundColor: "#2B6BA0" }, // Slightly darker hover effect
              }}
            >
              Send
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatBox;

