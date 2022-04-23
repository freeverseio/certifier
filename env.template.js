(function (window) {
  window.env = window.env || {};
  window.env.REACT_APP_ENV = `${REACT_APP_ENV}`;
  window.env.REACT_APP_API = `${REACT_APP_API}`;
  window.env.REACT_APP_CONTRACT = `${REACT_APP_CONTRACT}`;
}(this));
const process = window;
