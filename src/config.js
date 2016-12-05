import fetchJSON from './fetchJSON';

// This may eventually be moved out of /users
const modelPrefix = 'users/config';

const config = {
  /**
   * Fetch the server config
   * @return {Promise}
   */
  fetch: function() {
    return fetchJSON(`${modelPrefix}`);
  }

};

export default config;
