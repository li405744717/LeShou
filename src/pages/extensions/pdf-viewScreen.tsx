import { View, SafeAreaView, StyleSheet, WebView, TextInput } from 'react-native';
import * as React from 'react';
import RNFS from 'react-native-fs';
import { containerStyles, width, height } from '../../assets/styles/containerStyles';
import BasePage from '../../base/components/BasePage';
import { AppFun } from '../../base/utils/app-fun';
import { AppConfig } from '../../base/app-config';



export default class PdfViewScreen extends BasePage {
    static navigationOptions = {
        headerTitle: "在线阅读"
    }
    public token = "dpwang";
    public mark = "AmarSoft_" + AppConfig.USERID + "_" + AppFun.formatTime(new Date(), "yyyy/MM/dd");
    constructor(props, state) {
        super(props, state);
        console.log(RNFS.DocumentDirectoryPath);
        console.log(RNFS.MainBundlePath);
        RNFS.readdir(RNFS.MainBundlePath + "/assets/src/assets/html").then(data => console.log(data));
        this.state = {
            pdfURL: 'demo.pdf'
        }
    }
    render() {
        const html = `
<html>
    <body style="display: flex">
        <p id="token_label" hidden="true">demo.pdf</p>
        <p id="file_label" hidden="true">dpwang</p>
        <iframe id='pdfview' src="./viewer.html" style="flex:1"></iframe>
        <div id="markDiv" style="position:absolute;z-index:1001"></div>
    </body>
    <script>
        var token_label = document.getElementById("token_label");
        token_label.innerText = '`+ this.token + `';

        var file_label = document.getElementById("file_label");
        file_label.innerText = '`+ this.state.pdfURL + `';

        var width = document.body.offsetWidth / 3;
        var height = document.body.offsetHeight / 3;
        var markDiv = document.getElementById('markDiv');
        for (let i = 0; i < 2; i++) {
            var mark = document.createElement("p");
            mark.innerText =  '`+ this.mark + `';
            mark.style.position = "absolute";
            mark.style.top = height + "px";
            mark.style.left = width * (i * 1.5) + "px";
            mark.style.color = "#00d5ff";
            mark.style.zIndex = 1000 + i + "";
            mark.style.fontSize = "50px";
            mark.style.transform = "rotate(" + Math.atan(height / width) * 180 / Math.PI + "deg)"
            markDiv.appendChild(mark);
        }
        for (let i = 0; i < 1; i++) {
            var mark2 = document.createElement("p");
            mark2.innerText = '`+ this.mark + `';;
            mark2.style.position = "absolute";
            mark2.style.top = height * 2.3 + "px";
            mark2.style.left = -width * 0.1 + "px";
            mark2.style.color = "#00d5ff";
            mark2.style.zIndex = 1010 + i + "";
            mark2.style.fontSize = "50px";
            mark2.style.transform = "rotate(" + Math.atan(height / width) * 180 / Math.PI + "deg)"
            markDiv.appendChild(mark2);
        }
        for (let i = 0; i < 1; i++) {
            var mark3 = document.createElement("p");
            mark3.innerText = '`+ this.mark + `';;
            mark3.style.position = "absolute";
            mark3.style.top = height * 2 + "px";
            mark3.style.left = width + width * 0.2 + "px";
            mark3.style.color = "#00d5ff";
            mark3.style.zIndex = 1014 + i + "";
            mark3.style.fontSize = "50px";
            mark3.style.transform = "rotate(" + Math.atan(height / width) * 180 / Math.PI + "deg)"
            markDiv.appendChild(mark3);
        }
    </script>
</html>`
        return (<SafeAreaView style={containerStyles.common}>
            <WebView style={[{ backgroundColor: 'white', flex: 1 }]} source={{ html: html, baseUrl: RNFS.MainBundlePath + "/assets/src/assets/html/pdfviewer" }}  >
            </WebView>
        </SafeAreaView >);
    }
}


const styles = StyleSheet.create({


})