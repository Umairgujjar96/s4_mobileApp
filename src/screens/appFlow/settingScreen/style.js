import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";

const styles = StyleSheet.create({
    tyleMainDiv:{
        // flex:1,
        flexDirection:'row',
        alignItems:'center',
        margin:heightPixel(15),
    },
    screenNameStyle:{
        color:colors.black,
        fontSize:fontPixel(16),
        // fontWeight:'bold',
    },
    mainIconDiv:{
        // backgroundColor:colors.red,
        flexGrow:1,
        alignItems:'flex-end',
        // height:heightPixel(20),
        // width:heightPixel(20),
    },
    iconPicture:{
        height:heightPixel(20),
        width:widthPixel(20),
    },
    mainScreenStyle:{
        marginLeft:widthPixel(10),
        marginRight:widthPixel(10),
    },
    addAccountDiv:{
        margin:heightPixel(15),
    },
    addAccountText:{
        color:colors.theme,
        fontSize:fontPixel(15)
    }

});

export default styles;