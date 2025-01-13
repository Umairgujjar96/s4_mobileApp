import { StyleSheet } from "react-native";
import { widthPixel,heightPixel,fontFamily,fontPixel, colors } from "../../../services";


const styles = StyleSheet.create({
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
  remberMeDiv:{
  
    flexDirection:'row',
    gap:widthPixel(5),
    alignItems:'center',
    flex: 1, 
  },
  
  forgetPassword:{
    color:colors.grey,
    fontSize:fontPixel(15),
    fontStyle:'italic',


    
  },bottomComponent:{
    flexDirection: 'row',
    marginTop:heightPixel(20),
    marginBottom:heightPixel(80),
    alignItems: 'center',
    
  }

});

export default styles;