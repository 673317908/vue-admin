<template>
  <div>
    <el-dialog title="新增" :visible.sync="addMoadl" width="580px" @close="close" >
      <el-form :model="form">
        <el-form-item label="用户名：" :label-width="formLabelWidth">
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区：" :label-width="formLabelWidth">
          <el-select v-model="form.province" placeholder="请选择" style="width:100px;">
            <el-option label="区域一"></el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="请选择" style="width:100px;margin-left:15px;">
            <el-option label="区域一"></el-option>
          </el-select>
          <el-select v-model="form.street" placeholder="请选择" style="width:100px;margin-left:15px;">
            <el-option label="区域一"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">启用</el-radio>
          <el-radio v-model="radio" label="2">禁用</el-radio>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-checkbox v-model="checked">系统管理员</el-checkbox>
          <el-checkbox v-model="checked">信息管理员</el-checkbox>
          <el-checkbox v-model="checked">用户管理员</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="danger">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    addModalValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: "120px",   // label宽度
      radio: false,  // 单选框默认值
      addMoadl: false,  // 对话框默认值
      checked: true,  // 复选框默认值
     // 表单绑定值
      form: {
        mobile: "",  // 电话
        userName: "",  // 用户名
        name: "",  // 真是姓名
        province: "",   // 省
        city: "",   // 市
        street: "",  // 区
      }
    };
  },
  watch: {
    addModalValue: {
      handler(newValue, oldValue) {
        this.addMoadl = newValue;
      }
    }
  },
  methods: {
    close() {
      this.$emit("showModal", false);
    }
  }
};
</script>

<style>
</style>