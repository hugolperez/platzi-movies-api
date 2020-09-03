const { config } = require('../config');

// res: le pasamos response porque es el que modificamos para utilizar el caché.
function cacheResponse(res, seconds) {
  if (!config.dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`);
  }
}

module.exports = cacheResponse;