import axios from "axios";
// 信息分类发送分类名称
export function getTitle(data) {
  return axios.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}
