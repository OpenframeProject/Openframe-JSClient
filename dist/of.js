module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _auth = __webpack_require__(1);

	var _auth2 = _interopRequireDefault(_auth);

	var _users2 = __webpack_require__(2);

	var _users3 = _interopRequireDefault(_users2);

	var _frames2 = __webpack_require__(3);

	var _frames3 = _interopRequireDefault(_frames2);

	var _artwork2 = __webpack_require__(4);

	var _artwork3 = _interopRequireDefault(_artwork2);

	var _collections2 = __webpack_require__(5);

	var _collections3 = _interopRequireDefault(_collections2);

	var _channels2 = __webpack_require__(6);

	var _channels3 = _interopRequireDefault(_channels2);

	var _fetchJSON2 = __webpack_require__(7);

	var _fetchJSON3 = _interopRequireDefault(_fetchJSON2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Package version
	var VERSION = __webpack_require__(9).version;

	var DEFAULT_OPTIONS = {
	  api_base: 'https://api.openframe.io/api/'
	};

	var OF = function () {
	  function OF() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, OF);

	    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

	    this.VERSION = VERSION;

	    this.fetchJSON = (0, _fetchJSON3.default)(this.options);

	    this.users = (0, _users3.default)(this.fetchJSON, this.options);
	    this.frames = (0, _frames3.default)(this.fetchJSON, this.options);
	    this.artwork = (0, _artwork3.default)(this.fetchJSON, this.options);
	    this.collections = (0, _collections3.default)(this.fetchJSON, this.options);
	    this.channels = (0, _channels3.default)(this.fetchJSON, this.options);
	  }

	  _createClass(OF, [{
	    key: 'accessToken',
	    value: function accessToken() {
	      return _auth2.default.getToken();
	    }
	  }]);

	  return OF;
	}();

	module.exports = OF;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getToken = exports.getToken = function getToken() {
	  try {
	    return localStorage.getItem('accessToken') || null;
	  } catch (e) {
	    return null;
	  }
	};

	var setToken = exports.setToken = function setToken(token) {
	  try {
	    localStorage.setItem('accessToken', token);
	  } catch (e) {
	    return null;
	  }
	};

	var clearToken = exports.clearToken = function clearToken() {
	  try {
	    localStorage.removeItem('accessToken');
	  } catch (e) {
	    // nada
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _auth = __webpack_require__(1);

	module.exports = users;
	var modelPrefix = 'users';

	function users(fetchJSON, config) {
	  return {

	    /**
	     * Create
	     * @param  {Object} data
	     * @return {Promise}
	     */
	    create: function create(data) {
	      return fetchJSON('' + modelPrefix, { method: 'POST', data: data });
	    },

	    /**
	     * Login
	     * @param  {Object} credentials {username, password}
	     * @return {Promise}
	     */
	    login: function login(credentials) {
	      return fetchJSON(modelPrefix + '/login', { method: 'POST', data: credentials }).then(function (token) {
	        (0, _auth.setToken)(token.id);
	        return token;
	      });
	    },

	    /**
	     * Fetch a list of users.
	     * @param  {Boolean}
	     * @return {Promise}
	     */
	    fetch: function fetch() {
	      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var defaultFilter = {};
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON('' + modelPrefix, { data: finalFilter });
	    },

	    /**
	     * Fetch a single user by ID
	     * @param  {String}  userId defaults to 'current'
	     * @return {Promise}
	     */
	    fetchById: function fetchById() {
	      var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var access_token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      var defaultFilter = {};
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON(modelPrefix + '/' + userId, { data: finalFilter, access_token: access_token });
	    },

	    /**
	     * Fetch a single user by username
	     * @param  {String} username
	     * @return {Promise}
	     */
	    fetchByUsername: function fetchByUsername(username) {
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var defaultFilter = {
	        where: {
	          username: username
	        },
	        limit: 1
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return this.fetch(finalFilter);
	    },

	    searchByUsername: function searchByUsername(input) {
	      var filter = {
	        where: {
	          username: {
	            like: input
	          }
	        },
	        limit: 10
	      };
	      return this.fetch(filter);
	    },

	    /**
	     * Fetch a single user's owned artwork by user id
	     *
	     * @param  {String} userId
	     * @return {Promise}
	     */
	    fetchUserArtwork: function fetchUserArtwork() {
	      var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var defaultFilter = {
	        limit: 100
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON(modelPrefix + '/' + userId + '/created_artwork', { data: finalFilter });
	    },

	    /**
	     * Fetch a single user's liked artwork by user id
	     *
	     * @param  {String} userId
	     * @return {Promise}
	     */
	    fetchUserLikedArtwork: function fetchUserLikedArtwork() {
	      var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var defaultFilter = {
	        // limit: config.perPage
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON(modelPrefix + '/' + userId + '/liked_artwork', { data: finalFilter });
	    },

	    /**
	     * Fetch a list of all owned and managed frames
	     * @param  {String} userId
	     * @return {Promise}
	     */
	    fetchAllFrames: function fetchAllFrames() {
	      var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';

	      return fetchJSON(modelPrefix + '/' + userId + '/all_frames');
	    },

	    /**
	     * Fetch a collection
	     * @param  {String} collectionId Collection id (optional, defaults to primary collection)
	     */
	    fetchCollection: function fetchCollection() {
	      var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
	      var collectionId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'primary';

	      var filter = {
	        'filter': {
	          'include': ['artwork']
	        }
	      };
	      return fetchJSON(modelPrefix + '/' + userId + '/collections/' + collectionId, { data: filter });
	    },

	    /**
	     * Update a user
	     * @param  {String} userId
	     * @param  {Object} userData
	     * @return {Promise}
	     */
	    update: function update() {
	      var userId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'current';
	      var userData = arguments[1];
	      var access_token = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	      return fetchJSON(modelPrefix + '/' + userId, { method: 'PUT', data: userData, access_token: access_token });
	    },

	    /**
	     * Delete a userframe
	     * @param  {String} userId
	     * @return {Promise}
	     */
	    delete: function _delete(userId) {
	      return fetchJSON(modelPrefix + '/' + userId, { method: 'DELETE' });
	    },

	    likeArtwork: function likeArtwork(artworkId) {
	      var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'current';

	      return fetchJSON(modelPrefix + '/' + userId + '/liked_artwork/rel/' + artworkId, { method: 'PUT' });
	    },

	    unlikeArtwork: function unlikeArtwork(artworkId) {
	      var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'current';

	      return fetchJSON(modelPrefix + '/' + userId + '/liked_artwork/rel/' + artworkId, { method: 'DELETE' });
	    },

	    removeFromFrame: function removeFromFrame(frameId) {
	      var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'current';

	      return fetchJSON(modelPrefix + '/' + userId + '/managed_frames/rel/' + frameId, { method: 'DELETE' });
	    },

	    passwordReset: function passwordReset(email) {
	      return fetchJSON(modelPrefix + '/reset', { method: 'POST', data: { email: email } });
	    }
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = frames;
	var modelPrefix = 'frames';

	function frames(fetchJSON, config) {
	  return {
	    /**
	     * Fetch a list of frames.
	     * @param  {Object}
	     * @return {Promise}
	     */
	    fetch: function fetch() {
	      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var defaultFilter = {
	        include: 'current_artwork'
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON('' + modelPrefix, { data: finalFilter });
	    },

	    /**
	     * Fetch a single frame by ID
	     * @param  {String}  frameId defaults to 'current'
	     * @param  {Object} filter
	     * @return {Promise}
	     */
	    fetchById: function fetchById(frameId) {
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var defaultFilter = {};
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON(modelPrefix + '/' + frameId, { data: finalFilter });
	    },

	    /**
	     * Update a frame
	     * @param  {String} frameId
	     * @param  {Object} frameData
	     * @return {Promise}
	     */
	    update: function update(frameId, frameData) {
	      return fetchJSON(modelPrefix + '/' + frameId, { method: 'PUT', data: frameData });
	    },

	    /**
	     * Update the current artwork on a frame; effectively, push an artwork to a frame.
	     * @param  {String} frameId
	     * @param  {Object} artworkData An artwork description object
	     * @return {Promise}
	     */
	    updateCurrentArtwork: function updateCurrentArtwork(frameId, artworkId) {
	      return fetchJSON(modelPrefix + '/' + frameId + '/current_artwork/' + artworkId, { method: 'PUT' });
	    },

	    /**
	     * Update list of managers by username
	     * @param  {String} frameId
	     * @param  {String} managersData
	     * @return {Promise}
	     */
	    updateFrameManagers: function updateFrameManagers(frameId, managersData) {
	      return fetchJSON(modelPrefix + '/' + frameId + '/managers/by_username', { method: 'PUT', data: managersData });
	    },

	    /**
	     * Delete a frame
	     * @param  {String} frameId
	     * @return {Promise}
	     */
	    delete: function _delete(frameId) {
	      return fetchJSON(modelPrefix + '/' + frameId, { method: 'DELETE' });
	    }

	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	module.exports = artwork;
	var modelPrefix = 'artwork';

	function artwork(fetchJSON, config) {
	  return {
	    /**
	     * Fetch a list of artwork.
	     * @param  {Boolean}
	     * @return {Promise}
	     */
	    fetch: function fetch() {
	      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var defaultFilter = {
	        limit: 100
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON('' + modelPrefix, { data: finalFilter });
	    },

	    /**
	     * Fetch a list of artwork.
	     * @param  {Boolean}
	     * @return {Promise}
	     */
	    fetchStream: function fetchStream() {
	      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var defaultFilter = {
	        where: {
	          is_public: true
	        }
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return this.fetch(finalFilter);
	    },

	    /**
	     * Fetch a single artwork by ID
	     * @param  {String}  artworkId defaults to 'current'
	     * @param  {Boolean} includeCollections
	     * @return {Promise}
	     */
	    fetchById: function fetchById(artworkId) {
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var defaultFilter = {
	        include: ['owner']
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON(modelPrefix + '/' + artworkId, { data: finalFilter });
	    },

	    /**
	     * Create a new Artwork
	     * {
	     *   "title": "string",
	     *   "description": "string",
	     *   "is_public": true,
	     *   "url": "string",
	     *   "thumb_url": "string",
	     *   "author_name": "string",
	     *   "plugins": {},
	     *   "format": "string"
	     * }
	     * @param  {Object} artworkData An artwork description object
	     */
	    create: function create(artworkData) {
	      // TODO: for now we're only allowing artwork creation via current user REST relation
	      // return fetchJSON(`${modelPrefix}`, { method: 'POST', data: artworkData });
	      return fetchJSON('users/current/created_artwork', { method: 'POST', data: artworkData });
	    },

	    /**
	     * Update a artwork
	     * @param  {String} artworkId
	     * @param  {Object} artworkData
	     * @return {Promise}
	     */
	    update: function update(artworkId, artworkData) {
	      return fetchJSON(modelPrefix + '/' + artworkId, { method: 'PUT', data: artworkData });
	    },

	    /**
	     * Delete a artwork
	     * @param  {String} artworkId
	     * @return {Promise}
	     */
	    delete: function _delete(artworkId) {
	      return fetchJSON(modelPrefix + '/' + artworkId, { method: 'DELETE' });
	    }

	    // /**
	    //  * Fetch the stream.
	    //  * @param  {Number} skip
	    //  * @param  {Number} limit
	    //  * @return {Promise}
	    //  */
	    // fetchStream: function(skip, limit) {
	    //   skip = skip || 0;
	    //   limit = limit || 25;
	    //   let filter = {
	    //     filter: {
	    //       skip: skip,
	    //       limit: limit
	    //     }
	    //   };
	    //   return fetchJSON(`${modelPrefix}/stream`, { data: filter });
	    // }
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = collections;
	var modelPrefix = 'collections';

	function collections(fetchJSON, config) {
	  return {
	    /**
	     * Fetch a list of frames.
	     * @param  {Boolean}
	     * @return {Promise}
	     */
	    fetch: function fetch() {
	      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var defaultFilter = {};
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON('' + modelPrefix, { data: finalFilter });
	    },

	    /**
	     * Fetch a single collection by ID
	     * @param  {String}  collectionId
	     * @param  {Object} filter
	     * @return {Promise}
	     */
	    fetchById: function fetchById(collectionId) {
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var defaultFilter = {
	        include: 'artwork'
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON(modelPrefix + '/' + collectionId, { data: finalFilter });
	    }

	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = channels;
	var modelPrefix = 'channels';

	function channels(fetchJSON, config) {
	  return {
	    /**
	     * Fetch a list of channels.
	     * @param  {Object} filter
	     * @return {Promise}
	     */
	    fetch: function fetch() {
	      var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      var defaultFilter = {
	        include: ['owner']
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON('' + modelPrefix, { data: finalFilter });
	    },

	    /**
	     * Fetch a single channel by ID
	     * @param  {String}  channelId
	     * @param  {Object} filter
	     * @return {Promise}
	     */
	    fetchById: function fetchById(channelId) {
	      var filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var defaultFilter = {
	        include: ['owner']
	      };
	      var finalFilter = Object.assign({}, defaultFilter, filter);
	      return fetchJSON(modelPrefix + '/' + channelId, { data: finalFilter });
	    }

	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

	var _auth = __webpack_require__(1);

	module.exports = createFetchFunction;

	var API_BASE = void 0;

	function createFetchFunction(config) {
	  if (config.api_base) {
	    API_BASE = config.api_base;
	  }
	  return fetchJSON;
	}

	/**
	 * Prepend the api base to url path via config
	 * @param  {String} url
	 * @return {String}
	 */
	function prependApiBase(url) {
	  return '' + API_BASE + url;
	}

	/**
	 * If there is an access token present, append it to the conf as
	 * a query param.
	 * @param  {String} conf
	 * @return {String}
	 */
	function appendAccessToken(conf, access_token) {
	  var token = access_token || (0, _auth.getToken)();
	  conf.headers.Authorization = token;
	  conf.headers.access_token = token;
	  return conf;
	}

	/**
	 * Append query params
	 * @param  {String} url
	 * @param  {Object} data
	 * @param  {String} format
	 * @return {String}
	 */
	function appendFilterParams(url, data) {
	  var encoded = 'filter=';
	  encoded += JSON.stringify(data);
	  return url + '?' + encoded;
	}

	/**
	 * Check for error or success status, throw error on error status
	 * @param  {Object} response
	 * @return {Object}
	 */
	function checkStatus(response) {
	  if (response.ok) {
	    return response;
	  }
	  return response.json().then(function (json) {
	    var error = new Error(json.error && json.error.message || response.statusText);
	    return Promise.reject(Object.assign(error, { response: response }));
	  });
	}

	/**
	 * Return the json response body as JS object
	 * @param  {Object} response Raw fetch response object
	 * @return {Object} JSON body as JS object
	 */
	function parseJSON(response) {
	  return response.text().then(function (text) {
	    return text ? JSON.parse(text) : {};
	  });
	}

	/**
	 * Light wrapper on fetch for JSON
	 * @param  {String} url
	 * @param  {String} options.method
	 * @param  {Object} options.data
	 * @return {Promise}
	 */
	function fetchJSON(url) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$method = _ref.method,
	      method = _ref$method === undefined ? 'GET' : _ref$method,
	      _ref$data = _ref.data,
	      data = _ref$data === undefined ? {} : _ref$data,
	      _ref$access_token = _ref.access_token,
	      access_token = _ref$access_token === undefined ? null : _ref$access_token;

	  return new Promise(function (resolve, reject) {
	    url = prependApiBase(url);

	    var conf = {
	      method: method,
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      }
	    };
	    conf = appendAccessToken(conf, access_token);
	    if (method !== 'GET' && method !== 'OPTIONS') {
	      conf.body = JSON.stringify(data);
	    } else {
	      url = appendFilterParams(url, data);
	    }

	    doFetch(url, conf);

	    function doFetch(url, conf) {
	      fetch(url, conf).then(checkStatus).then(parseJSON).then(function (data) {
	        resolve(data);
	      }).catch(function (error) {
	        reject(error);
	      });
	    }
	  });
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("isomorphic-fetch");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
		"name": "openframe-jsclient",
		"version": "0.1.0",
		"description": "A JavaScript API client for Openframe.",
		"main": "of.js",
		"scripts": {
			"build": "webpack",
			"test": "npm run lint && mocha --compilers js:babel-core/register",
			"lint": "./node_modules/.bin/eslint test/*.js src/*.js"
		},
		"keywords": [
			"openframe",
			"api",
			"client",
			"javascript",
			"js"
		],
		"author": "Jonathan Wohl <jon@jonwohl.com>",
		"license": "MIT",
		"devDependencies": {
			"babel-core": "^6.0.0",
			"babel-eslint": "^6.0.0",
			"babel-loader": "^6.0.0",
			"babel-plugin-transform-function-bind": "^6.8.0",
			"babel-plugin-transform-object-rest-spread": "^6.8.0",
			"babel-polyfill": "^6.3.14",
			"babel-preset-es2015": "^6.0.15",
			"babel-preset-react": "^6.0.15",
			"bower-webpack-plugin": "^0.1.9",
			"eslint": "^2.2.0",
			"eslint-loader": "^1.0.0",
			"eslint-plugin-react": "^4.0.0",
			"fetch-mock": "^5.5.0",
			"glob": "^7.0.0",
			"json-loader": "^0.5.4",
			"minimist": "^1.2.0",
			"mocha": "^2.4.5",
			"mock-local-storage": "^1.0.2",
			"nock": "^9.0.2",
			"null-loader": "^0.1.1",
			"open": "0.0.5",
			"rimraf": "^2.4.3",
			"webpack": "^1.12.0"
		},
		"dependencies": {
			"isomorphic-fetch": "^2.2.1"
		}
	};

/***/ }
/******/ ]);