import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestCancelButton from '../../components/RequestCancelButton'; // Import dynamic button

interface FormField {
  label: string;
  type: string;
  name: keyof FormData;
  placeholder: string;
}

interface FormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const validateInput = (name: keyof FormData, value: string) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'newPassword':
        if (value.length < 6) {
          error = 'Password must be at least 6 characters';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.newPassword) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name as keyof FormData, value);
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.newPassword || !formData.confirmPassword) {
      alert('Please fill out all fields');
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      alert('Please fix the errors before submitting');
      return;
    }

    alert('Password reset successfully!');
    navigate('/'); // Redirect to login page
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to login page
  };

  const formFields: FormField[] = [
    { label: 'Email', name: 'email', type: 'text', placeholder: 'Enter your email' },
    { label: 'New Password', name: 'newPassword', type: 'password', placeholder: 'Enter new password' },
    { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Confirm new password' },
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box
        sx={{
          padding: { xs: '20px', sm: '30px', md: '40px' },
          borderRadius: '10px',
          width: { xs: '95%', sm: '480px', md: '500px' },
          backgroundColor: 'var(--ternary-color)',
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 'bold',
            fontFamily: 'var(--font-family)',
            mb: 3,
            fontSize: { xs: 'var(--font-size-medium)', sm: 'var(--font-size-large)' },
          }}
        >
          Reset Password
        </Typography>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {formFields.map((field, index) => (
            <Grid container key={index} alignItems="center" spacing={2}>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '10px', sm: '12px', md: '12px' },
                    fontFamily: 'var(--font-family)',
                  }}
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
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: 'none' },
                    },
                    '& .MuiInputBase-root': { height: '42px' },
                    '& .MuiOutlinedInput-input': { padding: '10px 10px' },
                    '& input::placeholder': {
                      fontSize: { xs: '12px', sm: '14px' },
                      color: 'black',
                      fontFamily: 'var(--font-family)',
                    },
                  }}
                />
              </Grid>
            </Grid>
          ))}

          {/* Using the dynamic button component */}
          <RequestCancelButton
            primaryText="Reset Password"
            secondaryText="Cancel"
            handlePrimaryAction={handleSubmit}
            handleSecondaryAction={handleCancel}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;

