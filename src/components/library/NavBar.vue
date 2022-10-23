<template>
  <div class="nav-bar-wrapper">
    <van-nav-bar
      :title="title"
      :right-text="rightText"
      left-arrow
      @click-left="$emit('click-left')"
      @click-right="$emit('click-right')"
    >
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    title: {
      type: String,
      required: true,
    },
    rightText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.nav-bar-wrapper {
  :deep(.van-nav-bar) {
    /* 
   :deep()   vue3 推荐的深度选择器的写法

  */
    .van-icon {
      color: #333;
    }
  }
}
</style>
