/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as React from 'react';
import { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CommonTools from './base/commonTools';
import { AppFun } from './base/utils/app-fun';
import { AppConfig } from './base/app-config';

interface State {

}
interface Props {
    navigation?: any
}


export default class RootPage extends React.Component<Props, State> {
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        //初始化Storage
        AppFun.initStorage();

        storage.load({
            key: 'gesturepassword',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false
        }).then(gesturepassword => {
            console.log("gesturepassword", gesturepassword);
            AppConfig.GESTUREPWD = gesturepassword;
        }).catch(err => {

        })
    }
    openTab() {
        this.props.navigation.replace('Tabs', {
            id: "10086",
            name: "dpwang"
        });
        // this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>引导页</Text>
                <TouchableOpacity onPress={() => { this.openTab() }}>
                    <Text>进入</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


