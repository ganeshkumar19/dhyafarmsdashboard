import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid, Paper, CircularProgress } from "@mui/material";
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { loginUser } from '../../api/authApi';
import PasswordRequestModal from '../../modals/PasswordRequestModal';
import StyledTextField from '../../components/StyledTextFeild';

interface FormField {
  label: string;
  name: keyof FormData;
  type: string;
  placeholder: string;
}

interface FormData {
  email: string;
  passWord: string;
}

interface Errors {
  email?: string;
  passWord?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { setAccessToken } = useAuth()
  const [errors, setErrors] = useState<Errors>({});
  const [formData, setFormData] = useState<FormData>({
    email: '',
    passWord: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (): void => {
    setOpen(true);
  };


  const handleLogin = async (): Promise<void> => {
    if (!formData.email || !formData.passWord) {
      alert("Please fill all the fields.");
      return;
    }

    setLoading(true);
    try {
      const { access_token, refresh_token, token_type, user_id, user_token } = await loginUser(
        formData.email,
        formData.passWord
      );

      setAccessToken(access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_type", token_type);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("user_token", user_token);

      navigate("/farmpage");
    } catch (error) {
      alert("Invalid username or password.");
      navigate("/farmpage");
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };
      validateInput(name as keyof FormData, value);
      return newState;
    });
  };

  const validateInput = (name: keyof FormData, value: string): void => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Enter a valid email address.';
        }
        break;
      case 'passWord':
        if (value.length < 6) {
          error = 'Password must be at least 6 characters long.';
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const formFields: FormField[] = [
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email' },
    { label: 'Password', name: 'passWord', type: 'password', placeholder: 'Enter your password' },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
      height="100vh"
    >
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
            paddingX: {xs: '15px' ,sm: '20px', md: '30px', lg: '40px'},paddingY: {xs: '10px' ,sm: '20px', md: '30px', lg: '40px'}, borderRadius: "30px", width: "100%" }}>
             <Typography
          variant="h5"
          align="center"
          sx={{fontFamily: "var(--font-family)", fontWeight: "400", mb: 4, fontSize: {xs: 'var(--font-size-medium)', sm: 'var(--font-size-extramedium)', md: 'var(--font-size-large)'} }}
        >
          Login
        </Typography>
          {formFields.map((field, index) => (
            <Grid container key={index} alignItems="center" spacing={2} mb={2}>
              <Grid item xs={3}>
                <Typography
                  sx={{ fontWeight: "bold",fontSize: {xs: "12px", sm: '14px', md: '16px'}, fontFamily: "var(--font-family)" }}
                >
                  {field.label}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <StyledTextField
                  fullWidth
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          ))}
          <Box display={"flex"} justifyContent={"flex-end"}>
              <Typography component={Button} sx={{textTransform: "none"}}  fontFamily={"var(--font-family)"} fontSize={"13px"} textAlign={"right"} mr={1} color='#0B7ABF' fontWeight={700} onClick={handleOpen}>Forget your Password?</Typography>
          </Box>
          <Box textAlign="center" mt={2}>
        <Button
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              width: "200px",
              backgroundColor: "var(--secondary-color)",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              textTransform: "none",
              "&.Mui-disabled": {
                backgroundColor: "var(--secondary-color)",
                opacity: 0.7,
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#FFFFFF" }} /> : 'Login'}
          </Button>
        </Box>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={2} gap={0.5}>
          <Typography fontFamily={"var(--font-family)"} fontSize={"14px"} color='#ffffff' fontWeight={500}>Don't have an Account?</Typography>
          <Typography component={Button} sx={{textTransform: 'none', m:0, p:0}} fontFamily={"var(--font-family)"} fontSize={"17px"} color='var(--secondary-color)' fontWeight={500} onClick={()=>navigate('/register')}>Register</Typography>
        </Box>
        </Box>
        

        
      </Box>
      <PasswordRequestModal open={open} handleClose={handleClose}/>
    </Box>
  );
};

export default Login;