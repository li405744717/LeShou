/**
 * Created by dp-k on 2017/2/22.
 */
import * as React from 'react';
import { View, TouchableOpacity, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { containerStyles } from '../../../assets/styles/containerStyles';
interface Props {
    label?: string,
    onPress?: any
    placeholder?: string,
    width?: number,
    disabled?: boolean,
    value?: string,
    style?: any
}
interface State {
    value: string,
    placeholder: string
}
export default class LabelText extends React.Component<Props, State> {
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
        this.state = {
            value: this.props.value,
            placeholder: this.props.placeholder
        }
    }
    render() {
        return (<View style={[containerStyles.padding, { flexDirection: "row", alignItems: "center" }, this.props.style]} >
            {
                this.props.label != null ?
                    <Text style={[containerStyles.textInput_label, { width: this.props.width || 110 }]}>{this.props.label}：</Text>
                    :
                    null
            }
            <View style={[{ flex: 1, justifyContent: "center" }]} >
                <Text style={{ color: this.state.value ? "black" : "#cccccc" }} >{this.state.value ? this.state.value : this.state.placeholder}</Text>
            </View>
        </View>)
    }
}
