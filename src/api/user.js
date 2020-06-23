import axios from "axios";
// 获取省、市、区
export function getAddress(data) {
  return axios.request({
    url: "/cityPicker/",
    method: "post",
    data
  });
}

// 获取角色
export function getRole(data) {
  return axios.request({
    url: "/role/",
    method: "post",
    data
  });
}

// 添加用户
export function addUser(data) {
  return axios.request({
    url: "/user/add/",
    method: "post",
    data
  });
}

// 获取用户列表
export function getUserList(data){
  return axios.request({
    url:"/user/getList/",
    method:"post",
    data
  })
}
