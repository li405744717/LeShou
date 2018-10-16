/**
 * Created by dp-k on 2016/11/22.
 */
import { Dimensions, Platform, NativeModules } from "react-native"
import { StyleSheet, PixelRatio } from 'react-native'
import * as React from 'react';
let highVersion = () => {
    console.log("SystemVersion：")
    NativeModules.NativeManager.getSystemVersion((err, value) => {
        var systemVersion_number = parseInt(value.charAt(0))
        console.log("SystemVersion：", systemVersion_number)
        if (systemVersion_number < 5) {
            return false
        }
    })
}
export const pixel = 1 / PixelRatio.get();
export const width = Dimensions.get("window").width;
export const systemHeight = Dimensions.get("window").height;
export const height = Platform.OS == 'ios' ? systemHeight : systemHeight - 20;
export const navHeight = Platform.OS == 'ios' ? 64 : highVersion ? 64 : 44;
export const navTop = Platform.OS == 'ios' ? 20 : highVersion ? 20 : 0;
export const tabHeight = 48
console.log("navHeight", navHeight)
console.log("navTop", navTop)

export const containerStyles = StyleSheet.create({
    common: {
        height: height,
        width: width,
        backgroundColor: "white",
        flex: 1
    },
    flex_row:{
        flexDirection:"row"
    },
    flex_column:{
        flexDirection:"column"
    },
    justify_center: {
        justifyContent: "center"
    },
    justify_start: {
        justifyContent: "flex-start"
    },
    justify_end: {
        justifyContent: "flex-end"
    },
    align_center: {
        alignItems: "center"
    },
    align_start: {
        alignItems: "flex-start"
    },
    align_end: {
        alignItems: "flex-end"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    flex_1:{
        flex:1
    },
    
    top: {
        position: "absolute",
        //left:0,
        top: 0
    },
    navLeftView: {
        position: "absolute",
        justifyContent: "center",
        flex: 1,
        alignItems: "flex-start",
        height: 44,
        left: 0,
        top: navTop,
    },
    navMidView: {
        position: "absolute",
        width: width,
        justifyContent: "center",
        alignItems: "center",
        height: 44,
        left: 0,
    },
    navRightView: {
        paddingRight: 10,
    },
    navBtn_text: {
        color: "white",
        fontSize: 15
    },
    navBar: {
        height: navHeight,
        width: width,
        top: 0,
        backgroundColor: "#ff2121",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    navText: {
        fontSize: 18,
        color: "white"
    },
    tabContentContainer: {
        height: height - tabHeight - navHeight,
        width: width,
        backgroundColor: "whitesmoke"
    },
    tab: {
        height: tabHeight
    },
    contentContainer: {
        height: height - navHeight,
        width: width,
        backgroundColor: "whitesmoke"
    },
    commonScrollViewContainer: {
        backgroundColor: "whitesmoke"
    },
    LoadingViewContainer: {
        height: systemHeight,
        width: width,
        position: "absolute",
        top: 0,
        backgroundColor: "rgba(0,0,0,0.1)",
        justifyContent: "center",
        alignItems: "center"
    },
    LoadingViewModal: {
        height: systemHeight,
        width: width,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        opacity: 0.1
    },
    spinkitContainer: {
        height: 150,
        minWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
        borderRadius: 10
    },
    spinkitText: {
        fontSize: 16,
        marginTop: 10,
        color: "white",
        textAlign: "center"
    },
    alertContainer: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
    },
    shortAlertView: {
        backgroundColor: "#fff",
        borderRadius: 10,
        //width:window.width*3/5,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    alertView: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: width * 3 / 4,
        height: 150
    },
    tipLeftContentView: {
        marginLeft: 5,
        marginRight: 5,
        height: 40,
        borderWidth: 1,
        flex: 1,
        // borderTopLeftRadius: 20,
        // borderBottomLeftRadius: 20,
        borderColor: "#f0f0f0",
        justifyContent: 'center',
        borderRadius: 5
    },
    tipRightContentView: {
        marginLeft: 5,
        marginRight: 5,
        height: 40,
        borderWidth: 1,
        flex: 1,
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
        borderColor: "#F0F0F0",
        justifyContent: 'center',
        borderRadius: 5
    },
    tipText: {
        color: "#666666",
        textAlign: 'center',
        fontSize: 15,
        letterSpacing: 1
    },
    tipTitleView: {
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5
    },
    tipTitleText: {
        color: "#333333",
        fontSize: 17,
        textAlign: 'center',
        letterSpacing: 1
    },
    tipMessageText: {
        color: "#666666",
        fontSize: 17,
        textAlign: 'center',
        letterSpacing: 1
    },
    //padding
    padding: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5
    },
    padding_TB: {
        paddingTop: 5,
        paddingBottom: 5
    },
    padding_TB_5: {
        paddingTop: 5,
        paddingBottom: 5
    },
    padding_TB_10: {
        paddingTop: 10,
        paddingBottom: 10
    },
    padding_TB_25: {
        paddingTop: 25,
        paddingBottom: 25
    },
    padding_5: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5
    },
    padding_LR_10: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    padding_0: {
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
    },
    //分割线
    fg_line: {
        height: 10,
        width: width,
        backgroundColor: "#f8f8f9"
    },
    fg_thin_line: {
        height: 1,
        width: width,
        backgroundColor: "#f8f8f9"
    },
    //标题
    tip_View: {
        width: width,
        height: 31,
        paddingLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f8f8f9"
    },
    tip_Text: {
        fontSize: 15,
        color: "#2e333a",
    },
    //正文
    content_Text: {

    },
    //提示
    attention_View: {
        paddingTop: 2,
        paddingBottom: 2,
    },
    attention_Text: {
        fontSize: 12,
        color: "#999"
    },
    attention_red_Text: {
        fontSize: 12,
        color: "red"
    },
    //Segment
    segment_Text: {
        color: "#8891a9",
        fontSize: 14
    },
    segment_View: {
        backgroundColor: "#ffffff",
        borderColor: "#d7def1"
    },
    segment_active_Text: {
        color: "#2e333a",
        fontSize: 14
    },
    segment_active_View: {
        backgroundColor: "#d7def1",
        borderColor: "#d7def1"
    },
    //按钮
    btn: {
        borderRadius: 3,
        alignItems: "center",
        justifyContent: "center",
        height: 35
    },
    btn_short: {
        width: width * 0.2
    },
    btn_middel: {
        width: width * 0.5
    },
    btn_long: {
        width: width * 0.8
    },
    btn_flex: {
        flex: 1
    },
    btn_select_color: {
        backgroundColor: "#fc6868"
    },
    btn_noSelect_color: {
        backgroundColor: "#f4f4f4"
    },
    btn_select_text_color: {
        color: "white"
    },
    btn_noSelect_text_color: {
        color: "#333"
    },

    //输入框
    textInput_label: {
        width: 110,
        lineHeight: 30,
        color: "#666666"
    },
    textInput: {
        borderColor: "#d7def1",
        borderWidth: 1,
        borderRadius: 3,
        height: 30,
        flex: 1,
        padding: 0
    },
    textInput_area: {
        height: 64,
        flex: 1,
        padding: 0,
        textAlignVertical: 'top'
    },
    textInput_noWidth: {
        borderColor: "#d7def1",
        borderWidth: 1,
        borderRadius: 3,
        height: 30,
        padding: 0
    },

    //状态Icon
    status_icon: {
        backgroundColor: "#25d232",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 10
    },
    status_fail_icon: {
        backgroundColor: "#d0d0cf",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 10
    },
    status_warn_icon: {
        backgroundColor: "#fc6767",
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 10
    },
    status_text: {
        color: "white",
        fontSize: 12,
    },

    //角标
    badge_view: {
        backgroundColor: "red",
        position: "absolute",
        top: 0,
        right: 5,
        borderRadius: 10,
        paddingLeft: 4,
        paddingRight: 4
    },
    badge_text: {
        color: "white",
        fontSize: 13,
        fontWeight: "bold"
    },

    //进度条
    progressDiv: {
        width: width * 0.9,
        height: 80,
        paddingBottom: 15,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    progress_title_text: {
        height: 20,
        lineHeight: 20,
        marginBottom: 5,
        color: 'white',
        textAlign: 'center',
    },
    progress: {
        width: width * 0.8,
        height: 20,
        marginBottom: 5,
        overflow: 'hidden',
        backgroundColor: '#949393',
        borderRadius: 10
    },
    progressbar: {
        width: 0,
        height: 100,
        backgroundColor: 'white',
        position: 'absolute'
    },
    progress_text: {
        textAlign: 'center',
        height: 20,
        lineHeight: 20,
        color: 'black'
    }
})
