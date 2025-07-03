import React from 'react';
import { ThemeProvider } from './components/theme/ThemeProvider';
import TrackingPage from './components/tracking/TrackingPage';

function App() {
  return (
    <ThemeProvider>
      <TrackingPage />
    </ThemeProvider>
  );
}

export default App;