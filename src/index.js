import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { getConfig } from './config';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const root = createRoot(document.getElementById('root'));
root.render(<ErrorBoundary>
  <Auth0Provider
    {...providerConfig}
  >
    <App />
  </Auth0Provider>
</ErrorBoundary>);
