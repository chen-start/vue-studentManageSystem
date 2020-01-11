import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import filter from './filter'

Vue.use(ElementUI)
Vue.filter('formatDate', filter.formatDate);

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  let username = localStorage.getItem('username');
  if (to.name !== 'login') {
    if (!username) {
      next('/login');
    }
    else {
      next();
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
