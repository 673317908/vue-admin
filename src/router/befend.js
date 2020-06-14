import router from "./index";
import { getToken } from "@/utils/befend/api";

const whiteRouter = ["/login"];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
