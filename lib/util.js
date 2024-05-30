export const compose =
  (...fns) =>
  (args) =>
    fns.reduce((p, f) => p.then(f), Promise.resolve(args))

export const dcopy = (obj) => JSON.parse(JSON.stringify(obj))
