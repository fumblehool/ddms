import Cookies from 'js-cookie';
import assign from 'object-assign';
// import ApiConstants from '../constants/ApiConstants';


export const setCookie = (name, value) => {
  return Cookies.set(name, value);
};

export const removeCookie = (name, options = {}) => {
  return Cookies.remove(name, options);
};


export const getCookie = (name) => {
    if (!document.cookie) {
      return null;
    }
    const token = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));

    if (token.length === 0) {
      return null;
    }
    return decodeURIComponent(token[0].split('=')[1]);
}