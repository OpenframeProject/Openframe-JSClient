import { getToken, setToken, clearToken } from '../src/auth';

var assert = require('assert');
require('mock-local-storage');

var auth = require('../src/auth.js');

describe('auth', function() {
  beforeEach(function() {
    this.ls = localStorage;
  });
  afterEach(function() {
    localStorage = this.ls;
  });
  describe('setToken', function() {
    it('sets the auth token in localStorage', function() {
      const token = 'wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn';
      setToken(token);
      assert.equal(localStorage.getItem('accessToken'), token);
    });

    it('does not error and returns null if localStorage not available', function() {
      localStorage = null;
      let token = setToken(token);
      assert.equal(token, null);
    });
  });

  describe('getToken', function() {
    it('gets the auth token in localStorage', function() {
      const token = 'wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn';
      localStorage.setItem('accessToken', token);
      assert.equal(getToken(), token);
    });

    it('does not error and returns null if localStorage not available', function() {
      localStorage = null;
      let token = getToken();
      assert.equal(token, null);
    });
  });

  describe('clearToken', function() {
    it('clears the auth token in localStorage', function() {
      const token = 'wtu2jsJYZTO8ZqjGokR1ejznxCw4Qd0hACFo50GXyx3eGcVNNroccDWHZHmHVXKn';
      localStorage.setItem('accessToken', token);
      clearToken();
      assert.equal(localStorage.getItem('accessToken'), null);
    });
    it('does not error and returns null if localStorage not available', function() {
      localStorage = null;
      let token = clearToken();
      assert.equal(token, null);
    });
  });
});
