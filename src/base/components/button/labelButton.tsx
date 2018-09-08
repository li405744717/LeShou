/**
 * Created by dp-k on 2017/2/22.
 */
import * as React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { containerStyles } from '../../../assets/styles/containerStyles';
interface Props {
    label?: string,
    onPress?: any
    placeholder?: string,
    width?: number,
    disabled?: boolean,
    value?: string,
    style?: any,
    style_btn?: any,
    fontSize?: number
}
interface State {
    placeholder: string,
    value: string
}
export default class LabelButton extends React.Component<Props, State> {
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
        this.state = {
            placeholder: this.props.placeholder,
            value: this.props.value
        }
    }
    onPress() {
        if (this.props.onPress) this.props.onPress();
    }
    setText(text) {
        this.setState({
            placeholder: text
        })
    }
    render() {
        return (<View style={[containerStyles.padding, { flexDirection: "row", alignItems: "center" }, this.props.style]} >
            {
                this.props.label != null ?
                    <Text style={[containerStyles.textInput_label, { width: this.props.width || 110 }]}>{this.props.label}：</Text>
                    :
                    null
            }
            <TouchableOpacity disabled={this.props.disabled} style={[containerStyles.textInput, { flex: 1, justifyContent: "center" }, this.props.style_btn]} onPress={() => { this.onPress() }}>
                <Text numberOfLines={3} style={{ color: this.state.value ? "black" : "#cccccc", fontSize: this.props.fontSize }} >{this.state.value ? this.state.value : this.state.placeholder}</Text>
            </TouchableOpacity>
        </View>)
    }
}
