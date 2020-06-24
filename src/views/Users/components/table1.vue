<template>
  <div>
    <!-- 搜索框 -->
    <el-row :gutter="16">
      <el-col :span="18">
        <el-col :span="5">
          <div class="label_wrap category">
            <label for>分类:</label>
            <div class="warp_content">
              <el-select placeholder="请选择" v-model="selectValue">
                <el-option
                  v-for="item in options"
                  :key="item.value  "
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入关键字" v-model="searchValue"></el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" style="width:100%;" @click="search">搜索</el-button>
        </el-col>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" style="float:right;" @click="addUser">新增</el-button>
      </el-col>
    </el-row>

    <!-- 新增用户对话框 -->
    <addUser :addModalValue="addModalValue" @showModal="showModal" @getUserData="getUserData" />

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top:20px;"
      @selection-change="handleSelectionChange"
      v-loading="loading"
      >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="username" label="邮箱\用户名" width="203"></el-table-column>
      <el-table-column prop="truename" label="真实姓名" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="135"></el-table-column>
      <el-table-column prop="region" label="地区" width="425"></el-table-column>
      <el-table-column prop="role" label="角色" width="205"></el-table-column>
      <el-table-column label="禁启用状态" width="143">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="2"
            inactive-value="1"
            @change="statusBtn(scope.row)"
          ></el-switch>
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
import addUser from "./addDialog";
import { getUserList, deleteUser, activeStatus } from "@/api/user";
export default {
  components: {
    editModal,
    addUser
  },
  data() {
    return {
      row: {
        1: {}
      },
      loading: false, // 表格加载状态默认值
      selectValue: "", // 选择框数据
      searchValue: "", // 搜索框数据
      addModalValue: false, // 新增用户对话框默认值
      options: [
        {
          value: "username",
          label: "用户名"
        },
        {
          value: "truename",
          label: "真实姓名"
        },
        {
          value: "phone",
          label: "手机号"
        }
      ],
      switchValue: false, // 禁启用状态默认值
      editModalValue: false, // 编辑对话框默认值
      tableData: [], // 用户列表数据
      // 分页数据
      page: {
        pageNumber: 1,
        pageSize: 2,
        total: 1
      },
      AlldelId: "", // 批量删除ID
      delId: [] // 单个删除ID
    };
  },
  methods: {
    // 处理搜索数据
    formatSearchValue() {
      let resData = {};
      resData[this.selectValue] = this.searchValue;
      if (this.page.pageNumber && this.page.pageSize) {
        resData.pageNumber = this.page.pageNumber;
        resData.pageSize = this.page.pageSize;
      }
      return resData;
    },
    // 搜索
    search() {
      if (this.searchValue == "") {
        this.getUserData();
      } else {
        let resData = this.formatSearchValue();
        this.loading = true;
        getUserList(resData).then(res => {
          if (res.data.resCode == 0) {
            this.tableData = res.data.data.data;
            this.loading = false;
          }
        });
      }
    },
    // 打开新增用户对话框
    addUser() {
      this.addModalValue = true;
    },
    // 关闭新增用户对话框
    showModal() {
      this.addModalValue = false;
    },
    // 选中数据
    handleSelectionChange(value) {
      let id = value.map(v => v.id);
      this.AlldelId = id;
    },
    // 删除用户
    deleteUser(row) {
      this.delId.push(row.id);
      this.$confirm(
        "是否删除当前数据，此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      ).then(() => {
        deleteUser({ id: this.delId }).then(res => {
          if (res.data.resCode == 0) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getUserData();
          }
        });
      });
    },
    // 编辑用户
    editUser(scope) {
      this.row[1] = Object.assign({},scope);
      this.editModalValue = true;
    },
    // 关闭编辑
    showEdit() {
      this.editModalValue = false;
    },
    // 禁启用状态
    statusBtn(row) {
      activeStatus({ id: row.id, status: row.status }).then(res => {
        if (res.data.resCode == 0) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.getUserData();
        }
      });
    },
    // 获取用户列表数据
    getUserData() {
      this.loading = true;
      let resData = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      getUserList(resData).then(res => {
        if (res.data.resCode == 0) {
          let data = res.data.data.data;
          this.tableData = data;
          this.page.total = res.data.data.total;
          this.loading = false;
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
      this.$confirm(
        "是否删除选中数据，此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      ).then(() => {
        deleteUser({ id: this.AlldelId }).then(res => {
          if (res.data.resCode == 0) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.getUserData();
          }
        });
      });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/elementui.scss";

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
