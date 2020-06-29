<template>
  <div id="header">
    <div class="header-info">
      <div class="header-left">
        <i class="el-icon-s-operation" @click="collapseStatus"></i>
      </div>
      <div class="header-right">
        <div class="user-img">
          <img src="../../../assets/logo.png" alt />
          <div class="userName">
            <span>{{username}}</span>
          </div>
        </div>

        <i class="el-icon-switch-button" @click="loginOut"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: sessionStorage.getItem("userName")
    };
  },
  methods: {
    collapseStatus() {
      this.$store.commit("app/controlCollapse");
    },
    // 退出登录
    loginOut() {
      this.$confirm("是否退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("app/loginOut");
        this.$router.push({
          path: "/login"
        });
        this.$message({
          message: "退出成功",
          type: "success"
        });
      }).catch(()=>{
        this.$message({
          message:"已取消"
        })
      })
    }
  }
};
</script>

<style lang="less" scoped>
#header {
  line-height: 75px;
  height: 75px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.3);
}
.header-info {
  .header-left {
    padding: 5px 28px;
    float: left;
    .el-icon-s-operation {
      font-size: 35px;
      cursor: pointer;
    }
  }
  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .user-img {
      border-right: 1px solid #cccccc;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .userName {
        margin: 0 10px;
        font-size: 12px;
      }
    }
    .el-icon-switch-button {
      padding: 5px 35px 5px 28px;
      font-size: 35px;
      cursor: pointer;
    }
  }
}
.open {
  #header {
    width: 100%;
    -webkit-transition: all 1s ease-in-out 0s;
  }
}
.close {
  #header {
    width: 100%;
    -webkit-transition: all 1s ease-in-out 0s;
  }
}
</style>
