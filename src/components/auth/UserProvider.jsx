import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import useApiConnection from '../../utils/apiConnection';

const UserContext = createContext({ user: null, requestRefresh: () => {} });

export const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export const UserProvider = ({ isAuthenticated, children }) => {
  const { apiGet } = useApiConnection();
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [requestRefreshState, requestRefresh] = useReducer(x => x + 1, 0);

  useEffect(() => {
    if (isAuthenticated) {
      setIsRefreshing(true);
      apiGet('/users/me')
        .then((myUserData) => {
          setUser(myUserData);
          setIsRefreshing(false);
        })
        .catch(ex => { console.error(ex); });
    }
  }, [isAuthenticated, requestRefreshState]); // eslint-disable-line react-hooks/exhaustive-deps

  return <UserContext.Provider value={{ user, requestRefresh, isRefreshing }}>
    {children}
  </UserContext.Provider>;
};

UserProvider.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.any,
};
