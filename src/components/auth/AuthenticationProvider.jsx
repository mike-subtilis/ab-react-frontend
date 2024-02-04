import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';
import { Auth0AuthenticationProvider, useAuth0Authentication } from './Auth0AuthenticationProvider.jsx';
import { UserProvider } from './UserProvider.jsx';
import Spinner from '../common/Spinner.jsx';

const defaultContext = { isAuthenticated: false, isLoading: false, error: null, user: null };
const AuthenticationContext = createContext(defaultContext);

export const useAuthentication = () => {
  const authenticationContext = useContext(AuthenticationContext);

  if (authenticationContext) { return authenticationContext; }
  return defaultContext;
};

const InnerAuthenticationProvider = ({ children }) => {
  const auth0Auth = useAuth0Authentication();

  if (auth0Auth.error) {
    return <div>Oops... {auth0Auth.error.message}</div>;
  }

  if (auth0Auth.isLoading) {
    return <Spinner />;
  }

  return <AuthenticationContext.Provider value={auth0Auth}>
    <UserProvider isAuthenticated={auth0Auth.isAuthenticated}>
      {children}
    </UserProvider>
  </AuthenticationContext.Provider>;
};

InnerAuthenticationProvider.propTypes = { children: PropTypes.any };

const AuthenticationProvider = ({ children }) => {
  return <Auth0AuthenticationProvider>
    <InnerAuthenticationProvider>
      {children}
    </InnerAuthenticationProvider>
  </Auth0AuthenticationProvider>;
};

AuthenticationProvider.propTypes = { children: PropTypes.any };

export default AuthenticationProvider;
