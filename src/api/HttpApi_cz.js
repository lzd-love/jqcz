/*
 * @Author: lzd
 * @Date: 2020-10-26 14:44:48
 * @LastEditors: lzd
 * @LastEditTime: 2021-01-23 15:51:25
 * @Description: content description
 */
import axios from "axios";

axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8"
}

class Api {
  constructor() {
    // this.baseUrl = "/api";
    this.baseUrl = window.CONFIG.httpUrl;
    // this.baseUrl = "http://10.129.41.91:7080";
  }

  /**
   * @description: 获取白名单列表
   * @param  {*}
   * @return {
          "code": number;                     // 状态代码
          "msg": string,                      // 消息描述
          "data": {                           // 数据（默认null）
              "whiteList": [
                  {
                      "id": string,           // ID
                      "name": string,         // 自定义名称（默认null）
                      "model": string,        // 型号（默认null）
                      "frequency": string,    // 频段（2.4GHz、5.8GHz）
                  },
              ]
          }
      }
  */
  getWhiteList(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/get_white_list", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 加入白名单
   * @param  {id}
   * @return {
        "code": number,                     // 状态代码
        "msg": string,                      // 消息描述
        "data": null,                       // 数据
    }
  */
  addWhiteList(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/add_white_list", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 移出白名单
   * @param  {id}
   * @return {
        "code": number,                     // 状态代码
        "msg": string,                      // 消息描述
        "data": null,                       // 数据
    }
   */
  deleteWhiteList(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/delete_white_list", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 日志下载
   * @param {*}
   * @return {*}
   */
  // logFile(data) {
  //   const instant = axios.create({
  //     withCredentials: true,
  //     timeout: 600000
  //   });
  //   return new Promise((resolve, reject) => {
  //     instant
  //       .post(this.baseUrl + "/logs/syslog.log" + data, {}, {
  //         responseType: "blob",
  //         timeout: 60000
  //       })
  //       .then(
  //         res => {
  //           resolve(res);
  //         },
  //         err => {
  //           reject(err);
  //         }
  //       );
  //   });
  // }
  logFile(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/logs/uavlog.log", data || {}, {
        responseType: "blob",
        timeout: 60000
      }).then(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 车载模式设置
   * @param  {
        "defenceMode": string,              // 防御模式（车载模式、定向驱离模式）
        "workMode": string,                 // 工作模式（自动、手动）
        "signalState": string,              // 信号开关（开、关）
        "defenceRange": number,             // 防御范围
        "expelDirection": string            // 东、东南...
    }
   * @return {
        "code": number,                     // 状态代码
        "msg": string,                      // 消息描述
        "data": null,                       // 数据
    }
   */
  setDefenceMode(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/set_defence_mode", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

  /**
   * @description: 获取系统状态，具体数值详见webscoketAPI
   * @param {*} data
   * @return {*}
   */
  getSystemStatus(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.baseUrl + "/system_status", data || {}).then(
        res => {
          resolve(res.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }

}

export default new Api();
