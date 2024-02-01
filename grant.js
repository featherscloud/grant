
function grant ({handler, ...rest}) {
  return require('./lib/handler')(rest)
}

grant.node = (options) => {
  var handler = require('./lib/handler')
  return options ? handler(options) : handler
}

grant.default = grant
module.exports = grant
