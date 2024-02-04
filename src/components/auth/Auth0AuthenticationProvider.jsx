import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import React, { createContext, useContext } from 'react';

const defaultContext = { isAuthenticated: false, isLoading: false, error: null };
const Auth0AuthenticationContext = createContext(defaultContext);

export const useAuth0Authentication = () => {
  const authenticationContext = useContext(Auth0AuthenticationContext);

  if (authenticationContext) { return authenticationContext; }
  return defaultContext;
};

export const Auth0AuthenticationProvider = ({ children }) => {
  // TODO: do I really need all of these, or can I implement differently
  // in case I swap out Auth0
  const {
    getAccessTokenSilently,
    getAccessTokenWithPopup,
    isAuthenticated,
    isLoading,
    error,
    loginWithPopup,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const authParams = {
    getAccessTokenSilently, getAccessTokenWithPopup,
    isAuthenticated, isLoading, error,
    loginWithPopup, loginWithRedirect, logout,
  };

  return <Auth0AuthenticationContext.Provider
    value={authParams}>
    {children}
  </Auth0AuthenticationContext.Provider>;
};

Auth0AuthenticationProvider.propTypes = { children: PropTypes.any };
