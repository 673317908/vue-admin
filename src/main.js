import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "@/router/befend.js";
// 引入elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/iconfont/iconfont.css";
// 重置样式
import "./styles/reset.css";
// 引入elementui修改样式
import "./styles/elementui.scss";
import global from "@/utils/global.js";
Vue.use(global);
Vue.use(axios);
Vue.use(ElementUI);

// Vue.prototype.$axios=axios
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
