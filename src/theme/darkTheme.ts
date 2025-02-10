import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Light blue
    },
    secondary: {
      main: '#b2b2b2', // Pink
    },
    background: {
      default: '#212121', // Dark background
      paper: '#313131', // Slightly lighter for surfaces
    },
    action: {
      hover: '#444', // Darker hover color
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#b0bec5', // Grey text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none', // Avoid uppercase for buttons by default
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
        },
      },
    },
  },
});

export default darkTheme;
