import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/views/Login/index.vue'
import Control from '@/views/Control/index.vue'

import controlContent from '@/views/Control/content/index.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'login'
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/control",
    name: "Control",
    component: Control,
    children:[
      {
        path: "/control",
        name: "controlContent",
        component: controlContent
      }
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
