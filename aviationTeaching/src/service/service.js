import {get} from './axios.js' // 导入axios实例文件中方法

// demo
export const demo = (url) => {
  // return get('/api/' + url)
  return get('/api/' + url)
}
