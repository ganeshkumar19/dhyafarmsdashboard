import { Box, Grid, TextField, Typography, MenuItem, Select, FormControl, Button, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'


interface FormData{
    username: string,
    password: string,
    role: string,
}



const AdminForm = () => {
   const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    role: '',
   })

   const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
}

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name as string]: value }));
    }

   const inputStyle = {
    backgroundColor: "white",
    fontFamily: 'var(--font-family)',
    borderRadius: "10px",
    '& .MuiOutlinedInput-root': {
        '& fieldset': { border: "none" },
        '&:hover fieldset': { border: "none" },
        '&.Mui-focused fieldset': { border: "none" },
    },
    '& .MuiInputBase-root': { height: "42px" },
    '& .MuiOutlinedInput-input': {
        padding: "10px 10px",
    },
    '& input::placeholder': {
        fontSize: { xs: "12px", sm: "14px", md: "16px", lg: '13px' },
        color: "black",
        fontFamily: "var(--font-family)",
    },
}

    return (
        
        <Box component="form" p={2} borderRadius={2} mt={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: { xs: '300px', sm: '400px', md: '480px', lg: '520px' }, backgroundColor: 'var(--primary-color)' }}>
             <Grid container spacing={2} alignItems="center">
                {['username', 'password'].map((field) => (
                    <React.Fragment key={field}>
                        <Grid item xs={4}>
                            <Typography variant='body1' fontFamily="var(--font-family)">{field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                fullWidth
                                type={field === 'password' ? 'password' : 'text'}
                                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                name={field}
                                value={formData[field as keyof FormData]}
                                onChange={handleChange}
                                variant="outlined"
                                sx={inputStyle}
                            />
                        </Grid>
                    </React.Fragment>
                ))}

                {/* Role Dropdown */}
                <Grid item xs={4}>
                    <Typography variant='body1' fontFamily="var(--font-family)">Role</Typography>
                </Grid>
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <Select
                            name="role"
                            value={formData.role}
                            onChange={handleSelectChange}
                            displayEmpty
                            sx={{
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                height: '42px',
                                '& .MuiSelect-select': {
                                    color: formData.role === '' ? 'gray' : 'black',
                                    fontFamily: 'var(--font-family)',
                                    fontSize: '14px'

                                }
                            }}
                        >
                            <MenuItem value="" disabled>Select Role</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} mt={3}>
            <Button
          variant="contained"
          color="secondary"
          sx={{
            px: 3,
            py: 1,
            borderRadius: '12px',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: 3,
            fontFamily: 'var(--font-family)'
          }}
        >
            Submit
            </Button>
            </Box>
        </Box>
    )
}


export default AdminForm
