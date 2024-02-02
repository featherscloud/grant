const compose =
  (...fns) =>
  (args) =>
    fns.reduce((p, f) => p.then(f), Promise.resolve(args))

const dcopy = (obj) => JSON.parse(JSON.stringify(obj))

module.exports = { compose, dcopy }
