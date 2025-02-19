const controller = {}

/**
 *
 * @param {import('@hapi/hapi').Request} request
 * @param {import('@hapi/hapi').ResponseToolkit} h
 */
controller.sample = (request, h) => request.pre.getSampleData

export default controller
