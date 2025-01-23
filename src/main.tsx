import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import darkTheme from './theme/darkTheme.ts';
import { persistStore } from 'redux-persist';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './config.ts';

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
