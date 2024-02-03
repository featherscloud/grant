const qs = require('qs')

const oauthOptions = require('./client/oauth')

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

module.exports = async (data) => {
  let { url, ...options } = data
  let { body, headers = {} } = options

  if (options.qs) {
    url += typeof options.qs === 'string' ? `?${options.qs}` : `?${qs.stringify(options.qs)}`
  }
  if (options.form) {
    headers['content-type'] = headers['content-type'] || 'application/x-www-form-urlencoded'
    body = typeof options.form === 'string' ? options.form : qs.stringify(options.form)
  }

  if (options.json) {
    headers['content-type'] = headers['content-type'] || 'application/json'
    body = typeof options.json === 'string' ? options.json : JSON.stringify(options.json)
  }

  options.headers = headers

  if (options.oauth) {
    Object.assign(options, oauthOptions(url, options))
  }

  if (options.auth) {
    const { user, pass } = options.auth
    headers['authorization'] = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`
  }

  headers['user-agent'] = `simov/grant`

  const response = await fetch(url, {
    headers,
    body,
    method: options.method
  })
  const textBody = await response.text()
  let result = textBody

  if (/json|javascript/.test(response.headers.get('content-type'))) {
    try {
      result = JSON.parse(textBody)
    } catch (err) {}
  } else if (/application\/x-www-form-urlencoded/.test(response.headers.get('content-type'))) {
    try {
      result = qs.parse(textBody) // use qs instead of querystring for nested objects
    } catch (err) {}
  }
  // some providers return incorrect content-type like text/html or text/plain
  else {
    try {
      result = JSON.parse(textBody)
    } catch (err) {
      result = qs.parse(textBody) // use qs instead of querystring for nested objects
    }
  }

  if (response.status >= 400) {
    const error = new Error(response.statusText)

    error.body = result
    error.res = response

    throw error
  }

  return {
    res: response,
    body: result
  }
}
