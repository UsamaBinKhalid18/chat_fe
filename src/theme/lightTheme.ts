import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradient?: string;
    dark?: string;
  }

  interface PaletteOptions {
    gradient?: string;
    dark?: string;
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#171717',
      light: '#ffffff',
      dark: '#000000',
      contrastText: '#eaeaea',
    },
    secondary: {
      main: '#616161',
    },
    background: {
      default: '#ffffff', // Light background
      paper: '#f5f5f5', // Slightly darker for surfaces
    },
    action: {
      hover: '#e0e0e0', // Light grey for hover
      selected: '#616161',
    },
    gradient: 'linear-gradient(to right , #e0eaf5 0%, #f5ebe0 100%)',
    dark: '#101010',
    text: {
      primary: '#000000', // Black text
      secondary: '#616161', // Grey text
      disabled: '#8a8a8a', // Light grey for disabled text
    },
  },
  typography: {
    fontFamily: '"DM sans", "Helvetica", "Arial", sans-serif',
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
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff', // Light background for menus
          border: '1px solid #e0e0e0',
          boxShadow: 'none',
          borderRadius: '16px',
        },
      },
    },
  },
});

export default lightTheme;
