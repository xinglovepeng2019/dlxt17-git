const state = () => {
  return {
    username: 'zs',
  }
}

const mutations = {
  changUserName(state) {
    state.username = 'ls'
  },
}

const actions = {
  changUserAsync(context) {
    setTimeout(() => {
      context.commit('changUserName')
    }, 1000)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
