import React from "react";
import { View,Text, Image } from "react-native";
import { GlobalScroll } from "../../../components";
import { appIcons, heightPixel } from "../../../services";
import styles from "./style";


const NotificationList = ({profilePic,userName,action,time,postPic})=>{
    return(
        <View style={styles.mainNotificationDiv}>
            <View style={styles.profilePicNotificationDiv}>
                <Image source={profilePic} style={styles.profilePicStyleList}/>
            </View>
                <View style={styles.textMainDiv}>
                    <View style={styles.textSubDiv}>
                    <Text style={styles.userNameStyes}>{userName}</Text>
                    <Text style={styles.userActionStyle}>{action}</Text>
                    </View>
                    <Text style={styles.timeTextStyle}>{time}</Text>
                </View>
                <View style={styles.postPicMainDiv}>
               { postPic && <View style={styles.postPicStyle}>
                    <Image source={postPic} style={styles.postPic}/>
                </View>}
                </View>
            
        </View>

    );

}



const NotificationScreen = ({navigation})=>{

    const dummyData = [
        {profilePic:appIcons.profile,userName:"Zafar",action:"commented on post",time:'12 hours ago',postPic:appIcons.pic2},
        {profilePic:appIcons.profile,userName:"Umair",action:"liked a post",time:'10 hours ago',},
        {profilePic:appIcons.profile,userName:"Huzaifa",action:"commented on post",time:'1 day ago',postPic:appIcons.pic3},
        {profilePic:appIcons.profile,userName:"Hasmait",action:"commented on post",time:'2 hours ago',},
        {profilePic:appIcons.profile,userName:"Zafar",action:"commented on post",time:'12 hours ago',postPic:appIcons.pic2},
        {profilePic:appIcons.profile,userName:"Zafar",action:"commented on post",time:'12 hours ago',postPic:appIcons.pic2},
        {profilePic:appIcons.profile,userName:"Zafar",action:"commented on post",time:'12 hours ago',},
        {profilePic:appIcons.profile,userName:"Umair",action:"liked a post",time:'10 hours ago',postPic:appIcons.pic1},
  
    ]
    return(
       <View style={styles.notificationMain}>       
        {dummyData.map((item,index)=>{
            return(
                <NotificationList profilePic={item.profilePic} userName={item.userName} action={item.action} time={item.time} postPic={item.postPic}/>
            );
         })}
        </View>


     
       
    );
}

export default NotificationScreen;