import { useEffect, useState } from 'react';
import { useAuthentication } from '../components/auth/AuthenticationProvider.jsx';
import getConfig from '../config';

const useApiConnection = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [hasPending, setHasPending] = useState(false);
  useEffect(() => { setHasPending(pendingCount > 0); }, [pendingCount]);

  const { apiOrigin = 'http://localhost:3001' } = getConfig();

  const { getAccessTokenSilently, isAuthenticated } = useAuthentication();

  const apiMethod = async (method, url, data) => {
    try {
      setPendingCount(c => c + 1);

      let maybeBearerToken = {};
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        maybeBearerToken = { Authorization: `Bearer ${token}` };
      }

      const apiPrefix = isAuthenticated ? '/api' : '/api/public';
      const maybeDataHeader = data ? { 'Content-Type': 'application/json;charset=UTF-8' } : {};
      const maybeData = data ? { body: JSON.stringify(data) } : {};
      const response = await fetch(`${apiOrigin}${apiPrefix}${url}`, {
        method,
        headers: {
          ...maybeBearerToken,
          ...maybeDataHeader,
        },
        ...maybeData,
      });
      const responseData = await response.json();

      setPendingCount(c => (c > 0 ? c - 1 : 0));
      return responseData;
    } catch (error) {
      setPendingCount(c => (c > 0 ? c - 1 : 0));
      throw error;
    }
  };

  const apiGet = url => apiMethod('GET', url);
  const apiPost = (url, data) => apiMethod('POST', url, data);
  const apiPut = (url, data) => apiMethod('PUT', url, data);
  const apiDelete = url => apiMethod('DELETE', url);

  return {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    hasPending,
  };
};

export default useApiConnection;
