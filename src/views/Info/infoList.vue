<template>
  <div>
    <!-- 选择器 -->
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label_wrap category">
          <label for>分类:</label>
          <div class="warp_content">
            <el-select v-model="categoryValue" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options.data"
                :label="item.category_name"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label_wrap date">
          <label for>日期:</label>
          <div class="warp_content">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;"
              format="yyyy-MM-DD hh:mm:ss"
              value-format="yyyy-MM-DD hh:mm:ss"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label_wrap key_word">
          <label for>关键字:</label>
          <div class="warp_content">
            <el-select v-model="selectValue" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入关键字" style="width:100%;" v-model="searchValue"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="searchData">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <span style="color:#FFF;">1</span>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%;float:right;" @click="addList">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top:20px;"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column prop="category" label="类型" width="130" :formatter="toCotegory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="170" :formatter="toDate"></el-table-column>
      <el-table-column prop="admin" label="管理员" width="110"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope)">删除</el-button>
          <el-button type="success" size="mini" @click="editList">编辑</el-button>
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

    <!-- 对话框 -->
    <DiaLog :flag="dialogShow" @showValue="showValue" />

    <!-- 编辑框 -->
    <EditDiaLog :flag="editdialog" @showEdit="showEdit"/>
  </div>
</template>

<script>
import DiaLog from "./components/dialog";
import EditDiaLog from "./components/editDialog";
import { getCategoryData, getList, deleteData } from "@/api/info";
import { timestampToTime } from "@/utils/date";
export default {
  components: {
    DiaLog,EditDiaLog
  },
  data() {
    return {
      dialogShow: false, // 对话框显示隐藏
      editdialog:false, // 编辑框显示隐藏
      dateValue: "", // 日期选择框
      selectValue: "ID", // 关键字选择框
      categoryValue: "", //类型选择框
      searchValue: "", // 搜索输入框
      currentPage4: 1,
      options: [], // 分类数据
      searchOptions: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ], // 搜索选择框
      tableData: [], // 列表数据
      pageNumber: 1, // 当前页码
      pageSize: 2, // 每页条数
      total: 0, // 总条数
      loading: false, // 表格加载提示
      deleteId: ""
    };
  },
  methods: {
    // 切换每页条数
    handleSizeChange(value) {
      this.pageSize = value;
      this.getCategoryList();
    },
    // 下一页
    handleCurrentChange(value) {
      this.pageNumber = value;
      this.getCategoryList();
    },
    // 打开对话框
    addList() {
      this.dialogShow = true;
    },
    // 关闭对话框
    showValue() {
      this.dialogShow = false;
    },
    // 打开编辑框
    editList(){
      this.editdialog=true
    },
    // 关闭编辑框
    showEdit(){
      this.editdialog=false
    },
    //删除选中数据
    deleteItem(scope) {
      this.$confirm(
        "是否删除选中数据，此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        deleteData({ id: [scope.row.id] }).then(res => {
          this.getCategoryList();
        });
      });
    },
    // 获取分类选项数据
    getCategory() {
      getCategoryData().then(res => {
        this.options = res.data.data;
      });
    },
    // 获取分类列表数据
    getCategoryList() {
      let requsetData = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
      this.loading = true;
      getList(requsetData).then(res => {
        this.tableData = res.data.data.data;
        this.total = res.data.data.total;
        this.loading = false;
      });
    },
    // 时间转换
    toDate(row) {
      return timestampToTime(row.createDate);
    },
    // 根据id匹配类型名
    toCotegory(row) {
      let categoryId = row.categoryId;
      let categoryData = this.options.data.filter(item =>item.id == categoryId)[0];
      return categoryData.category_name;
    },
    // 选择框事件
    handleSelectionChange(value) {
      let id = value.map(item => item.id);
      this.deleteId = id;
    },
    // 批量删除
    deleteAll() {
      if (!this.deleteId || this.deleteId.length == 0) {
        this.$message({
          message: "请选择需要删除的数据",
          type: "error"
        });
        return false;
      }
      this.$confirm(
        "是否删除选中数据，此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        deleteData({ id: this.deleteId }).then(res => {
          this.getCategoryList();
          this.deleteId = "";
        });
      });
    },
    // 处理搜索数据
    fomatSearchData() {
      let requsetData = {};
      //  判断分类数据
      if (!this.categoryId) {
        requsetData.categoryValue = this.categoryValue;
      }
      //  判断时间数据  
      if (this.dateValue.length > 0) {
        (requsetData.startTiem = this.dateValue[0]),
          (requsetData.endTime = this.dateValue[1]);
      }
      // 判断关键字选择
      requsetData[this.selectValue] = this.searchValue;
      // 判断页码
      if (this.pageNumber && this.pageSize) {
        requsetData.pageNumber = this.pageNumber;
        requsetData.pageSize = this.pageSize;
      }
      return requsetData
    },
    // 搜索
    searchData() {
      let requsetData = this.fomatSearchData();
      getList(requsetData).then(res=>{
        this.tableData = res.data.data.data;
      })
    }
  },
  mounted() {
    this.getCategory();
    this.getCategoryList();
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
