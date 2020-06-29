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
  border: 20px solid #f8f6f8;
  padding: 20px;
  width: 100%;
  height: 91%;
  box-sizing: border-box;
}
.open {
  #content {
    -webkit-transition: all 1s ease-in-out 0s;
  }
}
.close {
  #content {
    width: 100%;
    -webkit-transition: all 1s ease-in-out 0s;
  }
}
</style>
