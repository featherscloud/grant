const crypto = require('crypto')
const jose = require('jose')

const base64url = (str) => str.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

const kid = (jwk) => {
  if (jwk.kid) {
    return jwk.kid
  }
  const keys =
    jwk.kty === 'RSA'
      ? { e: jwk.e, kty: jwk.kty, n: jwk.n }
      : jwk.kty === 'EC'
      ? { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y }
      : jwk.kty === 'oct'
      ? { k: jwk.k, kty: jwk.kty }
      : undefined
  return keys ? base64url(crypto.createHash('sha256').update(JSON.stringify(keys)).digest()) : undefined
}

const x5t = (cert) => {
  const s1 = cert.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '')
  const s2 = Buffer.from(s1, 'base64')
  const s3 = crypto.createHash('sha1').update(s2).digest('hex').toUpperCase()
  return base64url(Buffer.from(s3, 'hex'))
}

const pem = async (jwk) => {
  const imported = await jose.importJWK(jwk)
  const pkcs8Pem = await jose.exportPKCS8(imported)
  return pkcs8Pem
}

const sign = async (jwt) => {
  const privateKey = await jose.importPKCS8(jwt.secret, jwt.header.alg)
  const signed = await new jose.SignJWT(jwt.payload)
    .setProtectedHeader(jwt.header)
    .sign(privateKey)
  return signed
}

const jwt = (str) => {
  const [header, payload, signature] = str.split('.')
  return {
    header: JSON.parse(Buffer.from(header, 'base64').toString('binary')),
    payload: JSON.parse(Buffer.from(payload, 'base64').toString('utf8')),
    signature
  }
}

module.exports = { base64url, kid, x5t, pem, sign, jwt }
