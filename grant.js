import _handler from './lib/handler.js'

function grant({ handler, ...rest }) {
  return _handler(rest)
}

grant.node = (options) => {
  return options ? _handler(options) : _handler
}

grant.default = grant

export default grant
