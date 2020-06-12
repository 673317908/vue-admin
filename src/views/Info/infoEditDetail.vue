<template>
  <div id="editDetail">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="信息分类：">
        <el-select v-model="form.selectValue" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题：">
        <el-input v-model="form.title" style="width:30%;"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
          缩略图
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="发布日期：">
        <el-col >
          <el-date-picker disabled v-model="form.dataTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="详细内容：">
        <quillEditor  v-model="form.content" style="width:50%;"/>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCategoryData, getList, deleteData } from "@/api/info";
import { timestampToTime } from "@/utils/date";
// 引入富文本编辑器
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    components:{
        quillEditor
    },
  data() {
    return {
      form: {
        selectValue: "",
        title: "",
        dataTime: "",
        content: ""
      },
      options: [],
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    // 获取分类数据
    getSelectList() {
      getCategoryData().then(res => {
        this.options = res.data.data.data;
      });
    },
    // 获取页面数据
    getInfo() {
        let { id }=this.$route.query
      let resData = {
        id: id,
        pageNumber: 1,
        pageSize: 1
      };
      getList(resData).then(res => {
        this.categoryData = res.data.data.data[0];
        this.form.selectValue=this.categoryData.categoryId
        this.form.title = this.categoryData.title;
        this.form.content = this.categoryData.content;
        this.form.dataTime=timestampToTime(this.categoryData.createDate)
      });
    },
    // 时间转化
    toDate(row){
        console.log(row)
    },
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.getSelectList();
    this.getInfo();
  }
};
</script>

<style>
</style>