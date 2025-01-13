import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, hp, widthPixel } from "../../../services";

const styles = StyleSheet.create({
    mainDiv:{
        flexDirection:'column',
        // alignItems:'center',
        flex:1,
    },
    headigText:{
        alignSelf:'center',
        color:colors.black,
        fontSize:fontPixel(18),
        fontWeight:'bold',
    },
    inputDiv:{
        marginRight:widthPixel(20),
        marginLeft:widthPixel(20),
        alignItems:'center',
        justifyContent:'center',
    },
    frequentDiv:{
        marginTop:heightPixel(15),
        marginLeft:widthPixel(10),
        marginRight:widthPixel(10),
        
    },
    frequentlyStyle:{
        color:colors.black,
        fontSize:fontPixel(16),
        fontWeight:'bold',
        marginBottom:heightPixel(5)
    },
    frequentUsersList:{
        // backgroundColor:colors.green,
        marginLeft:widthPixel(10),
        borderRadius:50,
        height:heightPixel(50),
        width:widthPixel(50),
        alignItems:'center',
        justifyContent:'center',
        borderColor:colors.theme,
        borderWidth:8,
        marginTop:heightPixel(6),
        marginBottom:heightPixel(5)
    },
    friendUsersList:{
        // backgroundColor:colors.green,
        // marginLeft:widthPixel(10),
        borderRadius:50,
        height:heightPixel(40),
        width:widthPixel(40),
        alignItems:'center',
        justifyContent:'center',
        borderColor:colors.theme,
        borderWidth:8,
        marginTop:heightPixel(6),
    },
    profilePicStyleList:{
        height:heightPixel(30),
        width:widthPixel(30),
        borderRadius:50,
        },
    profilePicStyle:{
        height:heightPixel(40),
        width:widthPixel(40),
        borderRadius:50,
        },
        greendotStyle:{position:'absolute',alignSelf:"flex-end",top:heightPixel(25)},
        firendListDiv:{
            flexGrow:1,
            marginTop:heightPixel(10),
            // backgroundColor:colors.red,
            
            // height:hp(60),
            borderTopRightRadius:40,
            borderTopLeftRadius:40,
            padding:heightPixel(15),
            shadowColor:colors.grey,
            shadowOpacity:0.9,
            shadowOffset:{
                height:8,
                width:5
            },
            elevation:6,
            

            
        },
        messageTile:{
            flexDirection:'row',
            flex:1,
            margin:heightPixel(7),
            // height:hp(8),
            // backgroundColor:colors.green

        },
        namesDivStyles:{
            justifyContent:'center',
            marginLeft:widthPixel(10),
        },
        timeDiv:{
            flexGrow:1,
            alignItems:'flex-end',
            justifyContent:'center',
        },
        nameText:{
            fontWeight:'bold',
            fontSize:fontPixel(15),
            color:colors.black
        },
        messageText:{
            marginTop:heightPixel(5),
            color:colors.grey,
        },
        timeText:{
            color:colors.grey,
        },
        flatListView:{
            flex:9,
        }
})

export default styles;