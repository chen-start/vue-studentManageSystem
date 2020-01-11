import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: '',
  },
  mutations: {
    setAdmin(state, data){
      localStorage.setItem('username', data)
      state.admin = data
    },
    change(state, data){
      localStorage.removeItem('username', data)
    }
  },
  actions: {

  },
  modules: {
    
  }
})
