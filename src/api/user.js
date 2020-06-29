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

// 获取用户角色
export function getUserRole(data){
  return axios.request({
    url:"/userRole/",
    method:"post",
    data
  })
}

// 添加用户
export function addUser(data) {
  return axios.request({
    url: "/user/add/",
    method: "post",
    data
  });
}

// 删除用户
export function deleteUser(data) {
  return axios.request({
    url:"/user/delete/",
    method:"post",
    data
  })
}

// 获取用户列表
export function getUserList(data){
  return axios.request({
    url:"/user/getList/",
    method:"post",
    data
  })
}

// 用户禁启用状态
export function activeStatus(data){
  return axios.request({
    url:"/user/actives/",
    method:"post",
    data
  })
}
