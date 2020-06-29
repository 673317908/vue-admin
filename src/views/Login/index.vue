<template>
  <div id="login">
    <div class="login-tab">
      <ul>
        <li
          @click="tab(item.type)"
          :class="activeIndex === item.type ? 'currtarget' : ''"
          v-for="item in metuTab"
          :key="item.id"
        >
          {{ item.text }}
        </li>
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
        <label for="email" style="color:#ffffff;margin-bottom:13px">邮箱</label>
        <el-input
          id="email"
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <label for="password" style="color:#ffffff;margin-bottom:13px"
          >密码</label
        >
        <el-input
          id="password"
          maxlength="20"
          minlength="6"
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="againPwd" v-if="this.activeIndex === 'register'">
        <label for="againPwd" style="color:#ffffff;margin-bottom:13px"
          >重新输入密码</label
        >
        <el-input
          id="againPwd"
          maxlength="20"
          minlength="6"
          type="password"
          v-model="ruleForm.againPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <label for="code" style="color:#ffffff;margin-bottom:13px"
          >验证码</label
        >
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <el-input
                id="code"
                minlength="6"
                maxlength="6"
                v-model="ruleForm.code"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button
                type="success"
                class="block"
                :disabled="Codedisabled"
                @click="getCode"
                >{{ getCodeText }}</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width:100%"
          type="danger"
          :disabled="btndisabled"
          @click="submitForm('ruleForm')"
          >{{ activeIndex === "login" ? "登陆" : "注册" }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入密码加密
import sha1 from "js-sha1";
import instance from "@/utils/requset.js";
import {
  stripscript,
  checkEmail,
  validateCode,
  checkPassword
} from "@/utils/Login/index.js";
import { getMsg, register } from "@/api/login.js";
export default {
  data() {
    // 验证登陆邮箱
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (checkEmail(value)) {
        callback(new Error("输入邮箱的格式不正确，请重新输入"));
      } else {
        callback();
      }
    };
    // 验证登陆密码
    var validatePass = (rule, value, callback) => {
      this.ruleForm.password = stripscript(value);
      value = stripscript(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (checkPassword(value)) {
        callback(new Error("密码格式不正确,请重新输入密码"));
      } else {
        callback();
      }
    };
    // 注册：确认密码是否一致
    var againPassword = (rule, value, callback) => {
      if (value != this.ruleForm.password) {
        callback(new Error("密码不一致，请重新输入"));
      } else if (value === "") {
        callback(new Error("密码不一致，请重新输入"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var checkCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("验证码不能为空"));
      } else if (validateCode(value)) {
        callback(new Error("验证码有误，请重新输入"));
      } else {
        callback();
      }
    };
    return {
      metuTab: [
        { id: 1, text: "登陆", type: "login" },
        { id: 2, text: "注册", type: "register" }
      ],
      activeIndex: "login",
      btndisabled: false, //登陆、注册按钮禁用
      getCodeText: "获取验证码", //获取验证码文字修改
      Codedisabled: false, //获取验证码按钮禁用
      getCodeTime: null, //获取验证码按钮重新获取时间
      ruleForm: {
        email: "",
        password: "",
        code: "",
        againPwd: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
        againPwd: [{ validator: againPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 登陆、注册切换
    tab(list) {
      this.activeIndex = list;
      this.ruleForm.email = "";
      this.ruleForm.password = "";
      this.ruleForm.code = "";
      this.ruleForm.againPwd = "";
      this.btndisabled = true;
      this.Codedisabled = false;
      this.getCodeText = "获取验证码";
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          if (this.activeIndex == "login") {
            // 登陆页面触发
            let loginInfo = {
              username: this.ruleForm.email,
              password: sha1(this.ruleForm.password),
              code: this.ruleForm.code
            };
            this.$store.dispatch("app/login", loginInfo).then(response => {
                this.$message({
                  message:response.message,
                  type:"success"
                })
                this.$router.push({
                  path: "/control"
                });
              })
              .catch(error => {
                console.log(error)
              });
          } else {
            // 注册页面触发
            let registerInfo = {
              username: this.ruleForm.email,
              password: sha1(this.ruleForm.password),
              code: this.ruleForm.code
            };
            register(registerInfo).then(response => {
              let data = response.data;
              this.$message({
                message: data.message,
                type: "success"
              });
              if (data.resCode === 0) {
                // 注册成功恢复按钮文字和跳转到登陆
                this.resetBtn();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 获取验证码
    getCode() {
      let setCode = { username: this.ruleForm.email, model: this.activeIndex };
      if (this.ruleForm.email === "") {
        this.$message({
          message: "邮箱不能为空,请填写邮箱",
          type: "warning"
        });
        return false;
      }
      // 点击按钮，3秒后获取验证码
      setTimeout(() => {
        // 获取验证码请求
        getMsg(setCode).then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          var timeNumber = 3; //多少秒后可重新发送获取验证码请求
          this.timeDown(timeNumber);
        });
      }, 3000);
      // 点击修改获取验证码按钮文字
      this.getCodeText = "发送中";
      this.Codedisabled = true;
    },
    // 获取验证码按钮60秒后重新获取
    timeDown(timeNumber) {
      if (this.getCodeTime) {
        clearInterval(this.getCodeTime);
      }
      this.getCodeTime = setInterval(() => {
        timeNumber--;
        this.getCodeText = timeNumber + "s";

        this.Codedisabled = true; //将获取验证码按钮禁用
        if (timeNumber == 0) {
          clearInterval(this.getCodeTime);
          this.getCodeText = "重新发送";

          this.Codedisabled = false; //将获取验证码按钮启用
        }
      }, 1000);
    },
    // 还原按钮和跳转登陆
    resetBtn() {
      this.activeIndex = "login";
      this.getCodeText = "获取验证码";
      this.ruleForm.email = "";
      this.ruleForm.password = "";
      this.ruleForm.code = "";
      this.ruleForm.againPwd = "";
      this.btndisabled = true;
      clearInterval(this.getCodeTime);
    }
  }
};
</script>

<style scoped lang="less">
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
