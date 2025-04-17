import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";

const styles = StyleSheet.create({
    large: {
        fontSize: fontPixel(18),
    },
    medium: {
        fontSize: fontPixel(16),
    },
    small: {
        fontSize: fontPixel(14),
        color: colors.grey
    },
    bold: {
        fontWeight: 'bold',
    },
    blackColor: {
        color: colors.black,
    },
    greyColor: {
        color: colors.grey,
    },
    useNameStye: {
        marginLeft: widthPixel(10),
        marginTop: heightPixel(10),
    },
    navDiv: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: heightPixel(30),
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        paddingBottom: heightPixel(15)
    },
    listMainView: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,

        margin: heightPixel(10),
        marginLeft: widthPixel(18),
        marginRight: widthPixel(18),
        // backgroundColor:colors.green,
    },
    profilePicDiv: {
        // backgroundColor:colors.green,
        height: heightPixel(50),
        width: widthPixel(50),
        borderRadius: 50,
        borderWidth: 5,
        borderColor: colors.theme,
        justifyContent: 'center',
        alignItems: 'center',

    },
    pictureStyle: {
        height: heightPixel(40),
        width: widthPixel(40),
        borderRadius: 50,

    },
    nameAndSubDiv: {
        justifyContent: 'center',
        marginLeft: widthPixel(10),
    },
    buttonDiv: {
        flexGrow: 1,
        // backgroundColor:colors.red,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    flatListDiv: {
        flexGrow: 1,
        // backgroundColor:colors.green,
        marginBottom: heightPixel(20),
    }


});

export default styles;