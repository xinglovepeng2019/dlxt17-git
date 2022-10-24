<template>
  <div class="cart-wrapper">
    <!-- 购物车头部 -->
    <van-nav-bar
      title="购物车"
      :left-text="isShow ? '编辑' : '完成'"
      @click-left="isShow = !isShow"
    />
    <!-- 购物车内容区域 -->
    <div class="cart-container">
      <div class="cart-container-box">
        <!-- 购物车列表部分 -->
        <ul class="cart-list" v-if="$store.getters.carts.length > 0">
          <van-swipe-cell v-for="item in $store.getters.carts" :key="item.id">
            <li>
              <div class="cart-left">
                <!-- <my-checked v-model="item.checked"></my-checked> -->
                <my-checked
                  :modelValue="item.checked"
                  @change="($event) => checkOne(item.id, $event)"
                ></my-checked>
                <!-- <van-checkbox
                  checked-color="#c00"
                  v-model="item.checked"
                ></van-checkbox> -->
              </div>
              <div class="cart-right">
                <div class="img-box">
                  <img :src="item.pic" alt="" />
                </div>
                <div class="goods-info">
                  <div class="goods-title">{{ item.name }}</div>
                  <div class="goods-properties">{{ item.props }}</div>
                  <div class="goods-price-num">
                    <div class="goods-price">￥{{ item.price }}</div>
                    <van-stepper v-model="item.num" />
                  </div>
                </div>
              </div>
            </li>
            <template #right>
              <van-button
                square
                text="删除"
                @click="del(item.id)"
                class="delete-button"
              />
            </template>
          </van-swipe-cell>
        </ul>
        <!-- 购物车为空提示 -->
        <van-empty description="购物车空空如也" v-else>
          <p
            @click="$router.push('/goodslist')"
            :style="{ 'font-size': '14px', color: '#4fbaf3' }"
          >
            赶快去购物吧
          </p>
        </van-empty>

        <!-- 猜你喜欢列表部分 -->
        <like-goods :goods="likeList"></like-goods>
      </div>
    </div>
    <!-- 购物车底部footer -->
    <div class="cart-footer">
      <my-checked v-model="checkAll"></my-checked>
      <!-- <van-checkbox checked-color="#c00" v-model="checkAll">全选</van-checkbox> -->
      <div class="footer-right">
        <div class="total-price">
          <span class="total-price-text">合计: </span>
          <span class="totla-price-num"
            >￥{{ $store.getters['cart/selectedAmount'].toFixed(2) }}</span
          >
        </div>
        <div class="order-btn" v-if="isShow" @click="order">下单</div>
        <div class="order-btn" v-else @click="delChecked">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Dialog, Notify, Toast } from 'vant'
import { useLikeGoods } from './js/like-goods'
import { useRouter } from 'vue-router'
import myChecked from '@/components/library/myChecked.vue'

export default {
  components: { myChecked },
  setup() {
    const router = useRouter()
    const store = useStore()
    //  猜你喜欢数据
    const { likeList } = useLikeGoods()

    let isShow = ref(false)
    let acheck = ref(false)

    const checkAll = computed({
      get() {
        // 判断购物车中是否有商品
        if (store.state.cart.cartList.length) {
          // 判断购物车中所有商品是否全部被选中 只有有一个不选中 全选按钮就不选中
          var s = store.state.cart.cartList.every(
            (item) => item.checked === true
          )
          return s
        } else {
          return false
        }
      },
      set(val) {
        // 让所有购物车商品的状态和全选的状态一致
        store.commit('cart/chooseAll', val)
      },
    })

    // 点击删除按钮  批量删除
    const delChecked = async () => {
      const res = await Dialog.confirm({
        title: '提示',
        message: '您确定要删除选中的商品吗？',
      }).catch((err) => err)
      // 点击了确定按钮
      // console.log(res)
      if (res === 'confirm') {
        store.commit('cart/delChoose')
        Toast.success('删除成功')
      } else {
        Notify({ type: 'warning', message: '您取消了删除' })
      }
    }

    // 点击单个删除
    const del = async (id) => {
      const res = await Dialog.confirm({
        title: '提示',
        message: '您确定要删除选中的商品吗？',
      }).catch((err) => err)
      // 点击了确定按钮
      // console.log(res)
      if (res === 'confirm') {
        store.commit('cart/del', id)
        Toast.success('删除成功')
      } else {
        Notify({ type: 'warning', message: '您取消了删除' })
      }
    }

    // 下单
    const order = () => {
      // 判断是否登录
      if (sessionStorage.getItem('token')) {
        // 从购物车列表中筛选出选中的商品
        const orderList = store.state.cart.cartList.filter(
          (item) => item.checked
        )
        if (orderList.length > 0) {
          // 添加到vuex
          store.commit('order/order', [...orderList])
          // 跳转到确认订单页面
          router.push('/orderlist')
        } else {
          Notify({ type: 'warning', message: '您还没有选择任何商品' })
        }
      } else {
        Notify('您还没有登录，请登录')
        router.push('/login')
      }
    }
    // 单选
    const checkOne = (id, selected) => {
      // 调用mutaitions的方法 修改当前点击的数据的状态
      store.commit('cart/changeState', { id, selected })
    }

    return {
      checkAll,
      acheck,
      isShow,
      delChecked,
      likeList,
      del,
      order,
      checkOne,
    }
  },
}
</script>

<style lang="less" scoped>
.cart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.van-nav-bar) {
    .van-nav-bar__text {
      color: #c00;
    }
  }
  .cart-container {
    flex: 1;
    overflow-y: auto;
    .cart-container-box {
      padding-bottom: 100px;
      .cart-list {
        padding: 10px;
        box-sizing: border-box;
        li {
          display: flex;
          margin-bottom: 15px;
          .cart-left {
            width: 40px;
            display: flex;
            align-items: center;
          }
          .cart-right {
            margin-left: 10px;
            display: flex;
            .img-box {
              width: 87px;
              height: 87px;
              border-radius: 5px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .goods-info {
              margin-left: 10px;
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              align-content: space-between;
              font-size: 14px;
              .goods-title {
                width: 100%;
              }
              .goods-properties {
                width: 100%;
                font-size: 12px;
                color: #b2b2b2;
              }
              .goods-price-num {
                width: 100%;
                display: flex;
                justify-content: space-between;
                .goods-price {
                  color: #c00;
                }
              }
            }
          }
        }
        .delete-button {
          margin-left: 10px;
          height: 100%;
          background: #c00;
          color: #fff;
        }
      }
    }
  }
  .cart-footer {
    padding-left: 10px;
    position: fixed;
    bottom: 50px;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 50px;
    background: #fff;
    border-top: 1px solid #f5f5f5;
    font-size: 14px;
    display: flex;
    box-sizing: border-box;
    .van-checkbox {
      width: 80px;
      box-sizing: border-box;
      font-size: 12px;
    }
    .footer-right {
      flex: 1;
      display: flex;
      line-height: 50px;
      .total-price {
        flex: 1;
        text-align: right;
        color: #c00;
      }
      .order-btn {
        margin-left: 10px;
        width: 132px;
        background: #c00;
        text-align: center;
        color: #fff;
      }
    }
  }
}
</style>
