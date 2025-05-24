import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import SetMealOutlinedIcon from '@mui/icons-material/SetMealOutlined';
import AdminForm from '../../components/AdminForm';

const AdminPage = () => {
   const [showAdminForm, setShowAdminForm] = useState<boolean>(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      height="100vh"
      bgcolor="#f4f6f8"
      p={3}
      sx={{mt: '60px'}}
    >
      <Typography variant="h4" mb={4} fontFamily={'var(--font-family)'}>
        Admin Dashboard
      </Typography>
      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => setShowAdminForm(true)}
          sx={{
            px: 4,
            py: 1.8,
            borderRadius: '12px',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: 3,
            fontFamily: 'var(--font-family)'
          }}
        >
          Create User
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<SetMealOutlinedIcon />}
          sx={{
            px: 4,
            py: 1.8,
            borderRadius: '12px',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: 3,
            fontFamily: 'var(--font-family)'
          }}
        >
          Create Farms
        </Button>
      </Box>
      {showAdminForm && <AdminForm />}
    </Box>
  )
}

export default AdminPage
