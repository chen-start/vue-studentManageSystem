import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    admin: '',
  },
  mutations: {
    setAdmin(state, data){
      state.admin = data
      console.log(state.admin)
    },
    setIsLogin(state){
      state.isLogin = true;
    },
    change(state){
      state.isLogin = false;
      console.log(state.isLogin);
    }
  },
  actions: {

  },
  modules: {
    
  }
})
