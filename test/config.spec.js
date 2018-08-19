'use strict';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

var OF = require('../src/OF.js');

describe('config', function() {
  before(function(){
    this.OF = new OF();
  });
  afterEach(function(){
    fetchMock.restore();
  });

  // TODO: currently no create/update via JS Client

  describe('fetch', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/config';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.config.fetch()
        .then(config => {
          done();
        });
    });
  });
});
