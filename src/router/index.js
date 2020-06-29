import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/views/Login/index.vue'

// 布局组件
import Control from '@/views/Control/index.vue'

// 子页面
import Index from '@/views/content/index.vue'  //控制台首页
import InfoList from "@/views/Info/infoList.vue" //信息管理列表
import Category from "@/views/Info/infoCategory.vue" //信息管理分类
import EditDetail from "@/views/Info/infoEditDetail.vue" //用户分类
import UserList from "@/views/Users/userList.vue" //用户分类
Vue.use(VueRouter);

export const defaultRouterMap = [
  {
    role:["admin"],
    path: "/",
    redirect: 'login',
    hiddren: true,
    meta: {
      name: '登陆'
    },
  },
  {
    role:["admin"],
    path: "/login",
    name: "Login",
    hiddren: true,
    meta: {
      name: '主页'
    },
    component: Login
  },
  // 控制台
  {
    role:["admin"],
    path: "/control",
    name: "Control",
    meta: {
      name: '控制台',
      icon: 'el-icon-odometer'
    },
    component: Control,
    children: [
      {
        role:["admin"],
        path: "/index",
        name: "Index",
        meta: {
          name: '首页'
        },
        component: Index
      }
    ]
  },
]
const routes = defaultRouterMap

export const authRouter = [
  // 信息管理
  {
    role:["admin"],
    path: "/info",
    name: "Info",
    meta: {
      name: '信息管理',
      icon: 'el-icon-receiving'
    },
    component: Control,
    children: [
      {
        role:["admin"],
        path: "/infolist",
        name: "InfoList",
        meta: {
          name: '信息列表'
        },
        component: InfoList
      },
      {
        role:["admin"],
        path: "/infocategory",
        name: "Category",
        meta: {
          name: '信息分类'
        },
        component: Category
      },
      {
        role:["admin"],
        path: "/editdetail",
        name: "EditDetail",
        hiddren: true,
        meta: {
          name: '编辑详情'
        },
        component: EditDetail
      }
    ]
  },
  // 用户管理
  {
    role:["admin"],
    path: "/users",
    name: "Users",
    meta: {
      name: '用户管理',
      icon: 'el-icon-user'
    },
    component: Control,
    children: [
      {
        role:["admin"],
        path: "/userlist",
        name: "UserList",
        meta: {
          name: '用户列表'
        },
        component: UserList
      }
    ]
  }
]
const router = new VueRouter({
  routes
});

export default router;
