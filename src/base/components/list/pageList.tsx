import * as React from 'react';
import { FlatList, Text } from 'react-native';
import ListItem, { Work } from './listItem';
import { View } from 'react-native';



interface Props {
    url: string,
    type: string,
    onItemPress: any,
    tabLabel?: string
}
export default class PageList extends React.PureComponent<Props, any> {
    public work: Work = {
        id: "0001",
        name: "克罗地亚狂想曲",
        zuoqu: "土豪",
        read: 2123
    }
    state = {
        dataSource: [this.work, this.work, this.work, this.work, this.work, this.work, this.work, this.work, this.work, this.work, this.work],
        refreshing: false
    }
    constructor(props: Props, state) {
        super(props, state);
        console.log(this.props.url)
    }
    _onRefresh() {
        this.setState({
            refreshing: true
        })
        setTimeout(() => {
            let newWork: Work = {
                id: "0002",
                name: "克罗地亚狂想曲2",
                zuoqu: "土豪2",
                read: 2124
            }
            console.log('refresh');
            let newDataSource = [newWork, newWork, newWork, newWork, newWork, newWork, newWork, newWork, newWork, newWork, newWork];
            this.setState({
                dataSource: newDataSource,
                refreshing: false
            });
        }, 1000);
    }
    _onEndReached() {
        console.log('load more');
        let newDataSource = this.state.dataSource;
        let newWork: Work = {
            id: "0003",
            name: "克罗地亚狂想曲3",
            zuoqu: "土豪3",
            read: 2125
        };
        newDataSource.push(newWork);
        newDataSource.push(newWork);
        newDataSource.push(newWork);
        this.setState({
            dataSource: newDataSource
        });
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
                onEndReached={() => { this._onEndReached() }}
                onRefresh={() => { this._onRefresh() }}
                renderItem={(info) => { return this._renderItem(info.item) }}>
            </FlatList>
        )
    }
}