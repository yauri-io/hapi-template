'use strict';

const Server = require('./server');

const manifest = {
  register: {
    plugins: [
      {plugin: 'hapi-pino', options: {prettyPrint: process.env.NODE_ENV !== 'production', logPayload: true}},
      {plugin: './plugins/users'}
    ]
  }
};

Server.configure(manifest);
Server.start();
