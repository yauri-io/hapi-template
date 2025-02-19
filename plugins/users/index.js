import Router from './router.js'

export default {
  name: 'users',
  version: '1.0',
  /**
   *
   * @param {import('@hapi/hapi').Server} server
   * @param {import('@hapi/hapi').RouteOptions} options
   */
  register: (server, options) => {
    // passed options when loading plugin available here
    // it can be passed to router as well
    Router(server, options)
  }
}
