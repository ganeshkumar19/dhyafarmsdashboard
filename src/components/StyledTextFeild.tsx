import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

// StyledTextField Component
const StyledTextField = styled(TextField)<TextFieldProps>(({ theme, variant }) => ({
  backgroundColor: "white",
  borderRadius: "10px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { 
      border: variant === "outlined" ? "none" : "none", // ✅ Keep border only for outlined variant
    }, 
    "&:hover fieldset": { 
      border: variant === "outlined" ? "1px solid #0B7ABF" : "none", // ✅ Slightly change on hover for outlined variant
    },
    "&.Mui-focused fieldset": { 
      border: variant === "outlined" ? "2px solid #0B7ABF" : "none", // ✅ Show focus effect only for outlined
    },
  },
  "& .MuiInputBase-root": { height: "42px" }, 
  "& .MuiOutlinedInput-input": {
    padding: "10px 10px",
  },
  "& input::placeholder": {  
    fontSize: "14px", 
    color: "black", 
    fontFamily: "var(--font-family)",
  },
}));

export default StyledTextField;

