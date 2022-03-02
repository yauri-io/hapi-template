'use strict';

require('dotenv').config(); // load environment variables before other scripts executed

const Config = require('./config');
const Server = require('./server');

const manifest = {
  register: {
    plugins: [
      {
        plugin: 'hapi-pino',
        options: {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              minimumLevel: "info",
              levelFirst: true,
              messageFormat: true,
              timestampKey: "time",
              translateTime: true,
              singleLine: false,
              mkdir: true,
              append: true,
            },
          },
          logPayload: true,
          level: Config.server.logLevel,
          redact: ['req.headers.authorization'], // do not log authorization in the headers
        },
      },
      { plugin: './plugins/users' },
    ],
  },
};

Server.configure(manifest);
Server.start();
