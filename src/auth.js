const inMemStorage = {};

export const getToken = function() {
  try {
    return localStorage.getItem('accessToken') || null;
  } catch(e) {
    return inMemStorage.accessToken || null;
  }
};

export const setToken = function(token) {
  try {
    localStorage.setItem('accessToken', token);
  } catch(e) {
    inMemStorage.accessToken = token;
    return token;
  }
};

export const clearToken = function() {
  try {
    localStorage.removeItem('accessToken');
  } catch(e) {
    delete inMemStorage.token;
    return null;
  }
};