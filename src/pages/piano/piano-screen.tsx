import { View, SafeAreaView, StyleSheet } from 'react-native';
import * as React from 'react';
import { containerStyles, width, height } from '../../assets/styles/containerStyles';
import BasePage from '../../base/components/BasePage';



export default class PianoScreen extends BasePage {
    static navigationOptions = {
        headerTitle: null
    }
    constructor(props, state) {
        super(props, state);
    }

    render() {
        return (<SafeAreaView style={containerStyles.common}>

        </SafeAreaView >);
    }
}


const styles = StyleSheet.create({


})