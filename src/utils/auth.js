// 对象转换为query参数
export const objToStr = function (obj) {
  // 准备好字符串
  let str = ''
  // 临时数组
  const temp = []
  // 遍历对象
  for (let key in obj) {
    temp.push(`${key}=${obj[key]}`)
  }
  str = temp.join('&')
  return str
}
