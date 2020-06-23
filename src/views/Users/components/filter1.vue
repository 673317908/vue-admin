<template>
  <div>
    <!-- 选择器 -->
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
    <addUser :addModalValue="addModalValue" @showModal="showModal" @success="success(1)" />
  </div>
</template>

<script>
import addUser from "./addDialog";
export default {
  components: {
    addUser
  },
  data() {
    return {
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
      ]
    };
  },
  methods: {
    // 处理搜索数据
    formatSearchValue() {
      let resData = {};
      resData[this.selectValue] = this.searchValue;
      return resData;
    },
    // 搜索
    search() {
      let resData = this.formatSearchValue();
      this.setSearchData = resData;
    },
    // 打开新增用户对话框
    addUser() {
      this.addModalValue = true;
    },
    // 关闭新增用户对话框
    showModal() {
      this.addModalValue = false;
    }
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