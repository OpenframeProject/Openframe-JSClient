module.exports = channels;
const modelPrefix = 'channels';

function channels(fetchJSON, config) {
  return {
    /**
     * Fetch a list of channels.
     * @param  {Object} filter
     * @return {Promise}
     */
    fetch: function(filter) {
      filter = filter || {};
      let defaultFilter = {
        include: ['owner']
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}`, { data: finalFilter });
    },

    /**
     * Fetch a single channel by ID
     * @param  {String}  channelId
     * @param  {Object} filter
     * @return {Promise}
     */
    fetchById: function(channelId, filter) {
      filter = filter || {};
      let defaultFilter = {
        include: ['owner']
      };
      let finalFilter = Object.assign({}, defaultFilter, filter);
      return fetchJSON(`${modelPrefix}/${channelId}`, { data: finalFilter });
    }

  };
}
