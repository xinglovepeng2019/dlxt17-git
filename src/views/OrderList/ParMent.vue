<template>
  <div class="pay-ment">
    <nav-bar title="确认付款" @click-left="$router.back()" />
    <!-- 订单信息区域 -->
    <div class="amount-wrapper">
      <van-icon name="gold-coin-o" :size="22" />
      <div class="order-info">
        <div class="order-price-wrapper">
          <span class="order-price-text">商品总额：</span>
          <span class="order-price"
            >￥{{ $store.getters['orderData']['amount'] }}</span
          >
        </div>
        <div class="order-number">
          订单号：{{ $store.getters['orderData']['orderNumber'] }}
        </div>
      </div>
    </div>
    <!-- 收货地址区域 -->
    <default-address
      color="rgb(84, 159, 249)"
      :userInfo="userInfo"
      :size="22"
      :isArrow="false"
    />
    <!-- 支付按钮 -->
    <div class="payment-btn" @click="payment">
      微信支付￥{{ $store.getters['orderData']['amount'] }}
    </div>
  </div>
</template>

<script>
import { Notify } from 'vant'
import { userDefAddress } from './js/defaultAddress.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  name: 'pay-ment',
  setup() {
    const store = useStore()
    const router = useRouter()
    let { userInfo } = userDefAddress()

    const payment = () => {
      // 给出提示
      Notify({ type: 'success', message: '支付成功' })
      // 调用mutations方法 清空购物车和订单列表数据
      store.commit('payment')
      // 跳转到首页
      router.push('/home')
    }

    return { userInfo, payment }
  },
}
</script>

<style lang="less" scoped>
.pay-ment {
  .amount-wrapper {
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e9e9e9;
    font-size: 12px;
    box-sizing: border-box;
    .van-icon {
      color: #f8662f;
    }
    .order-info {
      margin-left: 15px;
      .order-price-wrapper {
        font-size: 14px;
        .order-price {
          font-size: 12px;
          color: #c00;
        }
      }
      .order-number {
        margin-top: 12px;
        color: #999;
      }
    }
  }
  .payment-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 50px;
    text-align: center;
    color: #fff;
    line-height: 50px;
    background: #c00;
  }
}
</style>
