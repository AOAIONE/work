import { BASE_URL } from '../../../static/config.js'
export var baseUrl =
  process.env.NODE_ENV === 'production' ? BASE_URL.ApiUrl : '/api'
