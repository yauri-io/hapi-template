import PreHandler from './pre-handler.js'
import UserController from './controller.js'
import UserValidator from './validator.js'

const internals = {}

/**
 *
 * @param {import('@hapi/hapi').Server} server
 */
internals.after = (server) => {
  server.route([
    {
      method: 'GET',
      path: '/users/{id}',
      config: {
        validate: UserValidator.getById,
        handler: UserController.getById
      }
    },
    {
      method: 'GET',
      path: '/users',
      config: {
        handler: UserController.listUser
      }
    },
    {
      method: 'POST',
      path: '/users',
      config: {
        pre: [{ method: PreHandler.checkUserExistence }],
        validate: UserValidator.create,
        handler: UserController.create
      }
    }
  ])
}

/**
 *
 * @param {import('@hapi/hapi').Server} server
 * @param {import('@hapi/hapi').RouteOptions} options
 */
// eslint-disable-next-line no-unused-vars
const router = (server, options) => {
  // passed options when loading plugin available here
  // uncomment to see the content
  // console.log(options);

  server.dependency([], internals.after)
}

export default router
