import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { getConfig } from '../config';

export const useAuthenticatedApiConnection = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [hasPending, setHasPending] = useState(false);
  useEffect(() => { setHasPending(pendingCount > 0); }, [pendingCount]);

  const { apiOrigin = 'http://localhost:3001' } = getConfig();

  const { getAccessTokenSilently } = useAuth0();

  const apiMethod = async (method, url, data) => {
    try {
      setPendingCount(c => c + 1);

      const token = await getAccessTokenSilently();

      const maybeData = data ? { body: JSON.stringify(data) } : {};
      const response = await fetch(`${apiOrigin}${url}`, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
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

  const apiGet = (url) => apiMethod('GET', url);
  const apiPost = (url, data) => apiMethod('POST', url, data);
  const apiPut = (url, data) => apiMethod('PUT', url, data);
  const apiDelete = (url) => apiMethod('DELETE', url);

  return {
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    hasPending,
  };
};
