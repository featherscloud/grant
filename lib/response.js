import qs from 'qs'

const tokens = (provider, response) => {
  const data = {}

  if (provider.concur) {
    data.access_token = response.replace(/[\s\S]+<Token>([^<]+)<\/Token>[\s\S]+/, '$1')
    data.refresh_token = response.replace(/[\s\S]+<Refresh_Token>([^<]+)<\/Refresh_Token>[\s\S]+/, '$1')
  } else if (provider.getpocket) {
    data.access_token = response.access_token
  } else if (provider.yammer) {
    data.access_token = response.access_token.token
  } else if (provider.oauth === 1) {
    if (response.oauth_token) {
      data.access_token = response.oauth_token
    }
    if (response.oauth_token_secret) {
      data.access_secret = response.oauth_token_secret
    }
  } else if (provider.oauth === 2) {
    if (response.id_token) {
      data.id_token = response.id_token
    }
    if (response.access_token) {
      data.access_token = response.access_token
    }
    if (response.refresh_token) {
      data.refresh_token = response.refresh_token
    }
  }

  return data
}

const oidc = (provider, session, response) => {
  if (!/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/.test(response.id_token)) {
    return { error: 'Grant: OpenID Connect invalid id_token format' }
  }

  let [header, payload, signature] = response.id_token.split('.')

  try {
    header = JSON.parse(Buffer.from(header, 'base64').toString('binary'))
    payload = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
  } catch (err) {
    return { error: 'Grant: OpenID Connect error decoding id_token' }
  }

  if (![].concat(payload.aud).includes(provider.key)) {
    return { error: 'Grant: OpenID Connect invalid id_token audience' }
  } else if (session.nonce && payload.nonce !== session.nonce) {
    return { error: 'Grant: OpenID Connect nonce mismatch' }
  }

  return { header, payload, signature }
}

export const data = ({ provider, input, input: { session }, output }) => {
  if (output.error) {
    return { provider, input, output }
  }

  let data
  const jwt = oidc(provider, session, output)

  if (output.id_token) {
    if (jwt.error) {
      return { provider, input, output: jwt }
    }
  }

  if (!provider.response) {
    data = tokens(provider, output)
    data.raw = output
  } else {
    data = {}
    const response = [].concat(provider.response)
    if (response.find((key) => /token/.test(key))) {
      data = tokens(provider, output)
    }
    if (response.includes('jwt') && jwt) {
      data.jwt = { id_token: jwt }
    }
    if (response.includes('raw')) {
      data.raw = output
    }
  }

  return { provider, input, output: data }
}

export const transport = ({ provider, input, input: { params, state, session }, output }) => ({
  location:
    params.override !== 'callback' && !output.error
      ? output
      : !provider.transport || provider.transport === 'querystring'
      ? `${provider.callback || '/'}?${qs.stringify(output)}`
      : provider.transport === 'session'
      ? provider.callback
      : undefined,
  session: (provider.transport === 'session' ? (session.response = output) : null, session),
  state: (provider.transport === 'state' ? (state.response = output) : null, state)
})
