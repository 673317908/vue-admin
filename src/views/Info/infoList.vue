<template>
  <div>
    <!-- 选择器 -->
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="label_wrap category">
          <label for>类型:</label>
          <div class="warp_content">
            <el-select
              v-model="categoryValue"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label_wrap key_word">
          <label for>关键字:</label>
          <div class="warp_content">
            <el-select
              v-model="searchValue"
              placeholder="请选择"
              style="width:100%;"
            >
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
        <el-input placeholder="请输入关键字" style="width:100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <span style="color:#FFF;">1</span>
      </el-col>
      <el-col :span="2">
        <el-button
          type="danger"
          style="width:100%;float:right;"
          @click="addList"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%;margin-top:20px;">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column
        prop="category"
        label="类型"
        width="130"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="107"></el-table-column>
      <el-table-column
        prop="admin"
        label="管理员"
        width="110"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem"
            >删除</el-button
          >
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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
          :current-page="currentPage4"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          >></el-pagination
        >
      </el-col>
    </el-row>

    <!-- 对话框 -->
    <DiaLog :flag="dialogShow" @showValue="showValue" />
  </div>
</template>

<script>
import DiaLog from "./components/dialog";
export default {
  components: {
    DiaLog
  },
  data() {
    return {
      dialogShow: false, // 对话框
      dateValue: "", // 日期选择框
      searchValue: "ID", //关键字选择框
      categoryValue: "", //类型选择框
      currentPage4: 1,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      searchOptions: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ],
      tableData: [
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推特回应",
          category: "国内信息",
          date: "2016-05-02 19:31:31",
          admin: "王小虎"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推特回应",
          category: "国内信息",
          date: "2016-05-02 19:31:31",
          admin: "王小虎"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推特回应",
          category: "国内信息",
          date: "2016-05-02 19:31:31",
          admin: "王小虎"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推特回应",
          category: "国内信息",
          date: "2016-05-02 19:31:31",
          admin: "王小虎"
        }
      ]
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    // 打开对话框
    addList() {
      this.dialogShow = true;
    },
    // 关闭对话框
    showValue() {
      this.dialogShow = false;
    },
    //删除选中数据
    deleteItem() {
      this.confirm({
        tipContent: "此操作将永久删除该文件, 是否继续?",
        fn: this.consoleText
      });
    },
    // 批量删除
    deleteAll() {
      this.confirm({
        tipContent: "是否删除选中数据，此操作将永久删除该文件, 是否继续?"
      });
    },
    consoleText() {
      console.log(111);
    }
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
