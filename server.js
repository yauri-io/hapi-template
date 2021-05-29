'use strict';

const Bluebird = require('bluebird');

global.Promise = Bluebird;

const Boom = require('@hapi/boom');
const Config = require('./config');
const Hoek = require('@hapi/hoek');
const Glue = require('@hapi/glue');
const PreHandler = require('./pre-handler');

let hapiServer = {};

const server = {};

// default value
const defaultManifest = {
  server: {
    port: Config.server.port,
    host: Config.server.host,
    routes: {
      cors: { origin: Config.server.allowOrigins },
      validate: {
        failAction: ( request, h, err ) => {

          if (Config.environment === 'dev') {
            console.log('error', err);
            throw err;
          }
          // to protect the validation message from outsiders
          throw request.server.boom.badRequest(null, 'Invalid request');
        },
      },
    },
  },
};

const defaultOptions = {
  relativeTo: __dirname,
};

server.configure = ( manifest = {}, options = {} ) => {

  server.manifest = Hoek.applyToDefaults(defaultManifest, manifest);
  server.options = Hoek.applyToDefaults(defaultOptions, options);
};

server.start = async () => {

  try {
    hapiServer = await Glue.compose(server.manifest, server.options);

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
  } catch (err) {
    console.error(err);
  }
};

process.on('SIGINT', async () => {
  // close all necessary connection here
  await hapiServer.stop({ timeout: 10000 });
  console.log('SERVER END', new Date().toUTCString());
  // eslint-disable-next-line no-process-exit
  process.exit();
});

server.getInstance = () => hapiServer;

module.exports = server;
