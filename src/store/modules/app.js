import { Login } from "@/api/login.js"
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    userInfo: {
        username: "" || sessionStorage.getItem("userName"),
        token: "" || sessionStorage.getItem("loginToken")
    }
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {
    // 改变首页布局
    controlCollapse(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem("isCollapse",JSON.stringify(state.isCollapse));
    },
    // 存储用户名
    setUserName(state, value) {
        state.userInfo.username = value
    },
    // 存储token
    setUserToken(state, value) {
        state.userInfo.token = value
    }
}

const actions = {
    login({ commit }, loginInfo) {
        return new Promise((resolve, reject) => {
            Login(loginInfo).then(response => {
                console.log(response)
                let data = response.data.data
                commit("setUserName", data.username)
                commit("setUserToken", data.token)
                sessionStorage.setItem("userName", data.username);
                sessionStorage.setItem("loginToken", data.token);
                resolve(response)
            }).catch(error => {
                reject(error)
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