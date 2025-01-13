import { StyleSheet } from "react-native";
import { heightPixel,widthPixel } from "../../../services";


 const styles = StyleSheet.create({
    mainDiv:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    imageDiv:{
        flex:8.5,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonDin:{
      
        flex:1.5,
        width:widthPixel(300),
    }

});

export default styles;