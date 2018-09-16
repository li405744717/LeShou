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
import PageList from '../../base/components/list/pageList';


export default class StoresScreen extends BasePage {
    static navigationOptions = {
        // header: null,
        headerTitle: '我的收藏'
    }
    public pageList:PageList = null;
    constructor(props, state) {
        super(props, state);
    }
    componentDidMount(){
        this.pageList.loadSpectrumRows("",'refresh');
    }
    _onPress(id) {
        this.props.navigation.navigate("GuitarInfo", {
            msId: id
        });
    }
    render() {
        return (<SafeAreaView style={containerStyles.common}>
            <PageList ref={ref=>this.pageList = ref} component={this}  onItemPress={(id) => { this._onPress(id) }} storesFlag={true}></PageList>
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


const styles = StyleSheet.create({


})