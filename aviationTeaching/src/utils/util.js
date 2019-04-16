import CryptoJS from 'crypto-js/crypto-js'

let key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5('mima').toString())
let iv = CryptoJS.enc.Utf8.parse(
  CryptoJS.MD5(key)
    .toString()
    .substr(0, 16)
)
const util = {
  /* AES加密
   * param : data 明文
   * return :  string 密文
   */
  encrypt (data) {
    var encrypted = ''
    if (typeof data === 'string') {
      encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
    } else if (typeof data === 'object') {
      data = JSON.stringify(data)
      encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      })
    }
    return encrypted.toString()
  },

  /* AES解密
   * param : message 密文
   * return : decrypted string 明文
   */
  decrypt (message) {
    let decrypted = CryptoJS.AES.decrypt(message, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
export default util
