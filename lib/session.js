import crypto from 'crypto'
import cookie from 'cookie'
import * as signature from './sign/cookie.js'

export default ({ name, secret, cookie: options, store }) => {
  name = name || 'grant'
  options = options || {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  }

  if (!secret) {
    throw new Error('Grant: cookie secret is required')
  }

  const embed = !store

  return (req) => {
    const headers = Object.keys(req.headers)
      .filter((key) => /(?:set-)?cookie/i.test(key))
      .reduce((all, key) => ((all[key.toLowerCase()] = req.headers[key]), all), {})

    headers['set-cookie'] =
      headers['set-cookie'] || (req.multiValueHeaders && req.multiValueHeaders['Set-Cookie']) || []

    const cookies = {
      input:
        // vercel - parsed object
        typeof req.cookies === 'object' && !(req.cookies instanceof Array)
          ? req.cookies
          : cookie.parse(
              headers.cookie
                ? headers.cookie
                : // aws v2 event - array of key=value pairs
                req.cookies
                ? req.cookies.join('; ')
                : ''
            ),
      output: headers['set-cookie'].reduce(
        (all, str) => ((all[str.split(';')[0].split('=')[0]] = str), all),
        {}
      )
    }

    const encode = (payload, opt = {}) => {
      const data = embed ? Buffer.from(JSON.stringify(payload)).toString('base64') : payload
      const value = signature.sign(data, secret)
      const output = cookie.serialize(name, value, { ...options, ...opt })
      cookies.output[name] = output
      headers['set-cookie'] = Object.keys(cookies.output).map((name) => cookies.output[name])
    }

    const cookieStore = () => {
      let session = (() => {
        const payload = signature.unsign(cookies.input[name] || '', secret)
        try {
          return JSON.parse(Buffer.from(payload, 'base64').toString())
        } catch (err) {
          return { grant: {} }
        }
      })()
      const store = {
        get: async (sid) => session,
        set: async (sid, value) => (session = value),
        remove: async (sid) => (session = {})
      }
      return {
        get: async () => {
          return store.get()
        },
        set: async (value) => {
          encode(value)
          return store.set(null, value)
        },
        remove: async () => {
          encode('', { maxAge: 0 })
          await store.remove()
        },
        cookies,
        headers
      }
    }

    const sessionStore = () => {
      const sid =
        signature.unsign(cookies.input[name] || '', secret) || crypto.randomBytes(20).toString('hex')
      return {
        get: async () => {
          return (await store.get(sid)) || { grant: {} }
        },
        set: async (value) => {
          encode(sid)
          return store.set(sid, value)
        },
        remove: async () => {
          encode(sid, { maxAge: 0 })
          await store.remove(sid)
        },
        cookies,
        headers
      }
    }

    return embed ? cookieStore() : sessionStore()
  }
}
