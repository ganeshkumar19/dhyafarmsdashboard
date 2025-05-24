import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,  // Bootstrap's sm
      md: 768,  // Bootstrap's md
      lg: 992,  // Bootstrap's lg
      xl: 1200, // Bootstrap's xl
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },

});


export default theme;