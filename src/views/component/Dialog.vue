<!--
 * @Author: lzd
 * @Date: 2021-01-19 10:59:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-07 15:24:10
 * @Description: content description
-->
<template>
  <el-dialog
    :visible="dialogVisible"
    width="900px"
    :modal="true"
    top="21vh"
    :close-on-click-modal="false"
    class="dialog-my"
    :append-to-body="false"
    :modal-append-to-body="false"
    :destroy-on-close="true"
    @close="close"
  >
    <span slot="title" class="dialog-title">
      <div>软件更新</div>
    </span>
    <div class="body">
      <el-form
        @submit.native.prevent
        ref="form3"
        label-width="100px"
        size="big"
        label-position="left"
      >
        <el-form-item label="软件类型:">
          <el-radio-group v-model="type" size="big">
            <el-radio-button label="后端程序"></el-radio-button>
            <el-radio-button label="前端程序"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="载入文件:">
          <el-upload
            class="upload"
            ref="upload"
            :data="{
              type: type,
            }"
            accept=".zip"
            :action="host + '/UploadFile '"
            :multiple="false"
            :limit="1"
            :auto-upload="false"
            :on-success="setting"
            :on-error="errorFun"
            :http-request="httpRequest"
          >
            <el-button size="big" type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button type="primary" size="big" @click="submitUpload"
          >开始更新</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script>
import Api from "@api/HttpApi_cz.js";
export default {
  name: "",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    propsData: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      type: "后端程序",
    };
  },
  computed: {
    host() {
      return window.CONFIG.httpUrl || "http://" + window.location.host + "/api";
    },
  },
  watch: {
    dialogVisible(newval) {
      newval && this.initFormData();
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    submitFun() {},
    initFormData() {},
    httpRequest(data) {
      console.log(data);
      // debugger;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const token = sessionStorage.token;
      config.headers.Authentication = token;

      // debugger
      let formData = new FormData();
      formData.append("type", data.data.type);
      formData.append("name", data.file.name);
      formData.append("file", data.file);

      let type =
        data.data.type == "前端程序" || data.data.type == "后端程序"
          ? "JWJCarSystem"
          : "";
      let settingData = {
        appName: type,
        packageName: data.file.name,
      };

      this.$axios.post(data.action, formData, config).then((res) => {
        // console.log(res)
        // debugger
        let status = res.data.code == 200;
        status && this.setting(settingData);
      });
    },
    submitUpload() {
      // this.$refs.upload.submit();
      this.$confirm("确认进行软件更新？软件更新后将重新登陆。", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$refs.upload.submit();
          // this.setting();
        })
        .catch(() => {});
    },
    setting(data) {
      Api.UpdateProgram(data).then((res) => {
        let status = res.code == "200";
        this.$notify({
          title: status ? "成功" : "失败",
          message: res.msg,
          type: status ? "success" : "warning",
        });
        // debugger
        this.$refs.upload.clearFiles();
        this.loading = false;
      });
    },
    errorFun() {
      this.$refs.upload.clearFiles();
    },
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
};
</script>

<style lang="less" scoped>
.dialog-my {
  // background:inherit;
  /deep/ .el-dialog {
    background: var(--q-view-bacground);
    box-shadow: inset 0 0 18px var(--box-shandow);
    height: 400px !important;
  }
}
.dialog-title {
  font-size: 16px;
}
.body {
  padding: 0 20px;
  padding-bottom: 25px;
}
.button-box {
  position: absolute;
  right: 38px;
  bottom: 20px;
}
/deep/ .el-form-item__label {
  color: var(--q-blue);
  font-size: 15px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 20px;
}
.select-box-name {
  margin-right: 8px;
}
/deep/ .el-input--mini {
  width: 12vw;
}
.dialog-my /deep/ .el-input--mini .el-input__inner {
  height: auto !important;
  line-height: 28px !important;
}
.my-btnn {
  padding: 15px 25px;
}
</style>
