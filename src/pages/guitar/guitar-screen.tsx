import { View, SafeAreaView, StyleSheet, NativeModules, NativeEventEmitter, Platform, DeviceEventEmitter } from 'react-native';
import * as React from 'react';
import { containerStyles, width, height, navHeight, navTop } from '../../assets/styles/containerStyles';
import BasePage from '../../base/components/BasePage';
import Header from '../../base/components/header/header';
import ListItem, { Work } from '../../base/components/list/listItem';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import PageList from '../../base/components/list/pageList';
import { AppFun } from '../../base/utils/app-fun';
import { RemoteService } from '../../base/utils/remoteService';
import { UserAPI } from '../../base/api/user';
import { MusicAPI } from '../../base/api/music';

const { IOSAPIManager, NotificationManager, AndroidToastModule } = NativeModules;
const NotificationEmitter = new NativeEventEmitter(NotificationManager);

const subscription = NotificationEmitter.addListener(
    'UIEvent',
    (reminder) => { }
);
DeviceEventEmitter.addListener("UIEvent", (data) => {
    console.log(data);
})
export default class GuitarScreen extends BasePage {
    static navigationOptions = {
        headerTitle: null
    }
    public work: Work = {
        id: "0001",
        name: "克罗地亚狂想曲",
        zuoqu: "土豪",
        read: 2123
    }
    constructor(props, state) {
        super(props, state);
    }
    componentWillUnmount() {
        subscription.remove();
    }
    _onPress(id) {
        // this.props.navigation.navigate("GuitarInfo");
        let json = {
            loginName: "test",
            loginPwd: "123456",
        }
        let json2 = {
            page: 1,
            pageSize: 10,
            userName: "",
        }
        let json3 = {
            instrType: 1
        }
        UserAPI.login({
            params: json,
            component: this,
            success: (data) => {
                console.log(data)
            }
        })
        // MusicAPI.getTypes({
        //     params: json3,
        //     component: this,
        //     success: (data) => {
        //         console.log(data)
        //     }
        // })
        // if (Platform.OS == 'android') {
        //     AndroidToastModule.show('Awesome', AndroidToastModule.SHORT)
        // } else {
        //     IOSAPIManager.getSysVersion((err, version) => {
        //         if (err == null) {
        //             console.log("System version is ", version);
        //         } else {
        //             console.log(err);
        //         }
        //     });
        // }

    }
    render() {
        return (<SafeAreaView style={[containerStyles.common]}>
            <Header navigation={this.props.navigation}></Header>
            <ScrollableTabView initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}>
                <PageList key={"all"} url={""} type={""} onItemPress={(id) => { this._onPress(id) }} tabLabel="全部"></PageList>
                <PageList key={"new"} url={""} type={""} onItemPress={(id) => { this._onPress(id) }} tabLabel="最新"></PageList>
                <PageList key={"teach"} url={""} type={""} onItemPress={(id) => { this._onPress(id) }} tabLabel="教学"></PageList>
                <PageList key={"ent"} url={""} type={""} onItemPress={(id) => { this._onPress(id) }} tabLabel="娱乐"></PageList>
            </ScrollableTabView>


        </SafeAreaView >);
    }
}

const styles = StyleSheet.create({


})