import { compose, dcopy } from './util.js'
import _config from './config.js'
import * as oauth1 from './flow/oauth1.js'
import * as oauth2 from './flow/oauth2.js'

export const defaults =
  (config) =>
  ({ method, params, query, body, state, session }) => {
    method = method.toUpperCase()
    params = dcopy(params || {})
    query = dcopy(query || {})
    body = dcopy(body || {})
    state = dcopy(state || {})
    session = dcopy(params.override === 'callback' ? session || {} : {})

    if (params.override !== 'callback') {
      session.provider = params.provider

      if (params.override) {
        session.override = params.override
      }
      if (method === 'GET' && Object.keys(query).length) {
        session.dynamic = query
      } else if (method === 'POST' && Object.keys(body).length) {
        session.dynamic = body
      }
    }

    const provider = _config.provider(config, session, state)
    return { provider, input: { method, params, query, body, state, session } }
  }

export const connect =
  ({ request }) =>
  ({ provider, input, input: { session }, output }) =>
    provider.oauth === 1
      ? compose(
          oauth1.request({ request }),
          ({ provider, input, input: { session }, output }) => (
            (session.request = output), oauth1.authorize({ provider, input, output })
          )
        )({ provider, input })
      : provider.oauth === 2
      ? ((session.state = provider.state),
        (session.nonce = provider.nonce),
        (session.code_verifier = provider.code_verifier),
        oauth2.authorize({ provider, input }))
      : ((output = { error: 'Grant: missing or misconfigured provider' }), { provider, input, output })

export const callback =
  ({ request }) =>
  ({ provider, input, output }) =>
    provider.oauth === 1
      ? oauth1.access({ request })
      : provider.oauth === 2
      ? oauth2.access({ request })
      : ({ provider, input, output }) => (
          (output = { error: 'Grant: missing session or misconfigured provider' }),
          { provider, input, output }
        )
