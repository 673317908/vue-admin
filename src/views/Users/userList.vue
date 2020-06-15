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

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="userName" label="邮箱\用户名" width="180"></el-table-column>
      <el-table-column prop="name" label="真实姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="手机号"></el-table-column>
      <el-table-column prop="date" label="地区" width="180"></el-table-column>
      <el-table-column prop="name" label="角色" width="180"></el-table-column>
      <el-table-column prop="address" label="禁启用状态"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页、批量删除 -->
    <el-row>
      <el-col :span="12">
        <el-button style="margin-top:36px;" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          style="margin-top:36px;float:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
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