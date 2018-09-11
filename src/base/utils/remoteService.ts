import { AppConfig } from "../app-config";
import BasePage from '../components/BasePage';
import { MD5 } from './md5';
import { AppFun } from './app-fun';
export interface Options {
    serv?: string,
    url?: string,
    params: any,
    component: BasePage,
    headers?: any,
    timeout?: number,
    noLoading?: boolean,
    success?: any
    fail?: any,
    catchback?: any,
}
let isOk = (data) => {
    if (data && data.header && data.header.responseCode == 0) {
        return true
    } else {
        return false
    }
}
let getCode = (data) => {
    if (data && data.header && data.head.responseCode) {
        return data.header.responseCode
    } else if (data && data.header) {
        return "responseCode 不存在"
    } else if (data) {
        return "header 不存在"
    } else {
        return "data 不存在"
    }
}
let getMessage = (data) => {
    if (data && data.header && data.header.responseMessage) {
        return data.header.responseMessage
    } else if (data && data.header) {
        return "服务器返回信息为空"
    } else if (data) {
        return data.toString()
    } else {
        return "未知错误"
    }
}
let getData = (options: Options) => {
    let serv = options.serv, url = options.url, params = options.params, component: BasePage = options.component,
        headers = options.headers, timeout = options.timeout, noLoading = options.noLoading,
        success = options.success, fail = options.fail, catchback = options.catchback;

    url = url ? url : AppConfig.SERVICE_URL + serv;
    //参数
    params['timestamp'] = new Date().getTime();
    params['sign'] = AppFun.initMd5Str(params);
    let md5: MD5 = new MD5();
    let requestBody = params;
    // params.client = { device: AppConfig.DEVICE, version: AppConfig.VERSION };
    let header = headers ? headers : {};
    header['Accept'] = 'application/json';
    header['Content-Type'] = 'application/json; encoding=utf-8';
    if (AppConfig.TOKEN) {
        header['ZM_AUTH_TOKEN'] = AppConfig.TOKEN;
        header['Cookie'] = "ZM_AUTH_TOKEN=" + AppConfig.TOKEN;
    }
    //请求报文
    let fetchOptions = {
        method: 'POST',
        headers: headers ? headers : header,
        timeout: timeout ? timeout : AppConfig.TIMEOUT,
        body: JSON.stringify(requestBody)
    };
    console.log('请求地址:', url, '请求报文', requestBody);
    if (!noLoading) component.showLoadingView();
    fetch(url, fetchOptions).then((response) => response.text())
        .then((json) => {
            component.hideLoadingView();
            try {
                let data = JSON.parse(json);
                console.log("serv", serv, '返回报文:', data);
                callback(data, component, success, fail);
            } catch (error) {
                console.log("serv", serv, '返回报文:', json);
                if (catchback) catchback(error)
                else {
                    component.showErrowView("未知错误,请联系管理员");
                }
            }
        })
        .catch((error) => {
            component.hideLoadingView();
            console.log("serv", serv, '返回报文:', error);
            if (catchback) catchback(error)
            else {
                component.showErrowView("未知错误,请联系管理员");
            }
        })
}

let callback = (data, component: BasePage, success, fail) => {
    if (data.code == 0) {// 成功
        if (success) success(data);
    } else {
        var message = data.msg ? data.msg : "未知错误,请联系管理员";
        if (fail == null) {//默认处理
            component.showErrowView(message);
        } else {//设置了failback
            fail(data);
        }
    }
}
export const RemoteService = {
    'getData': getData,
    'getCode': getCode,
    isOk: isOk,
    'getMessage': getMessage
}