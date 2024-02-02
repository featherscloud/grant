const t = require('assert')
const qs = require('qs')

const Provider = require('../util/provider')
const Client = require('../util/client')

const request = require('request-compose').extend({
  Request: { cookie: require('request-cookie').Request },
  Response: { cookie: require('request-cookie').Response }
}).client

describe('session', () => {
  let config, provider, oauth1, client

  before(async () => {
    provider = await Provider({ flow: 'oauth2' })
    oauth1 = await Provider({ flow: 'oauth1', port: 5002 })
    config = {
      defaults: {
        origin: 'http://localhost:5001',
        callback: '/',
        dynamic: true
      },
      oauth1: {
        request_url: oauth1.url('/request_url'),
        authorize_url: oauth1.url('/authorize_url'),
        access_url: oauth1.url('/access_url'),
        oauth: 1
      },
      oauth2: {
        authorize_url: provider.url('/authorize_url'),
        access_url: provider.url('/access_url'),
        oauth: 2
      }
    }
  })

  after(async () => {
    await provider.close()
    await oauth1.close()
  })
  ;['node'].forEach((handler) => {
    describe(handler, () => {
      before(async () => {
        client = await Client({ test: 'handlers', handler, config })
      })

      after(async () => {
        await client.close()
      })

      afterEach(() => {
        provider.oauth2.authorize = () => {}
        provider.oauth2.access = () => {}
      })

      it('provider', async () => {
        const {
          body: { session }
        } = await request({
          url: client.url('/connect/oauth2'),
          cookie: {}
        })
        t.deepEqual(session, { provider: 'oauth2' })
      })

      it('override', async () => {
        const {
          body: { session }
        } = await request({
          url: client.url('/connect/oauth2/contacts'),
          cookie: {}
        })
        t.deepEqual(session, { provider: 'oauth2', override: 'contacts' })
      })

      it('dynamic - POST', async () => {
        const {
          body: { session }
        } = await request({
          method: 'POST',
          url: client.url('/connect/oauth2/contacts'),
          form: qs.stringify(
            {
              scope: ['scope1', 'scope2'],
              state: 'Grant',
              nonce: 'simov',
              custom_params: { access_type: 'offline' }
            },
            { arrayFormat: 'repeat' }
          ),
          cookie: {},
          redirect: { all: true, method: false }
        })
        t.deepEqual(session, {
          provider: 'oauth2',
          override: 'contacts',
          dynamic: {
            scope: ['scope1', 'scope2'],
            state: 'Grant',
            nonce: 'simov',
            custom_params: { access_type: 'offline' }
          },
          state: 'Grant',
          nonce: 'simov'
        })
      })

      it('dynamic - GET', async () => {
        const {
          body: { session }
        } = await request({
          url: client.url('/connect/oauth2/contacts'),
          qs: qs.stringify(
            {
              scope: ['scope1', 'scope2'],
              state: 'Grant',
              nonce: 'simov',
              custom_params: { access_type: 'offline' }
            },
            { arrayFormat: 'repeat' }
          ),
          cookie: {}
        })
        t.deepEqual(session, {
          provider: 'oauth2',
          override: 'contacts',
          dynamic: {
            scope: ['scope1', 'scope2'],
            state: 'Grant',
            nonce: 'simov',
            custom_params: { access_type: 'offline' }
          },
          state: 'Grant',
          nonce: 'simov'
        })
      })

      it('dynamic - non configured provider', async () => {
        t.equal(client.grant.config.google, undefined)

        const {
          body: { session }
        } = await request({
          url: client.url('/connect/google'),
          qs: {
            authorize_url: provider.url('/authorize_url'),
            access_url: provider.url('/access_url'),
            scope: ['scope1', 'scope2'],
            state: 'Grant',
            nonce: 'simov'
          },
          cookie: {}
        })
        t.deepEqual(session, {
          provider: 'google',
          dynamic: {
            authorize_url: 'http://localhost:5000/authorize_url',
            access_url: 'http://localhost:5000/access_url',
            scope: ['scope1', 'scope2'],
            state: 'Grant',
            nonce: 'simov'
          },
          state: 'Grant',
          nonce: 'simov'
        })
      })

      it('dynamic - non existing provider', async () => {
        t.equal(client.grant.config.grant, undefined)

        const {
          body: { session }
        } = await request({
          url: client.url('/connect/grant'),
          qs: {
            authorize_url: provider.url('/authorize_url'),
            access_url: provider.url('/access_url'),
            oauth: 2
          },
          cookie: {}
        })
        t.equal(client.grant.config.grant, undefined)
        t.deepEqual(session, {
          provider: 'grant',
          dynamic: {
            authorize_url: 'http://localhost:5000/authorize_url',
            access_url: 'http://localhost:5000/access_url',
            oauth: '2'
          }
        })
      })

      it('state and nonce', async () => {
        provider.oauth2.authorize = ({ query }) => {
          t.ok(/[\d\w]{20}/.test(query.state))
          t.ok(/[\d\w]{20}/.test(query.nonce))
        }
        const {
          body: { session }
        } = await request({
          url: client.url('/connect/oauth2'),
          qs: { state: true, nonce: true },
          cookie: {}
        })
        t.deepEqual(session.dynamic, { state: 'true', nonce: 'true' })
        t.ok(/[\d\w]{20}/.test(session.state))
        t.ok(/[\d\w]{20}/.test(session.nonce))
      })

      it('pkce', async () => {
        provider.oauth2.authorize = ({ query }) => {
          t.equal(query.code_challenge_method, 'S256')
          t.ok(typeof query.code_challenge === 'string')
        }
        provider.oauth2.access = ({ form }) => {
          t.ok(typeof form.code_verifier === 'string')
          t.ok(/[a-z0-9]{80}/.test(form.code_verifier))
        }
        const {
          body: { session }
        } = await request({
          url: client.url('/connect/oauth2'),
          qs: { pkce: true },
          cookie: {}
        })
        t.deepEqual(session.dynamic, { pkce: 'true' })
        t.ok(/[a-z0-9]{80}/.test(session.code_verifier))
      })

      it('oauth1', async () => {
        const {
          body: { session }
        } = await request({
          url: client.url('/connect/oauth1'),
          cookie: {}
        })
        t.deepEqual(session, {
          provider: 'oauth1',
          request: { oauth_token: 'token', oauth_token_secret: 'secret' }
        })
      })

      it('fresh session on connect', async () => {
        const cookie = {}
        let res = await request({
          url: client.url('/connect/oauth2/grant'),
          cookie
        })
        t.deepEqual(res.body.session, { provider: 'oauth2', override: 'grant' })
        res = await request({
          url: client.url('/connect/oauth2'),
          cookie
        })
        t.deepEqual(res.body.session, { provider: 'oauth2' })
      })
    })
  })
})
