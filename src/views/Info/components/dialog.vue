<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="flagValue"
      :append-to-body="true"
      @close="close"
      width="580px"
    >
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
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
    }
  }
};
</script>

<style></style>
