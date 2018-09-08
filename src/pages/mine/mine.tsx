import { View, SafeAreaView, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import { containerStyles, width, height } from '../../assets/styles/containerStyles';
import BasePage from '../../base/components/BasePage';
import { AppConfig } from '../../base/app-config';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class MineScreen extends BasePage {
    static navigationOptions = {
        headerTitle: null
    }
    constructor(props, state) {
        super(props, state);
    }
    gotoLogin() {
        this.props.navigation.navigate("Login");
    }
    render() {
        return (<SafeAreaView style={containerStyles.common}>
            <ScrollView style={containerStyles.common}>
                <TouchableOpacity onPress={() => { this.gotoLogin() }}>
                    <Text>登录</Text>
                </TouchableOpacity>
                <View style={[containerStyles.padding_TB_25, { alignItems: "center", justifyContent: "center" }]}>
                    <Image style={{ width: 75, height: 75 }} source={require('./../../assets/images/my-name.png')}></Image>
                    <Text style={{ marginTop: 10 }}>{AppConfig.USERNAME + '(' + AppConfig.USERID + ')'}</Text>
                </View>
                <View style={containerStyles.fg_line}>
                </View>
                <MineItem source={require("./../../assets/images/read.png")} title={'最近浏览'} action={() => { }}></MineItem>
                <View style={containerStyles.fg_line}>
                </View>
                <MineItem source={require("./../../assets/images/threadGL.png")} title={'我的收藏'} action={() => { }}></MineItem>

                <View style={containerStyles.fg_line}>
                </View>
            </ScrollView>
        </SafeAreaView >);
    }
}

interface MineItemPorps {
    source: any,
    title: string,
    action: any,
    dispatch?: any,
    _state?: any,
    switch?: boolean
}
class MineItem extends Component<MineItemPorps, any> {
    constructor(props: MineItemPorps, state) {
        super(props, state);
    }

    render() {
        return (<View>

            <TouchableOpacity onPress={() => { this.props.action() }}>
                <View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
                    <Image style={{ marginLeft: 16, marginRight: 16, width: 25, height: 25 }} source={this.props.source}></Image>
                    <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee", height: 40, alignItems: "center" }}>
                        <View style={{ flex: 1 }}>
                            <Text>{this.props.title}</Text>
                        </View>
                        <Ionicons style={{ alignSelf: "flex-end", marginLeft: 16, marginRight: 16 }} name={"ios-arrow-forward"} size={25} color={"#eee"} ></Ionicons>
                    </View>
                </View>
            </TouchableOpacity>

        </View>);
    }
}



const styles = StyleSheet.create({


})