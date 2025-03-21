const Config = {
  version: '0.02',
  polling_ms: 2000,
  env: process?.env.REACT_APP_ENV || window.env.REACT_APP_ENV,
  url: process?.env.REACT_APP_API || window.env.REACT_APP_API,
  contract: process?.env.REACT_APP_CONTRACT || window.env.REACT_APP_CONTRACT,
};

export default Config;
