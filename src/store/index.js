import Vue from "vue";
import Vuex from "vuex";
import Cookies from 'cookies-js'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: Cookies.get('isCollapse') || false
  },
  mutations: {
    controlCollapse(state) {
      // this.state.isCollapse = !this.state.isCollapse
      Cookies.set('isCollapse',JSON.stringify(this.state.isCollapse = !this.state.isCollapse))
      console.log(this.state.isCollapse)
    }
  },
  actions: {},
  modules: {}
});
