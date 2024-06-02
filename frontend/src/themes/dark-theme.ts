import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#FFC400',
    },
    background: {
      default: '#212121',
    },
    text: {
      primary: '#fff',
      secondary: '#ccc',
    },
  },
});

export default darkTheme;
