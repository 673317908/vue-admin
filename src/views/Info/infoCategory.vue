<template>
  <div>
    <el-button type="danger" @click="addChildren">添加一级分类</el-button>
    <hr
      style="margin-left:-20px;margin-right:-20px;margin-top:20px;margin-bottom:20rpx;background-color: #c9c9c9;"
    />
    <el-row>
      <el-col :span="8">
        <div class="category_wrap">
          <div class="category">
            <h4>
              <icon class="iconfont icon-jiahaozhankai"></icon>新闻
              <div class="button_gourp">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" type="success" round>添加子项</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                国内
                <div class="button_gourp">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li class>国内</li>
            </ul>
          </div>
          <div class="category">
            <h4><icon class="iconfont icon-jiahaozhankai"></icon>新闻</h4>
            <ul>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="meun_title">一级分类编辑</h4>
        <el-form label-width="142px" :model="form" class="w410">
          <el-form-item label="一级分类名称">
            <el-input v-model="form.firstTitle"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称" v-if="childrenInput">
            <el-input v-model="form.childrenTitle"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="setTitle">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTitle } from "@/api/info.js";
export default {
  data() {
    return {
      childrenInput: false, //子级输入框默认值
      form: {
        firstTitle: "",
        childrenTitle: ""
      }
    };
  },
  methods: {
    // 添加子级输入框
    addChildren() {
      this.childrenInput = true;
    },
    // 添加分类名称
    setTitle() {
      getTitle({ categoryName: this.form.firstTitle }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category_wrap {
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
