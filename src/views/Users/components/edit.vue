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
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="邮箱\用户名："
          :label-width="formLabelWidth"
          value
          prop="userName"
        >
          <el-input v-model="form.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="真是姓名："
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号："
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地区：" :label-width="formLabelWidth">
          <div class="of">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-select
                  v-model="form.province"
                  placeholder="省"
                  @change="selectProvince"
                >
                  <el-option
                    v-for="item in provinceData"
                    :key="item.PROVINCE_CODE"
                    :label="item.PROVINCE_NAME"
                    :value="item.PROVINCE_CODE"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="form.city"
                  placeholder="市"
                  @change="selectCity"
                >
                  <el-option
                    v-for="item in cityData"
                    :key="item.CITY_CODE"
                    :label="item.CITY_NAME"
                    :value="item.CITY_CODE"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select
                  v-model="form.area"
                  placeholder="区\县"
                  @change="selectArea"
                >
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
        <el-form-item label="角色：" :label-width="formLabelWidth">
          <el-checkbox v-model="checked">系统管理员</el-checkbox>
          <el-checkbox v-model="checked">信息管理员</el-checkbox>
          <el-checkbox v-model="checked">用户管理员</el-checkbox>
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">启用</el-radio>
          <el-radio v-model="radio" label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="danger" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAddress } from "@/api/user";
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
      radio: false,
      // 表单绑定值
      form: {
        mobile: "", // 电话
        userName: "", // 用户名
        name: "", // 真是姓名
        province: "", // 省
        city: "", // 市
        area: "", // 区县
        street: "" // 街道
      },
      provinceData: [], // 省份数据
      cityData: [], // 城市数据
      areaData: [], // 区县数据
      streetData: [], // 街道
      //   验证规则
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 3, max: 11, message: "请输入正确手机号码", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    editModalValue(n) {
      this.model = n;
      this.form.mobile = this.row.mobile;
      this.form.userName = this.row.userName;
      this.form.name = this.row.truename;
    }
  },
  methods: {
    // 关闭对话框
    cancle() {
      this.$emit("showEdit", false);
    },
    close() {
      this.$emit("showEdit", false);
    },
    // 获取省份数据
    open() {
      getAddress({ type: "province" }).then(res => {
        this.provinceData = res.data.data.data;
      });
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
    ok() {
      this.$emit("showEdit", false);
    }
  }
};
</script>

<style lang="less" scoped>
.of {
  overflow: hidden;
}
</style>
