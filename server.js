'use strict';

const Bluebird = require('bluebird');

global.Promise = Bluebird;

const Boom = require('@hapi/boom');
const Config = require('config');
const Hoek = require('@hapi/hoek');
const Glue = require('@hapi/glue');
const PreHandler = require('./pre-handler');

let hapiServer = {};

const server = {};

// default value
const defaultManifest = {
  server: {
    port: Config.get('server.port'),
    host: Config.get('server.host'),
    routes: {
      cors: {origin: Config.get('server.allowOrigins')},
      validate: {
        failAction: (request, h, err) => {

          if (process.env.NODE_ENV === 'dev') {
            console.log('error', err);
            throw err;
          }
          else {
            throw request.server.boom.badRequest(null, 'Invalid request');
          }
        }
      }
    }
  }
};

// default value
const defaultOptions = {
  relativeTo: __dirname
};

server.configure = (manifest = {}, options = {}) => {

  server.manifest = Hoek.applyToDefaults(defaultManifest, manifest);
  server.options = Hoek.applyToDefaults(defaultOptions, options);
};

server.start = async () => {

  try {
    hapiServer = await Glue.compose(server.manifest, server.options);

    // extends
    // REF: https://github.com/hapijs/hapi/blob/master/API.md#server.decorate()
    // extends server object
    /** @namespace request.server.boom */
    hapiServer.decorate('server', 'boom', Boom);

    /** @namespace request.server.preHandler */
    hapiServer.decorate('server', 'preHandler', PreHandler);

    // extends toolkit object
    /** @namespace h.toolkitName */
    hapiServer.decorate('toolkit', 'toolkitName', {});

    await hapiServer.start();
  }
  catch (err) {
    console.error(err);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  // close all necessary connection here
  console.log('SERVER STOPPED', new Date().toUTCString());
  process.exit(0);
});

server.getInstance = () => hapiServer;

module.exports = server;
