const compose = require('request-compose')
const oauth = require('request-oauth')
const qs = require('qs')

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

module.exports = compose.extend({
  Request: { defaults, oauth },
  Response: { parse }
}).client
