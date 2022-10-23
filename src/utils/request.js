// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise

import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'vant'

// https://api.it120.cc/common/region/province
// 导出基准地址，原因：其他地方不是通过axios发请求的地方用上基准地址
export const baseURL = 'https://api.it120.cc/'

const instance = axios.create({
  // axios 的一些配置，baseURL  timeout
  baseURL,
  timeout: 5000,
})
// 请求拦截
instance.interceptors.request.use()
// 响应拦截
instance.interceptors.response.use(
  function (response) {
    let {
      data: { data, code, msg },
    } = response
    console.log(code, 0)

    if (code === 0) {
      return data
    } else {
      Notify(msg)
      return Promise.reject('error')
    }
  },
  function (error) {
    // 对响应错误进行处理
    return Promise.reject(error)
  }
)

// 挂载到vue的原型上  每一个组件都可以访问$axios属性
// Vue.prototype.$axios = instance

// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    // method参数：get,Get,GET  转换成小写再来判断
    // 在对象，['params']:submitData ===== params:submitData 这样理解
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  })
}
