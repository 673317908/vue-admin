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
          <el-input placeholder="请输入关键字" v-model="searchText"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" style="width:100%;" @click="search">搜索</el-button>
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" style="float:right;" @click="addUser">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="userName" label="邮箱\用户名" width="203"></el-table-column>
      <el-table-column prop="truename" label="真实姓名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="135"></el-table-column>
      <el-table-column prop="address" label="地区" width="425"></el-table-column>
      <el-table-column prop="role" label="角色" width="205"></el-table-column>
      <el-table-column label="禁启用状态" width="143">
        <template>
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="143">
        <template slot="scope">
          <el-button type="danger" size="mini" @click="deleteUser">删除</el-button>
          <el-button type="success" size="mini" @click="editUser">编辑</el-button>
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
          :page-sizes="[2, 3, 4, 5]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="100"
        >></el-pagination>
      </el-col>
    </el-row>

    <!-- 新增用户对话框 -->
    <addUser :addModalValue="addModalValue" @showModal="showModal"/>
  </div>
</template>

<script>
import addUser from "./components/addDialog"
import { getAddress } from "@/api/user"
export default {
  components:{
    addUser
  },
  data() {
    return {

      searchText:"",  // 搜索框
      addModalValue: false,  // 新增用户对话框默认值
      value: true,
      tableData: [
        {
          userName: "673317908@qq.com",
          truename: "王小虎",
          mobile: "13877712345",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超管"
        },
        {
          userName: "673317908@qq.com",
          truename: "王小虎",
          mobile: "13877712345",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超管"
        },
        {
          userName: "673317908@qq.com",
          truename: "王小虎",
          mobile: "13877712345",
          address: "上海市普陀区金沙江路 1518 弄",
          role: "超管"
        }
      ]
    };
  },
  methods: {
    // 搜索
    search(){},
    // 打开新增用户对话框
    addUser() {
      this.addModalValue = true;
    },
    // 关闭新增用户对话框
    showModal(){
      this.addModalValue = false;
    },
    // 删除用户
    deleteUser(){},
    // 编辑用户
    editUser(){},
    // 切换每页条数
    handleSizeChange() {},
    // 翻页
    handleCurrentChange() {},
    // 批量删除
    deleteAll() {}
  },
  mounted(){
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