/**
 * Created by dp-k on 2017/2/21.
 */
import * as React from 'react';
import { View, TextInput, ListView, Text, StyleSheet, TouchableOpacity } from 'react-native';

import BasePage from '../../base/components/BasePage';
import { containerStyles } from '../../assets/styles/containerStyles';
import { AppConfig } from '../../base/app-config';
import SearchBar from '../../base/components/searchBar';
import { RemoteService } from '../../base/utils/remoteService';

export interface RowItem { label: string, value: string }
export default class SearchSelectListScreenn extends BasePage {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            headerTitle: params.title ? params.title : '请选择',
            headerRight: <Text> </Text>
        }
    };
    public search1: SearchBar;
    public regExpStrings: RowItem[] = [];
    public item = {
        serv: "",
        placeholder: "搜索",
        param: {}
    }
    constructor(props, state: any) {
        super(props, state);
        const { params } = this.props.navigation.state;
        if (params.placeholder) this.item.placeholder = params.placeholder;//提示语
        if (params.serv) this.item.serv = params.serv;//搜索地址
        if (params.formatAction) this.formatAction = params.formatAction;//数据格式化
        if (params.parmas) {//格外参数
            for (let key in params.parmas) {
                this.item.param[key] = params.parmas[key];
            }
        }
        if (params.dataSource) this.regExpStrings = params.dataSource;//列表数据
        this.state = {
            dataSource: this.regExpStrings
        }
    }
    //数据格式化
    formatAction(response): RowItem[] {
        return response;
    }
    //选择row
    selectRow(data) {
        const { params } = this.props.navigation.state;
        if (params.callback) params.callback(data);
        this.props.navigation.goBack();
    }
    filte(val) {
        console.log(this.item, val);
        if (this.item.serv == "") {//过滤
            this.match(val);
        } else {//搜索
            this.search(val);
        }
    }
    match(val) {
        let len = this.regExpStrings.length;
        let arr = [];
        let reg = new RegExp(val);
        for (let i = 0; i < len; i++) {
            //如果字符串中不包含目标字符会返回-1
            let value: string = this.regExpStrings[i].label;
            if (value.match(reg)) {
                arr.push(this.regExpStrings[i]);
            }
        }
        this.setState({
            dataSource: arr
        });
    }
    search(val) {
        this.item.param["filter"] = val;
        RemoteService.getData({
            serv: this.item.serv,
            params: this.item.param,
            component: this,
            success: response => {
                let arr: RowItem[] = this.formatAction(response.body);
                this.setState({
                    dataSource: arr
                });
            }
        });
    }

    renderCell(rowData: RowItem, sectionID, rowID) {
        return <TouchableOpacity onPress={() => { this.selectRow(rowData) }}>
            <Text style={Styles.title_content_text} >{rowData.label + "(" + rowData.value + ")"}</Text>
        </TouchableOpacity>;
    }
    render() {
        const { params } = this.props.navigation.state;
        return (<View style={containerStyles.common}>
            <View>
                <SearchBar placeholder={this.item.placeholder} searchAction={(text) => { this.filte(text) }}></SearchBar>
            </View>
            <ListView style={[{ flex: 1 }, containerStyles.padding_LR_10]}
                dataSource={this.setDataSource(this.state.dataSource)}
                initialListSize={10}
                pageSize={10}
                enableEmptySections={true}
                renderRow={(rowData, sectionID, rowID) => this.renderCell(rowData, sectionID, rowID)}>

            </ListView>
        </View>
        );
    }
}
const Styles = StyleSheet.create({
    title_content_text: {
        color: "#666",
        fontSize: 14,
        marginTop: 11,
        lineHeight: 20,
    },
})