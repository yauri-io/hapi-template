import UserModel from './model.js'

const userController = {}

/**
 *
 * @param {import('@hapi/hapi').Request} request
 * @returns {User | {}}
 */
userController.getById = (request) => UserModel.getById(request.params.id)

userController.listUser = () => UserModel.listUser()

/**
 *
 * @param {import('@hapi/hapi').Request} request
 */
userController.create = (request) => {
  const userId = UserModel.create(/** @type {User} */ (request.payload))
  return userId
}

export default userController
