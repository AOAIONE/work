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
  },
  /**
   * ios Android 时间转化时间戳兼容
   */
  formatTimeStamp () {
    return Date.parse(new Date()) || Date.parse(new Date())
  },
  /**
   * 日期转换
   * @param {*} time
   */
  dateFormat (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month =
      date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    // var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    // var minutes =
    //   date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    // var seconds =
    //   date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    // 拼接
    return year + '-' + month + '-' + day
  }
}

export default util
