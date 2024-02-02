const http = require('http')
const qs = require('qs')

const Grant = require('../../grant.js')

const client = async ({ test, handler, port = 5001, ...rest }) => {
  const { grant, server } = await clients[test][handler]({ port, ...rest })
  return {
    grant,
    server,
    url: (path) => `http://localhost:${port}${path}`,
    close: () =>
      new Promise((resolve) => {
        handler === 'hapi'
          ? version.hapi >= 17
            ? server.stop().then(resolve)
            : server.stop(resolve)
          : server.close(resolve)
      })
  }
}

const clients = {
  handlers: {
    node: ({ config, request, state, extend, port, index }) =>
      new Promise((resolve) => {
        const db = {}
        const session = {
          secret: 'grant',
          store: {
            get: async (key) => db[key],
            set: async (key, value) => (db[key] = value),
            remove: async (key) => delete db[key]
          }
        }

        const grant =
          index === 1
            ? Grant.node()({ config, session })
            : index === 3
            ? Grant.node({ config, session })
            : index === 4
            ? Grant({ config, session, handler: 'node' })
            : Grant({ config, session, request, state, extend, handler: 'node' })

        const server = http.createServer()
        server.on('request', async (req, res) => {
          const { session, response, redirect } = await grant(req, res)
          if (response || /^\/(?:\?|$)/.test(req.url)) {
            callback.handler(req, res, session, response)
          } else if (!redirect) {
            res.statusCode = 404
            res.end('Not Found')
          }
        })

        server.listen(port, () => resolve({ grant, server }))
      })
  },
  'dynamic-state': {
    node: ({ config, port }) =>
      new Promise((resolve) => {
        const session = { secret: 'grant' }
        const grant = Grant.node({ config, session })

        const server = http.createServer()
        server.on('request', async (req, res) => {
          const state = { dynamic: { key: 'very', secret: 'secret' } }
          const { session, response } = await grant(req, res, state)
          if (response || /^\/(?:\?|$)/.test(req.url)) {
            callback.handler(req, res, session, response)
          }
        })

        server.listen(port, () => resolve({ grant, server }))
      })
  },
  'transport-state': {
    node: ({ config, port }) =>
      new Promise((resolve) => {
        const session = { secret: 'grant' }
        const grant = Grant.node({ config, session })

        const server = http.createServer()
        server.on('request', async (req, res) => {
          const { session, response } = await grant(req, res)
          if (response || /^\/(?:\?|$)/.test(req.url)) {
            callback.handler(req, res, session, response)
          }
        })

        server.listen(port, () => resolve({ grant, server }))
      })
  },
  'cookie-store': {
    node: ({ config, port }) =>
      new Promise((resolve) => {
        const session = { secret: 'grant' }
        const grant = Grant.node({ config, session })

        const server = http.createServer()
        server.on('request', async (req, res) => {
          const { session, response } = await grant(req, res)
          if (response || /^\/(?:\?|$)/.test(req.url)) {
            callback.handler(req, res, session, response)
          }
        })

        server.listen(port, () => resolve({ grant, server }))
      })
  },
  'next-tick': {
    node: ({ config, port }) =>
      new Promise((resolve) => {
        const session = { secret: 'grant' }
        const grant = Grant.node({ config, session })

        const server = http.createServer()
        server.on('request', async (req, res) => {
          if (req.url !== '/connect/oauth2') {
            res.statusCode = 200
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ status: 'redirect followed' }))
            return
          }
          // handler
          await grant(req, res)
          res.statusCode = 200
          res.setHeader('content-type', 'application/json')
          res.end(JSON.stringify({ status: 'redirect prevented' }))
        })

        server.listen(port, () => resolve({ grant, server }))
      })
  }
}

const callback = {
  handler: async (req, res, session, state) => {
    const query = qs.parse(req.url.split('?')[1])
    session = await session.get()
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(
      JSON.stringify({
        session: session.grant,
        response: session.grant.response || state || query,
        state: { response: state }
      })
    )
  }
}

module.exports = client
