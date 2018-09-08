/**
 * Created by dp-k on 2017/2/22.
 */
import * as React from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { containerStyles } from '../../../assets/styles/containerStyles';
interface Props {
    label?: string,
    onChange?: any
    placeholder?: string,
    value?: string,
    width?: number,
    disabled?: boolean,
    keyboardType?: KeyboardTypeOptions,
    style?: any
}
interface State {
    value: string,
    placeholder: string
}
export default class LabelInput extends React.Component<Props, State> {
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
        this.state = {
            value: this.props.value,
            placeholder: this.props.placeholder
        }
    }
    onChange(text) {
        this.setState({
            value: text
        })
        if (this.props.onChange) this.props.onChange(text);
    }
    render() {
        return (<View style={[containerStyles.padding, { flex: 1, flexDirection: "row", alignItems: "center" }]}>
            <Text style={[containerStyles.textInput_label, { width: this.props.width || 110 }]}>{this.props.label}：</Text>
            <TextInput keyboardType={this.props.keyboardType || "default"} value={this.state.value} editable={this.props.disabled} style={[containerStyles.textInput, { flex: 1 }, this.props.style]} placeholder={this.state.placeholder} onChangeText={(text) => { this.onChange(text) }} underlineColorAndroid={"transparent"}></TextInput>
        </View>)
    }
}
