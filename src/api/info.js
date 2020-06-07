import axios from "axios";
// 信息分类发送分类名称
export function getTitle(data) {
  return axios.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}
// 获取信息分类
export function getCategoryData(data) {
  return axios.request({
    method: "post",
    url: "/news/getCategory/",
    data
  });
}

// 获取信息分类(包含子项)
export function getCategoryAll(data) {
  return axios.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data
  });
}

// 获取信息列表
export function getList(data) {
  return axios.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}

// 删除信息
export function deleteData(data) {
  return axios.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  });
}

// 添加分类信息
export function addCategoryData(data) {
  return axios.request({
    method: "post",
    url: "/news/add/",
    data
  });
}

// 删除分类
export function DeleteCategory(data) {
  return axios.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  });
}

// 编辑信息分类
export function EditCategory(data) {
  return axios.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}
