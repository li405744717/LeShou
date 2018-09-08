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
    disabled?: boolean,
    style?: any,
    backgroundColor?: string
}
interface State {
    placeholder: string
}
export default class SubmitButton extends React.Component<Props, State> {
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
    }
    onPress() {
        if (this.props.onPress) this.props.onPress();
    }

    render() {
        return (<View style={[containerStyles.padding, { flexDirection: "row", alignItems: "center" }, this.props.style]} >
            <TouchableOpacity disabled={this.props.disabled} style={[containerStyles.btn, { flex: 1, backgroundColor: this.props.backgroundColor || "#fd6868" }]} onPress={() => { this.onPress() }}>
                <Text style={{ color: "white", fontSize: 16 }} >{this.props.label}</Text>
            </TouchableOpacity>
        </View>)
    }
}
