import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";


const styles = StyleSheet.create({
    mainDiv:{
        flexDirection:'column',
    },
    topDiv:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:widthPixel(15),
        marginBottom:heightPixel(10),
    },
    nameText:{
        color:colors.black,
        fontWeight:'bold',
        fontSize:fontPixel(15),
    },
    profilePictureDiv:{
        // backgroundColor:colors.green,
        height:heightPixel(60),
        width:widthPixel(60),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        borderWidth:7,
        borderColor:colors.theme,
        marginTop:heightPixel(-39),
    },
    profilePicture:{
        height:heightPixel(50),
        width:widthPixel(50),
        borderRadius:50,
    },
    followersDiv:{
        marginTop:heightPixel(10),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:widthPixel(15)
    },
    bold:{
        fontWeight:'bold',

    },
    blackColor:{
        color:colors.black
    },
    medium:{
        fontSize:fontPixel(15),
    },
    bioDiv:{
        marginTop:heightPixel(10),
        marginHorizontal:widthPixel(15),
    },
    buttonDiv:{
        flexDirection:'row',
        marginTop:heightPixel(15),
        justifyContent:'space-between',
        alignItems:'center',
        // gap:widthPixel(16) 
        marginHorizontal:widthPixel(15),
    },
    buttonDivs:{
        width:widthPixel(190),
    },
    iconsDiv:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:widthPixel(20),
        marginRight:widthPixel(20),
        position: 'sticky',
        top: 0,
    },
    postsDiv:{
       marginTop:heightPixel(10),
       flexShrink:1,
       height:210,
       width:210,
        
    },
    columnWrapper: {
        justifyContent:"space-evenly", // Ensures equal space between columns
      },
      coverDiv:{
        // backgroundColor:colors.theme
        
      },
      coverStyle:{
        width:'100%'
      },
      createFirstText:{
        color:colors.black,
        fontSize:fontPixel(14),
      },
      createFirstText:{
        color:colors.theme,
        fontSize:fontPixel(14),
      },
      createPostView:{
        marginTop:heightPixel(40),
        justifyContent:'center',
        alignItems:'center',
      }
});

export default styles;