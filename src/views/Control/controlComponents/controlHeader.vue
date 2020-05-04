<template>
  <div id="header">
    <div class="header-info">
      <div class="header-left">
        <i class="el-icon-s-operation"></i>
      </div>
      <div class="header-right">
        <div class="user-img">
          <img src="../../../assets/logo.png" alt />
          <div class="userName">
            <span>管理员</span>
          </div>
        </div>

        <i class="el-icon-switch-button"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
#header {
  line-height: 75px;
  height: 75px;
  width: 83%;
  position: fixed;
  left: 250px;
  top: 0;
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
    // justify-content: center;
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
</style>