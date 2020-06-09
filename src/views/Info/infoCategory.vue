<template>
  <div>
    <el-button type="danger" @click="addFirstInput({ type: 'addCategory' })"
      >添加一级分类</el-button
    >
    <hr
      style="margin-left:-20px;margin-right:-20px;margin-top:20px;margin-bottom:20rpx;background-color: #c9c9c9;"
    />
    <el-row>
      <el-col :span="8">
        <div class="category_wrap">
          <div class="category" v-for="item in categoryList" :key="item.id">
            <h4>
              <icon class="iconfont icon-jiahaozhankai"></icon>
              {{ item.category_name }}
              <div class="button_gourp">
                <el-button
                  size="mini"
                  type="danger"
                  round
                  @click="
                    editCategory({
                      categoryName: item.category_name,
                      categoryID: item.id,
                      type: 'firstCategory'
                    })
                  "
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  round
                  @click="addChildrenInput(item.category_name)"
                  >添加子项</el-button
                >
                <el-button size="mini" round @click="deleteCategory(item.id)"
                  >删除</el-button
                >
              </div>
            </h4>
            <ul v-if="item.children">
              <li v-for="item2 in item.children" :key="item2.id">
                {{ item2.category_name }}
                <div class="button_gourp">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="meun_title">一级分类编辑</h4>
        <el-form label-width="142px" :model="form" class="w410">
          <el-form-item label="一级分类名称">
            <el-input
              v-model="form.firstTitle"
              :disabled="firstInputStatus"
            ></el-input>
          </el-form-item>
          <el-form-item label="子级分类名称" v-if="childrenInputStatus">
            <el-input v-model="form.childrenTitle"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              @click="setTitle({ type: 'addCategory' })"
              :loading="btnStatus"
              :disabled="btndisabledStatus"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getTitle,
  getCategoryAll,
  DeleteCategory,
  EditCategory
} from "@/api/info.js";
export default {
  data() {
    return {
      childrenInputStatus: false, //子级输入框默认值
      categoryList: [], // 分类数据
      btnStatus: false, // 确定按钮加载中默认值
      btndisabledStatus: true, // 确定按钮禁用默认值
      firstInputStatus: true, // 一级标题输入框禁用状态
      editData: {
        category_name: "",
        id: ""
      }, // 需要编辑的参数
      btntype: "", // 确定按钮属性
      form: {
        firstTitle: "",
        childrenTitle: ""
      }
    };
  },
  methods: {
    // 启用一级输入框
    addFirstInput(value) {
      this.btntype = value.type;
      this.firstInputStatus = false;
      this.btndisabledStatus = false;
    },
    // 添加子项输入框
    addChildrenInput(category_name) {
      this.form.firstTitle=category_name
      this.firstInputStatus=false
      this.childrenInputStatus = true;
      this.btndisabledStatus = false;
    },
    // 添加分类名称
    setTitle() {
      this.btnStatus = true;
      // 添加分类名称
      if (this.btntype == "addCategory") {
        this.addCategoryTitle();
      }
      // 修改分类名
      if (this.btntype == "firstCategory") {
        this.editCategoryTitle();
      }
    },
    // 获取分类数据
    getCategoryList() {
      getCategoryAll().then(res => {
        console.log(res.data);
        this.categoryList = res.data.data;
      });
    },
    // 删除分类
    deleteCategory(id) {
      var data = { categoryId: id };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DeleteCategory(data).then(res => {
            // 通过判断索引  用splice（）方法删除指定位置的数据
            // let index = this.categoryList.findIndex(v => v.id == id);
            // this.categoryList.splice(index, 1);

            // 通过判断id是否 将id一致的放到新的数组  原数组与新数组相等
            let newData = this.categoryList.filter(v => v.id !== id);
            this.categoryList = newData;
            if (res.data.resCode == 0) {
              this.$message({
                message: res.data.message,
                type: "success"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑一级分类
    editCategory(value) {
      this.editData.category_name = value.categoryName;
      this.editData.id = value.categoryID;
      this.btntype = value.type;
      this.form.firstTitle = value.categoryName;
      this.firstInputStatus = false;
      this.btndisabledStatus = false;
    },
    // 添加分类名称
    addCategoryTitle() {
      if (this.form.firstTitle == "") {
        this.$message({
          message: "内容不能为空"
        });
        this.btnStatus = false;
      } else {
        getTitle({ categoryName: this.form.firstTitle }).then(res => {
          if (res.data.resCode == 0) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
          }
          this.categoryList.push(res.data.data);
          this.btnInputStatus();
        });
      }
    },
    // 修改分类名
    editCategoryTitle() {
      let data = {
        categoryName: this.form.firstTitle,
        id: this.editData.id
      };
      if (this.form.firstTitle.length == 0) {
        this.$message({
          message: "未选择分类,请选择分类",
          type: "warning"
        });
      }
      EditCategory(data).then(res => {
        if (res.data.resCode == 0) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
        }
        var resData = res.data.data.data;
        let newData = this.categoryList.filter(v => v.id == this.editData.id);
        newData[0].category_name = resData.categoryName;

        // this.editData.category_name = resData.categoryName;
        this.btnInputStatus();
      });
    },
    // 恢复输入框和按钮默认值
    btnInputStatus() {
      this.form.firstTitle = "";
      this.btnStatus = false;
      this.firstInputStatus = true;
      this.childrenInputStatus = false;
      this.btndisabledStatus = true;
    }
  },
  mounted() {
    this.getCategoryList();
  }
};
</script>

<style lang="scss" scoped>
.category_wrap {
  overflow: auto !important;
  height: 460px !important;
  &::-webkit-scrollbar {
    display: none !important;
  }
  div:first-child {
    &:before {
      top: 15px;
    }
  }
  div:last-child {
    &:before {
      bottom: 14px;
    }
  }
}

.meun_title {
  line-height: 30px;
  padding-left: 22px;
  margin-bottom: 20px;
  background-color: #cccccc;
}
.category {
  position: relative;
  line-height: 30px;
  font-size: 12px;
  &:before {
    content: "";
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
    cursor: pointer;
    icon {
      width: 16px;
      height: 16px;
    }
    .icon-jiahaozhankai {
      position: absolute;
      left: 12px;
    }
  }
  li {
    position: relative;
    padding-left: 60px;
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      left: 20px;
      top: 13px;
      width: 32px;
      border-bottom: 1px dotted #000000;
    }
  }
  li,
  h4,
  icon {
    &:hover {
      background-color: #cccccc;
      transition: all 0.5s ease 0s;
      .button_gourp {
        display: block;
      }
    }
  }
}
.button_gourp {
  position: absolute;
  right: 11px;
  top: 0;
  z-index: 33;
  display: none;
  button {
    font-size: 12px;
  }
}
.w410 {
  width: 410px;
}
</style>
