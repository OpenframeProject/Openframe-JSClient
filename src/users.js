import {setToken, clearToken} from './auth';

module.exports = users;
const modelPrefix = 'users';

function users(fetchJSON, config) {
  return {

    /**
     * Create
     * @param  {Object} data
     * @return {Promise}
     */
    create: function(data) {
      return fetchJSON(`${modelPrefix}`, { method: 'POST', data: data });
    },

    /**
     * Login
     * @param  {Object} credentials {username, password}
     * @return {Promise}
     */
    login: function(credentials) {
      return fetchJSON(`${modelPrefix}/login`, { method: 'POST', data: credentials })
        .then((token) => {
          setToken(token.id);
          return token;
        });
    },

    /**
     * Logout
     * @return {Promise}
     */
    logout: function() {
      return fetchJSON(`${modelPrefix}/logout`, { method: 'POST' }).then(() => {
        clearToken();
      });
    },

    /**
     * Fetch a list of users.
     * @param  {Boolean}
     * @return {Promise}
     */
    fetch: function(filter) {
      filter = filter || {};
      let defaultFilter = {};
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}`, { data: finalFilter });
    },

    /**
     * Fetch a single user by ID
     * @param  {String}  userId defaults to 'current'
     * @return {Promise}
     */
    fetchById: function(userId, filter, access_token) {
      userId = userId || 'current';
      filter = filter || {};
      let defaultFilter = {};
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}/${userId}`, { data: finalFilter, access_token });
    },

    /**
     * Fetch a single user by username
     * @param  {String} username
     * @return {Promise}
     */
    fetchByUsername: function(username, filter) {
      filter = filter || {};
      let defaultFilter = {
        where: {
          username: username
        },
        limit: 1
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return this.fetch(finalFilter);
    },

    searchByUsername: function(input) {
      let filter = {
        where: {
          username: {
            like: input
          }
        },
        limit: 10
      };
      return this.fetch(filter);
    },

    /**
     * Fetch a single user's owned artwork by user id
     *
     * @param  {String} userId
     * @return {Promise}
     */
    fetchUserArtwork: function(userId, filter) {
      userId = userId || 'current';
      filter = filter || {};
      let defaultFilter = {
        limit: 100
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}/${userId}/created_artwork`, { data: finalFilter });
    },

    /**
     * Fetch a single user's liked artwork by user id
     *
     * @param  {String} userId
     * @return {Promise}
     */
    fetchUserLikedArtwork: function(userId, filter) {
      userId = userId || 'current';
      filter = filter || {};
      let defaultFilter = {
        // limit: config.perPage
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}/${userId}/liked_artwork`, { data: finalFilter });
    },

    /**
     * Fetch a list of all owned and managed frames
     * @param  {String} userId
     * @return {Promise}
     */
    fetchAllFrames: function(userId) {
      userId = userId || 'current';
      return fetchJSON(`${modelPrefix}/${userId}/all_frames`);
    },

    /**
     * Fetch a collection
     * @param  {String} collectionId Collection id (optional, defaults to primary collection)
     */
    /* FOR FUTURE RELEASE
    fetchCollection: function(userId = 'current', collectionId = 'primary') {
      let filter = {
        'filter': {
          'include': [
            'artwork'
          ]
        }
      };
      return fetchJSON(`${modelPrefix}/${userId}/collections/${collectionId}`, { data: filter });
    },
    */

    /**
     * Update a user
     * @param  {String} userId
     * @param  {Object} userData
     * @return {Promise}
     */
    update: function(userId, userData, access_token) {
      userId = userId || 'current';
      return fetchJSON(`${modelPrefix}/${userId}`, { method: 'PATCH', data: userData, access_token });
    },

    /**
     * Delete a userframe
     * @param  {String} userId
     * @return {Promise}
     */
    delete: function(userId) {
      return fetchJSON(`${modelPrefix}/${userId}`, { method: 'DELETE' });
    },

    likeArtwork: function(artworkId, userId) {
      userId = userId || 'current';
      return fetchJSON(`${modelPrefix}/${userId}/liked_artwork/rel/${artworkId}`, { method: 'PUT'});
    },

    unlikeArtwork: function(artworkId, userId) {
      userId = userId || 'current';
      return fetchJSON(`${modelPrefix}/${userId}/liked_artwork/rel/${artworkId}`, { method: 'DELETE'});
    },

    removeFromFrame: function(frameId, userId) {
      userId = userId || 'current';
      return fetchJSON(`${modelPrefix}/${userId}/managed_frames/rel/${frameId}`, { method: 'DELETE'});
    },

    passwordReset: function(email) {
      return fetchJSON(`${modelPrefix}/reset`, { method: 'POST', data: { email }});
    }
  };

}