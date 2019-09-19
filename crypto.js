var CryptoJS = require("crypto-js");
 
var data = "message"
 
// Encrypt
var ciphertext = CryptoJS.AES.encrypt(data, 'prismalink2019');
var encryptedData = ciphertext.toString()
console.log('plan=> ', data)
console.log('encryptedData=> ', encryptedData)
// Decrypt
var bytes  = CryptoJS.AES.decrypt(encryptedData, 'prismalink2019');
var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
console.log('decryptedData=> ', decryptedData)