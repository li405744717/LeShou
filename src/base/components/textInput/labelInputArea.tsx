/**
 * Created by dp-k on 2017/2/22.
 */
import * as React from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { containerStyles } from '../../../assets/styles/containerStyles';
interface Props {
    label?: string,
    onChange?: any
    placeholder?: string,
    value?: string,
    width?: number,
    disabled?: boolean,
    style?: any
}
interface State {
    value: string,
    placeholder: string
}
export default class LabelInputArea extends React.Component<Props, State> {
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
        return (<View style={[containerStyles.padding, { flexDirection: "row" }]}>
            <Text style={[containerStyles.textInput_label, { width: this.props.width || 110 }]}>{this.props.label}：</Text>
            <TextInput style={[containerStyles.textInput, containerStyles.textInput_area, this.props.style]}
                numberOfLines={10}
                editable={this.props.disabled}
                underlineColorAndroid={"transparent"}
                placeholder={this.state.placeholder}
                value={this.state.value}
                onChangeText={(inputvalue) => { this.onChange(inputvalue, ) }}
                multiline={true}>
            </TextInput>
        </View>)
    }
}
