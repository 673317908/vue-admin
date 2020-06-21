<template>
  <div>
    <!-- 选择器 -->
    <el-row :gutter="16">
      <el-col :span="18">
        <el-col :span="5">
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
          <el-input placeholder="请输入关键字" v-model="searchText"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" style="width:100%;" @click="search"
            >搜索</el-button
          >
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" style="float:right;" @click="addUser"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格 -->
    <tableList />

    <!-- 分页、批量删除 -->
    <el-row>
      <el-col :span="12">
        <el-button style="margin-top:36px;" @click="deleteAll"
          >批量删除</el-button
        >
      </el-col>
      <el-col :span="12">
        <el-pagination
          style="margin-top:36px;float:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
          >></el-pagination
        >
      </el-col>
    </el-row>

    <!-- 新增用户对话框 -->
    <addUser :addModalValue="addModalValue" @showModal="showModal" />
  </div>
</template>

<script>
import addUser from "./components/addDialog";
import tableList from "./components/table1";
export default {
  components: {
    addUser,
    tableList
  },
  data() {
    return {
      show: {
        1: false
      },
      searchText: "", // 搜索框
      addModalValue: false // 新增用户对话框默认值
    };
  },
  methods: {
    // 搜索
    search() {},
    // 打开新增用户对话框
    addUser() {
      this.addModalValue = true;
    },
    // 关闭新增用户对话框
    showModal() {
      this.addModalValue = false;
    },
    // 切换每页条数
    handleSizeChange() {},
    // 翻页
    handleCurrentChange() {},
    // 批量删除
    deleteAll() {}
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
