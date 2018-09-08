/**
 * Created by dp-k on 2016/12/15.
 */
import RootSiblings from 'react-native-root-siblings'
import { containerStyles, height, width, navHeight } from '../assets/styles/containerStyles';
import * as React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { RemoteService } from './utils/remoteService';
import BasePage from './components/BasePage';
import { AppConfig } from './app-config';
var elements = []
let check = (navigator, component) => {
  if (!navigator) {
    console.log("未传入navigator")
    return false
  }
  if (!component) {
    console.log("未传入component")
    return false
  }
}
let push = (navigator, component, title, data, previousComponent) => {
  if (check(navigator, component)) return
  navigator.push({
    component: component,
    title: title,
    params: {
      data: data,
      previousComponent: previousComponent
    }
  })
}
let resetTo = (navigator, component, title, data) => {
  if (check(navigator, component)) return
  navigator.resetTo({
    component: component,
    title: title,
    params: {
      data: data
    }
  })
}
let pop = (navigator) => {
  if (navigator == null) return
  navigator.pop()
}
let alertWithCallback = (title, message, leftText, leftCallback, rightText, rightCallback) => {
  let view = <View style={[containerStyles.alertContainer]}>
    <View style={containerStyles.alertView}>
      <View style={containerStyles.tipTitleView} >
        <Text style={[containerStyles.tipTitleText, { fontSize: 18, marginBottom: 10 }]}>{title}</Text>
        <Text style={[containerStyles.tipMessageText, { fontSize: 15 }]}>{message}</Text>
      </View>
      <View style={{ flexDirection: "row", marginTop: 35 }}>
        {(leftText && leftText != "") ?
          <TouchableHighlight style={containerStyles.tipLeftContentView} underlayColor='#f0f0f0'
            onPress={() => {
              if (leftCallback) {
                leftCallback()
              }
              destroySibling()
            }}>
            <View>
              <Text style={containerStyles.tipText}>{leftText}</Text>
            </View>
          </TouchableHighlight>
          :
          null
        }
        {(rightText && rightText != "") ?
          <TouchableHighlight style={containerStyles.tipRightContentView} underlayColor='#f0f0f0'
            onPress={() => {
              if (rightCallback) {
                rightCallback()
              }
              destroySibling()
            }}>
            <View>
              <Text style={containerStyles.tipText}>{rightText}</Text>
            </View>
          </TouchableHighlight>
          :
          null
        }
      </View>
    </View>
  </View>
  var sibling = new RootSiblings(view, null);
  elements.push(sibling);
}
let shortAlert = (title) => {
  let view = <View style={[containerStyles.alertContainer]}>
    <View style={containerStyles.shortAlertView}>
      <View style={[containerStyles.tipTitleView, { height: 40, paddingTop: 0 }]} >
        <Text style={[containerStyles.tipText]} numberOfLines={1}>{title}</Text>
      </View>
    </View>
  </View>
  var sibling = new RootSiblings(view, null);
  elements.push(sibling);
  setTimeout(() => {
    destroySibling()
  }, 1500)
}
let destroySibling = () => {
  while (elements.length > 0) {
    var lastSibling = elements.pop()
    lastSibling && lastSibling.destroy()
  }
}
let base64TurnImage = (base64) => {
  var base64Icon = 'data:image/png;base64,' + base64
  var imageSource = { uri: base64Icon }
  return imageSource
}

let versionCheck = (component) => {
  RemoteService.getData({
    serv: "rest/client/versionCheck.serv",
    params: {},
    component: component,
    noLoading: true,
    success: (response) => {

    },
    fail: (response) => {
      if (response.header && response.header.responseCode == 10) {
        //不更新可以继续使用
        alertWithCallback("版本检测", RemoteService.getMessage(response), "忽略", () => { }, "更新", () => {
          if (!response || !response.body || !response.body.url) return;
          Linking.openURL(response.body.url).catch(err => console.error('An error occurred', err));
        });
      } else if (response.header && response.header.responseCode == 20) {//必须强制更新
        alertWithCallback("版本检测", RemoteService.getMessage(response), "更新", () => {
          if (!response || !response.body || !response.body.url) return;
          Linking.openURL(response.body.url).catch(err => console.error('An error occurred', err));
        }, null, null);
      }
    },
    catchback: (err) => { }
  })
}

const commonTools = {
  push: push,
  resetTo: resetTo,
  pop: pop,
  alertWithCallback: alertWithCallback,
  shortAlert: shortAlert,
  base64TurnImage: base64TurnImage,
  versionCheck: versionCheck
}
export default commonTools
