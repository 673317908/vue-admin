import { Message } from "element-ui";
import axios from "axios";
import { getToken, getUserName } from "@/utils/befend/api.js";
// const axios = axios.create({
//   baseUrl: BASEURL,
//   timeout: 1000
// });
axios.defaults.baseURL = process.env.NODE_ENV === "production" ? "" : "/devapi";
// const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devapi'
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    console.log(config);
    config.headers["token"] = getToken();
    config.headers["userName"] = getUserName();
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log(response)
    let data = response.data;
    console.log(data);
    if (data.resCode != 0) {
      Message({
        message: data.message,
        type: "danger"
      });
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default axios;
