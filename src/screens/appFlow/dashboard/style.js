import { StyleSheet } from "react-native";
import { colors, heightPixel, widthPixel } from "../../../services";

const styles = StyleSheet.create({
  topBarStyles: {
  
    height: heightPixel(50),
    backgroundColor:colors.white,
    justifyContent:'space-between',
    alignItems: "center",
    padding:heightPixel(8),
    flexDirection:'row',
    shadowColor:colors.theme,
    shadowOffset:{
        width:5,
        height:5,
    },
    shadowOpacity:1,
    shadowRadius:3.84,
    elevation:10,
    borderTopWidth:0.8,
    borderBottomWidth:0.8,
    borderColor:colors.grey,
  },
  mainDiv: {
    flex: 1,
  },
  logoStyle: {
    height: heightPixel(40),
    width: widthPixel(40),
    padding:heightPixel(1),
    resizeMode:'contain'
  },
  notificatioIconView:{
    justifySelf:'center',
    padding:heightPixel(5),
    backgroundColor:colors.white,
    borderRadius:50,
    shadowColor:colors.theme,
    shadowOffset:{
        height:2,
        width:2,
    },
    elevation:5,
    shadowOpacity:0.8,
    shadowRadius:3.84,
    // borderWidth:1,
    borderColor:colors.grey



  },
  postView:{
    marginTop:heightPixel(20),
  }
  
});

export default styles;
