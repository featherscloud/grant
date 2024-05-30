import { describe, it, beforeAll, afterAll } from 'vitest'
import t from 'assert'
import http from 'http'
import qs from 'qs'
import compose from 'request-compose'
import request from '../lib/client.js'

describe('client', () => {
  describe('defaults', () => {
    let server

    beforeAll((done) => {
      server = http.createServer()
      server.on('request', (req, res) => {
        t.ok(/^simov\/grant/.test(req.headers['user-agent']))
        res.end()
      })
      server.listen(5000, done)
    })

    afterAll((done) => {
      server.close(done)
    })

    it('user-agent', async () => {
      const { res } = await request({ url: 'http://localhost:5000' })
      t.equal(res.status, 200)
    })
  })

  describe('parse', () => {
    let server

    beforeAll((done) => {
      server = http.createServer()
      server.on('request', (req, res) => {
        if (req.url === '/json') {
          res.writeHead(200, { 'content-type': 'application/json' })
          res.end(JSON.stringify({ json: true }))
        }
        if (req.url === '/qs') {
          res.writeHead(200, { 'content-type': 'application/x-www-form-urlencoded' })
          res.end(qs.stringify({ nested: { querystring: true } }))
        }
        if (req.url === '/jsontext') {
          res.writeHead(200, { 'content-type': 'text/plain' })
          res.end(JSON.stringify({ json: true }))
        }
        if (req.url === '/qstext') {
          res.writeHead(200, { 'content-type': 'text/html' })
          res.end(qs.stringify({ nested: { querystring: true } }))
        }
      })
      server.listen(5000, done)
    })

    afterAll((done) => {
      server.close(done)
    })

    it('json', async () => {
      const { body } = await request({ url: 'http://localhost:5000/json' })
      t.deepStrictEqual(body, { json: true })
    })

    it('querystring', async () => {
      const { body } = await request({ url: 'http://localhost:5000/qs' })
      t.deepStrictEqual(body, { nested: { querystring: 'true' } })
    })

    it('json as text', async () => {
      const { body } = await request({ url: 'http://localhost:5000/jsontext' })
      t.deepStrictEqual(body, { json: true })
    })

    it('querystring as text', async () => {
      const { body } = await request({ url: 'http://localhost:5000/qstext' })
      t.deepStrictEqual(body, { nested: { querystring: 'true' } })
    })

    it('extend', async () => {
      let res = await request({ url: 'http://localhost:5000/qstext' })
      t.deepStrictEqual(res.body, { nested: { querystring: 'true' } })

      res = await compose.client({ url: 'http://localhost:5000/qstext' })
      t.equal(res.body, 'nested%5Bquerystring%5D=true')
    })
  })
})