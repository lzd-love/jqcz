<!--
 * @Author: lzd
 * @Date: 2021-01-06 16:33:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-12 15:56:14
 * @Description: content description
-->
<template>
  <div class="UAV-list box-shandow" v-loading="loading">
    <div class="q-title">
      <span
        >无人机信息
        <!-- ({{noWhiteLength}}/{{uavList.length}}) -->
      </span>
      <span
        class="title-btn el-icon-close"
        @click="closeFun"
        title="缩小"
      ></span>
    </div>
    <div class="q-content">
      <el-tabs class="tabs-wrjlb" :stretch="true">
        <el-tab-pane label="" v-if="uavList.length">
          <div
            class="UAV-box UAV-flex"
            v-for="(item, index) in uavList"
            :key="'uav-list-' + index"
          >
            <div class="UAV-message">
              <div class="UAV-message-item">
                <span>频段: </span>
                <span>{{ item.frequency }}</span>
                <span style="position: absolute; right: 15px;">发现无人机</span>
              </div>
              <!-- <div class="UAV-message-item">
                <span>类型: </span>
                <span>{{ item.model }}</span>
              </div>
              <div class="UAV-message-item">
                <span>距离: </span>
                <span>{{ item.distance }}m</span>
              </div> -->
            </div>
            <!-- <div> -->
              <!-- <el-button
                class="UAV-btn"
                size="mini"
                :type="item.isWhite ? 'warning' : 'primary'"
                @click="
                  item.isWhite
                    ? removeWhiteList(item.id)
                    : addWhiteList(item.id)
                "
                >{{ item.isWhite ? "移出" : "加入" }}<br />白名单</el-button
              > -->
            <!-- </div> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="" v-else>
          <div>未探测到无人机信息</div>
        </el-tab-pane>
        <!-- <el-tab-pane label="白名单">
          <div
            class="UAV-box UAV-flex"
            v-for="(item, index) in whiteList"
            :key="'white-list-' + index"
          >
            <div class="UAV-message">
              <div class="UAV-message-item">
                <span>ID: </span>
                <span>{{ item.id }}</span>
              </div>
              <div class="UAV-message-item">
                <span>名称: </span>
                <span>{{ item.name }}</span>
              </div>
              <div class="UAV-message-item">
                <span>频段: </span>
                <span>{{ item.frequency }}</span>
              </div>
              <div class="UAV-message-item">
                <span>类型: </span>
                <span>{{ item.model }}</span>
              </div>
            </div>
            <div>
              <el-button
                type="warning"
                class="UAV-btn"
                size="mini"
                @click="removeWhiteList(item.id)"
                >移出<br />白名单</el-button
              >
            </div>
          </div>
        </el-tab-pane> -->
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Api from "@api/HttpApi_cz.js";
export default {
  name: "uav",
  props: {
    uavList: {
      type: Array,
      default: () => {
        return [
          // {
          //   id: "221321",
          //   azimuth: 28,
          //   model: "北斗无人机",
          //   frequency: "2.4GHz",
          //   isWhite: false,
          // },
          // {
          //   id: "221321",
          //   azimuth: 28,
          //   model: "北斗无人机",
          //   frequency: "2.4GHz",
          //   isWhite: true,
          // },
        ];
      },
    },
  },
  components: {},
  data() {
    return {
      loading: false,
      whiteList: [
        // {
        //   id: "221321",
        //   azimuth: 28,
        //   model: "北斗无人机",
        //   frequency: "2.4GHz",
        //   name: "无人机",
        // },
        // {
        //   id: "221321",
        //   azimuth: 28,
        //   model: "北斗无人机",
        //   frequency: "2.4GHz",
        //   name: "无人机1",
        // },
      ],
    };
  },
  computed: {
    noWhiteLength() {
      let filter = this.uavList.filter((item) => {
        return item.isWhite == false;
      });
      return filter.length;
    },
  },
  watch: {},
  methods: {
    closeFun() {
      this.$emit("close");
    },
    getWhiteList() {
      this.loading = true;
      Api.getWhiteList().then((res) => {
        this.$set(this, "whiteList", res.data.whiteList);
        this.loading = false;
      });
    },
    addWhiteList(id) {
      this.$confirm("确定要把该无人机加入白名单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.loading = true;
          Api.addWhiteList({ id }).then((res) => {
            debugger;
            let success = res.code == "200";
            this.$notify({
              title: success ? "添加成功" : "添加失败",
              message: res.msg,
              type: success ? "success" : "warning",
            });
            this.getWhiteList();
            this.loading = false;
          });
        })
        .catch(() => {});
    },
    removeWhiteList(id) {
      this.$confirm("确定要将该无人机移出白名单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.loading = true;
          Api.deleteWhiteList({ id }).then((res) => {
            let success = res.code == "200";
            this.$notify({
              title: success ? "移出成功" : "移出失败",
              message: res.msg,
              type: success ? "success" : "warning",
            });
            this.getWhiteList();
            this.loading = false;
          });
        })
        .catch(() => {});
    },
  },
  created() {
    // this.getWhiteList();
  },
  mounted() {},
  updated() {},
  destroyed() {},
};
</script>

<style lang='less' scoped>
.q-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title-btn {
  font-size: 22px;
  cursor: pointer; 
}
.UAV-box {
  margin-bottom: 10px;
}
</style>