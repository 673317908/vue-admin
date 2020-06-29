import Vue from "vue";
import Vuex from "vuex";
// import Cookies from "cookies-js";
import { Login } from "../api/login";
import login from "./modules/login";
import app from "./modules/app"
import auth from "./modules/auth"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    app,
    auth
  }
});
