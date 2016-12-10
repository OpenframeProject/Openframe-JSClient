import _users from './users';
import _frames from './frames';
import _artwork from './artwork';
import _collections from './collections';
import _channels from './channels';
import _config from './config';
import _fetchJSON from './fetchJSON';

// Package version
const VERSION = require('../package.json').version;

const DEFAULT_OPTIONS = {
  api_base: 'https://api.openframe.io/api/'
};

class OF {
  constructor(options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.VERSION = VERSION;

    this.fetchJSON = _fetchJSON(this.options);

    this.users = _users(this.fetchJSON, this.options);
    this.frames = _frames(this.fetchJSON, this.options);
    this.artwork = _artwork(this.fetchJSON, this.options);
    this.collections = _collections(this.fetchJSON, this.options);
    this.channels = _channels(this.fetchJSON, this.options);
    this.config = _config(this.fetchJSON, this.options);
  }
}

module.exports = OF;