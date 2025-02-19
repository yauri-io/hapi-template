import Bluebird from 'bluebird'
import Boom from '@hapi/boom'
import * as Hoek from '@hapi/hoek'
import Glue from '@hapi/glue'
import Config from './config/index.js'
import __dirname from './utils/path.js'

global.Promise = Bluebird

/**
 * @type {import('@hapi/hapi').Server | {}}
 */
let hapiServer = {}

const server = {}

// default value
const defaultManifest = {
  server: {
    port: Config.server.port,
    host: Config.server.host,
    routes: {
      cors: { origin: Config.server.allowOrigins },
      validate: {
        /**
         *
         * @param {import('@hapi/hapi').Request & {server: {boom: import('@hapi/boom')}}} request
         * @param {import('@hapi/hapi').ResponseToolkit} h
         * @param {Error} err
         */
        failAction: (request, h, err) => {
          if (Config.environment === 'dev') {
            console.log({
              tag: '[VALIDATION_ERROR]',
              err
            })
            throw err
          }
          // to protect the validation message from outsiders
          throw Boom.badRequest()
        }
      }
    }
  }
}

const defaultOptions = {
  relativeTo: __dirname
}

server.configure = (manifest = {}, options = {}) => {
  server.manifest = Hoek.applyToDefaults(defaultManifest, manifest)
  server.options = Hoek.applyToDefaults(defaultOptions, options)
  return server
}

server.start = async () => {
  hapiServer = await Glue.compose(server.manifest, server.options)
  await hapiServer.start()
  console.log({
    tag: '[SERVER_STARTED]',
    time: new Date().toUTCString()
  })
}

process.on('SIGINT', async () => {
  // close all necessary connection here
  await hapiServer.stop({ timeout: 5000 })
  console.log({
    tag: '[SERVER_STOPPED]',
    time: new Date().toUTCString()
  })
  process.exit(0)
})

process.on('unhandledRejection', (err) => {
  console.error({
    tag: '[SERVER_UNHANDLED_REJECTION]',
    err
  })
  process.exit(1)
})

server.getInstance = () => hapiServer

export default server
