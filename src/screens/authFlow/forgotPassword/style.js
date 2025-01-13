import { StyleSheet } from "react-native";
import { widthPixel,heightPixel,fontPixel,colors } from "../../../services";

const styles = StyleSheet.create({
    top:{
        flex:0.7
    },
    mainDin:{
        flex:1,
        // justifyContent:'center',
        paddingLeft:widthPixel(25),
        paddingRight:widthPixel(25),
        // backgroundImage: appIcons.background,
      },
      loginText:{
        color:colors.black,
        fontSize:fontPixel(28),
      },
    
      scrollDesign:{
        flex:1,
        justifyContent:'center',
        flexGrow: 1,
      },rememberMe:{
        color:colors.black,
        fontSize:fontPixel(15)
      },
      subText:{
        color:colors.grey,
        fontSize:fontPixel(17)
      }
});

export default styles;