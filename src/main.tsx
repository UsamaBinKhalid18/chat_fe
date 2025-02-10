import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import { GOOGLE_CLIENT_ID } from './config.ts';
import './index.css';
import { store } from './redux/store.ts';
import darkTheme from './theme/darkTheme.ts';

const persistor = persistStore(store);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
