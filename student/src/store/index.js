import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // isLogin: 
    admin: ''
  },
  mutations: {
    setAdmin(state, data){
      state.admin = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
