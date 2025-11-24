import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { EventLogProvider } from './context/EventContext';
import Dashboard from './pages/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#020617',
      paper: 'rgba(15, 23, 42, 0.98)',
    },
  },
  typography: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
});

const App: React.FC = () => {
  return (
    <EventLogProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
    </EventLogProvider>
  );
};

export default App;
