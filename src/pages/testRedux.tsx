import { Component } from 'react';
import * as React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { containerStyles } from '../assets/styles/containerStyles';

import { reset, increase, decrease } from './../actions/demo-action';
import BasePage from '../base/components/BasePage';
import { conuter } from '../reducers/demo-reducer';
class Demo extends BasePage {
    _onPressReset() {
        this.props.dispatch(reset());
    }

    _onPressInc() {
        this.props.dispatch(increase());
    }

    _onPressDec() {
        this.props.dispatch(decrease());
    }
    render() {
        return (<View style={containerStyles.common}>
            <Text>{this.props._state.count}</Text>
            <TouchableOpacity style={styles.reset} onPress={() => this._onPressReset()}>
                <Text>归零</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.start} onPress={() => this._onPressInc()}>
                <Text>加1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stop} onPress={() => this._onPressDec()}>
                <Text>减1</Text>
            </TouchableOpacity>
        </View>);
    }
}

const styles = StyleSheet.create({
    reset: {

    },
    start: {

    },
    stop: {

    }
})

function initState(state) {
    return {
        _state: state.conuter
    }
}

export default connect(initState)(Demo);
