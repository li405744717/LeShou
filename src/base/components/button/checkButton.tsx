/**
 * Created by dp-k on 2017/2/22.
 */
import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
interface Props {
    navigator?: any,
    /**
     * 调用组件传入的回调函数
     */
    onPress?: any,
    /**
     * 按钮的是否可用
     */
    disabled?: boolean,
    value?: boolean
}
interface State {
    isCheck: boolean
}
export default class CheckButton extends React.Component<Props, State> {
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
        this.isCheck = this.props.value ? true : false;
        this.state = {
            isCheck: this.isCheck
        }

    }
    _onPress = () => {
        this.setState({
            isCheck: !this.state.isCheck
        })
        this.isCheck = !this.isCheck
        if (this.props.onPress) this.props.onPress(this.isCheck)
    }
    render() {
        return (
            <TouchableOpacity style={{ width: 40, height: 40, alignItems: "center", justifyContent: "center" }}
                disabled={this.props.disabled} activeOpacity={0.8}
                onPress={() => this._onPress()}>
                {this.state.isCheck ?
                    <Icon name={"check-square-o"} size={20} color={"white"}></Icon>
                    :
                    <Icon name={"square-o"} size={20} color={"white"}></Icon>}
            </TouchableOpacity>
        )
    }
}
