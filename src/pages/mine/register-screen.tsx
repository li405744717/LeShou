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
import { UserAPI } from '../../base/api/user';


export default class RegisterScreen extends BasePage {
    static navigationOptions = {
        // header: null,
        headerTitle: "注册"
    }
    smsSecond = 120
    registerParams = {
        phoneNum: "test",
        phoneCode: "123456"
    }
    constructor(props, state) {
        super(props, state);
        this.state = {
            sending: false,
            smsSecond: 120,
            loginType: "pwd"
        }
    }
    register() {
        UserAPI.register({
            params: this.registerParams,
            component: this,
            success: (data) => {
                AppConfig.USERINFO = {
                    USERID: data.appUser.id,
                    USERNAME: data.appUser.username
                }
                this.props.navigation.replace("Mine")
            }
        })
    }

    sendSms() {
        this.setState({
            sending: true,
        })
        let intervalTimer = setInterval(() => {
            this.setState({
                smsSecond: --this.smsSecond,
            })
        }, 1000)
        setTimeout(() => {
            this.setState({
                sending: false,
                smsSecond: 120
            })
            clearInterval(intervalTimer)
            this.smsSecond = 120
        }, 120000);

        UserAPI.sendSms({
            params: {
                phoneNum: this.registerParams.phoneNum
            },
            component: this,
            success: (data) => {
                console.log(data)
            }
        })
    }
    changeLoginType(type) {
        this.setState({
            loginType: type
        })
    }
    inputChange(type, value) {
        this.registerParams[type] = value
    }

    render() {
        return (<SafeAreaView style={containerStyles.common}>
            <ScrollView style={[containerStyles.common]}>

                <LabelInput onChange={(value) => { this.inputChange('phoneNum', value) }} width={70} label="手机号" placeholder="请输入手机号"></LabelInput>
                <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                    <LabelInput width={70} label="验证码" placeholder="请输入验证码" onChange={(value) => { this.inputChange('phoneCode', value) }}></LabelInput>
                    {
                        !this.state.sending ?
                            <TouchableOpacity disabled={this.state.sending} onPress={() => { this.sendSms() }} style={[containerStyles.btn, { width: 120, backgroundColor: "#0084ff" }]} >
                                <Text style={{ color: "white", fontSize: 16 }} >发送短信验证码</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity disabled={true} style={[containerStyles.btn, { width: 120, backgroundColor: "gray" }]}>
                                <Text style={{ color: "white", fontSize: 16 }} >{this.state.smsSecond}</Text>
                            </TouchableOpacity>
                    }

                </View>
                <SubmitButton label="确定" onPress={() => { this.register() }}></SubmitButton>
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