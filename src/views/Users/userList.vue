<template>
  <div>
    <!-- 选择器 -->
    <el-row :gutter="16">
      <el-col :span="18">
        <el-col :span="4">
          <div class="label_wrap category">
            <label for>分类:</label>
            <div class="warp_content">
              <el-select placeholder="请选择">
                <el-option></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入关键字"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" style="width:100%;">搜索</el-button>
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" style="float:right;">新增</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
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