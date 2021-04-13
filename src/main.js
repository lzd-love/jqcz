/*
 * @Author: lzd
 * @Date: 2020-09-03 23:59:26
 * @LastEditors: lzd
 * @LastEditTime: 2021-01-07 10:54:30
 * @Description: content description
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "./plugins/element.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import moment from "moment";
// import echarts from "echarts";
import axios from "axios";
// import VueECharts from "./components/ECharts";
import md5 from "js-md5";
import config from "@config/Global.config";

import "@assets/less/skin.less";
import "@assets/less/import.less";

// import 'echarts/map/js/china.js'
// import "@assets/js/baiduApiLocal.js";
// import "@assets/js/baiduApi.js";
// import "echarts/dist/extension/bmap.min.js";

import 'leaflet/dist/leaflet.css'
// import '@supermap/iclient-leaflet'
import 'leaflet/dist/leaflet'



Vue.config.productionTip = false;
Vue.prototype.appConfig = config;
Vue.prototype.$axios = axios;
Vue.prototype.$moment = moment;
Vue.prototype.$md5 = md5;
// window.echarts = Vue.prototype.$echarts = echarts;
// Vue.component("v-chart", VueECharts);
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
