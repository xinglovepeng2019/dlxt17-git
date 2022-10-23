<template>
  <div class="order-list">
    <nav-bar title="确认订单" @click-left="$router.go(-1)" />
    <div class="order-list-content">
      <div class="order-list-box">
        <!-- 默认地址区域 -->
        <div class="default-address-box">
          <default-address
            :userInfo="userInfo"
            @click-right="$router.push('/myaddress')"
          />
          <div class="border-img">
            <img src="/img/border.png" alt="" />
          </div>
        </div>
        <my-line />
        <!-- 商品列表区域 -->
        <div class="goods-list-wrapper">
          <div class="goods-list-title">商品列表</div>
          <ul class="goods-list">
            <li v-for="item in $store.getters.orderList" :key="item.id">
              <div class="img-box">
                <img :src="item.pic" alt="" />
              </div>
              <div class="goods-info-box">
                <div class="goods-title-box">
                  <div class="goods-title">{{ item.name }}</div>
                  <div class="goods-price">￥{{ item.price }}</div>
                </div>
                <div class="goods-props-box">
                  <div class="goods-props">{{ item.props }}</div>
                  <div class="goods-num">{{ item.num }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <my-line />
        <!-- 快递区域 -->
        <div class="kuaidi-wrapper money-wrapper">
          <div class="title">配送方式</div>
          <div class="type">快递</div>
        </div>
        <div class="beizhu">
          <div class="title">备注</div>
          <div class="input-wrapper">
            <input type="text" placeholder="如需备注请输入" />
          </div>
        </div>
        <div class="border-line"></div>
        <my-line />
        <!-- 商品金额区域 -->
        <div class="money-wrapper">
          <div class="title">商品金额</div>
          <div class="type">￥{{ $store.getters['order/orderPrice'] }}</div>
        </div>
        <my-line />
      </div>
    </div>
    <div class="footer">
      <div class="price">合计：￥1999</div>
      <div class="submit-order" @click="submitOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import { userDefAddress } from './js/defaultAddress.js'
import { useStore } from 'vuex'
import { createOrder } from '@/api/order'
import { useRouter } from 'vue-router'
export default {
  name: 'order-list',
  setup() {
    const store = useStore()
    const router = useRouter()

    let { userInfo } = userDefAddress()

    // 提交订单
    const submitOrder = async () => {
      // 对订单数据进行处理   goodsJsonStr
      const goodsJson = store.getters.orderList.map((item) => {
        return {
          logisticsType: 0,
          goodsId: item.goodsId,
          number: item.num,
          propertyChildIds: item.id,
        }
      })
      // 创建formData对象
      const formdata = new FormData()
      // 将需要的数据添加到FormData对象中
      formdata.append('token', sessionStorage.getItem('token'))
      formdata.append('goodsJsonStr', JSON.stringify(goodsJson))
      // 请求生成订单的接口
      const { amount, orderNumber, id } = await createOrder(formdata)
      // 将商品价格，订单号，id存储到vuex中
      store.commit('order/submitOrder', { amount, orderNumber, id })
      // 跳转到确认付款页面
      router.push('/parment')

      // console.log(res)
    }

    return { userInfo, submitOrder }
  },
}
</script>

<style lang="less" scoped>
.order-list {
  height: 100%;
  .money-wrapper {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    height: 44px;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 44px;
  }
  .order-list-content {
    overflow-y: auto;
    .order-list-box {
      .border-img {
        width: 100%;
        height: 1px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goods-list-wrapper {
        .goods-list-title {
          padding-left: 20px;
          font-size: 12px;
          line-height: 44px;
          border-bottom: 2px solid #e8e8e8;
          box-sizing: border-box;
        }
        .goods-list {
          li {
            padding: 20px;
            display: flex;
            border-bottom: 1px solid #e8e8e8;
            box-sizing: border-box;
            &:last-child {
              border-bottom: 0;
            }
            .img-box {
              width: 80px;
              height: 80px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .goods-info-box {
              margin-left: 10px;
              flex: 1;
              display: flex;
              align-content: space-between;
              flex-wrap: wrap;
              font-size: 13px;
              .goods-title-box {
                width: 100%;
                display: flex;
                justify-content: space-between;
              }
              .goods-props-box {
                width: 100%;
                display: flex;
                justify-content: space-between;
                color: #999;
              }
            }
          }
        }
      }
      .kuaidi-wrapper {
        border-bottom: 1px solid #e8e8e8;
      }
      .beizhu {
        padding: 0 20px;
        display: flex;
        height: 44px;
        box-sizing: border-box;
        font-size: 13px;
        line-height: 44px;
        .title {
          width: 80px;
        }
        .input-wrapper {
          flex: 1;
          input {
            border: 0;
          }
        }
      }
      .border-line {
        margin: 0 auto;
        height: 1px;
        background: #0098e9;
        transition: all 1s;
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    z-index: 99;
    background: #fff;
    display: flex;
    justify-content: flex-end;
    .price {
      margin-right: 20px;
      font-size: 15px;
      color: #b7282e;
    }
    .submit-order {
      width: 125px;
      background: #b7282e;
      line-height: 50px;
      text-align: center;
      color: #fff;
    }
  }
}
</style>
