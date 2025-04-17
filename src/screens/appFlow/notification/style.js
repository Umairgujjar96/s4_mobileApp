import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";
import { timeAgo } from "../../../services/helpingMethods";
const styles = StyleSheet.create({
    profilePicStyleList: {
        height: heightPixel(42),
        width: widthPixel(42),
        borderRadius: 50,
    },
    mainNotificationDiv: {
        // flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:colors.green,
        marginBottom: heightPixel(20),
    },
    profilePicNotificationDiv: {
        borderWidth: 5,
        borderColor: colors.theme,
        borderRadius: 50,
        height: heightPixel(50),
        width: widthPixel(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMainDiv: {
        marginLeft: widthPixel(10),
    },
    textSubDiv: {
        flexDirection: 'row',
        gap: widthPixel(7)
    },
    userNameStyes: {
        fontWeight: 'bold',
        color: colors.black,
        fontSize: fontPixel(13)
    },
    userActionStyle: {
        color: colors.black
    },
    timeTextStyle: {

        fontWeight: 'bold',
        color: colors.black,
        fontSize: fontPixel(13)

    },
    postPicStyle: {
        height: heightPixel(50),
        width: widthPixel(50),
        elevation: 15,
        shadowColor: colors.black,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 10,

    },
    postPic: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        elevation: 10,

    },
    postPicMainDiv: {
        // backgroundColor:colors.red,
        flexGrow: 1,
        alignItems: 'flex-end',
        //    backgroundColor: colors.white,
        //    elevation:10,

    },
    notificationMain: {
        margin: heightPixel(15),
        flex: 1
    },
    name: {
        color: colors.black,
        fontSize: fontPixel(16),
        fontWeight: "bold",
        marginBottom: heightPixel(8)
    }
})


export default styles;