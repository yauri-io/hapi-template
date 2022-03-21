'use strict'

const UserController = require('./controller')
const UserValidator = require('./validator')
const PreHandler = require('./pre-handler')

const internals = {}

// eslint-disable-next-line no-unused-vars
module.exports = (server, options) => {
  // passed options when loading plugin available here
  // uncomment to see the content
  // console.log(options);

  server.dependency([], internals.after)
}

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
        pre: [
          { method: PreHandler.checkUserExistence }
        ],
        validate: UserValidator.create,
        handler: UserController.create
      }
    }
  ])
}
