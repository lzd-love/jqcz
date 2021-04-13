/*
 * @Author: lzd
 * @Date: 2020-09-21 17:05:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-06 13:58:41
 * @Description: content description
 */

class wsApi {
  constructor() {
    // this.baseUrl = "ws://" + location.host + "/ws";
    this.baseUrl = window.CONFIG.wSocketUrl;
    this.status = null;
    this.resolve = null;
    this.url = null;
    this.index = 0;
  }
  start(resolve, url) {
    this.resolve = resolve;
    this.url = url;
    this.status = 1; //0关，1开
    let that = this;
    this.websocket = new WebSocket(this.baseUrl + url);
    this.websocket.onmessage = res => {
      that.index = 0;
      resolve(res);
    };
    this.websocket.onopen = message => {
      console.log(message);
    };
    this.websocket.onerror = evnt => {
      // debugger
      console.log("发生错误", evnt);
      // that.status && that.reConnection();
    };
    this.websocket.onclose = evnt => {
      // debugger
      console.log("连接断开", evnt);
      //连接关闭启动定时任务 五秒后在创建
      that.status && that.reConnection();
    };
  }
  close() {
    this.status = 0;
    this.websocket && this.websocket.close();
  }
  reConnection() {
    let that = this;
    setTimeout(() => {
      // if (that.index >= 60) {
      //   window.location.href = window.CONFIG.standbyService;
      // }
      that.status && that.start(that.resolve, that.url);
      that.index += 1;
    }, 5000);
  }

  devicestatus(resolve) {
    //Online Offline
    // const url = "/Devicestatus";
    const url = "";
    // this.websocket = new WebSocket(this.baseUrl + url);
    this.start(resolve,url);
  }
}
/**
 * {
    "code": number;                     // 状态代码
    "msg": string,                      // 消息描述
    "data": {                           // 数据
        "devTime": string,              // 设备时间（2021-01-01 08:00:00）
        "devLng": number,               // 设备经度
        "devLat": number,               // 设备纬度
        "devHeight": number,            // 设备高度
        "carCourse": number,            // 载车航向
        "cheatDevState": [
            {
                "id": string,           // ID
                "state": string,        // 欺骗设备状态（正常、异常）
            },
        ],
        "probeDevState": [
            {
                "id": string,           // ID
                "state": string,        // 探测设备状态（正常、异常）
            },
        ],
        "defenceMode": string,          // 防御模式（车载模式、定向驱离模式）
        "workMode": string,             // 工作模式（自动、手动）
        "signalState": string,          // 信号状态（开、关）
        "defenceRange": number,         // 防御范围
        "expelDirection": string        // 驱离方向（东、东南...）
        "expelLocation": {              // 驱离位置（默认null）
            "longitude": number,
            "latitude": number,
        },
        "uavList":[                     // 无人机列表（默认null）
            {
                "id": string,           // ID
                "name": string,         // 自定义名称
                "model": string,        // 型号
                "frequency": string,    // 频段（2.4GHz、5.8GHz）
                "longitude": number,    // 经度
                "latitude": number,     // 纬度
                "height": number,       // 高度
                "azimuth": number,      // 方位
                "distance": number,     // 距离
                "isWhite": bool,        // 是否在白名单（true、false）
                "isExpel": bool,        // 是否在被驱离（true、false）
                "establishTime": string,// 首次捕获时间
            },
        ],
    }
}
 */
export default new wsApi();
