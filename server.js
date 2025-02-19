'use strict'

const Bluebird = require('bluebird')

global.Promise = Bluebird

const Boom = require('@hapi/boom')
const Config = require('./config')
const Hoek = require('@hapi/hoek')
const Glue = require('@hapi/glue')

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
}

server.start = async () => {
  try {
    hapiServer = await Glue.compose(server.manifest, server.options)

    await hapiServer.start()
    console.log({
      tag: '[SERVER_STARTED]',
      time: new Date().toUTCString()
    })
  } catch (err) {
    console.error(err)
  }
}

process.on('SIGINT', async () => {
  // close all necessary connection here
  await hapiServer.stop({ timeout: 10000 })
  console.log({
    tag: '[SERVER_STOPPED]',
    time: new Date().toUTCString()
  })
  // eslint-disable-next-line no-process-exit
  process.exit()
})

server.getInstance = () => hapiServer

module.exports = server
