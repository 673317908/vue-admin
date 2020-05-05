import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  mutations: {
    controlCollapse(state) {
      this.state.isCollapse = !this.state.isCollapse
      console.log(this.state.isCollapse)
    }
  },
  actions: {},
  modules: {}
});
