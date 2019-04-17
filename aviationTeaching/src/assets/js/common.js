import BASE_URL from '../../../static/config.js'
const baseUrl = process.env.NODE_ENV === 'production' ? BASE_URL.ApiUrl : '/api'
export default baseUrl
