import request from '@/utils/request'

/* 
获取短信验证码

*/
export function getVerifityCode(data) {
  return request('small4/verification/sms/get', 'GET', data)
}

/* 
获取省数据

*/
export function getProvince() {
  return request('common/region/province', 'GET', {})
}

/* 
获取市--县区数据

*/
export function getCitys(pid) {
  return request(`common/region/child?pid=${pid}`, 'GET', {})
}

/* 
短信验证码校验
small4/verification/sms/check
*/

export function validateSms(query) {
  return request(`small4/verification/sms/check?${query}`, 'GET', {})
}

/* 
注册small4/user/m/register
*/
export function registerApi(query) {
  return request(`small4/user/m/register?${query}`, 'POST', {})
}
