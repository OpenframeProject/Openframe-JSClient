module.exports = config;

// This may eventually be moved out of /users
const modelPrefix = 'users/config';

function config(fetchJSON, config) {
  return {
    /**
     * Fetch the server config
     * @return {Promise}
     */
    fetch: function() {
      return fetchJSON(`${modelPrefix}`);
    }

  }
}
