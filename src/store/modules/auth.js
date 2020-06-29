import { getUserRole } from "@/api/user"
import { defaultRouterMap,authRouter} from "../../router/index"
const state = {
    newRoter:[],
    oldRoter:defaultRouterMap,
    allRoter:[],
    role:[]
}

const getters = {
    role:role=>state.role,
    oldRoter:oldRoter=>state.oldRoter
}

const mutations = {
    setRole(state,value){
        state.role=value
    }
}

const actions = {
    // 获取角色
    getRole({commit},resData){
        return new Promise((resolve,reject)=>{
            getUserRole().then(res=>{
                console.log(res)
                let role=res.data.data
                commit("setRole",role)
                resolve(role)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 创建动态路由
    createRoter({commit},data){
        return new Promise((resolve,reject)=>{
            let role=data
            const addRoters=authRouter.filter(item=>{
                console.log(item)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};