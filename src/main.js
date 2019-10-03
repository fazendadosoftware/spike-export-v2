import Vue from 'vue'
import App from './App.vue'
import '@leanix/reporting'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUndo, faCheck, faLink, faUnlink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import '@/assets/css/tailwind.css'

library.add(faUndo)
library.add(faCheck)
library.add(faLink)
library.add(faUnlink)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* global lx */
Vue.prototype.$lx = lx

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
