<template>
  <div class="like-goods">
    <div class="like-goods-title">猜你喜欢</div>
    <ul class="like-list">
      <li v-for="item in goods" :key="item.id">
        <div class="img-box">
          <img :src="item.pic" alt="" />
          <div class="like-title ellipsis">{{ item.name }}</div>
        </div>
        <div class="like-desc ellipsis">{{ item.name }}</div>
        <div class="price-sell">
          <div class="price">￥{{ item.minPrice }}</div>
          <div class="sell">已售{{ item.numberSells }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LikeGoods',
  props: {
    goods: {
      type: Array,
      default: [],
    },
  },
}
</script>

<style lang="less" scoped>
.like-goods {
  .like-goods-title {
    line-height: 44px;
    text-align: center;
  }
  .like-list {
    .ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    box-sizing: border-box;
    li {
      margin-bottom: 10px;
      width: 49%;
      font-size: 14px;
      .img-box {
        width: 100%;
        img {
          width: 100%;
          height: 200px;
        }
        .like-title {
          background: #f0edd4;
          font-size: 12px;
          color: #b69b72;
        }
      }
      .like-desc {
        margin: 10px 0;
        color: #666;
      }
      .price-sell {
        display: flex;
        justify-content: space-between;
        .price {
          color: #c00;
        }
        .sell {
          font-size: 12px;
          color: #b2b2b2;
        }
      }
    }
  }
}
</style>
