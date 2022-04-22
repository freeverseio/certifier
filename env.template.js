(function (window) {
  window.env = window.env || {};
  window.env.REACT_APP_ENV = `${REACT_APP_ENV}`;
  window.env.REACT_APP_API = `${REACT_APP_API}`;
}(this));
const process = window;
