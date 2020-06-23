<template>
  <div>
    <!-- 表格 -->
    <tableList :on-refresh="onRefresh[1]"/>
  </div>
</template>

<script>
import tableList from "./components/table1";
export default {
  components: {
    tableList
  },
  data() {
    return {
      onRefresh: {
        1: false
      },
      show: {
        1: false
      },
    };
  },
  methods: {
    // 刷新表格
    success(type) {
      this.onRefresh[type] = !this.onRefresh[type];
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../styles/elementui.scss";

.label_wrap {
  &.category {
    @include labelDom(center, 60, 40);
  }
  &.date {
    @include labelDom(center, 63, 40);
  }
  &.key_word {
    @include labelDom(center, 100, 40);
  }
}
</style>
