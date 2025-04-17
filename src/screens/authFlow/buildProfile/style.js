import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, hp, widthPixel } from "../../../services";


const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
        justifyContent: 'center',

    },
    profilePicture: {
        //backgroundColor: '#A7A7A7',
        borderRadius: heightPixel(40),
        height: heightPixel(80),
        width: heightPixel(80),
        alignItems: "center",
        borderWidth: 1,
        padding: heightPixel(20),
        justifyContent: 'center',
        elevation: heightPixel(10),
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,

    },
    profileAndText: {
        alignItems: 'center',
    },
    buttonDiv: {
        marginTop: heightPixel(50),
        width: widthPixel(190),
        alignSelf: 'center',
    },
    headingText: {
        fontSize: fontPixel(20),
        fontWeight: 'bold',
        color: colors.black
    },
    subHeading: {
        marginBottom: heightPixel(20),
    },
    addPhoto: {
        marginTop: heightPixel(5),
        color: colors.black,
        fontWeight: 'bold',
    }

});

export default styles;