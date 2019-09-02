// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
// import SHA256 from 'crypto-js/sha256'
import HMACSHA256 from 'crypto-js/hmac-sha256'
// import Base64 from 'crypto-js/enc-base64'

export const create = (api) => ({
  getQrCodeImage: (data, opt) => {
    // api.setHeader(AppConfig.authHeader, opt.session.token_type + ' ' + opt.session.access_token)
    let url = opt.url || '/paymentpage/qrcode/getQrCodeImage'
    let method = opt.method || 'get'
    let key = 'xxxx'
    let msg = JSON.stringify(data)
    // var key = CryptoJS.enc.Hex.parse('0123456789abcdef');
    // let sha256Msg = SHA256('test', key)
    // let hmacsha256Msg = '' + HMACSHA256(msg, key)
    // let hmacsha256MsgUpper = '' + hmacsha256Msg.toUpperCase()
    // var hashInBase64 = Base64.stringify(sha256Msg)
    // api.setHeader('hmac', hmacsha256MsgUpper)
    return api[method](url, data)
  }
})
