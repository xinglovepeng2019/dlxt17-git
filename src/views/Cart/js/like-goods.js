import { ref } from 'vue'
import { getRecommendsList } from '@/api/home'

export const useLikeGoods = () => {
  // 定义猜你喜欢数据
  const likeList = ref([])

  const getLikeList = async () => {
    const res = await getRecommendsList()
    // 将生成的指定个数的不重复的数组赋值给likeList

    likeList.value = await random(res)
  }

  // 封装数组去重的方法
  /* 
   @param arr  要去重的数组
   @param uid  根据数组中那个属性进行去重  使用id
  */
  const uniqueEl = (arr, uid) => {
    // 1 创建一个Map()
    const res = new Map()
    return arr.filter((item) => !res.has(item[uid]) && res.set(item[uid], 1))
  }

  // 生成指定个数的随机数方法
  /*
   @param arr 生成指定个数数组的原数组
    @param maxLen  生成数组元素的个数

   */
  const random = (arr, maxLen = 4) => {
    // 临时数组
    let tempArr = []
    while (tempArr.length < maxLen) {
      // 生成一个随机下标
      const randomIndex = parseInt(Math.random() * arr.length)
      // 将数组元素添加到临时数组中
      tempArr.push(arr[randomIndex])
      // 对临时数组进行去重
      tempArr = uniqueEl(tempArr, 'id')
    }
    return tempArr
  }

  getLikeList()

  return { likeList }
}
