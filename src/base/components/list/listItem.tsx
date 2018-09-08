/**
 * Created by dp-k on 2017/2/22.
 */
import * as React from 'react';
import { View, TouchableOpacity, Text, TextInput, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { containerStyles, width, height } from '../../../assets/styles/containerStyles';
export interface Work {
    id: string,
    name: string,
    zuoqu: string,
    read: number
}
interface Props {
    onPress?: any
    item: Work;
}
interface State {

}

export default class ListItem extends React.Component<Props, State> {
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
    }
    onPress() {
        if (this.props.onPress) this.props.onPress(this.props.item.id);
    }

    render() {
        return (<TouchableOpacity style={[containerStyles.padding, styles.container]} onPress={() => { this.onPress() }}>
            <Image style={styles.icon} source={require("./../../../assets/images/logo.png")}></Image>
            <View style={{ flexDirection: "column", flex: 1 }}>
                <Text>{this.props.item.name}</Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <View style={{ flex: 1 }}>
                        <Text>作曲:{this.props.item.zuoqu}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>浏览数:{this.props.item.read}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: '#eeeeee'
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 10
    }
})