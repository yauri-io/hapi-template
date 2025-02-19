import Code from '@hapi/code'
import Lab from '@hapi/lab'
import Server from '../../server.js'
import UserPlugin from '../../plugins/users/index.js'

const lab = Lab.script()

const { before, after, describe, test } = lab
const expect = Code.expect

const internals = {
  manifest: {
    server: {
      host: 'localhost',
      port: 8000
    },
    register: {
      plugins: [
        {
          plugin: UserPlugin,
          options: {
            defaultUser: { id: '0', name: 'default' }
          }
        }
      ]
    }
  }
}

describe('User.controller', () => {
  before(async () => {
    Server.configure(internals.manifest)
    await Server.start()
  })

  after(() => {
    Server.getInstance().stop()
  })

  test('Get user by id should returns user object', async () => {
    const request = {
      url: '/users/1',
      method: 'GET'
    }
    const res = await Server.getInstance().inject(request)
    expect(res.result.id).to.equal(1)
  })

  test('Get user by wrong id should returns empty object', async () => {
    const request = {
      url: '/users/1000',
      method: 'GET'
    }
    const res = await Server.getInstance().inject(request)
    expect(res.result.id).to.not.exist()
  })

  test('Get user by string id should returns bad request', async () => {
    const request = {
      url: '/users/string',
      method: 'GET'
    }
    const res = await Server.getInstance().inject(request)
    expect(res.statusCode).to.equal(400)
  })

  test('Create user with existing user name returns bad request', async () => {
    const request = {
      url: '/users',
      method: 'POST',
      payload: {
        fName: 'fName',
        lName: 'lName',
        age: 30
      }
    }
    const res = await Server.getInstance().inject(request)
    expect(res.statusCode).to.equal(400)
  })

  // for testing pre handler
  test('Create sample user returns sample user', async () => {
    const request = {
      url: '/users/1',
      method: 'GET'
    }
    const res = await Server.getInstance().inject(request)
    expect(res.statusCode).to.equal(200)
    expect(res.result.fName).to.equal('Joker')
    expect(res.result.lName).to.equal('John Doe')
    expect(res.result.age).to.equal(33)
  })

  // more test...
})

export { lab }
