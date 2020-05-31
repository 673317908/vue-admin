// 获取token
export function getToken() {
  return sessionStorage.getItem("loginToken");
}

// 获取用户名
export function getUserName() {
  return sessionStorage.getItem("userName");
}
