import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as React from 'react';
import { containerStyles, width, height, navHeight, navTop } from '../../assets/styles/containerStyles';
import BasePage from '../../base/components/BasePage';
import Header from '../../base/components/header/header';
import ListItem, { Work } from '../../base/components/list/listItem';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import PageList from '../../base/components/list/pageList';
import { Animated } from 'react-native';
import { Easing } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

export default class GuitarInfoScreen extends BasePage {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        return {
            headerTitle: "",
            headerRight: <TouchableOpacity style={containerStyles.navRightView} onPress={navigation.state.params ? navigation.state.params.add : null}>
                <Text style={containerStyles.navBtn_text}>收藏</Text>
            </TouchableOpacity>
        }
    }
    public video: Video;
    public work: Work = {
        id: "0001",
        name: "克罗地亚狂想曲",
        zuoqu: "土豪",
        read: 2123
    }
    public state = {
        toolBottom: new Animated.Value(),
        toolShow: false,
        imageWidth: width,
        imageHeight: 1205 * (width / 750),
        rate: 0,
        paused: true

    }
    constructor(props, state) {
        super(props, state);
    }
    componentWillMount() {
        // let url = this.props.MEDIAS_PATHS[0];
        // Image.getSize(url, (imageWidth, imageHeight) => {
        //     if (imageWidth > imageHeight) {
        //         let rate = imageWidth > 170 ? 170 / imageWidth : imageWidth / 170;
        //         imageWidth = imageWidth > 170 ? 170 : imageWidth;
        //         this.setState({
        //             imageWidth: imageWidth,
        //             imageHeight: rate * imageHeight
        //         });
        //     } else {
        //         let rate = imageHeight > 170 ? 170 / imageHeight : imageHeight / 170;
        //         imageHeight = imageHeight > 170 ? 170 : imageHeight;
        //         this.setState({
        //             imageWidth: rate * imageWidth,
        //             imageHeight: imageHeight
        //         });
        //     }
        // }, () => { });
    }
    add() {
        console.log("收藏");
    }
    show() {
        Animated.timing(this.state.toolBottom, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease
        }).start();
        this.setState({
            toolShow: true
        });
    }
    hide() {
        Animated.timing(this.state.toolBottom, {
            toValue: -44,
            duration: 300,
            easing: Easing.ease
        }).start();
        this.setState({
            toolShow: false
        });
    }
    _onPress(id) {
        console.log(id);
    }
    _onLoad() {
        console.log("onLoad");
    }
    loadStart() {
        console.log("loadStart");
    }
    onProgress() {
        console.log("onProgress");
    }
    onEnd() {
        console.log("onEnd");
    }
    videoError() {
        console.log("videoError");
    }
    play() {
        this.setState({
            paused: false
        })
        console.log("play");
    }
    pause() {
        this.setState({
            paused: true
        })
        console.log("pause");
    }
    render() {
        let videoURL = { uri: "http://112.5.254.246/sh.yinyuetai.com/uploads/videos/common/CD0F0163F6E57A6D670B94AA6172A5A1.mp4" };
        let mp3Source = require('../../assets/music/modal.mp3');
        return (<SafeAreaView style={[containerStyles.common]}>
            <ScrollView style={{ flex: 1 }} automaticallyAdjustContentInsets={false}>
                <View style={{ justifyContent: "flex-start" }}>
                    <TouchableWithoutFeedback onLongPress={() => { this.show() }} onPress={() => { this.hide() }}>
                        <Image resizeMode={"contain"} source={require('./../../assets/images/qupu/qupu1.jpg')} style={[styles.img, { width: this.state.imageWidth, height: this.state.imageHeight }]}></Image>
                    </TouchableWithoutFeedback>
                </View>
                <Video
                    ref={(ref: Video) => {
                        this.video = ref
                    }}
                    /* For ExoPlayer */
                    /* source={{ uri: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube?as=fmp4_audio_clear,fmp4_sd_hd_clear&sparams=ip,ipbits,expire,source,id,as&ip=0.0.0.0&ipbits=0&expire=19000000000&signature=51AF5F39AB0CEC3E5497CD9C900EBFEAECCCB5C7.8506521BFC350652163895D4C26DEE124209AA9E&key=ik0', type: 'mpd' }} */
                    source={videoURL}
                    style={styles.musicScreen}
                    rate={1}                          // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                    paused={this.state.paused}
                    volume={1}                   // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                    muted={false}                  // true代表静音，默认为false.
                    resizeMode='cover'       // 视频的自适应伸缩铺放行为，
                    onLoad={() => { this._onLoad() }}                       // 当视频加载完毕时的回调函数
                    onLoadStart={() => { this.loadStart() }}            // 当视频开始加载时的回调函数
                    onProgress={() => { this.onProgress() }}   //  进度控制，每250ms调用一次，以获取视频播放的进度
                    onEnd={() => { this.onEnd() }}             // 当视频播放完毕后的回调函数
                    onError={() => { this.videoError() }}    // 当视频不能加载，或出错后的回调函数
                    // onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    // onAudioFocusChanged={this.onAudioFocusChanged}
                    repeat={false}                            // 是否重复播放
                />
            </ScrollView>
            <Animated.View style={[styles.toolContainer, { bottom: this.state.toolBottom }]}>
                <View style={{ flex: 1 }}></View>
                <View style={styles.btn_View}>
                    <TouchableOpacity onPress={() => { this.play() }}>
                        <Ionicons size={30} name={'ios-musical-notes'} color={'white'}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={styles.btn_View}>
                    <TouchableOpacity onPress={() => { this.pause() }}>
                        <Ionicons size={30} name={'ios-videocam'} color={'white'}></Ionicons>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView >);
    }
}


const styles = StyleSheet.create({
    img: {
        flex: 1,
        width: width
    },
    toolContainer: {
        height: 44,
        paddingRight: 20,
        paddingLeft: 20,
        position: 'absolute',
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    musicScreen: {
        width: width,
        height: 100
    },
    btn_View: {
        width: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    }

})