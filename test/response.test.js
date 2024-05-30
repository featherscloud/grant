import { describe, it } from 'vitest'
import t from 'assert'
import * as response from '../lib/response.js'

const sign = (...args) =>
  args
    .map((arg, index) =>
      index < 2
        ? Buffer.from(JSON.stringify(arg))
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
        : arg
    )
    .join('.')

describe('response', () => {
  it('concur', () => {
    const provider = { concur: true }
    const input = {}
    const output =
      '<Access_Token>\r\n' +
      '  <Instance_Url>https://www.concursolutions.com/</Instance_Url>\r\n' +
      '  <Token>q962LLopjMgTOeTn3fRN+5uABCg=</Token>\r\n' +
      '  <Expiration_date>9/25/2016 1:36:50 PM</Expiration_date>\r\n' +
      '  <Refresh_Token>AXvRqWeb77Lq9F2WK6TXLCSTuxpwZO6</Refresh_Token>\r\n' +
      '</Access_Token>'
    t.deepEqual(response.data({ provider, input, output }).output, {
      access_token: 'q962LLopjMgTOeTn3fRN+5uABCg=',
      refresh_token: 'AXvRqWeb77Lq9F2WK6TXLCSTuxpwZO6',
      raw: output
    })
  })

  it('getpocket', () => {
    const provider = { getpocket: true }
    const input = {}
    const output = { access_token: 'token' }
    t.deepEqual(response.data({ provider, input, output }).output, {
      access_token: 'token',
      raw: { access_token: 'token' }
    })
  })

  it('yammer', () => {
    const provider = { yammer: true }
    const input = {}
    const output = { access_token: { token: 'token' } }
    t.deepEqual(response.data({ provider, input, output }).output, {
      access_token: 'token',
      raw: { access_token: { token: 'token' } }
    })
  })

  it('oauth1', () => {
    const provider = { oauth: 1 }
    const input = {}
    const output = { oauth_token: 'token', oauth_token_secret: 'secret' }
    t.deepEqual(response.data({ provider, input, output }).output, {
      access_token: 'token',
      access_secret: 'secret',
      raw: { oauth_token: 'token', oauth_token_secret: 'secret' }
    })
  })

  it('oauth2', () => {
    const provider = { oauth: 2 }
    const input = { session: {} }
    const output = {
      id_token: sign({ typ: 'JWT' }, { hey: 'hi' }, 'signature'),
      access_token: 'token',
      refresh_token: 'refresh'
    }
    t.deepEqual(response.data({ provider, input, output }).output, {
      id_token: 'eyJ0eXAiOiJKV1QifQ.eyJoZXkiOiJoaSJ9.signature',
      access_token: 'token',
      refresh_token: 'refresh',
      raw: {
        id_token: 'eyJ0eXAiOiJKV1QifQ.eyJoZXkiOiJoaSJ9.signature',
        access_token: 'token',
        refresh_token: 'refresh'
      }
    })
  })

  describe('id_token', () => {
    it('invalid format', () => {
      const provider = { oauth: 2, response: ['jwt'] }
      const input = {}
      const output = { id_token: sign('a', 'b') }
      t.deepEqual(response.data({ provider, input, output }).output, {
        error: 'Grant: OpenID Connect invalid id_token format'
      })
    })

    it('error decoding', () => {
      const provider = { oauth: 2, response: ['jwt'] }
      const input = {}
      const output = { id_token: 'a.b.c' }
      t.deepEqual(response.data({ provider, input, output }).output, {
        error: 'Grant: OpenID Connect error decoding id_token'
      })
    })

    it('invalid audience - string', () => {
      const provider = { oauth: 2, key: 'simov', response: ['jwt'] }
      const input = {}
      const output = { id_token: sign({}, { aud: 'grant' }, 'c') }
      t.deepEqual(response.data({ provider, input, output }).output, {
        error: 'Grant: OpenID Connect invalid id_token audience'
      })
    })

    it('invalid audience - array', () => {
      const provider = { oauth: 2, key: 'simov', response: ['jwt'] }
      const input = {}
      const output = { id_token: sign({}, { aud: ['grant'] }, 'c') }
      t.deepEqual(response.data({ provider, input, output }).output, {
        error: 'Grant: OpenID Connect invalid id_token audience'
      })
    })

    it('nonce mismatch', () => {
      const provider = { oauth: 2, key: 'grant', response: ['jwt'] }
      const input = { session: { nonce: 'bar' } }
      const output = { id_token: sign({}, { aud: 'grant', nonce: 'foo' }, 'c') }
      t.deepEqual(response.data({ provider, input, output }).output, {
        error: 'Grant: OpenID Connect nonce mismatch'
      })
    })

    it('valid jwt', () => {
      const provider = { oauth: 2, key: 'grant', response: ['tokens', 'jwt'] }
      const input = { session: { nonce: 'foo' } }
      const output = { id_token: sign({ typ: 'JWT' }, { aud: 'grant', nonce: 'foo' }, 'signature') }
      t.deepEqual(response.data({ provider, input, output }).output, {
        id_token: 'eyJ0eXAiOiJKV1QifQ.eyJhdWQiOiJncmFudCIsIm5vbmNlIjoiZm9vIn0.signature',
        jwt: {
          id_token: {
            header: { typ: 'JWT' },
            payload: { aud: 'grant', nonce: 'foo' },
            signature: 'signature'
          }
        }
      })
    })

    it('valid jwt - audience array', () => {
      const provider = { oauth: 2, key: 'grant', response: ['tokens', 'jwt'] }
      const input = { session: { nonce: 'foo' } }
      const output = { id_token: sign({ typ: 'JWT' }, { aud: ['grant'], nonce: 'foo' }, 'signature') }
      t.deepEqual(response.data({ provider, input, output }).output, {
        id_token: 'eyJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiZ3JhbnQiXSwibm9uY2UiOiJmb28ifQ.signature',
        jwt: {
          id_token: {
            header: { typ: 'JWT' },
            payload: { aud: ['grant'], nonce: 'foo' },
            signature: 'signature'
          }
        }
      })
    })
  })
})
