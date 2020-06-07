<template>
  <div id="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#content {
  position: fixed;
  top: 75px;
  left: 250px;
  border: 20px solid #f8f6f8;
  padding: 20px;
  width: 82%;
  height: 89%;
  box-sizing: border-box;
}
.open {
  #content {
    position: fixed;
    top: 75px;
    left: 250px;
    -webkit-transition: all 1s ease-in-out 0s;
  }
}
.close {
  #content {
    position: fixed;
    top: 75px;
    left: 64px;
    width: 89%;
    -webkit-transition: all 1s ease-in-out 0s;
  }
}
</style>
