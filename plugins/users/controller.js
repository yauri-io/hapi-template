'use strict'

const UserModel = require('./model')

const userController = {}

/**
 *
 * @param {import('@hapi/hapi').Request} request
 * @returns {*}
 */
userController.getById = (request) => UserModel.getById(request.params.id)

userController.listUser = () => UserModel.listUser()

userController.create = (request) => {
  const userId = UserModel.create(request.payload)
  return userId
}

module.exports = userController
