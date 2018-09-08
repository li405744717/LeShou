/**
 * Created by dp-k on 2017/2/22.
 */
import * as React from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableHighlight, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { containerStyles, width, height } from '../../../assets/styles/containerStyles';
interface Props {
    bigImgVisible: boolean,
    modalViewPosition: { left: number, top: number, width: number, height: number },
}
interface State {
    bigImgVisible: boolean
}
export default class AddModal extends React.Component<Props, State> {
    public modalView;
    public left = 0;
    public top = this.props.modalViewPosition.top;
    public width = this.props.modalViewPosition.width;
    constructor(public props: Props, public state: State, public isCheck: boolean) {
        super(props, state);
        this.state = {
            bigImgVisible: this.props.bigImgVisible
        }
        if (this.props.modalViewPosition.left > width / 2) {
            this.left = width - 135 - 10;
        } else {
            this.left = 10;
        }
    }

    showModal(flag) {
        console.log("addModal showModal", flag);
        this.setState({
            bigImgVisible: flag
        })
    }
    render() {
        let viewLeft = this.props.modalViewPosition.left + this.props.modalViewPosition.width / 2 - 135 / 2;
        if (viewLeft + 135 > width) viewLeft = width - 135 - 10;
        if (viewLeft < 0) viewLeft = 10;
        let topLeft = this.props.modalViewPosition.left + this.props.modalViewPosition.width / 2 - 14 / 2;
        let top = this.props.modalViewPosition.top;
        return (
            <Modal transparent={true} visible={this.state.bigImgVisible} animationType={"fade"}>
                <TouchableHighlight style={[containerStyles.common, { backgroundColor: "rgba(0,0,0,0.2)" }]} onPress={() => { this.showModal(false) }}>
                    <View style={{ position: "relative" }}>
                        <View style={[styles.modalView_top, { marginLeft: topLeft, marginTop: top }]}></View>
                        <View style={[styles.modalView, containerStyles.padding, { marginLeft: viewLeft, marginTop: top + 7 }]} ref={(ref) => { this.modalView = ref }}>
                            <TouchableOpacity onPress={() => { console.log("abc") }}>
                                <View style={styles.modalView_item}>
                                    <Image style={styles.iconImg} source={require("./../../../assets/images/chargeDJ.png")} />
                                    <Text>费用登记</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { console.log("abc") }}>
                                <View style={styles.modalView_item}>
                                    <Image style={styles.iconImg} source={require("./../../../assets/images/dingpiao.png")} />
                                    <Text>差旅订票</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { console.log("abc") }}>
                                <View style={styles.modalView_item}>
                                    <Image style={styles.iconImg} source={require("./../../../assets/images/leave.png")} />
                                    <Text>请假申请</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { console.log("abc") }}>
                                <View style={styles.modalView_item}>
                                    <Image style={styles.iconImg} source={require("./../../../assets/images/deviceSQ.png")} />
                                    <Text>设备申请</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { console.log("abc") }}>
                                <View style={styles.modalView_item}>
                                    <Image style={styles.iconImg} source={require("./../../../assets/images/tuijian.png")} />
                                    <Text>内部推荐</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </TouchableHighlight>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    modalView: {
        width: 135,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    modalView_top: {
        width: 14,
        height: 14,
        borderRadius: 3,
        transform: [{ rotate: '45deg' }],
        position: "absolute",
        backgroundColor: "white"
    },
    modalView_item: {
        flexDirection: "row",
        alignItems: "center",
        height: 35
    },
    iconImg: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})