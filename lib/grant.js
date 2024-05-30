import { compose } from './util.js'
import { defaults, connect, callback } from './request.js'
import { data, transport } from './response.js'
import _config from './config.js'
import profile from './profile.js'

export default ({ config, request, state, extend }) => {
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
