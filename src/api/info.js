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
export function getCategoryAll(data) {
  return axios.request({
    method: "post",
    url: "/news/getCategoryAll/",
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
