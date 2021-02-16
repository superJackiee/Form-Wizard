import Vue from 'vue'
import Vuex from 'vuex'
import Store from './store/index'
import Vuelidate from 'vuelidate'
import VueTelInput from 'vue-tel-input'
import feather from 'vue-icon'
import VTooltip from 'v-tooltip'
import vueCountryRegionSelect from 'vue-country-region-select'
import TextareaAutosize from 'vue-textarea-autosize'
import vmodal from 'vue-js-modal'

Vue.use(vmodal)
Vue.use(TextareaAutosize)
Vue.use(vueCountryRegionSelect)
Vue.use(VTooltip)
Vue.use(feather, 'v-icon')
Vue.use(VueTelInput)
Vue.use(Vuelidate)
Vue.use(Vuex);

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  store: Store,
  render: h => h(App),
}).$mount('#app')
