const Config = {
  version: '0.02',
  polling_ms: 2000,
  env: process?.env.REACT_APP_ENV || window.env.REACT_APP_ENV,
  url: process?.env.REACT_APP_API || window.env.REACT_APP_API,
  auth0Domain: process?.env.REACT_APP_AUTH0_DOMAIN || window.env.REACT_APP_AUTH0_DOMAIN,
  auth0ClientId: process?.env.REACT_APP_AUTH0_CLIENT_ID || window.env.REACT_APP_AUTH0_CLIENT_ID,
  auth0Audience: process?.env.REACT_APP_AUTH0_AUDIENCE || window.env.REACT_APP_AUTH0_AUDIENCE,
  auctionTimeInSeconds: 172800,
  unixBirth: new Date(1970, 0, 1),
  ipfsGateway: 'https://freeverse.mypinata.cloud/ipfs/',
};

export default Config;
