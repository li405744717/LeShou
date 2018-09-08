import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
//redux test
import Demo from './pages/testRedux';

//pages
import RootPage from "./root";
import {
    TabsScreen
} from './pages/tabs'
//info
import GuitarInfoScreen from './pages/guitar/gutar-info-screen';
//我的
import MineScreen from './pages/mine/mine';
import LoginScreen from './pages/mine/login';
//功能页面
import SearchSelectListScreen from './pages/extensions/search-select-listScreen';
import WebViewScreen from './pages/extensions/webViewScreen';
import PdfViewScreen from './pages/extensions/pdf-viewScreen';


export const RootStack = StackNavigator({
    Root: {
        screen: RootPage,
        navigationOptions: {
            header: null,
        }
    },
    Tabs: {
        screen: TabsScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    WebView: {
        screen: WebViewScreen
    },
    SearchSelectList: {
        screen: SearchSelectListScreen
    },
    Mine: {
        screen: MineScreen
    },
    Login: {
        screen: LoginScreen
    },
    PdfView: {
        screen: PdfViewScreen
    },
    GuitarInfo: {
        screen: GuitarInfoScreen
    },
    Demo: {
        screen: Demo
    }

}, {
        initialRouteName: 'Root',
        headerMode: "screen",
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }),
        navigationOptions: {
            gesturesEnabled: true,
            headerStyle: {
                backgroundColor: '#4498ff',
            },
            headerBackTitle: null,
            headerTitleStyle: {
                color: "white",
                fontSize: 20,
                textAlign: "center",
                flex: 1,
            },
            headerTintColor: "white"
        }
    });