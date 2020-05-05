import Vue from "vue";
import Vuex from "vuex";
import Cookies from 'cookies-js'
import { Login } from "../api/login";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) ||false
  },
  mutations: {
    controlCollapse(state) {
      this.state.isCollapse = !this.state.isCollapse
      sessionStorage.setItem('isCollapse', JSON.stringify(this.state.isCollapse))
      console.log(this.state.isCollapse)
    }
  },
  actions: {
    login(content, loginInfo) {
      return new Promise((resolve, reject) => {
        Login(loginInfo).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
    appss:{
      state:{},
      mutations:{
        cccc(){
          console.log(111)
        }
      },
      actions:{}
      }
    }
});
