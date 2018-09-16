import { View, SafeAreaView, StyleSheet, NativeModules, NativeEventEmitter, Platform, DeviceEventEmitter, Text } from 'react-native';
import * as React from 'react';
import { containerStyles, width, height, navHeight, navTop } from '../../assets/styles/containerStyles';
import BasePage from '../../base/components/BasePage';
import Header from '../../base/components/header/header';

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
    // console.log(data);
})
export default class GuitarScreen extends BasePage {
    static navigationOptions = {
        headerTitle: null
    }
    public selectSpectrumType = 0
    public listPages = {}
    public searchText = ""
    constructor(props, state) {
        super(props, state);
        this.state = {
            types: [],

        }
    }
    componentWillMount() {
        let json3 = {
            instrType: 1
        }
        MusicAPI.getTypes({
            params: json3,
            component: this,
            success: (data) => {
                console.log('123', data)
                this.setState({
                    types: data.stList
                })
            }
        })
    }

    componentDidMount() {
        this.loadSpectrumRows()
    }
    componentWillUnmount() {
        subscription.remove();
    }
    _onPress(id) {
        let json6 = {
            "page": 0,
            "pageSize": 10,
            "userId": 1
        }
        MusicAPI.getStores({
            params: json6,
            component: this,
            success: (data) => {
                console.log(data)
            }
        })


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
    loadSpectrumRows() {
        let json4 = {
            "page": 1,
            "pageSize": 10,
            "instrType": 1,
            "spectrumType": this.selectSpectrumType,
            "search": this.searchText || ""
        }
        MusicAPI.getRows({
            params: json4,
            component: this,
            success: (data) => {
                let rows = data.rows;
                let listPage: PageList = this.listPages[this.selectSpectrumType]
                listPage.setDataSource(rows)
            }
        })
    }
    onChangeTab(e) {
        if (this.selectSpectrumType != e.i) {//refresh 
            this.selectSpectrumType = e.i
        }
        console.log(e)
        this.loadSpectrumRows()
    }
    render() {
        return (<SafeAreaView style={[containerStyles.common]}>
            <Header navigation={this.props.navigation} searchAction={(text)=>{this.searchText = text;this.loadSpectrumRows()}}></Header>
            <ScrollableTabView initialPage={0} onChangeTab={(e) => { this.onChangeTab(e) }}
                renderTabBar={() => <ScrollableTabBar />}>
                <PageList component={this} instrType={1} spectrumType={0} ref={(ref) => { this.listPages[0 + ""] = ref }} key={"0"} url={""} onItemPress={(id) => { this._onPress(id) }} tabLabel="最新"></PageList>
                {
                    this.state.types.map((item, index) => {
                        return <PageList component={this} instrType={1} spectrumType={item.id} ref={(ref) => { this.listPages[item.id + ""] = ref }} key={item.id + ""} url={""} onItemPress={(id) => { this._onPress(id) }} tabLabel={item.typename}></PageList>
                    })
                }
            </ScrollableTabView>


        </SafeAreaView >);
    }
}

const styles = StyleSheet.create({


})