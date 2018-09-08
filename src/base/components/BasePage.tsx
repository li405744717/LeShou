import * as React from 'react';
import { View, Text, ListView } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import Spinkit from 'react-native-spinkit'
import { containerStyles } from './../../assets/styles/containerStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface State {
    dataSource?: any
}
interface Props {
    navigation?: any,
    dispatch?: any,
    _state?: any
}

export default class BasePage extends React.Component<Props, any>{


    public alertElements = [];
    constructor(public props: Props, public state) {
        super(props, state);
    }
    componentDidMount() {

    }

    componentWillUnmount() {

        this.hideLoadingView()
        console.log("componentWillUnmount()")
    }
    showSuccessView = (msg) => {
        let sibling = new RootSiblings(<View style={containerStyles.LoadingViewContainer}>
            <View style={containerStyles.spinkitContainer}>
                <MaterialIcons name={"check-circle"} color={"white"} size={50}></MaterialIcons>
                <Text numberOfLines={3} style={containerStyles.spinkitText}>{msg}</Text>
            </View>
        </View>);
        this.alertElements.push(sibling);
        setTimeout(() => {
            this.hideAlertView()
            console.log("hide success view");
        }, 2000)
    }
    showErrowView = (msg) => {
        let sibling = new RootSiblings(<View style={containerStyles.LoadingViewContainer}>
            <View style={containerStyles.spinkitContainer}>
                <MaterialIcons name={"cancel"} color={"white"} size={50}></MaterialIcons>
                <Text numberOfLines={3} style={containerStyles.spinkitText}>{msg}</Text>
            </View>
        </View>);
        this.alertElements.push(sibling);
        setTimeout(() => {
            this.hideAlertView()
        }, 2000)
    }
    showLoadingView = () => {
        let sibling = new RootSiblings(<View style={containerStyles.LoadingViewContainer}>
            <View style={containerStyles.spinkitContainer}>
                <Spinkit size={50} type={'Circle'} color={'white'} />
                <Text style={containerStyles.spinkitText}>请稍后...</Text>
            </View>
        </View>);
        this.alertElements.push(sibling);
    }

    hideAlertView = () => {
        while (this.alertElements.length > 0) {
            let lastSibling = this.alertElements.pop();
            lastSibling && lastSibling.destroy();
        }
    }
    hideLoadingView = () => {
        while (this.alertElements.length > 0) {
            let lastSibling = this.alertElements.pop();
            lastSibling && lastSibling.destroy();
        }
    }

    //设置listView的数据源
    setDataSource = (dataSource) => {


        var ds = new ListView.DataSource({
            // getRowData: (data, sectionID, rowID) => {
            //     return data[sectionID][rowID];
            // },
            // getSectionHeaderData: (data, sectionID) => {
            //     return data[sectionID];
            // },
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        })
        // return ds.cloneWithRowsAndSections(dataSource)
        //      {sectionID_0:{rowID_0:rowData_0,rowID_1:rowData_1,rowID_2:rowData_2,rowID_3:rowData_3}}
        //      ["abcd", "abc", "ab", "a"]
        // =>   {0:{0:"a",1:"b",2:"c",3:"d"},1:{0:"a",1:"b",2:"c"},2:{0:"a",1:"b"},3:{0:"a"}}
        //      [{ title: "abc", value: "1001" }, { title: "qwe", value: "1002" }, { title: "zxc", value: "1003" }, { title: "poi", value: "1004" }]
        // =>   {0:{title:"abc",value:"1001"},1:{title:"qwe",value:"1002"},2:{title:"zxc",value:"1003"},3:{title:"poi",value:"1004"}}
        //      { section1: ["abcd", "abc", "ab", "a"], section2: ["abcd", "abc", "ab", "a"], section3: ["abcd", "abc", "ab", "a"] }
        // =>   { section1: {0:"abcd", 1:"abc", 2:"ab", 3:"a"}, section2: {0:"abcd", 1:"abc", 2:"ab", 3:"a"}, section3: {0:"abcd", 1:"abc", 2:"ab", 3:"a"} }
        return ds.cloneWithRows(dataSource);
        //      ["abcd", "abc", "ab", "a"]
        // =>   {s1:{0:"abcd",1:"abc",2:"ab",3:"a"}}
        //      [{ title: "abc", value: "1001" }, { title: "qwe", value: "1002" }, { title: "zxc", value: "1003" }, { title: "poi", value: "1004" }]
        // =>   {s1:{0:{ title: "abc", value: "1001" },1: { title: "qwe", value: "1002" },2:{ title: "zxc", value: "1003" },3:{ title: "poi", value: "1004" }}}
        //      { section1: ["abcd", "abc", "ab", "a"], section2: ["abcd", "abc", "ab", "a"], section3: ["abcd", "abc", "ab", "a"] }
        // =>   { s1: {section1:["abcd", "abc", "ab", "a"], section2:["abcd", "abc", "ab", "a"], section3:["abcd", "abc", "ab", "a"]}}

    }


}