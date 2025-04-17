import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";

const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
        flexDirection: 'column',
    },
    headingText: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: fontPixel(16),
        alignSelf: 'center',
        marginBottom: heightPixel(10),
    },
    firstBarView: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:colors.green,
        padding: heightPixel(5)
    },
    userName: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: fontPixel(14),
    },
    useNameDiv: {
        marginLeft: widthPixel(14),
    },
    profilePicture: {
        height: heightPixel(34),
        borderRadius: heightPixel(17),
        width: heightPixel(34),
    },
    infoDiv: {
        flexGrow: 1,
        alignItems: 'flex-end',
    },
    postDiv: {
        margin: heightPixel(10),
        marginTop: heightPixel(20),
        marginBottom: heightPixel(20),
        backgroundColor: colors.white,
        padding: heightPixel(15),
        elevation: 10,
        borderRadius: 15,
    },
    postPicdiv: {
        marginTop: heightPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPixel(290),
        width: widthPixel(270),
        marginRight: widthPixel(5),
        // backgroundColor:colors.red
    },
    secondDiv: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.grey
    },
    descriptionDiv: {
        marginTop: heightPixel(15),
    },
    descriptionText: {
        color: colors.black,
        fontSize: fontPixel(14),
    },
    buttonDiv: {
        marginTop: heightPixel(20),
        marginHorizontal: widthPixel(70),
    },
    postPic: {
        height: '100%',
        width: '100%',
    },
    videoCombine: {
        height: '100%',
        width: '100%',
    },


})

export default styles;