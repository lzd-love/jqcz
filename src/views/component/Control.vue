<!--
 * @Author: lzd
 * @Date: 2021-01-06 16:27:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-07 14:32:59
 * @Description: content description
-->
<template>
  <div class="control-log box-shandow" v-loading="loading">
    <div class="q-title">信号控制</div>
    <div class="q-content">
      <el-tabs class="tabs-wrjlb" :stretch="true">
        <!-- :before-leave="beforeLeave"
        @tab-click="tabClick"
        v-model="defenceModeCopy" -->
        <el-tab-pane >
          <el-form
            ref="form1"
            label-width="120px"
            size="mini"
            label-position="left"
          >
            <el-form-item label="工作模式:">
              <el-select
                :value="workMode"
                placeholder="请选择"
                @change="changeWorkMode"
              >
                <el-option
                  v-for="item in selectOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="设备开关:">
              <el-select
                :value="signalState"
                placeholder="请选择"
                @change="changeSignalState"
              >
                <el-option
                  v-for="item in selectOption1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="防御范围（m）:">
              <el-slider
                :show-tooltip="false"
                v-model="defenceRangeCopy"
                :max="1000"
                :step="100"
                @change="sliderChange"
              >
              </el-slider>
              <div style="text-align: right">{{ defenceRangeCopy }}m</div>
            </el-form-item> -->
          </el-form>
        </el-tab-pane>
        <!-- <el-tab-pane label="定向驱离" name="定向驱离模式">
          <el-form
            ref="form1"
            label-width="120px"
            size="mini"
            label-position="left"
          >
            <el-form-item label="防御范围（m）:">
              <el-slider
                :show-tooltip="false"
                v-model="defenceRangeCopy"
                :max="1000"
                :step="100"
                @change="sliderChange"
              >
              </el-slider>
              <div style="text-align: right">{{ defenceRangeCopy }}m</div>
            </el-form-item>
            <el-divider></el-divider>
            <p>进入定向驱离模式后，请点击下面按钮选择驱离方向</p>
            <el-divider></el-divider>
            <div class="direction-btn-contanier">
              <div
                class="direction-btn iconfont"
                :class="
                  item.class +
                  (item.clickVal == expelDirection && signalState == '开'
                    ? ' active'
                    : '')
                "
                v-for="(item, index) in btnOptions"
                :key="index"
                @click="directionFun(item.clickVal)"
              ></div>
            </div>
          </el-form>
        </el-tab-pane> -->
        <!-- <el-tab-pane label="待机模式" name="待机">
          <el-divider></el-divider>
          <p>当前设备处于关闭状态，请选择相应工作模式，进行操作，激活设备</p>
          <el-divider></el-divider>
        </el-tab-pane> -->
      </el-tabs>
    </div>
    <el-button style="right:135px" class="log-down my-btnn" size="mini" type="primary" @click="openFun"
      >软件更新</el-button
    >
    <el-button class="log-down my-btnn" size="mini" type="primary" @click="logDownload"
      >日志下载</el-button
    >
    <Dialog
      :dialogVisible="dialogVisible"
      @close="closeFun"
    />
  </div>
</template>

