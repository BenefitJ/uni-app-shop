import App from './App'
import mySearch from "@/components/my-search"
Vue.component("mySearch",mySearch)
import goodsItem from "@/components/goods-item"
Vue.component("goodsItem",goodsItem)
import empty from "@/components/empty"
Vue.component("empty",empty)

import apiRequest from '@/utils/requset.js'
Vue.prototype.$apiRequest = apiRequest

import utils from '@/utils/util.js'
Vue.prototype.$utils = utils

import store from '@/store/store.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif