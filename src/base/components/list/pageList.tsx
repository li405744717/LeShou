import * as React from 'react';
import { FlatList, Text } from 'react-native';
import ListItem, { Work } from './listItem';
import { View } from 'react-native';
import { MusicAPI } from '../../api/music';



interface Props {
    url: string,
    instrType: number,
    spectrumType: number,
    onItemPress: any,
    tabLabel?: string,
    dataSource?: any[],
    component: any
}
export default class PageList extends React.PureComponent<Props, any> {
    public work: Work = {
        id: "0001",
        title: "克罗地亚狂想曲",
        composer: "土豪",
        writer: "土豪",
        read: 2123
    }
    public haveMore = true
    public page = 1;
    state = {
        dataSource: this.props.dataSource,
        refreshing: false
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
        this.loadSpectrumRows("")
    }
    _onEndReached() {
        if (this.haveMore) {
            console.log('load more');
            this.page++
            this.loadSpectrumRows("")
        }
    }
    loadSpectrumRows(search) {
        let json4 = {
            "page": this.page,
            "pageSize": 10,
            "instrType": this.props.instrType,
            "spectrumType": this.props.spectrumType,
            "search": search || ""
        }
        MusicAPI.getRows({
            params: json4,
            component: this.props.component,
            success: (data) => {
                let rows = data.rows;
                if (rows.length == 0) this.haveMore = false
                this.setState({
                    dataSource: rows,
                    refreshing: false
                });
            }
        })
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