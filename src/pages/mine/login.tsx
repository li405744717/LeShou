import { View, SafeAreaView, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Component } from 'react';
import { containerStyles, width, height } from '../../assets/styles/containerStyles';
import BasePage from '../../base/components/BasePage';
import { AppConfig } from '../../base/app-config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native';
import LabelInput from '../../base/components/textInput/labelInput';
import SubmitButton from '../../base/components/button/submitButton';
import LabelButton from '../../base/components/button/labelButton';


export default class LoginScreen extends BasePage {
    static navigationOptions = {
        header: null,
        headerTitle: null
    }
    constructor(props, state) {
        super(props, state);
    }

    render() {
        return (<SafeAreaView style={containerStyles.common}>
            <ScrollView style={[containerStyles.common]}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>

                    <Image style={{ width: 100, height: 100, marginBottom: 20 }} source={require('./../../assets/images/my-name.png')}></Image>
                    <Text style={{ fontSize: 30, color: '#333333' }}>乐手</Text>

                </View>
                <LabelInput width={70} label="用户名" placeholder="请输入用户名/手机号"></LabelInput>
                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                    <LabelInput width={70} label="验证码" placeholder="请输入验证码"></LabelInput>
                    <TouchableOpacity style={[containerStyles.btn, { width: 120, backgroundColor: "#0084ff" }]} >
                        <Text style={{ color: "white", fontSize: 16 }} >发送短信验证码</Text>
                    </TouchableOpacity>
                </View>
                <LabelInput width={70} label="密码" placeholder="请输入密码"></LabelInput>
                <SubmitButton label="登录"></SubmitButton>
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