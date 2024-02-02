const compose = require('request-compose')
const qs = require('qs')

const oauth = require('./client/oauth')

const defaults = (args) => () => {
  const { options } = compose.Request.defaults(args)()
  options.headers['user-agent'] = `simov/grant`
  return { options }
}

const parse =
  () =>
  ({ options, res, res: { headers }, body, raw }) => {
    raw = body

    const header = Object.keys(headers).find((name) => name.toLowerCase() === 'content-type')

    if (/json|javascript/.test(headers[header])) {
      try {
        body = JSON.parse(body)
      } catch (err) {}
    } else if (/application\/x-www-form-urlencoded/.test(headers[header])) {
      try {
        body = qs.parse(body) // use qs instead of querystring for nested objects
      } catch (err) {}
    }

    // some providers return incorrect content-type like text/html or text/plain
    else {
      try {
        body = JSON.parse(body)
      } catch (err) {
        body = qs.parse(body) // use qs instead of querystring for nested objects
      }
    }

    return { options, res, body, raw }
  }

const { client } = compose.extend({
  Request: { defaults, oauth },
  Response: { parse }
})

/*
interface RequestComposeOptions {
  url?: string
  proxy?: string
  qs?: object | string
  form?: object | string
  json?: object | string
  body?: string | Buffer | stream.Readable
  multipart?: object | []
  auth?: AuthOptions
  oauth?: OAuthOptions
  encoding?: string
  cookie?: object
  redirect?: RedirectOptions
}
*/

module.exports = (options) => {
  // options.oauth
  // options.qs
  // let { url, body, headers = {} } = options

  // if (options.qs) {
  //   url += typeof options.qs === 'string' ? `?${options.qs}` : `?${qs.stringify(options.qs)}`
  // }

  // if (options.form) {
  //   headers['content-type'] = headers['content-type'] || 'application/x-www-form-urlencoded'
  //   body = typeof options.form === 'string' ? options.form : qs.stringify(options.form)
  // }

  // if (options.json) {
  //   headers['content-type'] = headers['content-type'] || 'application/json'
  //   body = typeof options.json === 'string' ? options.json : JSON.stringify(options.json)
  // }

  // if (options.oauth) {

  // }

  // fetch({
  //   url,
  //   headers,
  //   body,
  //   method: options.method
  // })
  return client(options)
}
