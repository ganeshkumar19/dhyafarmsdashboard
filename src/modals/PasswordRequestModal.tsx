import React, { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import StyledTextField from "../components/StyledTextFeild";

interface PasswordRequestModalProps {
  open: boolean;
  handleClose: () => void;
}

const PasswordRequestModal: React.FC<PasswordRequestModalProps> = ({ open, handleClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: {xs: '300px', sm: '350px'},
          bgcolor: '#9FCBF7',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2} fontFamily={'var(--font-family)'} textAlign={"center"}>Forgot Password</Typography>
        <Typography variant="body2" mb={2} fontFamily={'var(--font-family)'} textAlign={"center"}>
          Enter your email address to receive a password reset link.
        </Typography>
        
        <StyledTextField
          fullWidth
          label="Email Address"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: "20px" }} // ✅ Keep component-specific styles if needed
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ backgroundColor: '#0B7ABF', color: 'white' }}
        >
          {loading ? "Sending..." : "Send Request"}
        </Button>
        
        {message && (
          <Typography variant="body2" color="success.main" mt={2}>
            {message}
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default PasswordRequestModal;
