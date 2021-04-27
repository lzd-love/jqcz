<!--
 * @Author: lzd
 * @Date: 2021-01-05 16:26:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-26 14:26:07
 * @Description: content description
-->
<template>
  <div class="frame" v-loading="loading">
    <UAV
      @close="closeClick"
      ref="box"
      v-if="isopen"
      :uavList="statusData.uavList"
    />
    <MAP
      :isopen="isopen"
      ref="MAP"
      :probeDevState="statusData.probeDevState"
      :cheatDevState="statusData.cheatDevState"
      :simState="statusData.simState"
      :uavList="statusData.uavList"
      :devLng="statusData.devLng"
      :devLat="statusData.devLat"
      :devLng_="statusData.devLng_"
      :devLat_="statusData.devLat_"
      :devHeight="statusData.devHeight"
      :carCourse="0"
    />
    <Control
      :defenceMode="statusData.defenceMode"
      :workMode="statusData.workMode"
      :signalState="statusData.signalState"
      :defenceRange="statusData.defenceRange"
      :expelDirection="statusData.expelDirection"
    />
    <div
      :style="{color: (statusData.uavList.length>0)?'rgb(255 121 25)':''}"
      class="iconfont icon-wurenji icon-btn"
      ref="btn"
      v-if="!isopen"
      @click="openClick"
      title="无人机列表"
    ></div>
  </div>
</template>

<script>
import { wgs2gcj } from "@plugins/pointtransfertools";
import Control from "./component/Control";
import MAP from "./component/MAP";
import UAV from "./component/WRJ_list";
import websocketApi from "@api/WsApi.js";
export default {
  name: "frame",
  components: {
    Control,
    MAP,
    UAV,
  },
  data() {
    return {
      screenindex: 0,
      isopen: true,
      loading: true,
      statusData: {
        // 数据
        devTime: "2021-01-01 08:00:00", // 设备时间（2021-01-01 08:00:00）
        devLng: 112.979352788, // 设备经度
        devLat: 28.2134782309, // 设备纬度
        devLng_: 112.979352788, // 设备经度
        devLat_: 28.2134782309, // 设备纬度
        devHeight: 500, // 设备高度
        carCourse: 35, // 载车航向
        cheatDevState: "正常", // 欺骗设备状态（正常、异常）
        probeDevState: "异常", // 探测设备状态（正常、异常）
        simState: "仿真开始", // 仿真设备状态
        defenceMode: "车载模式", // 防御模式（车载模式、定向驱离模式）
        workMode: "自动", // 工作模式（自动、手动）
        signalState: "开", // 信号状态（开、关）
        defenceRange: 1000, // 防御范围
        expelDirection: "北", // 驱离方向（东、东南...）
        uavList: [
          {
            id: "9921", // ID
            name: "无人机1", // 自定义名称
            model: "北斗一号aaaaaa", // 型号
            frequency: "2.4GHz", // 频段（2.4GHz、5.8GHz）
            longitude: 112.980312728, // 经度
            latitude: 28.2186782319, // 纬度
            height: 500, // 高度
            azimuth: 10, // 方位
            distance: 500, // 距离
            isWhite: false, // 是否在白名单（true、false）
            isExpel: false, // 是否在被驱离（true、false）
            establishTime: "2021-01-01 08:00:00", // 首次捕获时间
          },
          // {
          //   id: "9921", // ID
          //   name: "无人机2", // 自定义名称
          //   model: "北斗二号", // 型号
          //   frequency: "5.8GHz", // 频段（2.4GHz、5.8GHz）
          //   longitude: 112.978312728, // 经度
          //   latitude: 28.2186782319, // 纬度
          //   height: 500, // 高度
          //   azimuth: 80, // 方位
          //   distance: 500, // 距离
          //   isWhite: true, // 是否在白名单（true、false）
          //   isExpel: false, // 是否在被驱离（true、false）
          //   establishTime: "2021-01-01 08:00:00", // 首次捕获时间
          // },
        ],
      },
    };
  },
  computed: {},
  watch: {
    isopen() {
      this.$nextTick(() => {
        this.$refs.MAP.refreshMp();
      });
    },
  },
  methods: {
    screen() {
      var docElm = document.documentElement;
      //W3C
      if (docElm.requestFullscreen) {
        try {
          docElm.requestFullscreen();
        } catch (e) {
          console.log(e);
        }
      }
    },
    openClick() {
      let el = this.$refs.btn.$el || this.$refs.btn;
      el.classList.remove("invisible");
      setTimeout(() => {
        this.isopen = true;
      }, 250);
    },
    closeClick() {
      let el = this.$refs.box.$el || this.$refs.box;
      el.classList.add("invisible");
      setTimeout(() => {
        this.isopen = false;
      }, 250);
    },
    websocketStart() {
      let that = this;
      websocketApi.devicestatus(function (res) {
        that.loading = false;
        const data = JSON.parse(res.data);
        // debugger
        data.data.devLat_ = data.data.devLat;
        data.data.devLng_ = data.data.devLng;
        let carLatLng = wgs2gcj(
          data.data.devLat,
          data.data.devLng
        );
        data.data.devLat = carLatLng[0];
        data.data.devLng = carLatLng[1];
        that.$set(that, "statusData", data.data);
      });
    },
  },
  created() {
    // debugger
    this.websocketStart();
  },
  mounted() {
    // websocketApi.close();
    // this.websocketStart();
    // this.timer = setInterval(() => {
    //   if (websocketApi.status) {
    //     clearInterval(this.timer);
    //   } else {
    //     this.websocketStart();
    //   }
    // }, 3000);
  },
  updated() {},
  destroyed() {
    // if (this.timer) {
    //   clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    // }
    websocketApi.close();
  },
};
</script>

