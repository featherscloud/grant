import { describe, it, beforeAll, afterAll, afterEach } from 'vitest'
import t from 'assert'
import qs from 'qs'
import rc from 'request-compose'
import rcookie from 'request-cookie'

import profile from 'grant-profile'
import Provider from '../util/provider.js'
import Client from '../util/client.js'

const request = rc.extend({
  Request: { cookie: rcookie.Request },
  Response: { cookie: rcookie.Response }
}).client

describe('handler', () => {
  const handler = 'node'
  let config, provider, oauth1, client

  beforeAll(async () => {
    provider = await Provider({ flow: 'oauth2' })
    oauth1 = await Provider({ flow: 'oauth1', port: 5002 })
    config = {
      defaults: {
        origin: 'http://localhost:5001',
        callback: '/'
      },
      oauth2: {
        authorize_url: provider.url('/oauth2/authorize_url'),
        access_url: provider.url('/oauth2/access_url'),
        profile_url: provider.url('/oauth2/profile_url'),
        oauth: 2,
        dynamic: true
      },
      oauth1: {
        request_url: oauth1.url('/oauth1/request_url'),
        authorize_url: oauth1.url('/oauth1/authorize_url'),
        access_url: oauth1.url('/oauth1/access_url'),
        profile_url: oauth1.url('/oauth1/profile_url'),
        oauth: 1,
        dynamic: true
      }
    }
  })

  afterAll(async () => {
    await provider.close()
    await oauth1.close()
  })

  describe('handlers', () => {
    Array.from({ length: 5 }).forEach((_, index) => {
      describe(`${handler} - ${index}`, () => {
        beforeAll(async () => {
          client = await Client({ test: 'handlers', handler, config, index })
        })

        afterAll(async () => {
          await client.close()
          await new Promise((resolve) => setTimeout(resolve, 100))
        })

        it('success', async () => {
          const {
            body: { response }
          } = await request({
            url: client.url('/connect/oauth2'),
            cookie: {}
          })
          t.deepEqual(response, {
            access_token: 'token',
            refresh_token: 'refresh',
            raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
          })
        })
      })
    })
  })

  describe('missing provider + missing callback', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({
          test: 'handlers',
          handler,
          config: {
            defaults: { origin: config.defaults.origin }, // no callback!
            oauth2: config.oauth2
          }
        })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('/connect - missing provider', async () => {
        t.equal(config.defaults.dynamic, undefined)
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth5'),
          cookie: {}
        })
        t.deepEqual(response, { error: 'Grant: missing or misconfigured provider' })
      })

      it('/connect - unsupported oauth version', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2'),
          qs: { oauth: 5 },
          cookie: {}
        })
        t.deepEqual(response, { error: 'Grant: missing or misconfigured provider' })
      })

      it('/connect - authorize error', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2'),
          qs: { authorize_url: provider.url('/authorize_error_message') },
          cookie: {}
        })
        t.deepEqual(response, { error: { message: 'invalid' } })
      })

      it('/connect - access error', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2'),
          qs: { access_url: provider.url('/access_error_status') },
          cookie: {}
        })
        t.deepEqual(response, { error: { invalid: 'access_url' } })
      })

      it('/callback - missing session', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2/callback'),
          cookie: {}
        })
        t.deepEqual(response, { error: 'Grant: missing session or misconfigured provider' })
      })
    })
  })

  describe('path matching regexp', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({
          test: 'handlers',
          handler,
          config: {
            defaults: {
              origin: 'http://localhost:5001',
              callback: '/'
            },
            oauth2: {
              authorize_url: provider.url('/oauth2/authorize_url'),
              access_url: provider.url('/oauth2/access_url'),
              oauth: 2,
              overrides: { override: {} }
            }
          }
        })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('success', async () => {
        const paths = ['/connect/oauth2', '/connect/oauth2/override']
        const endings = ['', '/', '/?a=/', '?', '?a=/']
        for (const path of paths) {
          for (const end of endings) {
            if (
              /fastify|hapi/.test(handler) &&
              '/connect/oauth2/override' === path &&
              ['/', '/?a=/'].includes(end)
            ) {
              continue
            }
            const {
              body: { response }
            } = await request({
              url: client.url(path + end),
              cookie: {}
            })
            t.deepEqual(response, {
              access_token: 'token',
              refresh_token: 'refresh',
              raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
            })
          }
        }
        try {
          const {
            body: { response }
          } = await request({
            url: client.url('/connect/oauth2/override/something'),
            cookie: {}
          })
        } catch (err) {
          t.equal(err.message, '404 Not Found')
        }
      })
    })
  })

  describe('dynamic session', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({ test: 'handlers', handler, config })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      afterEach(() => {
        provider.on.authorize = () => {}
        provider.on.access = () => {}
      })

      it('get', async () => {
        provider.on.authorize = ({ query }) => {
          t.deepEqual(query, {
            client_id: 'very',
            response_type: 'code',
            redirect_uri: 'http://localhost:5001/connect/oauth2/callback'
          })
        }
        provider.on.access = ({ form }) => {
          t.deepEqual(form, {
            grant_type: 'authorization_code',
            code: 'code',
            client_id: 'very',
            client_secret: 'secret',
            redirect_uri: 'http://localhost:5001/connect/oauth2/callback'
          })
        }
        const {
          body: { response, session }
        } = await request({
          url: client.url('/connect/oauth2'),
          qs: { key: 'very', secret: 'secret', foo: 'bar' },
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
        })
        t.deepEqual(session, { provider: 'oauth2', dynamic: { key: 'very', secret: 'secret', foo: 'bar' } })
      })

      it('post', async () => {
        const {
          body: { response, session }
        } = await request({
          method: 'POST',
          url: client.url('/connect/oauth2'),
          form: { key: 'very', secret: 'secret', foo: 'bar' },
          cookie: {},
          redirect: { all: true, method: false }
        })
        provider.on.authorize = ({ query }) => {
          t.deepEqual(query, {
            client_id: 'very',
            response_type: 'code',
            redirect_uri: 'http://localhost:5001/connect/oauth2/callback'
          })
        }
        provider.on.access = ({ form }) => {
          t.deepEqual(form, {
            grant_type: 'authorization_code',
            code: 'code',
            client_id: 'very',
            client_secret: 'secret',
            redirect_uri: 'http://localhost:5001/connect/oauth2/callback'
          })
        }
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
        })
        t.deepEqual(session, { provider: 'oauth2', dynamic: { key: 'very', secret: 'secret', foo: 'bar' } })
      })
    })
  })

  describe('dynamic state', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({ test: 'dynamic-state', handler, config })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      afterEach(() => {
        provider.on.authorize = () => {}
        provider.on.access = () => {}
      })

      it('success', async () => {
        provider.on.authorize = ({ query }) => {
          t.deepEqual(query, {
            client_id: 'very',
            response_type: 'code',
            redirect_uri: 'http://localhost:5001/connect/oauth2/callback'
          })
        }
        provider.on.access = ({ form }) => {
          t.deepEqual(form, {
            grant_type: 'authorization_code',
            code: 'code',
            client_id: 'very',
            client_secret: 'secret',
            redirect_uri: 'http://localhost:5001/connect/oauth2/callback'
          })
        }
        const {
          body: { response, session }
        } = await request({
          url: client.url('/connect/oauth2'),
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
        })
        t.deepEqual(session, { provider: 'oauth2' })
      })
    })
  })

  describe('transport querystring session', () => {
    ;['', 'querystring', 'session'].forEach((transport) => {
      describe(`${handler} - transport ${transport}`, () => {
        beforeAll(async () => {
          client = await Client({ test: 'handlers', handler, config })
        })

        afterAll(async () => {
          await client.close()
          await new Promise((resolve) => setTimeout(resolve, 100))
        })

        it('success', async () => {
          const {
            body: { response, session, state }
          } = await request({
            url: client.url('/connect/oauth2'),
            qs: { transport },
            cookie: {}
          })
          t.deepEqual(response, {
            access_token: 'token',
            refresh_token: 'refresh',
            raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
          })
          if (/^(|querystring)$/.test(transport)) {
            t.deepEqual(session, { provider: 'oauth2', dynamic: { transport } })
          } else if (/session/.test(transport)) {
            t.deepEqual(session, {
              provider: 'oauth2',
              dynamic: { transport },
              response: {
                access_token: 'token',
                refresh_token: 'refresh',
                raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
              }
            })
          }
        })
      })
    })
  })

  describe('transport state', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({
          test: 'transport-state',
          handler,
          config: {
            defaults: { ...config.defaults, transport: 'state' },
            oauth2: config.oauth2
          }
        })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('success', async () => {
        const {
          body: { response, session, state }
        } = await request({
          url: client.url('/connect/oauth2'),
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
        })
        t.deepEqual(session, { provider: 'oauth2' })
        t.deepEqual(state, {
          response: {
            access_token: 'token',
            refresh_token: 'refresh',
            raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
          }
        })
      })
    })
  })

  describe('response filter', () => {
    ;[
      'token',
      ['tokens'],
      ['raw'],
      ['jwt'],
      ['profile'],
      ['raw', 'jwt'],
      ['tokens', 'raw', 'jwt', 'profile']
    ].forEach((response) => {
      describe(`${handler} - ${JSON.stringify(response)}`, () => {
        beforeAll(async () => {
          const extend = [profile]
          client = await Client({ test: 'handlers', handler, config, extend })
        })

        afterAll(async () => {
          await client.close()
          await new Promise((resolve) => setTimeout(resolve, 100))
        })

        it('success', async () => {
          const { body } = await request({
            url: client.url('/connect/oauth2'),
            qs: { scope: ['openid'], response },
            cookie: {}
          })
          t.deepEqual(
            body.response,
            {
              token: {
                id_token: 'eyJ0eXAiOiJKV1QifQ.eyJub25jZSI6IndoYXRldmVyIn0.signature',
                access_token: 'token',
                refresh_token: 'refresh'
              },
              tokens: {
                id_token: 'eyJ0eXAiOiJKV1QifQ.eyJub25jZSI6IndoYXRldmVyIn0.signature',
                access_token: 'token',
                refresh_token: 'refresh'
              },
              raw: {
                raw: {
                  access_token: 'token',
                  refresh_token: 'refresh',
                  expires_in: '3600',
                  id_token: 'eyJ0eXAiOiJKV1QifQ.eyJub25jZSI6IndoYXRldmVyIn0.signature'
                }
              },
              jwt: {
                jwt: {
                  id_token: {
                    header: { typ: 'JWT' },
                    payload: { nonce: 'whatever' },
                    signature: 'signature'
                  }
                }
              },
              profile: {
                profile: { user: 'simov' }
              },
              'raw,jwt': {
                raw: {
                  access_token: 'token',
                  refresh_token: 'refresh',
                  expires_in: '3600',
                  id_token: 'eyJ0eXAiOiJKV1QifQ.eyJub25jZSI6IndoYXRldmVyIn0.signature'
                },
                jwt: {
                  id_token: {
                    header: { typ: 'JWT' },
                    payload: { nonce: 'whatever' },
                    signature: 'signature'
                  }
                }
              },
              'tokens,raw,jwt,profile': {
                id_token: 'eyJ0eXAiOiJKV1QifQ.eyJub25jZSI6IndoYXRldmVyIn0.signature',
                access_token: 'token',
                refresh_token: 'refresh',
                raw: {
                  access_token: 'token',
                  refresh_token: 'refresh',
                  expires_in: '3600',
                  id_token: 'eyJ0eXAiOiJKV1QifQ.eyJub25jZSI6IndoYXRldmVyIn0.signature'
                },
                jwt: {
                  id_token: {
                    header: { typ: 'JWT' },
                    payload: { nonce: 'whatever' },
                    signature: 'signature'
                  }
                },
                profile: { user: 'simov' }
              }
            }[[].concat(response).join()]
          )
        })
      })
    })
  })

  describe('oauth2 response_mode form_post', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({ test: 'handlers', handler, config })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('success', async () => {
        const cookie = {}
        const { body } = await request({
          url: client.url('/connect/oauth2'),
          qs: qs.stringify({ custom_params: { response_mode: 'form_post' } }),
          cookie
        })
        t.equal(body, 'code')
        const {
          body: { response, session }
        } = await request({
          method: 'POST',
          url: client.url('/connect/oauth2/callback'),
          form: { code: 'code' },
          cookie,
          redirect: { all: true, method: false }
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
        })
        t.deepEqual(session, {
          provider: 'oauth2',
          dynamic: { custom_params: { response_mode: 'form_post' } }
        })
      })
    })
  })

  describe('cookie-store', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({ test: 'cookie-store', handler, config })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('success', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2'),
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' }
        })
      })
    })
  })

  describe('next tick', () => {
    describe(handler, () => {
      beforeAll(async () => {
        client = await Client({ test: 'next-tick', handler, config })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('success', async () => {
        const { res, body } = await request({
          url: client.url('/connect/oauth2'),
          cookie: {}
        })
        t.equal(res.statusCode, 200)
        t.equal(res.headers['content-type'], 'application/json')
        t.deepEqual(body, { status: 'redirect prevented' })
      })
    })
  })

  describe('extend + state', () => {
    describe(handler, () => {
      beforeAll(async () => {
        const db = { grant: 'simov' }
        const state = ({ get, set }) =>
          get
            ? Promise.resolve(db[get])
            : set
            ? ((db[set.id] = set.value), Promise.resolve())
            : Promise.resolve()
        const extend = [
          ({ state }) =>
            async ({ provider, input, output }) => {
              output.profile = await state({ get: 'grant' })
              await state({ set: { id: 'grant', value: 'purest' } })
              t.deepEqual(db, { grant: 'purest' })
              return { provider, input, output }
            }
        ]
        client = await Client({ test: 'handlers', handler, config, state, extend })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('success', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2'),
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' },
          profile: 'simov'
        })
      })
    })
  })

  describe('request options', () => {
    describe(handler, () => {
      let calls = []

      beforeAll(async () => {
        const agent = new require('http').Agent()
        agent.createConnection = (
          (orig) =>
          (...args) => {
            const { method, headers } = args[0]
            calls.push({ method, headers })
            return orig(...args)
          }
        )(agent.createConnection)
        client = await Client({ test: 'handlers', handler, config, request: { agent } })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      afterEach(() => (calls = []))

      it('oauth2', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2'),
          qs: { response: ['tokens', 'raw', 'profile'] },
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' },
          profile: { user: 'simov' }
        })
        // TODO intercept calls
        // let res = calls[0]
        // t.equal(res.method, 'POST')
        // t.equal(res.headers['content-type'], 'application/x-www-form-urlencoded')
        // t.ok(/^simov\/grant/.test(res.headers['user-agent']))
        // res = calls[1]
        // t.equal(res.method, 'GET')
        // t.equal(res.headers.authorization, 'Bearer token')
        // t.ok(/^simov\/grant/.test(res.headers['user-agent']))
      })

      it('oauth1', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth1'),
          qs: { response: ['tokens', 'raw', 'profile'] },
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          access_secret: 'secret',
          raw: { oauth_token: 'token', oauth_token_secret: 'secret' },
          profile: { user: 'simov' }
        })
        // TODO intercept calls
        // let res = calls[0]
        // t.equal(res.method, 'POST')
        // t.ok(/oauth_callback/.test(res.headers.Authorization))
        // t.ok(/^simov\/grant/.test(res.headers['user-agent']))
        // res = calls[1]
        // t.equal(res.method, 'POST')
        // t.ok(/oauth_verifier/.test(res.headers.Authorization))
        // t.ok(/^simov\/grant/.test(res.headers['user-agent']))
        // res = calls[2]
        // t.equal(res.method, 'GET')
        // t.ok(/oauth_token/.test(res.headers.Authorization))
        // t.ok(/^simov\/grant/.test(res.headers['user-agent']))
      })
    })
  })

  describe('profile', () => {
    describe(handler, () => {
      beforeAll(async () => {
        const extend = [profile]
        client = await Client({ test: 'handlers', handler, config, extend })
      })

      afterAll(async () => {
        await client.close()
        await new Promise((resolve) => setTimeout(resolve, 100))
      })

      it('success', async () => {
        const {
          body: { response }
        } = await request({
          url: client.url('/connect/oauth2'),
          cookie: {}
        })
        t.deepEqual(response, {
          access_token: 'token',
          refresh_token: 'refresh',
          raw: { access_token: 'token', refresh_token: 'refresh', expires_in: '3600' },
          profile: { user: 'simov' }
        })
      })
    })
  })
})
