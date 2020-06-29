const state = {
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {
    // 改变首页布局
    controlCollapse(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem(
            "isCollapse",
            JSON.stringify(state.isCollapse)
        );
    }
}

const actions = {
    // 登陆按钮
    login(content, loginInfo) {
        return new Promise((resolve, reject) => {
            Login(loginInfo)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}