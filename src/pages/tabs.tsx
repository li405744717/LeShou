/**
 * Created by dp-k on 2017/2/16.
 */
import * as React from 'react';
//tab 格式
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation';
import { View, Text, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { containerStyles } from '../assets/styles/containerStyles';
import GuitarScreen from './guitar/guitar-screen';
import DrumScreen from './drum/drum-screen';
import UkuleleScreen from './ukulele/ukulele-screen';
import PianoScreen from './piano/piano-screen';


export const tabsNavigations = {};
export const TabsScreen = TabNavigator({
    Guitar: {
        screen: GuitarScreen,
    },
    Piano: {
        screen: PianoScreen
    },
    Drum: {
        screen: DrumScreen
    },
    Ukulele: {
        screen: UkuleleScreen
    }
}, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName, params } = navigation.state;
                let iconName;

                if (routeName === 'Guitar') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Piano') {
                    iconName = `ios-list-box${focused ? '' : '-outline'}`;
                } else if (routeName === 'Drum') {
                    iconName = `ios-cube${focused ? '' : '-outline'}`;
                } else if (routeName === 'Ukulele') {
                    iconName = `ios-compass${focused ? '' : '-outline'}`;
                }
                return <View>
                    <Ionicons name={iconName} size={25} color={tintColor} />
                </View>;
            },
            tabBarLabel: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'TodoList') {//获得todoList的navigation
                    tabsNavigations["TodoList"] = navigation;
                }
                let tabName;
                if (routeName === 'Guitar') {
                    tabName = "吉他";
                } else if (routeName === 'Piano') {
                    tabName = "钢琴";
                } else if (routeName === 'Drum') {
                    tabName = "架子鼓";
                } else if (routeName === 'Ukulele') {
                    tabName = "尤克里里";
                }
                return tabName;
            },
            header: null
        }),
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            style: {
                backgroundColor: '#4498ff',
            },
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
    });