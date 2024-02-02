const { compose } = require('./util.js')
const { defaults, connect, callback } = require('./request.js')
const { data, transport } = require('./response.js')
const _config = require('./config.js')
const profile = require('./profile.js')

module.exports = ({ config, request, state, extend }) => {
  config = _config(config)

  if (!extend) {
    extend = [profile]
  }

  const pipe = compose(
    defaults(config),

    ({ provider, input, input: { params } }) =>
      params.override !== 'callback'
        ? connect({ request })({ provider, input })
        : compose(
            callback({ request })({ provider, input }),
            data,
            extend ? compose(...extend.map((fn) => fn({ request, state }))) : (args) => ({ ...args })
          )({ provider, input }),

    transport
  )

  pipe.config = config
  return pipe
}
