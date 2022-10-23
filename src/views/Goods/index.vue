<template>
  <div class="goods-detail">
    <!-- 头部区域 -->
    <div class="header">
      <!-- 轮播图 -->
      <van-swipe :autoplay="1000" indicator-color="white">
        <van-swipe-item v-for="item in pics" :key="item.id">
          <img :src="item.pic" />
        </van-swipe-item>
      </van-swipe>
      <!-- 返回按钮 -->
      <div class="back-wrapper" @click="$router.go(-1)">
        <van-icon name="arrow-left"></van-icon>
      </div>
    </div>
    <!-- 商品基本信息 -->
    <div class="goods-info-wrapper">
      <div class="title">{{ basicInfo.name }}</div>
      <div class="goods-price-store">
        <div class="price">
          <div class="min-price">低价:{{ basicInfo.minPrice }}</div>
          <div class="origin-price">原价：{{ basicInfo.originalPrice }}</div>
        </div>
        <div class="store">库存:100</div>
      </div>
    </div>
    <!-- 分割线 -->
    <my-line />
    <van-tabs v-model:active="active">
      <van-tab title="商品介绍">
        <div class="goods-introduce" v-html="content"></div>
      </van-tab>
      <van-tab title="商品评价">内容 2</van-tab>
    </van-tabs>
    <!-- 底部商品导航 -->
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="
          $store.getters['cart/cartListTotal'] > 0
            ? $store.getters['cart/cartListTotal']
            : ''
        "
        @click="$router.push('/cart')"
      />
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="showSkuPanel"
      />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
    <!-- 商品sku部分 -->
    <van-popup
      v-model:show="show"
      closeable
      position="bottom"
      transition-appear
    >
      <goods-sku
        :basicInfo="basicInfo"
        :id="id"
        :properties="properties"
        @skuEvent="skuChange"
      ></goods-sku>
    </van-popup>
  </div>
</template>

<script>
import { getGoodsDetail } from '@/api/cate'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const active = ref(0)
    const id = ref('')
    var show = ref(false)
    // 详情页数据
    var goods = reactive({
      basicInfo: {},
      content: '',
      pics: [],
      properties: [],
    })
    // 获取详情页数据
    onMounted(() => {
      // 接收id
      id.value = route.params.id
      // 调用
      getDetail()
    })

    const getDetail = async () => {
      let { basicInfo, content, pics, properties } = await getGoodsDetail(
        id.value
      )

      goods.pics = pics
      goods.basicInfo = basicInfo
      goods.content = content
      goods.properties = properties
    }

    // 点击加入购物车
    const showSkuPanel = () => {
      show.value = true
    }

    // 关闭sku面板
    const skuChange = () => {
      console.log(12)
      show.value = false
    }
    return { active, ...toRefs(goods), showSkuPanel, id, show, skuChange }
  },
}
</script>

<style lang="less" scoped>
.goods-detail {
  .header {
    position: relative;
    .van-swipe {
      width: 100%;
      height: 375px;
      .van-swipe-item {
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .back-wrapper {
      padding: 3px;
      position: absolute;
      top: 10px;
      left: 10px;
      z-index: 99;
      width: 30px;
      height: 30px;
      border: 1px solid #fff;
      border-radius: 50%;
      box-sizing: border-box;
      .van-icon-arrow-left {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 50%;
        font-size: 18px;
        line-height: 20px;
      }
    }
  }
  // 商品
  .goods-info-wrapper {
    padding: 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #b8b8b8;
    .title {
      font-size: 16px;
      color: #464646;
    }
    .goods-price-store {
      display: flex;
      justify-content: space-between;
      .price {
        display: flex;
        .min-price {
          margin-right: 10px;
          color: #c00;
        }
      }
    }
  }
  // :deep 选择器样式穿透
  :deep(.goods-introduce) {
    padding: 10px;
    box-sizing: border-box;
    img {
      width: 100% !important;
    }
  }
}
</style>
