import { JSX } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from './themes/dark-theme';
import PageLayout from './components/PageLayout';

const App = (): JSX.Element => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <PageLayout />
  </ThemeProvider>
);

export default App;
