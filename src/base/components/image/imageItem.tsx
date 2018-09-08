import * as React from 'react';
import { width, containerStyles, height } from '../../../assets/styles/containerStyles';
import { View, StyleSheet, TextInput, TouchableWithoutFeedback, Text, TouchableOpacity, Modal, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Work } from '../../../pages/functions/activity/activity-mainScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { CustomCachedImage } from "react-native-img-cache";
import Image from 'react-native-image-progress';
import ProgressCircle from 'react-native-progress/Circle';
interface Props {
    MEDIAS_PATHS: string[],
    ORIGINMEDIAS_PATHS: string[]
    TYPE: string,
    navigation: any,
    style?: any
}
interface State {
    imageWidth: number,
    imageHeight: number,
    imageWidth_origin: number,
    imageHeigh_orign: number,
    bigImgVisible: boolean,
    bigImgIndex: number
}

export default class ImageItem extends React.Component<Props, State> {
    public bigImgScrollView: ScrollView
    constructor(public props: Props, public state, public isCheck: boolean) {
        super(props, state);
        this.state = {
            imageWidth: width,
            imageHeight: 170,
            bigImgVisible: false,
            bigImgIndex: 0
        }
    }
    componentWillMount() {
        let url = this.props.MEDIAS_PATHS[0];
        Image.getSize(url, (imageWidth, imageHeight) => {
            if (imageWidth > imageHeight) {
                let rate = imageWidth > 170 ? 170 / imageWidth : imageWidth / 170;
                imageWidth = imageWidth > 170 ? 170 : imageWidth;
                this.setState({
                    imageWidth: imageWidth,
                    imageHeight: rate * imageHeight
                });
            } else {
                let rate = imageHeight > 170 ? 170 / imageHeight : imageHeight / 170;
                imageHeight = imageHeight > 170 ? 170 : imageHeight;
                this.setState({
                    imageWidth: rate * imageWidth,
                    imageHeight: imageHeight
                });
            }
        }, () => { });
    }
    showBigImage(flag, index?) {
        StatusBar.setHidden(flag);
        this.setState({
            bigImgVisible: flag,
            bigImgIndex: index == null ? this.state.bigImgIndex : index
        })


    }
    renderImage() {
        if (this.props.TYPE == "A" && this.props.MEDIAS_PATHS[0] != "") {
            return <TouchableWithoutFeedback onPress={() => { this.showBigImage(true, 0) }}>
                <CustomCachedImage component={Image} indicator={ProgressCircle} resizeMode={"contain"} source={{ uri: this.props.MEDIAS_PATHS[0] }} style={{ width: this.state.imageWidth, height: this.state.imageHeight, maxHeight: 170 }}></CustomCachedImage>
            </TouchableWithoutFeedback>
        } else if (this.props.MEDIAS_PATHS[0] != "") {
            return this.props.MEDIAS_PATHS.map((value, index) => {
                return <TouchableWithoutFeedback onPress={() => { this.showBigImage(true, index) }} key={"img" + index}>
                    <CustomCachedImage component={Image} indicator={ProgressCircle} resizeMode={"cover"} source={{ uri: this.props.MEDIAS_PATHS[index] }} style={{ width: (width - 100) * 0.3, height: (width - 100) * 0.3, marginBottom: 10, marginRight: 10 }}></CustomCachedImage>
                </TouchableWithoutFeedback>
            })
        } else {
            return null;
        }
    }
    renderBigImage(index) {
        if (this.props.TYPE == "A") {
            return <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
                <View style={{ height: height, justifyContent: "center" }}>
                    <TouchableWithoutFeedback onPress={() => { this.showBigImage(false) }}>
                        <CustomCachedImage component={Image} indicator={ProgressCircle} resizeMode={"contain"} style={{ width: width, flex: 1 }} source={{ uri: this.props.ORIGINMEDIAS_PATHS[0] }}></CustomCachedImage>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        } else if (this.props.TYPE == "B") {
            return <Swiper loop={false} index={index} style={{ backgroundColor: "black" }} loadMinimal={true}>
                {this.props.MEDIAS_PATHS.map((value, index) => {
                    return <ScrollView style={{ flex: 1, backgroundColor: "black" }} key={"bigImg" + index}>
                        <View style={{ height: height, justifyContent: "center" }}>
                            <TouchableWithoutFeedback onPress={() => { this.showBigImage(false) }}>
                                <CustomCachedImage component={Image} indicator={ProgressCircle} resizeMode={"contain"} style={{ width: width, flex: 1 }} source={{ uri: this.props.ORIGINMEDIAS_PATHS[index] }}></CustomCachedImage>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                })
                }
            </Swiper>;
        } else {
            return null;
        }
    }
    render() {
        return (<View>
            <Modal visible={this.state.bigImgVisible} animationType={"fade"}>
                {this.renderBigImage(this.state.bigImgIndex)}
            </Modal>
            <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
                {this.renderImage()}
            </View>
        </View>);
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


