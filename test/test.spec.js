'use strict';

var assert = require('assert');
var fetchMock = require('fetch-mock');
require('mock-local-storage');

var OF = require('../src/api.js');
var VERSION = require('../package.json').version;


describe('OF', function() {

  describe('Constructor', function() {
    var defaults = {};
    before(function() {
      defaults = {
        api_base: 'https://api.openframe.io/api/'
      };
    });

    it('create new instance', function() {
      var client = new OF();
      assert(client instanceof OF);
    });

    it('has default options', function() {
      var client = new OF();
      assert.deepEqual(
        Object.keys(defaults),
        Object.keys(client.options)
      );
    });

    it('accepts and overrides options', function() {
      var options = {
        api_base: 'XXXXX',
        power: 100
      };

      var client = new OF(options);

      assert(client.options.hasOwnProperty('power'));
      assert.equal(client.options.power, options.power);

      assert.equal(client.options.api_base, options.api_base);
    });

  });

  describe('users', function() {
    before(function(){
      this.OF = new OF();
    });
    afterEach(function(){
      fetchMock.restore();
    });

    describe('login', function() {
      before(function() {
        this.endpoint = 'https://api.openframe.io/api/users/login';
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

    describe('create', function() {
      before(function() {
        this.endpoint = 'https://api.openframe.io/api/users';
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
        this.endpoint = '^https://api.openframe.io/api/users';
        this.successResponse = [];
      });
      it('constructs the correct endpoint', function(done) {
        fetchMock.get(this.endpoint, this.successResponse);
        this.OF.users.fetch()
          .then(user => {
            done();
          });
      });
    });
  });

});