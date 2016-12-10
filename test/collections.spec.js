'use strict';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

var OF = require('../src/OF.js');

describe('collections', function() {
  before(function(){
    this.OF = new OF();
  });
  afterEach(function(){
    fetchMock.restore();
  });

  // TODO: currently no create/update via JS Client

  describe('fetch', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/collections';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.collections.fetch()
        .then(collections => {
          done();
        });
    });
  });

  describe('fetchById', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/collections/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.collections.fetchById(123)
        .then(channel => {
          done();
        });
    });
  });

});
