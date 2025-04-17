import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";

const styles = StyleSheet.create({
    mainDiv: {
        flexDirection: 'column',
        flex: 1
    },
    topBarDiv: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: widthPixel(20),

        // borderBottomWidth:1,
    },
    topMain: {
        paddingVertical: heightPixel(7),
        borderBottomWidth: 0.5,
        borderColor: colors.grey

    },
    profileBorder: {
        height: heightPixel(45),
        width: widthPixel(45),
        borderRadius: 50,
        borderWidth: 5,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        height: heightPixel(38),
        width: widthPixel(38),
        borderRadius: 50,
    },
    userTextDiv: {
        marginLeft: widthPixel(10)
    },
    mediumText: {
        fontSize: fontPixel(14),
    },
    greyColor: {
        color: colors.grey,
    },
    blackColor: {
        color: colors.black
    },
    bold: {
        fontWeight: 'bold',
    },
    rightText: {
        marginTop: heightPixel(10),
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    leftText: {
        marginTop: heightPixel(10),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    messagesTextLeft: {
        backgroundColor: colors.themeSecondary,
        paddingTop: heightPixel(10),
        paddingRight: widthPixel(20),
        paddingLeft: widthPixel(5),
        paddingBottom: heightPixel(10),
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        flex: 0.5,
    },
    messagesTextRight: {
        backgroundColor: colors.theme,
        paddingTop: heightPixel(10),
        paddingLeft: widthPixel(20),
        paddingRight: widthPixel(5),
        paddingBottom: heightPixel(10),
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flex: 0.5,

    },
    messageTextStyle: {
        color: colors.white,
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,

        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        color: colors.black,
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
    },
    sendButton: {
        backgroundColor: colors.theme,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginLeft: 10,
    },
    sendButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },

});

export default styles;