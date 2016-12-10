export const getToken = function() {
  try {
    return localStorage.getItem('accessToken') || null;
  } catch(e) {
    return null;
  }
};

export const setToken = function(token) {
  try {
    localStorage.setItem('accessToken', token);
  } catch(e) {
    return null;
  }
};

export const clearToken = function() {
  try {
    localStorage.removeItem('accessToken');
  } catch(e) {
    return null;
  }
};