<style lang='less' scoped>
.frame {
  // background: var(card-background);
  position: fixed;
  left: 0;
  top: 50px;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  color: var(--main-color);
}
.icon-btn {
  position: fixed;
  left: 2px;
  bottom: 50px;
  height: 40px;
  width: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  box-shadow: inset 0 0 10px var(--box-shandow);
  background: var(--q-bacground);
  z-index: 9999;
  cursor: pointer;
}
.invisible {
  opacity: 0;
  transition-duration: 0.25s;
  // transform: translate(45%, 50%) scale(0.1);
  width: 0 !important;
}
/deep/.UAV-list {
  min-width: 260px;
  width: 30vw;
  height: 100%;
  padding: 15px;
}
/deep/.Mapm {
  width: 100%;
  height: 100%;
  position: relative;
}
/deep/.control-log {
  min-width: 260px;
  width: 30vw;
  height: 100%;
  padding: 15px;
  position: relative;
}
/deep/.box-shandow {
  // box-shadow: inset 0 0 28px #5d5bac;
  box-shadow: inset 0 0 28px var(--box-shandow);
}
/deep/ .q-title {
  font-weight: bold;
  font-size: 16px;
  padding-left: 8px;
  text-align: left;
  position: relative;
  color: var(--q-title-background);
  height: 25px;
  line-height: 25px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    border-radius: 2px;
    background: var(--q-title-bar);
  }
}
/deep/ .q-content {
  height: calc(100% - 25px);
  overflow-x: hidden;
}
/deep/.tabs-wrjlb {
  height: 100%;
}
/deep/ .el-tabs__content {
  height: calc(100% - 60px);
}
/deep/ .el-tab-pane {
  height: 100%;
  overflow-x: hidden;
}
/deep/.log-down {
  position: absolute;
  right: 15px;
  bottom: 15px;
}
/deep/.UAV-box {
  box-shadow: 0 0 5px var(--main-color);
  width: 100%;
  padding: 10px;
  box-shadow: inset 0 0 5px var(--main-color);
  border-radius: 6px;
}
/deep/.UAV-flex {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
/deep/.UAV-message-item {
  line-height: 22px;
  height: 22px;
  padding-right: 18px;
  float: left;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.UAV-message {
  width: calc(100% - 50px);
  overflow: hidden;
}
/deep/.UAV-btn {
  // width: 50px;
  padding: 5px 7px;
  line-height: 18px;
}
/deep/.map-view {
  width: 100%;
  height: 100%;
}
/deep/.state-view {
  position: absolute;
  left: 2px;
  bottom: 2px;
  z-index: 9999;
  background: inherit;
  background: rgb(1 2 21 / 0.9);
  padding: 10px 15px;
}
/deep/.state-item {
  margin-right: 35px;
}
/deep/.state-normal {
  color: var(--safe);
}
/deep/.state-warning {
  color: var(--warn);
}
@media screen and (max-width: 1200px) {
  /deep/.UAV-btn {
    padding: 12px 10px;
  }
}
</style>