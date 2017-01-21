'use strict';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

var OF = require('../src/OF.js');

describe('frames', function() {
  before(function(){
    this.OF = new OF();
  });
  afterEach(function(){
    fetchMock.restore();
  });

  /**
   * Currently don't allow CREATE via JS Client
   */
  /*
  describe('create', function() {
    before(function() {
      this.endpoint = 'https://api.openframe.io/api/frames';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.post(this.endpoint, this.successResponse);
      this.OF.frames.create({'name': 'test'})
        .then(frame => {
          done();
        });
    });
  });
  */

  describe('fetch', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/frames';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.frames.fetch()
        .then(frame => {
          done();
        });
    });
  });

  describe('fetchById', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/frames/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.frames.fetchById(123)
        .then(frame => {
          done();
        });
    });
  });

  describe('update', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/frames/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.patch(this.endpoint, this.successResponse);
      this.OF.frames.update(123)
        .then(frame => {
          done();
        });
    });
  });

  describe('updateCurrentArtwork', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/frames/123/current_artwork/456';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.put(this.endpoint, this.successResponse);
      this.OF.frames.updateCurrentArtwork(123, 456)
        .then(frame => {
          done();
        });
    });
  });

  describe('updateFrameManagers', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/frames/123/managers/by_username';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.put(this.endpoint, this.successResponse);
      this.OF.frames.updateFrameManagers(123, ['jonny'])
        .then(frame => {
          done();
        });
    });
  });

  describe('delete', function() {
    before(function() {
      this.endpoint = '^https://api.openframe.io/api/frames/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.delete(this.endpoint, this.successResponse);
      this.OF.frames.delete(123)
        .then(() => {
          done();
        });
    });
  });


});
