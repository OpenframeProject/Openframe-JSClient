module.exports = artwork;
const modelPrefix = 'artwork';

function artwork(fetchJSON, config) {
  return {
    /**
     * Fetch a list of artwork.
     * @param  {Boolean}
     * @return {Promise}
     */
    fetch: function(filter) {
      filter = filter || {};
      let defaultFilter = {
        limit: 100
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}`, { data: finalFilter });
    },

    /**
     * Fetch a list of artwork.
     * @param  {Boolean}
     * @return {Promise}
     */
    fetchStream: function(filter) {
      filter = filter || {};
      let defaultFilter = {
        where: {
          is_public: true
        }
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return this.fetch(finalFilter);
    },

    /**
     * Fetch a single artwork by ID
     * @param  {String}  artworkId defaults to 'current'
     * @param  {Boolean} includeCollections
     * @return {Promise}
     */
    fetchById: function(artworkId, filter) {
      filter = filter || {};
      let defaultFilter = {
        include: ['owner']
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}/${artworkId}`, { data: finalFilter });
    },

    /**
     * Create a new Artwork
     * {
     *   "title": "string",
     *   "description": "string",
     *   "is_public": true,
     *   "url": "string",
     *   "thumb_url": "string",
     *   "author_name": "string",
     *   "plugins": {},
     *   "format": "string"
     * }
     * @param  {Object} artworkData An artwork description object
     */
    create: function(artworkData) {
      // TODO: for now we're only allowing artwork creation via current user REST relation
      // return fetchJSON(`${modelPrefix}`, { method: 'POST', data: artworkData });
      return fetchJSON('users/current/created_artwork', { method: 'POST', data: artworkData });
    },

    /**
     * Update a artwork
     * @param  {String} artworkId
     * @param  {Object} artworkData
     * @return {Promise}
     */
    update: function(artworkId, artworkData) {
      return fetchJSON(`${modelPrefix}/${artworkId}`, { method: 'PATCH', data: artworkData });
    },

    /**
     * Delete a artwork
     * @param  {String} artworkId
     * @return {Promise}
     */
    delete: function(artworkId) {
      return fetchJSON(`${modelPrefix}/${artworkId}`, { method: 'DELETE' });
    }
  };
}

