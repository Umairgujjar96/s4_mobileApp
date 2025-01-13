import { StyleSheet } from "react-native";
import { appIcons, colors, fontPixel, heightPixel, widthPixel} from "../../../services";

const styles = StyleSheet.create({
  mainDin:{
    flex:1,
    // justifyContent:'center',
    paddingLeft:widthPixel(25),
    paddingRight:widthPixel(25),
    // backgroundImage: appIcons.background,
  },

  scrollDesign:{
    // flex:1,
    // justifyContent:'center',
    marginTop:heightPixel(120),
  },
  
  signUpText:{
    color:colors.black,
    fontSize:fontPixel(28),
    // fontWeight:'bold',

  },
  inputDiv:{
    // padding:heightPixel(-20),
    // borderWidth:1,
    // borderRadius:50,
  },
  agreeTermsStyle:{
   flexDirection:'row',
   marginTop:heightPixel(25),
   marginBottom:heightPixel(25),
   gap:widthPixel(8)
  },
  alreadyAccount:{
    color:colors.black,
    fontSize:fontPixel(18),
    
  },
  alreadyAccountDiv:{
    flexDirection:'row',
    justifyContent:'center',
    gap:5,
  },
  termConditionText:{
    color:colors.black,
    fontSize:fontPixel(15),
   },
   alreadyLogin:{
    color:colors.theme,
    textDecorationLine:'underline',

   }
  //  checkBoxStyle:{
  //   height:heightPixel(10),
  //   width:widthPixel(10),
  //  }

});

export default styles;