'use strict';

var assert = require('assert');
require('mock-local-storage');

var OF = require('../src/OF.js');


describe('OF', function() {

  describe('constructor', function() {
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

});