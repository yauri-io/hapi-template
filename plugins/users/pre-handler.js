import Boom from '@hapi/boom'

const preHandler = {}

/**
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
preHandler.checkUserExistence = (request, h) => {
  const payload = request.payload
  if (payload.fName === 'fName' && payload.lName === 'lName') {
    throw Boom.badRequest('User already exist')
  }

  return h.continue
}

preHandler.injectSampleUser = () => {
  return { id: '0', fName: 'sample', lName: 'user', age: 99 }
}

export default preHandler
