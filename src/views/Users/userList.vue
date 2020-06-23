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
                <el-option v-for="item in options" :key="item.id" :label="item.text" :value="item.id"></el-option>
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
    <tableList :on-refresh="onRefresh[1]"/>

    <!-- 新增用户对话框 -->
    <addUser :addModalValue="addModalValue" @showModal="showModal" @success="success(1)"/>
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
   props:{
    "on-refresh":{
      default:false
    }
  },
  data() {
    return {
       onRefresh: {
        1: false
      },
      show: {
        1: false
      },
      options:[{id:1,text:'姓名'},{id:2,text:'手机号'}],
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
    success(type){
      this.onRefresh[type]=!this.onRefresh[type]
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
