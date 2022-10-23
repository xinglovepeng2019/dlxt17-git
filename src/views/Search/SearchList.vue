<template>
  <div class="search-list-wrapper">
    <nav-bar title="搜索列表" @click-left="$router.back()"></nav-bar>

    <goods-list :goods="searchList"></goods-list>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRecommendsList } from '@/api/home'

export default {
  name: 'searchList',

  setup() {
    const route = useRoute()
    const searchList = ref([])
    const getDate = async () => {
      // 接收参数
      const kw = route.query.kw
      console.log(kw, 'ke')
      // 请求所有的商品数据
      const data = await getRecommendsList()

      // 过滤
      searchList.value = data.filter((item) => item.name.indexOf(kw) > -1)
    }
    getDate()
    return { searchList }
  },
}
</script>

<style lang="less" scoped></style>
