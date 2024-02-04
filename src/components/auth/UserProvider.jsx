import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import useApiConnection from '../../utils/apiConnection';

const UserContext = createContext({ user: null });

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export const UserProvider = ({ isAuthenticated, children }) => {
  const { apiGet } = useApiConnection();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      apiGet('/users/me')
        .then((myUserData) => { setUser(myUserData); })
        .catch(ex => { console.error(ex); });
    }
  }, [isAuthenticated]); // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={{ user }}>
    {children}
  </UserContext.Provider>;
};

UserProvider.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.any,
};
