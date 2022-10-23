export default {
  namespaced: true,
  state: {
    // 订单列表
    orderList: [],
    orderData: {}, //生成的订单数据
  },
  mutations: {
    // 下单
    order(state, orderList) {
      state.orderList = orderList
    },
    // 提交订单
    submitOrder(state, obj) {
      state.orderData = { ...obj }
    },
    // 清空购物车和订单列表
    payment(state) {
      state.orderList = []
      state.orderData = []
    },
  },
  getters: {
    // 计算商品的总价格
    orderPrice(state) {
      return state.orderList.reduce(
        (sum, item) => sum + item.price * item.num,
        0
      )
    },
  },
}
