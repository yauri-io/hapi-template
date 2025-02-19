'use strict'

const Router = require('./router')

const plugin = {
  name: 'pluginName',
  version: '1.0'
}

/**
 *
 * @param {import('@hapi/hapi').Server} server
 * @param {import('@hapi/hapi').RouteOptions} options
 */
plugin.register = (server, options) => {
  // passed options when loading plugin available here
  // it can be passed to router as well
  Router(server, options)
}

module.exports = plugin
