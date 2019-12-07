// make bluebird default Promise
Promise = require('bluebird') // eslint-disable-line no-global-assign
const serverless = require('serverless-http')
const app = require('./config/express')

/**
 * Exports express
 * @public
 */
module.exports = app
module.exports.handler = serverless(app)
