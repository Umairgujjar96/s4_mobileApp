import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";

const styles = StyleSheet.create({
    mainView:{
        flexDirection:'column',
        // backgroundColor:colors.grey
       
    },
   
    postPicDiv:{
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:heightPixel(20),
        paddingHorizontal:widthPixel(40),
        marginHorizontal:widthPixel(40),
        borderRadius:20,
        elevation:10,
        shadowColor:colors.black,
        shadowOffset:{
            height:5,
            width:5,
        },
        shadowOpacity:1,
        shadowRadius:3.84,

        
    },
    uploadTextStyles:{
        
        marginTop:heightPixel(10),
        fontSize:fontPixel(17),
        fontWeight:'bold',
        color:colors.black,
        // backgroundColor:colors.red
    },
    selectedMediaView:{
        marginTop:heightPixel(20),
    },
    selectedMediaText:{
        color:colors.black,
        fontSize:fontPixel(16),
        fontWeight:'bold',
    },
    selectedImagesDiv:{
        marginTop:heightPixel(10),
        flexDirection:'row',
        // backgroundColor:colors.green,
        paddingVertical:heightPixel(10),
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:colors.grey
    },
    separator:{
        width:widthPixel(10)
    },
    listImages:{height:heightPixel(70),width:widthPixel(70)},
    listImagesDiv:{
        marginRight:widthPixel(7),
    },
    flatListDiv:{
        flex:0.9
    },
    deleteButtonDiv:{
        justifyContent:'center',
        alignItems:'center',
        flex:0.2,
        // backgroundColor:colors.red
    },
    inputDivs:{
        flexGrow:1,
        // backgroundColor:colors.green,
    },
    buttonDiv:{
        marginTop:heightPixel(20),
        marginHorizontal:widthPixel(70),
    }

})

export default styles;