
/**
*   地图位置计算工具(将GPS坐标转换成百度地图坐标)
*    参考文档：http://bbs.lbsyun.baidu.com/forum.php?mod=viewthread&tid=10923&qq-pf-to=pcqq.group
*
*    使用示例：批量转换坐标位置
*    
*    var transferedData = GpsToBaiduPoints(prePoints);
*    $.each(transferedData,function(index,point){
*       console.log(point);
*    });
*
*-------------------以下是提供的一个简单的访问接口-------------------------
*    参数: points:new BMap.Point(Number(lng),Number(lat))的集合
*    返回值:resultPoints:转换后 BMap.point点集
*    function GpsToBaiduPoints(points){
*        var resultPoints = [];
*        $.each(points,function(index,point){
*            //世界大地坐标转为百度坐标
*            var _t = wgs2bd(point.Number(lat),point.Number(lng));
*            var _BPoint = new BMap.Point(_t[1], _t[0]);
*            resultPoints.push(_BPoint);
*        });
*        return resultPoints;
*    }
*/
//默认提供一个接口直接调用
function BaiduToGpsPoints(points){
    var resultPoints = [];
    $.each(points,function(index,point){
        var _t = bd2gcj(point.Number(lat),point.Number(lng));
        var _t1 = gcj2wgs(_t[0], _t[1]);
        var _BPoint = new BMap.Point(_t1[1], _t1[0]);
        resultPoints.push(_BPoint);
    });
    return resultPoints;
}

//默认提供一个接口直接调用
function GpsToBaiduPoints(points){
    var resultPoints = [];
    $.each(points,function(index,point){
        var _t = wgs2bd(point.Number(lat),point.Number(lng));
        var _BPoint = new BMap.Point(_t[1], _t[0]);
        resultPoints.push(_BPoint);
    });
    return resultPoints;
}

//////////////////////////////////////////
//////////////转换核心代码////////////////
//////////////////////////////////////////
var pi = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;
var x_pi = 3.14159265358979324*3000.0/180.0;

//超过中国范围
function out_of_china(lng, lat) {
    return ((Number(lng) < 72.004 || Number(lng) > 137.8347) || (Number(lat) < 0.8293 || Number(lat) > 55.8271) || false);
}

/**
 * GCJ02 转换为 WGS84
 * @param Number(lng)
 * @param Number(lat)
 * @returns {*[]}
 */
export function gcj2wgs(lat, lng) {
    if (out_of_china(Number(lng), Number(lat))) {
        return [Number(lng), Number(lat)]
    }
    else {
        var dlat = transformLat(Number(lng) - 105.0, Number(lat) - 35.0);
        var dlng = transformLon(Number(lng) - 105.0, Number(lat) - 35.0);
        var radlat = Number(lat) / 180.0 * pi;
        var magic = Math.sin(radlat);
        magic = 1 - ee * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * pi);
        dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * pi);
        var mglat = Number(lat) + dlat;
        var mglng = Number(lng) + dlng;
        
        var result = [];
    		result.push(Number(lat)*2 - mglat);
    		result.push(Number(lng)*2 - mglng);
    		return result;
    }
}

export function wgs2gcj(lat,lon) {
    var dLat = transformLat(Number(lon) - 105.0, Number(lat) - 35.0);
    var dLon = transformLon(Number(lon) - 105.0, Number(lat) - 35.0);
    var radLat = Number(lat) / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    var mgLat = Number(lat) + dLat;
    var mgLon = Number(lon) + dLon;
    var result = [];
    result.push(mgLat);
    result.push(mgLon);
    return result;
}

//世界大地坐标转为百度坐标
function wgs2bd(lat,lon) {
    var wgs2gcjR = wgs2gcj(Number(lat), Number(lon));
    var gcj2bdR = gcj2bd(wgs2gcjR[0], wgs2gcjR[1]);
    return gcj2bdR;
}

function gcj2bd(lat,lon) {
    var x = Number(lon), y = Number(lat);
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    var result = [];
    result.push(bd_lat);
    result.push(bd_lon);
    return result;
}

function bd2gcj(lat,lon) {
    var x = Number(lon) - 0.0065, y = Number(lat) - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lon = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    var result = [];
    result.push(gg_lat);
    result.push(gg_lon);
    return result;
}

function transformLat(lat,lon) {
    var ret = -100.0 + 2.0 * Number(lat) + 3.0 * Number(lon) + 0.2 * Number(lon) * Number(lon) + 0.1 * Number(lat) * Number(lon) + 0.2 * Math.sqrt(Math.abs(Number(lat)));
    ret += (20.0 * Math.sin(6.0 * Number(lat) * pi) + 20.0 * Math.sin(2.0 * Number(lat) * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(Number(lon) * pi) + 40.0 * Math.sin(Number(lon) / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(Number(lon) / 12.0 * pi) + 320 * Math.sin(Number(lon) * pi  / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLon(lat,lon) {
    var ret = 300.0 + Number(lat) + 2.0 * Number(lon) + 0.1 * Number(lat) * Number(lat) + 0.1 * Number(lat) * Number(lon) + 0.1 * Math.sqrt(Math.abs(Number(lat)));
    ret += (20.0 * Math.sin(6.0 * Number(lat) * pi) + 20.0 * Math.sin(2.0 * Number(lat) * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(Number(lat) * pi) + 40.0 * Math.sin(Number(lat) / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(Number(lat) / 12.0 * pi) + 300.0 * Math.sin(Number(lat) / 30.0 * pi)) * 2.0 / 3.0;
    return ret;
}

