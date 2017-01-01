module.exports = collections;
const modelPrefix = 'collections';

function collections(fetchJSON, config) {
  return {
    /**
     * Fetch a list of frames.
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
     * Fetch a single collection by ID
     * @param  {String}  collectionId
     * @param  {Object} filter
     * @return {Promise}
     */
    fetchById: function(collectionId, filter) {
      filter = filter || {};
      let defaultFilter = {
        include: 'artwork'
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}/${collectionId}`, { data: finalFilter });
    }

  };
}
