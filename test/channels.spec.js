'use strict';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

var OF = require('../src/OF.js');

describe('channels', function() {
  before(function(){
    this.OF = new OF();
  });
  afterEach(function(){
    fetchMock.restore();
  });

  // TODO: currently no create/update via JS Client

  describe('fetch', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/channels';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.channels.fetch()
        .then(channels => {
          done();
        });
    });
  });

  describe('fetchById', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/channels/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.channels.fetchById(123)
        .then(channel => {
          done();
        });
    });
  });

});
