/**
 * Created by dp-k on 2017/2/21.
 */
import * as React from 'react';
import { InteractionManager, WebView, Text } from 'react-native';

import BasePage from '../../base/components/BasePage';
import { containerStyles } from '../../assets/styles/containerStyles';
import { AppConfig } from '../../base/app-config';

export default class WebViewScreen extends BasePage {
    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            headerTitle: params.title ? params.title : '网页',
            headerRight: <Text></Text>,
        }
    };
    constructor(props, state) {
        super(props, state);
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <WebView style={containerStyles.common} source={{ uri: params.url, headers: { "ZM_AUTH_TOKEN": AppConfig.TOKEN } }}>
            </WebView>
        );
    }
}