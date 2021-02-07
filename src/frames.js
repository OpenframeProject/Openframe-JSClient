module.exports = frames;
const modelPrefix = 'frames';


function frames(fetchJSON, config) {
  return {
    /**
     * Fetch a list of frames.
     * @param  {Object}
     * @return {Promise}
     */
    fetch: function(filter) {
      filter = filter || {};
      let defaultFilter = {
        include: 'current_artwork'
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}`, { data: finalFilter });
    },

    /**
     * Fetch a single frame by ID
     * @param  {String}  frameId defaults to 'current'
     * @param  {Object} filter
     * @return {Promise}
     */
    fetchById: function(frameId, filter) {
      filter = filter || {};
      let defaultFilter = {};
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}/${frameId}`, { data: finalFilter });
    },

    /**
     * Create a frame
     * @param  {Object} frameData
     * @return {Promise}
     */
    create: function(frameData) {
      return fetchJSON(`${modelPrefix}/${frameId}`, { method: 'POST', data: frameData });
    },

    /**
     * Update a frame
     * @param  {String} frameId
     * @param  {Object} frameData
     * @return {Promise}
     */
    update: function(frameId, frameData) {
      return fetchJSON(`${modelPrefix}/${frameId}`, { method: 'PATCH', data: frameData });
    },

    /**
     * Update the current artwork on a frame; effectively, push an artwork to a frame.
     * @param  {String} frameId
     * @param  {Object} artworkData An artwork description object
     * @return {Promise}
     */
    updateCurrentArtwork: function(frameId, artworkId) {
      return fetchJSON(`${modelPrefix}/${frameId}/current_artwork/${artworkId}`, { method: 'PUT' });
    },

    /**
     * Update list of managers by username
     * @param  {String} frameId
     * @param  {Array} managersData An array of usernames
     * @return {Promise}
     */
    updateFrameManagers: function (frameId, managersData) {
      return fetchJSON(`${modelPrefix}/${frameId}/managers/by_username`, { method: 'PUT', data: managersData });
    },

    /**
     * Delete a frame
     * @param  {String} frameId
     * @return {Promise}
     */
    delete: function(frameId) {
      return fetchJSON(`${modelPrefix}/${frameId}`, { method: 'DELETE' });
    }


  };
}