import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, LayoutPlugin } from "bootstrap-vue"
import AsyncComputed from 'vue-async-computed'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'

Vue.config.productionTip = false

Vue.use(AsyncComputed)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM.DD.YYYY hh:mm')
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')

