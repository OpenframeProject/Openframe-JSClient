'use strict';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

var OF = require('../src/OF.js');

describe('artwork', function() {
  before(function(){
    this.OF = new OF();
  });
  afterEach(function(){
    fetchMock.restore();
  });

  describe('create', function() {
    before(function() {
      this.endpoint = 'https://api.openframe.io/v0/users/current/created_artwork';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.post(this.endpoint, this.successResponse);
      this.OF.artwork.create({'title': 'test'})
        .then(artwork => {
          done();
        });
    });
  });

  describe('fetch', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/artwork';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.artwork.fetch()
        .then(artwork => {
          done();
        });
    });
  });

  describe('fetchStream', function() {
    before(function() {
      let filter = JSON.stringify({ limit: 100, where: { is_public: true } });
      this.endpoint = `begin:https://api.openframe.io/v0/artwork?filter=${filter}`;
      console.log('endpoint', this.endpoint);
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.artwork.fetchStream()
        .then(artwork => {
          done();
        });
    });
  });

  describe('fetchById', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/artwork/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.artwork.fetchById(123)
        .then(artwork => {
          done();
        });
    });
  });

  describe('update', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/artwork/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.patch(this.endpoint, this.successResponse);
      this.OF.artwork.update(123)
        .then(artwork => {
          done();
        });
    });
  });

  describe('delete', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/artwork/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.delete(this.endpoint, this.successResponse);
      this.OF.artwork.delete(123)
        .then(artwork => {
          done();
        });
    });
  });

});
