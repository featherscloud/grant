const qs = require('qs')
const Grant = require('./grant.js')
const Session = require('./session.js')

module.exports = function (args = {}) {
  const grant = Grant(args.config ? args : { config: args })
  app.config = grant.config

  const regex = new RegExp(
    [
      '^',
      app.config.defaults.prefix,
      /(?:\/([^\/\?]+?))/.source, // /:provider
      /(?:\/([^\/\?]+?))?/.source, // /:override?
      /(?:\/$|\/?\?+(.*))?$/.source // querystring
    ].join(''),
    'i'
  )

  const store = Session(args.session)

  async function app(req, res, _state) {
    const session = store(req, res)
    const match = regex.exec(req.url)
    if (!match) {
      return { session }
    }

    const {
      location,
      session: sess,
      state
    } = await grant({
      method: req.method,
      params: { provider: match[1], override: match[2] },
      query: qs.parse(match[3]),
      body: req.method === 'POST' ? qs.parse(await buffer(req)) : {},
      state: _state,
      session: (await session.get()).grant
    })

    await session.set({ grant: sess })

    return location
      ? (redirect(res, location, session), { session, redirect: true })
      : { session, response: state.response || sess.response }
  }

  return app
}

const redirect = (res, location, session) => {
  res.setHeader('set-cookie', session.headers['set-cookie'])
  setImmediate(() => {
    if (!res.headersSent) {
      res.statusCode = 302
      res.setHeader('location', location)
      res.end()
    }
  })
}

const buffer = (req, body = []) =>
  new Promise((resolve, reject) =>
    req
      .on('data', (chunk) => body.push(chunk))
      .on('end', () => resolve(Buffer.concat(body).toString('utf8')))
      .on('error', reject)
  )
