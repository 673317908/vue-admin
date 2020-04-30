<template>
  <div id="login">
    <div class="login-tab">
      <ul>
        <li
          @click="tab(item.id)"
          :class="activeIndex===item.id?'currtarget':''"
          v-for="item in metuTab"
          :key="item.id"
        >{{item.text}}</li>
      </ul>
    </div>
    <el-form
      style="width:30%;margin: auto;"
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item prop="email">
        <label style="color:#ffffff;margin-bottom:13px">邮箱</label>
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label style="color:#ffffff;margin-bottom:13px">密码</label>
        <el-input maxlength=20 minlength=6 type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="againPwd" v-if="this.activeIndex===2">
        <label style="color:#ffffff;margin-bottom:13px">重新输入密码</label>
        <el-input maxlength=20 minlength=6 type="password" v-model="ruleForm.againPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <label style="color:#ffffff;margin-bottom:13px">验证码</label>
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <el-input minlength=6 maxlength=6 v-model.number="ruleForm.code"></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button type="success" class="block">获取验证码</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="danger" @click="submitForm('ruleForm')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { stripscript,checkEmail,validateCode,checkPassword } from '@/utils/Login/index.js'
export default {
  data() {
    // 验证登陆邮箱
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if(checkEmail(value)){
        callback(new Error("输入邮箱的格式不正确，请重新输入"));
      }else {
        callback();
      }
    };
    // 验证登陆密码
    var validatePass = (rule, value, callback) => {
      this.ruleForm.password=stripscript(value)
      value=stripscript(value)
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(checkPassword(value)){
        callback(new Error("密码格式不正确,请重新输入密码"));
      } else {
        callback();
      }
    };
    // 注册：确认密码是否一致
    var againPassword = (rule,value,callback) => {
      if(value!=this.ruleForm.password){
        callback(new Error("密码不一致，请重新输入"))
      }
    }
    // 验证验证码
    var checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("验证码不能为空"));
      }else if(validateCode(value)){
        callback(new Error("验证码有误，请重新输入"))
      }
    };
    return {
      metuTab: [
        { id: 1, text: "登陆" },
        { id: 2, text: "注册" }
      ],
      activeIndex: 1,
      ruleForm: {
        email: "",
        password: "",
        code: "",
        againPwd:""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
        againPwd:[{ validator: againPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    tab(id) {
      this.activeIndex = id;
      this.ruleForm.email=''
      this.ruleForm.password=''
      this.ruleForm.code=''
      this.ruleForm.againPwd=''
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang='less'>
#login {
  height: 100%;
  background-color: #344a5f;
  .login-tab {
    margin: auto;
    text-align: center;
    ul {
      li {
        margin: 0 20px;
        color: #ffffff;
        display: inline-block;
        padding: 10px;
        width: 50px;
        cursor: pointer;
      }
    }
  }
  .currtarget {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .block {
    display: block;
    width: 100%;
  }
}
</style>