import { Box, Button } from '@mui/material';
import React from 'react';

interface RequestCancelButtonProps {
    primaryText: string;  // Dynamic primary button text
    secondaryText: string; // Dynamic secondary button text
    handlePrimaryAction: () => void;  // Function for primary button action
    handleSecondaryAction: () => void; // Function for secondary button action
}

const RequestCancelButton: React.FC<RequestCancelButtonProps> = ({ 
    primaryText, 
    secondaryText, 
    handlePrimaryAction, 
    handleSecondaryAction 
}) => {
  return (
    <Box display="flex" justifyContent="space-around" alignItems="center" mt={2}>
        <Button
            sx={{
                backgroundColor: "var(--secondary-color)",
                color: "white",
                py: '10px',
                px: { xs: '20px', sm: '30px', md: '50px' },
                borderRadius: "5px",
                textTransform: "none",
            }} 
            onClick={handlePrimaryAction}
        >
            {primaryText}
        </Button>
        
        <Button
            sx={{
                backgroundColor: "white",
                color: "var(--secondary-color)",
                py: '10px',
                px: { xs: '20px', sm: '30px', md: '50px' },
                border: '1.5px solid var(--secondary-color)',
                borderRadius: "5px",
                textTransform: "none",
            }} 
            onClick={handleSecondaryAction}
        >
            {secondaryText}
        </Button>
    </Box>
  );
};

export default RequestCancelButton;
