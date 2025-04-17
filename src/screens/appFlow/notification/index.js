import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { GlobalScroll, Loader } from "../../../components";
import { appIcons, heightPixel } from "../../../services";
import styles from "./style";
import { useSelector } from "react-redux";
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { RedSnackbar } from "../../../services/helpingMethods";
import { useIsFocused } from "@react-navigation/native";


const NotificationList = ({ profilePic, userName, action, message, time, postPic }) => {
    return (
        <View style={styles.mainNotificationDiv}>
            <View style={styles.profilePicNotificationDiv}>
                <Image source={{ uri: profilePic }} style={styles.profilePicStyleList} />
            </View>
            <View style={styles.textMainDiv}>
                <View style={styles.textSubDiv}>
                    {/* <Text style={styles.userNameStyes}>{userName}</Text> */}
                    <Text style={styles.userNameStyes}>{message}</Text>
                    <Text style={styles.userActionStyle}>{action}</Text>
                </View>
                <Text style={styles.timeTextStyle}>{time}</Text>
            </View>
            <View style={styles.postPicMainDiv}>
                {postPic && <View style={styles.postPicStyle}>
                    <Image source={{ uri: postPic }} style={styles.postPic} />
                </View>}
            </View>

        </View>

    );

}



const NotificationScreen = ({ navigation }) => {
    const user = useSelector((state) => state.user.userData);

    const dummyData = [
        { profilePic: appIcons.profile, userName: "Zafar", action: "commented on post", time: '12 hours ago', postPic: appIcons.pic2 },
        { profilePic: appIcons.profile, userName: "Umair", action: "liked a post", time: '10 hours ago', },
        { profilePic: appIcons.profile, userName: "Huzaifa", action: "commented on post", time: '1 day ago', postPic: appIcons.pic3 },
        { profilePic: appIcons.profile, userName: "Hasmait", action: "commented on post", time: '2 hours ago', },
        { profilePic: appIcons.profile, userName: "Zafar", action: "commented on post", time: '12 hours ago', postPic: appIcons.pic2 },
        { profilePic: appIcons.profile, userName: "Zafar", action: "commented on post", time: '12 hours ago', postPic: appIcons.pic2 },
        { profilePic: appIcons.profile, userName: "Zafar", action: "commented on post", time: '12 hours ago', },
        { profilePic: appIcons.profile, userName: "Umair", action: "liked a post", time: '10 hours ago', postPic: appIcons.pic1 },

    ]

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)
        try {
            console.log("calling api....");
            await callApi("GET", `${api.notification}`, {},
                (res) => {
                    setLoading(false)

                    if (res?.status) {

                        setData(res?.data?.notifications);

                    }
                    else {
                        RedSnackbar(res?.message);
                    }
                }
                ,
                (err) => {
                    console.log("error occured while fetching followers");
                    setLoading(false)
                }
            );
        } catch (e) {
            setLoading(false)
            console.log("error occured", e);
        }
    }
    const isFocused = useIsFocused()
    useEffect(() => {
        getData();
    }, [isFocused])

    const timeDiffernece = (createdAt) => {
        const now = new Date();
        const createdTime = new Date(createdAt);
        const difference = now - createdTime;

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else {
            return `${days} days ago`;
        }

    }

    return (
        <View style={styles.notificationMain}>
            <Text style={styles.name}>{user?.userName}</Text>
            <ScrollView showsVerticalScrollIndicator={false} >

                {data.map((item, index) => {
                    let media = item?.post?.media?.filter((mediaItem) => mediaItem.type === 'image')[0];
                    let time = timeDiffernece(item.createdAt);
                    console.log("Time difference is", item.createdAt);
                    return (
                        <NotificationList profilePic={item?.otherUserProfile.profileImage} message={item?.message} userName={item?.otherUserProfile?.userName} action={item.action} time={time} postPic={media?.url} />
                    );
                })}
            </ScrollView>
            <Loader loading={loading} />
        </View>
    );
}

export default NotificationScreen;