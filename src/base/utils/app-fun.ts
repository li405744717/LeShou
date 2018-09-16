import { AppConfig } from '../app-config';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { MD5 } from './md5';
/**
 * 通用js函数调用 
 */
declare let global: any;
export class AppFun {

    public static elements = [];
    //内置浏览器打开网页
    public static open(url, target, option?) {
        let options = "location=no";
        if (option) options = option;
        window.open("https://home.amarsoft.com/sso/ssoservice?ZM_AUTH_TOKEN=" + AppConfig.TOKEN + "&continue=" + url, target, options);
    }

    //设置date格式
    public static formatTime(time, fmt) { //author: meizz 
        var o = {
            "M+": time.getMonth() + 1, //月份 
            "d+": time.getDate(), //日 
            "h+": time.getHours(), //小时 
            "m+": time.getMinutes(), //分 
            "s+": time.getSeconds(), //秒 
            "q+": Math.floor((time.getMonth() + 3) / 3), //季度 
            "S": time.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    public static initTime(systime) {
        let timeArr = systime.split('-');
        let year = parseInt(timeArr[0]);
        let mounth = parseInt(timeArr[1]);
        let timeArr2 = timeArr[2].split(' ');
        let day = parseInt(timeArr2[0]);
        let timeArr3 = timeArr2[1].split(':');
        let hour = parseInt(timeArr3[0]);
        let minute = parseInt(timeArr3[1]);
        let second = parseInt(timeArr3[2]);
        let systimeDate = new Date(year, mounth, day, hour, minute, second);
        return systimeDate.getTime();
    }

    public static contains(target, keys: string[]): boolean {
        if (!target || target == "") return false;
        if (!keys) return false;
        if (keys.length == 0) return false;
        for (let i = 0; i < keys.length; i++) {
            if (target == keys[i]) {
                return true;
            }
        }
        return false;
    }


    public static initStorage() {
        let storage = new Storage({
            // 最大容量，默认值1000条数据循环存储
            size: 1000,

            // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
            // 如果不指定则数据只会保存在内存中，重启后即丢失
            storageBackend: AsyncStorage,

            // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
            defaultExpires: null,

            // 读写时在内存中缓存数据。默认启用。
            enableCache: true,

        })
        global.storage = storage;
    }


    public static sortJson(arys) {
        //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
        var newkey = Object.keys(arys).sort();
        //console.log('newkey='+newkey);
        var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
        let jsonStr = "";
        for (var i = 0; i < newkey.length; i++) {
            //遍历newkey数组
            console.log(newkey[i]);
            newObj[newkey[i]] = arys[newkey[i]];
            //向新创建的对象中按照排好的顺序依次增加键值对
            jsonStr += newkey[i] + "=" + arys[newkey[i]];
            if (i != newkey.length - 1) jsonStr += "&";
        }
        console.log(jsonStr);
        return jsonStr; //返回排好序的新对象
    }

    public static initMd5Str(arys) {
        try {
            let jsonStr = AppFun.sortJson(arys);
            // let jsonStr = JSON.stringify(sortJson);
            let md5Str = jsonStr + AppConfig.SALT
            md5Str = encodeURI(md5Str).replace(/([^\u0000-\u00FF])/g,escape)
            console.log("md5Str",md5Str)
            let md5 = new MD5();
            let sign = md5.hex_md5(md5Str);
            console.log("sign",sign)
            return sign;
        } catch (e) {
            return "";
        }
    }
}
