import React from "react";
import { View,Text, Image,FlatList } from "react-native";
import styles from "./style";


const Messages = ({navigation,route})=>{

    const {profileImage,userName}= route.params;
    const messages = [
        {message:"hello how are tou",me:true},
        {message:"I am fine what about you",me:false},
        {message:"I am also fine what is going on",me:true},
        {message:"nothing just study.",me:false},
        {message:"ahhh in which garde and which university",me:true},
        {message:"Comsats university lahore final semester",me:false},
        {message:"oohh nice that is good to hear",me:true},
        
    ]
    return(
        <View style={styles.mainDiv}>
            <View style={styles.topMain}>
            <View style={styles.topBarDiv}>
                <View style={styles.profileBorder}>
                    <Image source={{uri:profileImage}} style={styles.imageStyle}/>
                </View>
                <View style={styles.userTextDiv}>
                    <Text style={[styles.mediumText,styles.blackColor,styles.bold]}>{userName}</Text>
                    <Text style={styles.greyColor}>{userName}</Text>
                </View>
            </View>
            </View>
            <View>

                <FlatList
                data={messages}
                renderItem={({item,index})=>(
                    <View style={[item?.me ?styles.rightText : styles.leftText]}>
                <View style={[item?.me ?styles.messagesTextRight : styles.messagesTextLeft]}>
                    <Text style={styles.messageTextStyle}>{item?.message}</Text>
                </View>
            </View>
                    
                )}

            
                />
            </View>
            
        </View>
    );
}

export default Messages;



            