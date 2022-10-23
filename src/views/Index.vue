<template>
  <div class="container">
    <router-view></router-view>
    <!-- route	是否开启路由模式 -->
    <van-tabbar active-color="#c00" route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/cate">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item icon="user-o" to="/my">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.container {
  height: 100%;
}
</style>
