/**
 * Application configuration object
 * @typedef {Object} Config
 * @property {string} environment - Current environment (defaults to 'dev')
 * @property {Object} server - Server configuration
 * @property {string} server.logLevel - Server logging level (defaults to 'debug')
 * @property {string} server.host - Server host address (defaults to '0.0.0.0')
 * @property {number} server.port - Server port number (defaults to 1337)
 * @property {string} server.secret - Server secret key for security (defaults to 'RANDOM-STRING')
 * @property {string[]} server.allowOrigins - CORS allowed origins (defaults to ['*'])
 */
const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    logLevel: process.env.SERVER_LOG_LEVEL || 'debug',
    host: process.env.SERVER_HOST || '0.0.0.0',
    port: process.env.SERVER_PORT || 1337,
    secret: process.env.SERVER_SECRET || 'RANDOM-STRING',
    allowOrigins: process.env.SERVER_ALLOW_ORIGINS
      ? process.env.SERVER_ALLOW_ORIGINS.split(',')
      : ['*'] // for CORS
  }
}

export default config
