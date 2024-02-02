const _handler = require('./lib/handler')

function grant({ handler, ...rest }) {
  return _handler(rest)
}

grant.node = (options) => {
  return options ? _handler(options) : _handler
}

grant.default = grant
module.exports = grant
