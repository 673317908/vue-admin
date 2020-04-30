// 邮箱验证
export function checkEmail(value){
  var reg = /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (!reg.test(value)) {
    return true
  } else {
    return false
  }
}

// 密码特殊字符过滤
export function stripscript(value) {
 var pattern = new RegExp("[`!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：” “'。，、？]")
 var rs = "";
 for (var i = 0; i < value.length; i++) {
    rs = rs+value.substr(i, 1).replace(pattern, '');
  }
  return rs;
}

// 密码格式验证
export function checkPassword(v){
  var checkPwd=/^[0-9]{6,20}$/
  if(!checkPwd.test(v)){
    return true
  }else {
    return false
  }
}

// 验证码验证
export function validateCode(value){
  var vCode=/^\d{6}$/
  if(!vCode.test(value)){
    return true
  }else {
    return false
  }
}