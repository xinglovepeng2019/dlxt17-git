<template>
  <div class="search-wrapper">
    <!-- 搜索区域 -->
    <van-search
      v-model="kw"
      show-action
      shape="round"
      placeholder="请输入搜索的关键词"
      autofocus
      @cancel="$router.push('/cate')"
      @search="sureSeach"
      @input="search"
    />

    <!-- 搜索历史区域 -->
    <!-- template  想要把多个标签包括起来，但是又不想渲染多余的标签 使用template 不会做渲染 -->
    <template v-if="kw.length === 0 || searchList.length === 0">
      <div class="history-wrapper">
        <span>历史记录</span>
        <van-icon
          name="delete-o"
          :size="18"
          @click="$store.commit('history/clearHistory')"
        ></van-icon>
      </div>
      <!-- 搜索关键字 -->
      <div class="search-keyword">
        <van-tag v-for="item in $store.getters['searchList']" :key="item">{{
          item
        }}</van-tag>
      </div>
    </template>

    <!-- 搜索列表 -->
    <ul class="search-list" v-else>
      <li v-for="item in searchList" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getRecommendsList } from '@/api/home'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    // 定时器
    const timer = ref(null)
    const kw = ref('')
    // 搜索列表
    const searchList = ref([])
    //  确定搜索
    const sureSeach = (val) => {
      console.log(val, 'val')
      // 调用history中mutations的方法
      store.commit('history/saveHistory', kw.value)
      kw.value = ''
      // 跳转到搜索的列表页面
      router.push('/searchlist?kw=' + val)
    }

    // input --搜索功能
    const search = () => {
      // 先清除所有的定时器，保证当前只有一个定时器在执行
      clearTimeout(timer.value)
      timer.value = setTimeout(async () => {
        if (kw.value.trim()) {
          // 调用商品列表接口 请求商品列表数据
          const data = await getRecommendsList()
          //  从商品列表中过滤出包含搜索关键词的数据
          searchList.value = data.filter((item) => item.name.includes(kw.value))
        }
      }, 500)
    }
    return { kw, searchList, sureSeach, search }
  },
}
</script>

<style lang="less" scoped>
.search-wrapper {
  .history-wrapper {
    display: flex;
    padding: 10px 0;
    margin: 0 10px;
    justify-content: space-between;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    font-size: 12px;
  }
  .search-keyword {
    margin-top: 10px;
    .van-tag {
      margin-left: 10px;
      padding: 2px 4px;
      box-sizing: border-box;
    }
  }
  .search-list {
    margin-top: 5px;
    background-color: #f5f5f5;
    li {
      padding: 0 10px;
      line-height: 30px;
      font-size: 14px;
      box-sizing: border-box;
    }
  }
}
</style>
