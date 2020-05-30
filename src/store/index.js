import Vue from "vue";
import Vuex from "vuex";
// import Cookies from "cookies-js";
import { Login } from "../api/login";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    userInfo: {
      username: sessionStorage.getItem("userName") || "",
      token: sessionStorage.getItem("loginToken") || ""
    }
  },
  mutations: {
    // 改变首页布局
    controlCollapse(state) {
      // console.log(state);
      this.state.isCollapse = !this.state.isCollapse;
      sessionStorage.setItem(
        "isCollapse",
        JSON.stringify(this.state.isCollapse)
      );
      console.log(this.state.isCollapse);
    }
  },
  actions: {
    // 登陆按钮
    login(content, loginInfo) {
      return new Promise((resolve, reject) => {
        Login(loginInfo)
          .then(response => {
            // console.log(response);
            let loginToken = response.data.data;
            let userName = loginToken.username;
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("loginToken", loginToken.token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  modules: {}
});
