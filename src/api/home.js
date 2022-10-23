import request from '@/utils/request'

/* 
url, method, submitData
获取轮播图的接口api

*/
export function getHomeSwipe() {
  return request('small4/banner/list', 'GET', {})
}

/* 
url, method, submitData
获取精选专题的接口api

*/
export function getNewsList() {
  return request('small4/cms/news/list', 'GET', {})
}

/* 
url, method, submitData
获取人气推荐的接口api

*/
export function getRecommendsList() {
  return request('small4/shop/goods/list', 'GET', {})
}
