import 'dotenv/config'
import Config from './config/index.js'
import Server from './server.js'

import UserPlugin from './plugins/users/index.js'

const manifest = {
  register: {
    plugins: [
      {
        plugin: 'hapi-pino',
        options: {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
              minimumLevel: 'info',
              levelFirst: true,
              messageFormat: true,
              timestampKey: 'time',
              translateTime: true,
              singleLine: false,
              mkdir: true,
              append: true
            }
          },
          logPayload: true,
          level: Config.server.logLevel,
          redact: ['req.headers.authorization'] // do not log authorization in the headers
        }
      },
      { plugin: UserPlugin }
    ]
  }
}

Server.configure(manifest)
  .start()
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
