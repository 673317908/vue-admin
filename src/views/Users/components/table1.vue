<template>
  <div>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column
        prop="userName"
        label="邮箱\用户名"
        width="203"
      ></el-table-column>
      <el-table-column
        prop="truename"
        label="真实姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="135"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="地区"
        width="425"
      ></el-table-column>
      <el-table-column prop="role" label="角色" width="205"></el-table-column>
      <el-table-column label="禁启用状态" width="143">
        <template>
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="156">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteUser(scope)"
            >删除</el-button
          >
          <el-button type="success" size="mini" @click="editUser(scope)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑用户对话框 -->
    <editModal
      :editModalValue="editModalValue"
      @showEdit="showEdit"
      :row="row[1]"
    />
  </div>
</template>

<script>
import editModal from "./edit";
export default {
  components: {
    editModal
  },
  data() {
    return {
      row: {
        1: {}
      },
      editModalValue: false,
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
    // 删除用户
    deleteUser(scope) {
      console.log(scope);
    },
    // 编辑用户
    editUser(scope) {
      console.log(scope);
      this.row[1] = scope.row;
      this.editModalValue = true;
    },
    showEdit() {
      this.editModalValue = false;
    }
  }
};
</script>

<style></style>
