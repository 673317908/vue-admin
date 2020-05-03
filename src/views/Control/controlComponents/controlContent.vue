<template>
  <div id="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
#content {
  position: fixed;
  top: 75px;
  left: 250px;
  border: 20px solid #f8f6f8;
  width: 100%;
  height: 100%;
}
</style>