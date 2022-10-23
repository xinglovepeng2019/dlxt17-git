// vue3.0中createRouter来创建路由实例，createWebHashHistory代表使用hash模式的路由。
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import('@/views/Index'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home'),
      },
      {
        path: '/cate',
        component: () => import('@/views/Cate'),
      },
      {
        path: '/cart',
        component: () => import('@/views/Cart'),
      },
      {
        path: '/my',
        component: () => import('@/views/My'),
      },
    ],
  },
  {
    //商品分类
    path: '/catelist/:cid',
    component: () => import('@/views/Cate/cateList'),
  },
  {
    //详情页
    path: '/goods/:id',
    component: () => import('@/views/Goods'),
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/register',
    component: () => import('@/views/Register'),
  },
  // 订单
  {
    //确认订单
    path: '/orderlist',
    component: () => import('@/views/OrderList'),
  },
  {
    path: '/myaddress', //我的地址
    component: () => import('@/views/OrderList/MyAddress'),
  },
  {
    path: '/address', //新增地址
    component: () => import('@/views/OrderList/Address'),
  },
  {
    path: '/parment', //确认付款
    component: () => import('@/views/OrderList/ParMent'),
  },
  {
    path: '/search', //搜索页
    component: () => import('@/views/Search'),
  },
  {
    path: '/searchlist', //搜索列表页
    component: () => import('@/views/Search/SearchList'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
