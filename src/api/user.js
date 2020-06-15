import axios from "axios"
// 获取省、市、区
export function getAddress(data){
    return axios.request({
        url:"/cityPicker/",
        method:"post",
        data
    })
}