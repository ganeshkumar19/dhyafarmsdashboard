import React from 'react'
import { Box, FormControl, MenuItem, Select } from '@mui/material'


interface FarmSelectProps {
    selectedFarm: string;
    setSelectedFarm: (value: string) => void;
    data: { farmId: string; farmName: string }[];
  }
  

const FarmSelect: React.FC<FarmSelectProps>= ({ selectedFarm, setSelectedFarm, data }) => {
  return (
    <Box display='flex' justifyContent='flex-end' mb={3}>
    <FormControl sx={{ minWidth: 150, 
        '& .MuiOutlinedInput-root': {
        '& fieldset': { border: "none" },
        '&:hover fieldset': { border: "none" },
        '&.Mui-focused fieldset': { border: "none" },
    } }} variant="outlined" >
    <Select
    displayEmpty
    value={selectedFarm}
    onChange={(e) => setSelectedFarm(e.target.value)}
    sx={{
        border: '2px solid var(--secondary-color)',
        '& .MuiSelect-select': {
          fontFamily: 'var(--font-family)',
          color: 'var(--secondary-color)',
          fontSize: '16px', // Change text color if needed
          fontWeight: 'bold', // Example: making text bold
        },
        '& .MuiSelect-icon': {
            color: 'var(--secondary-color)',  // Change color
            fontSize: '1.6rem',                // Make it bigger
            transition: 'transform 0.3s',    // Smooth rotation
            },
            '&.Mui-expanded .MuiSelect-icon': {
            transform: 'rotate(180deg)',     // Rotate when open
            }
      }}
    >
    <MenuItem value="all" disabled>Select Farm</MenuItem>
    {data.map((farm: any) => (
    <MenuItem key={farm.farmId} value={farm.farmId} sx={{fontFamily: 'var(--font-family)'}}>{farm.farmName}</MenuItem>
    ))}
     <MenuItem value="all" sx={{fontFamily: 'var(--font-family)'}}>All farms</MenuItem>
</Select>
    </FormControl>
</Box>
  )
}

export default FarmSelect