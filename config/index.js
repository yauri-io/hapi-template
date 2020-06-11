'use strict';

module.exports = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    logLevel: process.env.SERVER_LOG_LEVEL || 'debug',
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || 1337,
    secret: process.env.SERVER_SECRET || 'RANDOM-STRING',
    allowOrigins: process.env.SERVER_ALLOW_ORIGINS ? process.env.SERVER_ALLOW_ORIGINS.split(',') : ['*'] // for CORS
  }
};
