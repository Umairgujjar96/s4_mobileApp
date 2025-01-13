import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel,widthPixel } from "../../../services";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { fontFamily } from "../../../services";
const styles = StyleSheet.create({
    scrollDesign:{
        flex:1,
        justifyContent:'center',
        flexGrow: 1,
      },
      otpInputText: {
        color: colors.black,
        fontFamily: fontFamily.appTextSemiBold,
        fontSize: responsiveFontSize(2.0),
      },
      mainDin:{
        flex:1,
        // justifyContent:'center',
        paddingLeft:widthPixel(25),
        paddingRight:widthPixel(25),
        // backgroundImage: appIcons.background,
      },
      timerText: {
        fontSize: responsiveFontSize(3.0),
        letterSpacing: 0.25,
        fontFamily: fontFamily.appTextMedium,
        alignSelf:'center',
      },
      headingDesign:{
        fontSize:fontPixel(25),
        color:colors.black
      },
      inputDiv:{
        flex:0.8,
        marginTop:heightPixel(40),
        
      },
     
      underlineStyleBase: {
        width: widthPixel(50),
        height: heightPixel(48),
        borderColor: colors.inActiveColorOne,
        borderWidth: widthPixel(1),
        borderRadius: widthPixel(10),
        backgroundColor: colors.inActiveBg,
      },
      otpDiv:{
        marginTop:heightPixel(30),
        alignSelf:'center',
        width:widthPixel(250),
        
},
timerDiv:{
    marginTop:heightPixel(70),
    justifySelf: 'center',
    alignSelf:'center',
    justifyContent:'center',

},
timerStyle:{
    fontSize:fontPixel(14),

},
sendAgain:{
    alignSelf:'center',
}


});

export default styles;