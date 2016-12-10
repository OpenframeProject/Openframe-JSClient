'use strict';

import _fetchJSON from '../src/fetchJSON';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

describe('fetchJSON', function() {
  before(function() {
    this.endpoint = '*';
    const opts = {
      api_base: 'https://api.openframe.io/api/'
    };
    this.fetchJSON = _fetchJSON(opts);
  });
  after(function(){
    fetchMock.restore();
  });
  it('rejects with error message on error status', function(done) {
    fetchMock.get(this.endpoint, { status: 400, body: {error: {message: 'There has been an error'}}});
    this.fetchJSON('https://api.openframe.io/api/users/config')
      .catch(error => {
        assert.equal(error.message, 'There has been an error');
        done();
      });
  });
});