<template>
  <div>
    <el-dialog
      title="编辑"
      :visible.sync="model"
      width="600px"
      @close="close"
      @open="open"
      :append-to-body="true"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="邮箱：" :label-width="formLabelWidth" value prop="username">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名：" :label-width="formLabelWidth" prop="truename">
          <el-input v-model="form.truename" autocomplete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth" prop="phone">
          <el-input v-model.number="form.phone" autocomplete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="地区：" :label-width="formLabelWidth">
          <div class="of">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-select v-model="form.province" placeholder="省" @change="selectProvince">
                  <el-option
                    v-for="item in provinceData"
                    :key="item.PROVINCE_CODE"
                    :label="item.PROVINCE_NAME"
                    :value="item.PROVINCE_CODE"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="form.city" placeholder="市" @change="selectCity">
                  <el-option
                    v-for="item in cityData"
                    :key="item.CITY_CODE"
                    :label="item.CITY_NAME"
                    :value="item.CITY_CODE"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="form.area" placeholder="区\县" @change="selectArea">
                  <el-option
                    v-for="item in areaData"
                    :key="item.AREA_CODE"
                    :label="item.AREA_NAME"
                    :value="item.AREA_CODE"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="form.street" placeholder="街道">
                  <el-option
                    v-for="item in streetData"
                    :key="item.STREET_CODE"
                    :label="item.STREET_NAME"
                    :value="item.STREET_CODE"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="角色：" :label-width="formLabelWidth" prop="role">
          <el-checkbox-group v-model="form.role">
            <el-checkbox
              v-for="item in roleData"
              :key="item.role"
              :label="item.name"
              :value="item.role"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth">
          <el-radio v-model="form.status" label="1">启用</el-radio>
          <el-radio v-model="form.status" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="danger" @click="ok('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAddress, getRole } from "@/api/user";
export default {
  props: {
    editModalValue: {
      default: false
    },
    row: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      model: false,
      checked: true,
      formLabelWidth: "120px",
      // 表单绑定值
      form: {
        status:'1', // 禁启用状态
        role: [], // 选中角色数据
        phone: "", // 电话
        username: "", // 用户名
        truename: "", // 真是姓名
        province: "", // 省
        city: "", // 市
        area: "", // 区县
        street: "" // 街道
      },
      provinceData: [], // 省份数据
      cityData: [], // 城市数据
      areaData: [], // 区县数据
      streetData: [], // 街道
      roleData: [], // 角色数据
      //   验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^([a-zA-Z]|[0-9])(\w|)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
            message: "请输入正确格式的邮箱",
            trigger: "blur"
          }
        ],
        truename: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "请输入正确手机号码",
            trigger: "blur"
          }
        ],
        role: [
          {
            type: "array",
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    editModalValue(n) {
      this.model = n;
    }
  },
  methods: {
    // 关闭对话框
    cancle() {
      this.$emit("showEdit", false);
    },
    // 点击遮罩层关闭对话框
    close() {
      this.$emit("showEdit", false);
    },
    // 打开对话框触发
    open() {
      // 获取省份数据
      getAddress({ type: "province" }).then(res => {
        this.provinceData = res.data.data.data;
      });
      // 获取角色
      getRole().then(res => {
        this.roleData = res.data.data;
      });
      let form=this.row
      form.role=this.row.role.split(',')
      this.form=form
      console.log(this.form)
    },
    // 获取城市数据
    selectProvince(value) {
      getAddress({ type: "city", province_code: value }).then(res => {
        this.cityData = res.data.data.data;
      });
      this.resetValue({ type: "city" });
    },
    // 获取区县数据
    selectCity(value) {
      getAddress({ type: "area", city_code: value }).then(res => {
        this.areaData = res.data.data.data;
      });
      this.resetValue({ type: "area" });
    },
    // 获取街道数据
    selectArea(value) {
      getAddress({ type: "street", area_code: value }).then(res => {
        this.streetData = res.data.data.data;
      });
      this.resetValue({ type: "street" });
    },
    // 重置选择框
    resetValue(params) {
      var cityReset = {
        city: ["city", "area", "street"],
        area: ["area", "street"],
        street: ["street"]
      };
      var arrObj = cityReset[params.type];
      arrObj.forEach(item => {
        this.form[item] = "";
      });
    },
    // 确认修改
    ok(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$emit("showEdit", false);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.of {
  overflow: hidden;
}
</style>
