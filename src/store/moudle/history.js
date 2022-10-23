export default {
  namespaced: true,
  state: {
    historyList: [],
  },
  mutations: {
    saveHistory(state, val) {
      // 实现添加  添加到前面
      state.historyList.unshift(val)
      // 去除重复
      state.historyList = [...new Set(state.historyList)]
      // 保存6条搜索历史记录
      state.historyList = state.historyList.slice(0, 6)
    },
    clearHistory(state) {
      state.historyList = []
    },
  },
  getters: {},
}
