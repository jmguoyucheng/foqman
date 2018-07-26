// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui及css文件
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex
import Vuex from 'vuex'
import store from './store'
// use
Vue.use(ElementUi, { size: 'small' })
Vue.use(Vuex)
// 引入axios
import axios from 'axios'
// 挂载axios
Vue.prototype.$axios = axios
import qs from 'qs'
Vue.prototype.$qs = qs

Vue.config.devtools = false
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // console.log('请求 '+config);
  // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
  // config.headers.Authorization = 'tokenxxx'//`token ${store.state.token}`;
  // }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});
