import axios from "axios";
/**
 * 获取验证码
 */
export function getMsg(data){
   return axios.request({
    method:'post',
    url:'/getSms/',
    data
  })
}


/**
 * 登陆
 */
export function login(data){
  return axios.request({
    method:'post',
    url:'/login/',
    data
  })
}

/**
 * 注册
 */
export function register(data){
  return axios.request({
    method:"post",
    url:'/register/',
    data
  })
}
