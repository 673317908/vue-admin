<template>
  <div id="nav">
    <div class="logo">
      <img src="../../../assets/logo.png" alt />
    </div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#344a5f"
      text-color="#ffffff"
      active-text-color="#ffffff"
      router
      :collapse="check_isCollapse"
    >
      <!-- 一级菜单 -->
      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hiddren" :key="item.id" :index="index+''">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            :index="val.path"
            v-for="(val,index) in item.children"
            :key="index"
          >{{val.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
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
  },
  computed: {
    check_isCollapse() {
      return (this.isCollapse = this.$store.state.isCollapse);
    }
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
  .logo {
    width: 100%;
    padding-top: 20px;
    img {
      width: 155px;
      display: block;
      margin: 0 auto;
    }
  }
}
.open {
  #nav {
    width: 250px;
    -webkit-transition: all 1s ease-in-out 0s;
  }
  .logo {
    img {
      width: 155px !important;
      -webkit-transition: all 1s ease-in-out 0s;
    }
  }
}
.close {
  #nav {
    width: 64px;
    -webkit-transition: all 1s ease-in-out 0s;
  }
  .logo {
    img {
      width: 70% !important;
      -webkit-transition: all 1s ease-in-out 0s;
    }
  }
}
</style>