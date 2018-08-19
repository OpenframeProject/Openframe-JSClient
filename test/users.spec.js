'use strict';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

import OF from '../src/OF.js';

describe('users', function() {
  before(function(){
    this.OF = new OF();
  });
  afterEach(function(){
    fetchMock.restore();
  });

  describe('login', function() {
    before(function() {
      this.endpoint = 'https://api.openframe.io/v0/users/login';
      this.successResponse = {
        'id': 'wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn',
        'ttl': 1209600,
        'created': '2016-12-05T03:45:55.936Z',
        'userId': '56c47fba45e503657a51bebc'
      };
    });
    afterEach(function(){
      fetchMock.restore();
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.post(this.endpoint, this.successResponse);
      this.OF.users.login({'username': 'test', 'password': 'test'})
        .then(token => {
          assert.equal(token.id, 'wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn');
          done();
        });
    });

    it('sets token in localStorage on success', function(done) {
      fetchMock.post(this.endpoint, this.successResponse);
      this.OF.users.login({'username': 'test', 'password': 'test'})
        .then(() => {
          assert.equal(localStorage.getItem('accessToken'), 'wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn');
          done();
        });
    });

    it('rejects on 401 unauthorized status', function(done) {
      fetchMock.post(this.endpoint, { status: 401 });
      this.OF.users.login({'username': 'test', 'password': 'test'})
        .catch(() => {
          done();
        });
    });
  });

  describe('logout', function() {
    before(function() {
      this.endpoint = 'https://api.openframe.io/v0/users/logout';
      this.successResponse = {};
      localStorage.setItem('accessToken', 'wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn');
    });
    it('constucts the correct URL and clears the accessToken', function(done) {
      fetchMock.post(this.endpoint, this.successResponse);
      this.OF.users.logout()
        .then(() => {
          assert.equal(localStorage.getItem('accessToken'), null);
          done();
        });
    });
  });

  describe('create', function() {
    before(function() {
      this.endpoint = 'https://api.openframe.io/v0/users';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.post(this.endpoint, this.successResponse);
      this.OF.users.create({'username': 'test', 'password': 'test'})
        .then(user => {
          done();
        });
    });
  });

  describe('fetch', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetch()
        .then(users => {
          done();
        });
    });
  });

  describe('fetchById', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchById(123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current';
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchById()
        .then(user => {
          done();
        });
    });
  });

  describe('fetchByUsername', function() {
    before(function() {
      let filter = JSON.stringify({ where: { username: 'test' }, limit: 1 });
      this.endpoint = `begin:https://api.openframe.io/v0/users?filter=${filter}`;
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchByUsername('test')
        .then(user => {
          done();
        });
    });
  });

  describe('searchByUsername', function() {
    before(function() {
      let filter = JSON.stringify({
          where: {
            username: {
              like: 'test'
            }
          },
          limit: 10
        });
      this.endpoint = `begin:https://api.openframe.io/v0/users?filter=${filter}`;
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.searchByUsername('test')
        .then(user => {
          done();
        });
    });
  });

  describe('fetchUserArtwork', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123/created_artwork';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchUserArtwork(123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current/created_artwork';
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchUserArtwork()
        .then(user => {
          done();
        });
    });
  });

  describe('fetchUserLikedArtwork', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123/liked_artwork';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchUserLikedArtwork(123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current/liked_artwork';
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchUserLikedArtwork()
        .then(user => {
          done();
        });
    });
  });

  describe('fetchAllFrames', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123/all_frames';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchAllFrames(123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current/all_frames';
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchAllFrames()
        .then(user => {
          done();
        });
    });
  });

  describe('fetchAllFrames', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123/all_frames';
      this.successResponse = [];
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchAllFrames(123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current/all_frames';
      fetchMock.get(this.endpoint, this.successResponse);
      this.OF.users.fetchAllFrames()
        .then(user => {
          done();
        });
    });
  });

  describe('update', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.patch(this.endpoint, this.successResponse);
      this.OF.users.update(123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current';
      fetchMock.patch(this.endpoint, this.successResponse);
      this.OF.users.update()
        .then(user => {
          done();
        });
    });
  });

  describe('delete', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.delete(this.endpoint, this.successResponse);
      this.OF.users.delete(123)
        .then(user => {
          done();
        });
    });
  });

  describe('likeArtwork', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123/liked_artwork/rel/456';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.put(this.endpoint, this.successResponse);
      this.OF.users.likeArtwork(456, 123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current/liked_artwork/rel/456';
      fetchMock.put(this.endpoint, this.successResponse);
      this.OF.users.likeArtwork(456)
        .then(user => {
          done();
        });
    });
  });

  describe('unlikeArtwork', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123/liked_artwork/rel/456';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.delete(this.endpoint, this.successResponse);
      this.OF.users.unlikeArtwork(456, 123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current/liked_artwork/rel/456';
      fetchMock.delete(this.endpoint, this.successResponse);
      this.OF.users.unlikeArtwork(456)
        .then(user => {
          done();
        });
    });
  });

  describe('removeFromFrame', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/123/managed_frames/rel/456';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.delete(this.endpoint, this.successResponse);
      this.OF.users.removeFromFrame(456, 123)
        .then(user => {
          done();
        });
    });
    it('defaults to the current user', function(done) {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/current/managed_frames/rel/456';
      fetchMock.delete(this.endpoint, this.successResponse);
      this.OF.users.removeFromFrame(456)
        .then(user => {
          done();
        });
    });
  });

  describe('passwordReset', function() {
    before(function() {
      this.endpoint = 'begin:https://api.openframe.io/v0/users/reset';
      this.successResponse = {};
    });
    it('constructs the correct endpoint', function(done) {
      fetchMock.post(this.endpoint, this.successResponse);
      this.OF.users.passwordReset('test@test.com')
        .then(user => {
          done();
        });
    });
  });

});
