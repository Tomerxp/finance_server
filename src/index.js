// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign
const app = require('./config/express')

// listen to requests
app.listen(80)

/**
 * Exports express
 * @public
 */
module.exports = app
