import * as jose from 'jose'
import { hashWithWebCrypto } from './sign/crypto.js'

const base64url = (str) => str.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

export const kid = async (jwk) => {
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

  if (keys) {
    const hash = await hashWithWebCrypto('SHA-256', JSON.stringify(keys))
    return base64url(hash)
  }
}

export const x5t = async (cert) => {
  const s1 = cert.replace(/(?:-----(?:BEGIN|END) CERTIFICATE-----|\s)/g, '')
  const s2 = Buffer.from(s1, 'base64')
  const hash = await hashWithWebCrypto('SHA-1', s2)
  const s3 = hash.toUpperCase()
  return base64url(Buffer.from(s3, 'hex'))
}

export const pem = async (jwk) => {
  const imported = await jose.importJWK(jwk)
  const pkcs8Pem = await jose.exportPKCS8(imported)
  return pkcs8Pem
}

export const sign = async (jwt) => {
  const privateKey = await jose.importPKCS8(jwt.secret, jwt.header.alg)
  const signed = await new jose.SignJWT(jwt.payload).setProtectedHeader(jwt.header).sign(privateKey)
  return signed
}

export const jwt = (str) => {
  const [header, payload, signature] = str.split('.')
  return {
    header: JSON.parse(Buffer.from(header, 'base64').toString('binary')),
    payload: JSON.parse(Buffer.from(payload, 'base64').toString('utf8')),
    signature
  }
}
