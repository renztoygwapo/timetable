import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.component('multiselect', Multiselect)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
