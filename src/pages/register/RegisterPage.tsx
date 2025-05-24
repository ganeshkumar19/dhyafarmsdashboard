import { Box, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import RequestCancelButton from '../../components/RequestCancelButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import RequestModal from '../../modals/RequestModal';

interface FormField{
    label: string,
    type: string,
    name: keyof FormData,
    placeholder: string
}

interface FormData{
    username: string,
    email: string,
    mobileno: string,
    address: string
}

interface Errors {
    email?: string;
    mobileno?: string;
    username?: string;
    address?: string;
}

const RegisterPage = () => {
    const [open, setOpen] = useState(false);

    const [formData, setFormData]= useState<FormData>({
        username: '',
        email: '',
        mobileno: '',
        address: ''
    })

    const navigate = useNavigate()

    const handleRegister = (): void => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>): void=>{
        const { name, value} = e.target

        setFormData((prevState)=>{
            const newState = {...prevState, [name]: value}
            validateInput(name as keyof FormData, value)
            return newState
        })
    }

    const validateInput =(name: keyof FormData, value: string): void =>{
        let error = ''
        switch (name){
            case 'email':
                if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
                    error = 'Please Enter a valid Email Address'
                }
            break;
            case 'mobileno':
                if(!/^\d{10}$/.test(value)){
                    error = 'Please enter a valid Mobile Number'
                }
            break;
             default:
                break;
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }

    const [errors, setErrors] = useState<Errors>({});

    const handleCancel = (): void => {
        navigate('/'); // Redirects to the login page
    };

  


    const formFields: FormField[] = [
        { label: 'Username', name: 'username', type: 'text', placeholder: 'Enter your username' },
        { label: 'Email', name: 'email', type: 'text', placeholder: 'Enter your Email' },
        { label: 'Mobile', name: 'mobileno', type: 'text', placeholder: 'Enter your Mobile number' },
        { label: 'Address', name: 'address', type: 'text', placeholder: 'Enter your Address' },
      ];
    
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height="100vh">
          <Box
        sx={{
          padding: {xs: "20px", sm: "30px", md: "40px"},
          borderRadius: "10px",
          width: { xs: "95%", sm: "500px", md: "590px", lg: "680px" },
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{fontWeight: "bold", fontFamily: "var(--font-family)", mb: 3, fontSize: {xs: 'var(--font-size-medium)', sm: 'var(--font-size-extramedium)', md: 'var(--font-size-large)'} }}
        >
          AquaIntelliSuite Dashboard
        </Typography>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 1,  backgroundColor: "var(--ternary-color)",
           paddingX: {xs: '10px' ,sm: '20px', md: '30px', lg: '40px'},paddingY: {xs: '10px' ,sm: '20px', md: '30px', lg: '40px'}, borderRadius: "10px", width: "100%" }}>
            <Typography
                      variant="h5"
                      align="center"
                      sx={{fontFamily: "var(--font-family)", fontWeight: "400", mb: 4, fontSize: {xs: 'var(--font-size-medium)', sm: 'var(--font-size-extramedium)', md: 'var(--font-size-large)'} }}
                    >
                      Register
            </Typography>
          {formFields.map((field, index) => (
            <Grid container key={index} alignItems="center" spacing={2} mb={1}>
              <Grid item xs={4}>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: {xs: "12px" , sm: '14px', md: '16px', lg: '18px'}, fontFamily: "var(--font-family)" }}
                >
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  variant="outlined"
                  multiline={field.name === 'address'}
                  rows={field.name === 'address' ? 3 : 1}
                  
                  sx={{
    
                    backgroundColor: "white",
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { border: "none" }, // ✅ Removes border
                      "&:hover fieldset": { border: "none" },
                      "&.Mui-focused fieldset": { border: "none" },
                    },
                    "& .MuiInputBase-root": { height: field.name === 'address' ? "auto" : "42px" , padding: '0'}, // ✅ Adjust total height
                    "& .MuiOutlinedInput-input": {
                      padding: "10px 10px", // ✅ Reduce vertical padding
                    },
                    "& input::placeholder": {  // ✅ Targets the placeholder text
                    fontSize: { xs: "12px", sm: "14px", md: "16px", lg: '14px' }, // Responsive font size
                    color: "black", // Optional: Change placeholder color
                    fontFamily: "var(--font-family)", // Optional: Use custom font
                    }
                  }}
                />
              </Grid>
            </Grid>
          ))}

          <RequestCancelButton
                      primaryText="Submit"
                      secondaryText="Cancel"
                      handlePrimaryAction={handleRegister}
                      handleSecondaryAction={handleCancel}
            />
        </Box>
      
      </Box>
      <RequestModal open={open} handleClose={handleClose}/>
    </Box>
  )
}

export default RegisterPage