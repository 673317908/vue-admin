<template>
  <div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top:20px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="username" label="邮箱\用户名" width="203"></el-table-column>
      <el-table-column prop="truename" label="真实姓名" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="135"></el-table-column>
      <el-table-column prop="region" label="地区" width="425"></el-table-column>
      <el-table-column prop="role" label="角色" width="205"></el-table-column>
      <el-table-column label="禁启用状态" width="143">
        <template>
          <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="switchValue"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="156">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteUser(scope.row)">删除</el-button>
          <el-button type="success" size="mini" @click="editUser(scope.row)">编辑</el-button>
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
          :total="page.total"
        >></el-pagination>
      </el-col>
    </el-row>

    <!-- 编辑用户对话框 -->
    <editModal :editModalValue="editModalValue" @showEdit="showEdit" :row="row[1]" />
  </div>
</template>

<script>
import editModal from "./edit";
import { getUserList, deleteUser } from "@/api/user";
export default {
  components: {
    editModal
  },
  props: {
    "on-refresh": {
      default: false
    }
  },
  data() {
    return {
      row: {
        1: {}
      },
      switchValue: false,  // 禁启用状态默认值
      editModalValue: false,  // 编辑对话框默认值
      tableData: [], // 用户列表数据
      // 分页数据
      page: {
        pageNumber: 1,
        pageSize: 2,
        total: 1
      },
      AlldelId: "",   // 批量删除ID
      delId: []  // 单个删除ID
    };
  },
  methods: {
    // 选中
    handleSelectionChange(value) {
      let id = value.map(v => v.id);
      this.AlldelId = id;
    },
    // 删除用户
    deleteUser(row) {
      this.delId.push(row.id);
      deleteUser({ id: this.delId }).then(res => {
        if (res.data.resCode == 0) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.getUserData();
        }
      });
    },
    // 编辑用户
    editUser(scope) {
      this.row[1] = scope.row;
      this.editModalValue = true;
    },
    // 关闭编辑
    showEdit() {
      this.editModalValue = false;
    },
    // 获取用户列表数据
    getUserData() {
      let resData = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      getUserList(resData).then(res => {
        if (res.data.resCode == 0) {
          this.tableData = res.data.data.data;
          this.page.total = res.data.data.total;
          let data = res.data.data.data;
        }
      });
    },
    // 切换每页条数
    handleSizeChange(page) {
      this.page.pageSize = page;
      this.getUserData();
    },
    // 翻页
    handleCurrentChange(page) {
      this.page.pageNumber = page;
      this.getUserData();
    },
    // 批量删除
    deleteAll() {
      deleteUser({ id: this.AlldelId }).then(res => {
        if (res.data.resCode == 0) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.getUserData();
        }
      });
    }
  },
  watch: {
    onRefresh() {
      this.getUserData();
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style></style>
