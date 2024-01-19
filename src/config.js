export function getConfig() {
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
  return {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENTID,
    ...(audience ? { audience } : null),
    apiOrigin: process.env.REACT_APP_API_ORIGIN,
  };
}
