'use strict'

const userModel = {}

const users = [
  { id: 1, fName: 'Joker', lName: 'John Doe', age: 33 }
]

userModel.getById = (id) => users.find((m) => m.id === id) || {}

userModel.listUser = () => users

userModel.create = (user) => {
  user.id = users.length + 1
  users.push(user)
  return { id: user.id }
}

module.exports = userModel
