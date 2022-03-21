'use strict'

const preHandler = {}

preHandler.checkUserExistence = (request, h) => {
  const payload = request.payload
  if (payload.fName === 'fName' && payload.lName === 'lName') {
    throw request.server.boom.badRequest('User already exist')
  }

  return h.continue
}

preHandler.injectSampleUser = () => {
  return { id: 0, fName: 'sample', lName: 'user', age: 99 }
}

module.exports = preHandler
