'use strict'

const userModel = {}

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} fName
 * @property {string} lName
 * @property {number} age
 */

/**
 *
 * @type {User[]}
 */
const users = [
  { id: 1, fName: 'Joker', lName: 'John Doe', age: 33 }
]

/**
 * Get user by ID
 * @param {number} id
 * @returns {User|{}}
 */
userModel.getById = (id) => users.find((m) => m.id === id) || {}

/**
 * List user
 * @returns {User[]}
 */
userModel.listUser = () => users

/**
 *
 * @param {User} user
 * @returns {{id: number}}
 */
userModel.create = (user) => {
  user.id = users.length + 1
  users.push(user)
  return { id: user.id }
}

module.exports = userModel
