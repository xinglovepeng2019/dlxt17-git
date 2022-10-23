import { createStore } from 'vuex'

// 1引入插件
import createPersistedstate from 'vuex-persistedstate'

import cart from './moudle/cart.js'
import order from './moudle/order.js'
import history from './moudle/history.js'
export default createStore({
  modules: {
    cart,
    order,
    history,
  },
  getters: {
    carts: (state) => state.cart.cartList,
    orderList: (state) => state.order.orderList,
    orderData: (state) => state.order.orderData,
    searchList: (state) => state.history.historyList,
  },
  plugins: [
    createPersistedstate({
      key: 'my-vuex',
      paths: ['cart', 'order', 'history'],
    }),
  ],
})
