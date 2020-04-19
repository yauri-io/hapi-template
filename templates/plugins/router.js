'use strict';

const internals = {};
const Controller = require('./controller');
const Validator = require('./validator');
const PreHandler = require('./pre-handler');

module.exports = (server, options) => {
  // options can be used to pass property when loading this plugin
  // look on root folder index.js

  // server.dependency(['plugin to load before this plugin'], internals.after);
  server.dependency([], internals.after);
};

internals.after = (server) => {
  server.route([
    {
      method: 'GET',
      path: '/sample',
      config: {
        pre: [
          {method: PreHandler.getSampleData, assign: 'sampleData'}
        ],
        validate: Validator.sample,
        handler: Controller.sample
      }
    }
  ]);
};

