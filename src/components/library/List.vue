<template>
  <ul class="list">
    <li
      v-for="item in goods"
      :key="item.id"
      @click="$router.push('/goods/' + item.id)"
    >
      <img :src="item.pic" alt="" />
      <p class="title ellipsis">{{ item.name }}</p>
      <p class="des ellipsis" v-if="showDesc">{{ item.characteristic }}</p>
      <p class="price">{{ item.minPrice }}</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'goodsList',
  props: {
    goods: {
      required: true,
      type: Array,
    },
    showDesc: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  // 单行隐藏
  .ellipsis {
    overflow: hidden; /*超出的部分隐藏*/
    text-overflow: ellipsis; /*超出的部分显示省略号*/
    white-space: nowrap; /*只显示一行加上省略号*/
  }
  li {
    width: 48%;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 210px;
    }
    .title {
    }
    .des {
      margin-top: 5px;
      font-size: 14px;
      color: #a8a8a8;
    }
    .price {
      margin-top: 5px;
      font-size: 12px;
      color: #c00;
    }
  }
}
</style>
