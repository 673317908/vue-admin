import router from "./index";
import store from "../store/index"
import { getToken } from "@/utils/befend/api";

const whiteRouter = ["/login"];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path == "/login") {
      sessionStorage.removeItem("loginToken")
      sessionStorage.removeItem("userName")
      store.commit("app/setUserName", "")
      store.commit("app/setUserToken", "")
      next()
    } else {
      if (store.getters["auth/role"].length === 0) {
        store.dispatch("auth/getRole").then(res=>{
          console.log(res)
          let role=res.role
          store.dispatch("auth/createRoter",role).then(res=>{
          })
        })
      } else {
        next()
      }

    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
