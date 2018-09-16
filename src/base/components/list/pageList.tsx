import * as React from 'react';
import { FlatList, Text } from 'react-native';
import ListItem, { Work } from './listItem';
import { View } from 'react-native';
import { MusicAPI } from '../../api/music';
import { AppConfig } from '../../app-config';



interface Props {
    url?: string,
    instrType?: number,
    spectrumType?: number,
    onItemPress: any,
    tabLabel?: string,
    dataSource?: any[],
    storesFlag?:boolean,
    component: any
}
export default class PageList extends React.PureComponent<Props, any> {
    public haveMore = true
    public page = 1;
    state = {
        dataSource: this.props.dataSource,
        refreshing: false,
        storesFlag:this.props.storesFlag
    }
    constructor(props: Props, state) {
        super(props, state);
        console.log('PageList', this.props)
    }
    _onRefresh() {
        this.setState({
            refreshing: true
        })
        this.page = 1
        this.loadSpectrumRows("",'refresh')
    }
    _onEndReached() {
        if (this.haveMore) {
            console.log('load more');
            this.page++
            this.loadSpectrumRows("",'add')
        }
    }
    loadSpectrumRows(search,type) {
        if(!this.state.storesFlag){
            let listParams = {
                "page": this.page,
                "pageSize": 10,
                "instrType": this.props.instrType,
                "spectrumType": this.props.spectrumType,
                "search": search || ""
            }
            MusicAPI.getRows({
                params: listParams,
                component: this.props.component,
                success: (data) => {
                    let rows = data.rows;
                    let dataSource = this.state.dataSource
                    if (rows.length == 0) this.haveMore = false
                    if(type == 'add'){
                        rows = dataSource.concat(rows)
                    }
                    this.setState({
                        dataSource: rows,
                        refreshing: false
                    });
                }
            })
        }else{
            let listParams = {
                "page": this.page,
                "pageSize": 10,
                "userId": AppConfig.USERINFO.USERID
            }
            MusicAPI.getStores({
                params: listParams,
                component: this.props.component,
                success: (data) => {
                    let rows = data.rows;
                    let dataSource = this.state.dataSource
                    if (rows.length == 0) this.haveMore = false
                    if(type == 'add'){
                        rows = dataSource.concat(rows)
                    }
                    this.setState({
                        dataSource: rows,
                        refreshing: false
                    });
                }
            })
        }
    }

    setDataSource(newDataSource) {
        this.setState({
            dataSource: newDataSource
        })
    }
    _renderItem(item) {
        return (
            <ListItem key={item.id} item={item} onPress={(id) => { this.props.onItemPress(id) }}></ListItem>
        )
    }
    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                numColumns={1}
                refreshing={false}
                // onEndReached={() => { this._onEndReached() }}
                onRefresh={() => { this._onRefresh() }}
                renderItem={(info) => { return this._renderItem(info.item) }}>
            </FlatList>
        )
    }
}