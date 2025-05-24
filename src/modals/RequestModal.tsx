import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';


interface RequestModalProps {
    open: boolean;
    handleClose: () => void;
  }

  const RequestModal: React.FC<RequestModalProps> = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {xs: '300px', sm: '350px'},
          bgcolor: '#9FCBF7',
          boxShadow: 24,
          p: 4,
          borderRadius: '30px',
          textAlign: 'center',

        }}
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Your Request has been Processed Successfully.
        </Typography>
        <Typography mb={3}>You will be intimated soon.</Typography>
        <Button
          variant="contained"
          onClick={handleClose}
          sx={{ backgroundColor: '#0B7ABF', color: 'white' }}
        >
          Back
        </Button>
      </Box>
    </Modal>
  );
};
export default RequestModal