/*
 * @Author: lzd
 * @Date: 2021-01-23 15:14:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-12 16:11:40
 * @Description: content description
 */
window.CONFIG = {
    httpUrl:"http://10.129.41.200:8888",//后端接口地址 http://10.129.41.200:8888
    wSocketUrl:"ws://10.129.41.200:9999",//websocket 地址 ws://10.129.41.200:9999
    onlineMapUrl:"http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",//在线地图地址
    offlineMapUrl:"http://localhost:8010/staticMap/{z}/{x}/{y}.png",//离线地图地址
};