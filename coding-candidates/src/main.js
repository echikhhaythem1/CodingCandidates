import Vue from "vue";
import './plugins/axios'
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { loadLocalStorage } from "./commons/authentication/auth-request";
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authData = loadLocalStorage()
    // if faut gerer l'expiration token !!!
    if (authData.token && authData.userName) {
      next()
      return
    }
    next({ name: 'signin' })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
