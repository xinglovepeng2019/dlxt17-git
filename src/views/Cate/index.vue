<template>
  <div class="cate-wrapper">
    <!-- 搜索区域 -->
    <van-search
      shape="round"
      @focus="$router.push('/search')"
      placeholder="请输入搜索的关键词"
    ></van-search>
    <!-- 分类区域 -->
    <div class="cate-container">
      <!-- 侧边栏 -->
      <div class="cate-left">
        <van-sidebar @change="onChange" v-model="activeKey">
          <van-sidebar-item title="所有分类"></van-sidebar-item>
          <van-sidebar-item
            v-for="item in asideList"
            :key="item.id"
            :title="item.name"
          ></van-sidebar-item>
        </van-sidebar>
      </div>
      <!-- 右侧内容 -->
      <div class="cate-right">
        <div class="cate-right-box">
          <!-- 轮播图 -->
          <div class="swipe-wrapper">
            <van-swipe :autoplay="3000" indicator-color="white">
              <van-swipe-item> 1111 </van-swipe-item>
            </van-swipe>
          </div>
          <!-- 二级分类内容 -->
          <ul class="cate-list">
            <li
              v-for="item in cateSecondList"
              :key="item.id"
              @click="$router.push('/catelist/' + item.id)"
            >
              <img :src="item.icon" alt="" />
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Toast } from 'vant'
import { getCates } from '@/api/cate'
export default {
  setup() {
    const activeKey = ref(0)
    // 点击左侧分类
    const onChange = (index) => {
      if (index === 0) {
        // 点击的是所有分类
        cateSecondList.value = cateAllList.value
      } else {
        // 从左侧的分类数据中找到当前点击的分类的type的值
        const type = asideList.value[index - 1].type
        // 从所有分类中过滤出来type属性中包含从左侧分类中找到的type的属性值
        cateSecondList.value = cateAllList.value.filter((item) =>
          item.type.includes(type)
        )
      }
    }

    // 设置分类数据
    const cateAllList = ref([])
    // 左侧分类数据
    const asideList = ref([]) //['居家0'，'配件装饰1','服装','电器']
    // 二级分类右侧
    const cateSecondList = ref([])
    const getCateList = async () => {
      const data = await getCates()
      // 给所有的分类赋值 二级分类 也默认是所有的分类
      cateAllList.value = cateSecondList.value = data
      // 过滤左侧分类
      asideList.value = data.filter((item) => item.level === 1)
    }

    getCateList()
    return {
      activeKey,
      onChange,
      asideList,
      cateSecondList,
    }
  },
}
</script>

<style scoped lang="less">
@import url('~@/styles/cate.less');
</style>
