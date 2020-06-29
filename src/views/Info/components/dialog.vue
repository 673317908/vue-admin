<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="flagValue"
      :append-to-body="true"
      @close="close"
      width="580px"
      @opened="getCategory"
    >
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option
              v-for="item in categoryData"
              :key="item.id"
              :value="item.id"
              :label="item.category_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input type="textarea" placeholder="请输入内容" autocomplete="off" v-model="form.content" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="danger" @click="addCategory" :loading="btnStatus">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryData, addCategoryData } from "@/api/info";
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: "70px",
      flagValue: false,
      form: {
        title: "",
        category: "",
        content: ""
      },
      categoryData: [], // 分类数据
      btnStatus: false,
      categoryID: ""
    };
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.flagValue = newValue;
      }
    }
  },
  methods: {
    close() {
      this.$emit("showValue", false);
    },
    // 获取分类数据
    getCategory() {
      getCategoryData().then(res => {
        this.categoryData = res.data.data.data;
      });
    },
    // 添加列表内容
    addCategory() {
      let setData = {
        category: this.form.category,
        title: this.form.title,
        content: this.form.content
      };
      this.btnStatus = true;
      addCategoryData(setData)
        .then(res => {
          this.btnStatus = false;
          this.form.category = "";
          this.form.title = "";
          this.form.content = "";
          this.flagValue = false;
          this.$message({
            message: res.data.message,
            type: "success"
          });
        })
        .catch(error => {
          this.btnStatus = false;
        });
    },
    // 取消添加
    cancel() {
      this.form.category = "";
      this.form.title = "";
      this.form.content = "";
      this.flagValue = false;
    }
  }
};
</script>

<style></style>
