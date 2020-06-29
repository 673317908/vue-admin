<template>
  <div id="ControlIndex" :class="indexStatus?'close':'open'">
    <div class="box">
      <controlNav />
      <div class="chilrenBox">
        <controlHeader />
        <controlContent />
      </div>
    </div>
  </div>
</template>

<script>
import controlContent from "@/views/Control/controlComponents/controlContent";
import controlNav from "@/views/Control/controlComponents/controlNav";
import controlHeader from "@/views/Control/controlComponents/controlHeader";
export default {
  components: {
    controlContent,
    controlNav,
    controlHeader
  },
  data() {
    return {};
  },
  computed: {
    indexStatus() {
      return this.$store.state.app.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.box{
  display: flex;
  box-sizing: border-box;
  .chilrenBox {
    box-sizing: border-box;
    width: 100%;
  }
}
</style>