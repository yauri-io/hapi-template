'use strict'

import Controller from './controller.js'
import Validator from './validator.js'
import PreHandler from './pre-handler.js'

const internals = {}

/**
 *
 * @param {import('@hapi/hapi').Server} server
 */
internals.after = (server) => {
  server.route([
    {
      method: 'GET',
      path: '/sample',
      config: {
        pre: [{ method: PreHandler.getSampleData, assign: 'sampleData' }],
        validate: Validator.sample,
        handler: Controller.sample
      }
    }
  ])
}

/**
 *
 * @param {import('@hapi/hapi').Server} server
 * @param {import('@hapi/hapi').RouteOptions} options
 */
const router = (server, options) => {
  // options can be used to pass property when loading this plugin
  // look on root folder index.js

  // server.dependency(['plugin to load before this plugin'], internals.after);
  server.dependency([], internals.after)
}

export default router
