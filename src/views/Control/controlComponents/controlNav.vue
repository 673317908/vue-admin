<template>
  <div id="nav">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#ffffff"
      active-text-color="#ffffff"
      router
    >
      <!-- 一级菜单 -->
      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hiddren" :key="item.id" :index="index+''" >
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item :index="val.path" v-for="(val,index) in item.children" :key="index">{{val.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isCollapse: true
      routers: {}
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    console.log(this.$router.options.routes);
    this.routers = this.$router.options.routes;
  }
};
</script>

<style lang='scss' scoped>
#nav {
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #344a5f;
}
</style>