<script>
import Api from "@api/HttpApi_cz.js";
import MyBlob from "@plugins/Blob.js";
import Dialog from "./Dialog.vue";
export default {
  name: "control",
  components: {
    Dialog
  },
  props: {
    defenceMode: {
      type: String,
      default: "定向驱离模式",
    },
    workMode: {
      type: String,
      default: "自动",
    },
    signalState: {
      type: String,
      default: "开",
    },
    defenceRange: {
      type: Number,
      default: 1000,
    },
    expelDirection: {
      type: String,
      default: "东南",
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      selectOption: [
        {
          label: "手动",
          value: "手动",
        },
        {
          label: "自动",
          value: "自动",
        },
      ],
      selectOption1: [
        {
          label: "启动",
          value: "开",
        },
        {
          label: "关闭",
          value: "关",
        },
      ],
      // czmsobj: {
      //   gzms: "",
      //   fyfw: 1000,
      //   sbkg: "",
      // },
      // dxqlobj: {
      //   fyfw: 1000,
      // },
      btnOptions: [
        {
          class: "icon-jiantou_zuoshang",
          clickVal: "西北",
        },
        {
          class: "icon-jiantou_xiangshang",
          clickVal: "北",
        },
        {
          class: "icon-jiantou_youshang",
          clickVal: "东北",
        },
        {
          class: "icon-jiantou_xiangzuo",
          clickVal: "西",
        },
        {
          class: "",
          clickVal: "",
        },
        {
          class: "icon-jiantou_xiangyou",
          clickVal: "东",
        },
        {
          class: "icon-jiantou_zuoxia",
          clickVal: "西南",
        },
        {
          class: "icon-jiantou_xiangxia",
          clickVal: "南",
        },
        {
          class: "icon-jiantou_youxia",
          clickVal: "东南",
        },
      ],
      defenceRangeCopy: this.defenceRange,
      defenceModeCopy: this.defenceMode,
    };
  },
  computed: {},
  watch: {
    defenceRange() {
      this.$set(this, "defenceRangeCopy", this.defenceRange);
    },
    defenceMode() {
      console.log(this.defenceMode);
      this.$set(this, "defenceModeCopy", this.defenceMode);
    },
  },
  methods: {
    closeFun() {
      this.dialogVisible = false;
    },
    openFun(){
      this.dialogVisible = true;
    },
    tabClick(elem) {
      let el = elem.$el;
      // event.stopPropagation();
      let newval = el.id.split("-")[1];
      // this.$confirm(`确定要切换到${newval}吗？`, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "info",
      // })
      //   .then(() => {
      this.changeDefenceMode(newval);
      // })
      // .catch(() => {});
    },
    beforeLeave() {
      // if (newval == "待机") {
      //   return true;
      // }
      return true;
    },
    sliderChange(newval) {
      // console.log(newval);
      this.setUpConfirm(newval);
    },
    setUpConfirm(newval) {
      this.$confirm("确定要更改设置吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.changeDefenceRange(newval);
        })
        .catch(() => {
          this.$set(this, "defenceRangeCopy", this.defenceRange);
        });
    },
    logDownload() {
      this.$confirm("确定要下载日志文件吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          Api.logFile().then((res) => {
            console.log(res);
            let success = res.status == "200";
            this.$notify({
              title: success ? "下载成功" : "下载失败",
              message: success ? "下载成功" : "下载失败",
              type: success ? "success" : "warning",
            });
            if (success) {
              let blob = new MyBlob([res.data], {
                type: "text/html;charset=UTF-8;",
              });
              blob.downloadByATag("uavlog.log");
            }
          });
        })
        .catch(() => {});
    },
    directionFun(clickVal) {
      if (clickVal) {
        let classList = event.target.classList;
        if (Array.from(classList).indexOf("active") > -1) {
          this.$confirm("确定要关闭该驱离方向吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          })
            .then(() => {
              // classList.remove("active");
              this.changeSignalState("关");
            })
            .catch(() => {});
        } else {
          this.$confirm("确定要选择该驱离方向吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          })
            .then(() => {
              // classList.add("active");
              this.changeExpelDirection(clickVal);
            })
            .catch(() => {});
        }
      }
    },
    changeDefenceMode(newval) {
      this.loading = true;
      // this.$nextTick(() => {
      //   this.$set(this, "defenceModeCopy", this.defenceMode);
      // });
      let res = Api.setDefenceMode({ defenceMode: newval }).then((res) => {
        this.confirmFun(res);
        this.loading = false;
      });
      return res.code == "200";
    },
    changeWorkMode(newval) {
      this.loading = true;
      let res = Api.setDefenceMode({ workMode: newval }).then((res) => {
        this.confirmFun(res);
        this.loading = false;
      });
      return res.code == "200";
    },
    changeSignalState(newval) {
      this.loading = true;
      let res = Api.setDefenceMode({ signalState: newval }).then((res) => {
        this.confirmFun(res);
        this.loading = false;
      });
      return res.code == "200";
    },
    changeDefenceRange(newval) {
      console.log(newval);
      this.loading = true;
      let res = Api.setDefenceMode({ defenceRange: newval }).then((res) => {
        this.confirmFun(res);
        this.loading = false;
      });
      return res.code == "200";
    },
    changeExpelDirection(newval) {
      this.loading = true;
      let res = Api.setDefenceMode({
        signalState: "开",
        expelDirection: newval,
      }).then((res) => {
        this.confirmFun(res);
        this.loading = false;
      });
      return res.code == "200";
    },
    confirmFun(res) {
      let success = res.code == "200";
      this.$notify({
        duration: 1000,
        title: success ? "设置成功" : "设置失败",
        message: res.msg,
        type: success ? "success" : "warning",
      });
    },
  },
  created() {},
  mounted() {},
  updated() {},
  destroyed() {},
};
</script>

<style lang='less' scoped>
.control-log {
  text-align: left;
}
.direction-btn-contanier {
  overflow: hidden;
  padding: 10%;
}
.direction-btn {
  width: 24%;
  margin-right: 14%;
  margin-bottom: 8%;
  padding-bottom: 24%;
  border: 1px solid var(--main-color);
  color: var(--main-color);
  float: left;
  box-shadow: 0 0 10px var(--box-shandow);
  position: relative;
  cursor: pointer;
  &:nth-last-child(3n + 1) {
    margin-right: 0;
  }
  &:nth-child(5) {
    visibility: hidden;
  }
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
}
.active {
  box-shadow: inset 0 0 15px var(--box-shandow);
  color: var(--box-shandow);
}
/deep/ .el-tab-pane {
  padding: 10px 10px 0;
}
/deep/.el-form-item--mini.el-form-item,
/deep/.el-form-item--small.el-form-item {
  margin-bottom: 40px;
}
.my-btnn {
  padding: 15px 25px;
}
</style>