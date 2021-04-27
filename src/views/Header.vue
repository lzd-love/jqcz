<!--
 * @Author: lzd
 * @Date: 2021-02-19 09:08:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-26 14:30:38
 * @Description: content description
-->
<template>
  <div class="header">
    <div class="name">
      <div class="name-main">{{ softName }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  components: {
    
  },
  data() {
    return {
      softName: "无人机预警反制系统",
    };
  },
  computed: {

  },
  watch: {},
  methods: {
    
  },
  created() {},
  mounted() {

  },
  updated() {},
  destroyed() {

  }
};
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  width: 100%;
  background-image: url("../assets/images/top-bg.png");
  background-size: 100% 100%;
  position: relative;
  & > div {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
.name {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #00deff;
  letter-spacing: 2px;
  font-size: 16px;
  font-family: "Times New Roman";
  font-weight: bold;
}
.name-english {
  padding-top: 2px;
  font-family: "Times New Roman";
  letter-spacing: 2px;
  font-size: 15px;
}
.button-contanier {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.isMainview {
  background: var(--q-bacground) !important;
}
@media screen and (max-width: 1281px) {
  .header {
    // height: 60px;
  }
  .name {
    // padding-top: 21px;
    font-size: 16px;
  }
  .name-main {
    // font-size: 15px;
    // line-height: 20px;
  }
  .name-english {
    font-size: 12px;
    transform: scale(0.9);
  }
}
</style>
