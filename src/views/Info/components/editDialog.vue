<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="editFlag"
      :append-to-body="true"
      @close="close"
      width="580px"
      @opened="getCategory"
    >
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option
              v-for="item in CategoryList"
              :key="item.id"
              :value="item.id"
              :label="item.category_name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input type="textarea" placeholder="请输入内容" autocomplete="off" v-model="form.content"></el-input>
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
import { getCategoryData, editCategoryData,getList } from "@/api/info";
export default {
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    editId:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      formLabelWidth: "70px",
      editFlag: false,
      form: {
        title: "",
        category: "",
        content: ""
      },
      categoryData: [], // 分类数据
      CategoryList:[],
      // editList:[],  // 编辑数据
      btnStatus: false, // 确定按钮状态
      categoryID: ""
    };
  },
  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.editFlag = newValue;
      }
    }
  },
  methods: {
    // 修改父组件默认值
    close() {
      this.$emit("showEdit", false);
    },
    // 获取数据
    getCategory() {
      this.getCategoryList()
      this.getInfo()
    },
    getInfo(){
      let resData={
        id:this.editId,
        pageNumber:1,
        pageSize:1
      }
      getList(resData).then(res=>{
       this.categoryData = res.data.data.data[0];
       this.form.title=this.categoryData.title
       this.form.content=this.categoryData.content
       this.form.category=this.categoryData.categoryId
      })
    },
    // 获取分类数据
     getCategoryList() {
      getCategoryData().then(res => {
        this.CategoryList = res.data.data.data;
      });
    },
    // 编辑列表内容
    addCategory() {
      this.btnStatus = true;
      let setData={
        id:this.editId,
        categoryId:this.form.category,
        title:this.form.title,
        content:this.form.content
      }
      editCategoryData(setData).then(res => {
        this.btnStatus = false;
        this.form.category = "";
        this.form.title = "";
        this.form.content = "";
        this.editFlag = false;
        this.$message({
          message: res.data.message,
          type: "success"
        });
        this.$emit("getList")
      }).catch(error=>{
          this.btnStatus = false;
      })
    },
    // 取消添加
    cancel() {
      this.form.category = "";
      this.form.title = "";
      this.form.content = "";
      this.editFlag = false;
      this.btnStatus = false;
    }
  }
};
</script>

<style></style>
