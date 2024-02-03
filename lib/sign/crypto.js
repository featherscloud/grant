async function hashWithWebCrypto(algo, data) {
  // Convert the string to an ArrayBuffer
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // Hash the data with the specified algorithm (SHA-256 or SHA-1)
  const hashBuffer = await crypto.subtle.digest(algo, dataBuffer);

  // Convert the ArrayBuffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

module.exports = { hashWithWebCrypto }