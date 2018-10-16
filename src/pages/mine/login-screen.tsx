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
import Tools  from "../../base/commonTools";

export default class LoginScreen extends BasePage {
    static navigationOptions = {
        // header: null,
        headerTitle: null
    }
    smsSecond = 120
    loginParams = {
        phoneNum: "",
        loginPwd: ""
    }
    constructor(props, state) {
        super(props, state);
        this.state = {
            loginType: 'sms',
            sending: false,
            smsSecond: 120
        }
    }
    login() {
        if(this.state.loginType === 'sms'){//短信验证码登录
            let params = {
                phoneNum:this.loginParams.phoneNum,
                phoneCode:this.loginParams.loginPwd
            }
            UserAPI.loginBySmsCode({
                params: params,
                component: this,
                success: (data) => {
                    AppConfig.USERINFO = {
                        USERID: data.appUser.id,
                        USERNAME: data.appUser.username
                    }
                    this.props.navigation.replace("Mine")
                }
            })
        }else{
            UserAPI.login({
                params: this.loginParams,
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
                smsSecond:120
            })
            clearInterval(intervalTimer)
            this.smsSecond = 120
        }, 120000);
        if(this.loginParams.phoneNum == ''){
            Tools.shortAlert('请填写手机号')
            return
        }
        UserAPI.sendSms({
            params: {
                phoneNum: this.loginParams.phoneNum
            },
            component: this,
            success: (data) => {
                console.log(data)
            }
        })
    }
    register() {
        this.props.navigation.navigate("Register");
    }
    chageLoginType() {
        let loginType = this.state.loginType;
        loginType = loginType == 'sms' ? 'code' : 'sms'
        this.setState({
            loginType
        })
    }
    inputChange(type, value) {
        this.loginParams[type] = value
    }
    render() {
        return (<SafeAreaView style={containerStyles.common}>
            <ScrollView style={[containerStyles.common]}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                    <Image style={{ width: 100, height: 100, marginBottom: 20 }} source={require('./../../assets/images/my-name.png')}></Image>
                    <Text style={{ fontSize: 30, color: '#333333' }}>乐手</Text>
                </View>
                <LabelInput onChange={(value) => { this.inputChange('phoneNum', value) }} width={70} label="用户名" placeholder="请输入用户名/手机号"></LabelInput>
                {
                    this.state.loginType === 'sms' ?
                        <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                            <LabelInput width={70} label="验证码" onChange={(value) => { this.inputChange('loginPwd', value) }}  placeholder="请输入验证码"></LabelInput>
                            {
                                !this.state.sending ?
                                    <TouchableOpacity style={[containerStyles.btn, { width: 120, backgroundColor: "#0084ff" }]} onPress={() => { this.sendSms() }}>
                                        <Text style={{ color: "white", fontSize: 16 }} >发送短信验证码</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity disabled={true} style={[containerStyles.btn, { width: 120, backgroundColor: "gray" }]}>
                                        <Text style={{ color: "white", fontSize: 16 }} >{this.state.smsSecond}</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        :
                        <LabelInput secureTextEntry={true} onChange={(value) => { this.inputChange('loginPwd', value) }} width={70} label="密码" placeholder="请输入密码"></LabelInput>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { this.chageLoginType() }} style={[{ width: 120 }]}>
                        {
                            this.state.loginType == 'sms' ?
                                <Text style={{ color: "#0084ff", fontSize: 16 }} >密码登录</Text>
                                :
                                <Text style={{ color: "#0084ff", fontSize: 16 }} >验证码登录</Text>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={[{ width: 120 }]} onPress={() => { this.register() }}>
                        <Text style={{ color: "#0084ff", fontSize: 16 }} >新用户注册</Text>
                    </TouchableOpacity>
                </View>
                <SubmitButton label="登录" onPress={() => { this.login() }}>
                </SubmitButton>
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


});