import * as React from 'react';
import { width } from '../../assets/styles/containerStyles';
import { TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {
    StyleSheet,
    View,
    Image,
    TextInput,
} from 'react-native';
interface Props {
    placeholder?: string,
    style?: any,
    searchAction?: any
}
interface State {
    text: string
}

export default class SearchBar extends React.Component<Props, State> {
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
        this.state = {
            text: ""
        }
    }
    clearText() {
        this.changeText("");
        this.props.searchAction("");
    }
    changeText(text) {
        this.setState({
            text: text
        });
    }
    searchAction() {
        this.props.searchAction(this.state.text);
    }
    render() {
        var ViewWidth = width;
        var ViewHeight = 44;
        var SearchIcon_width = ViewHeight * 0.6;
        return (
            <View style={[{ height: ViewHeight, width: ViewWidth, backgroundColor: "#ccc" }, this.props.style]}>
                <View style={[styles.searchRow, { height: ViewHeight - 8, width: ViewWidth - 10 }]}>
                    <TouchableWithoutFeedback onPress={() => { this.searchAction() }}>
                        <Image source={require('./../../assets/images/icons/search.png')} style={[{ height: SearchIcon_width, width: SearchIcon_width }]} />
                    </TouchableWithoutFeedback>
                    <TextInput
                        autoCapitalize="none"
                        underlineColorAndroid={"transparent"}
                        autoCorrect={false}
                        placeholder={this.props.placeholder}
                        returnKeyType='search'
                        value={this.state.text}
                        onChangeText={(value) => { this.changeText(value) }}
                        onSubmitEditing={(event) => { this.searchAction() }}
                        style={[styles.searchTextInput, { width: ViewWidth - (10 + 18 + 30 + SearchIcon_width), height: ViewHeight }]}
                    />
                    <TouchableWithoutFeedback onPress={() => { this.clearText() }} style={styles.clearBtn}>
                        <MaterialIcons name={"cancel"} color={"#cccccc"} size={ViewHeight * 0.5}></MaterialIcons>
                        {/* <Image source={require('./../../assets/images/icons/search.png')} style={[{ height: SearchIcon_width, width: SearchIcon_width }]} /> */}
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchRow: {
        paddingLeft: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: '#cccccc',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 4,
        marginLeft: 5
    },
    searchTextInput: {
        paddingLeft: 10,
    },
    clearBtn: {
        marginLeft: 20
    }
});


