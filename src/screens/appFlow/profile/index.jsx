import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import { GlobalScroll, Button } from "../../../components";
import { appIcons, colors, heightPixel, routes, widthPixel } from "../../../services";
import styles from "./style";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { userData } from "../../../redux/Slices/userSlice";
import { useSelector } from "react-redux";
import { api } from "../../../network/Environment";
import { callApi } from "../../../network/NetworkManger";
import { GreenSnackbar, RedSnackbar } from "../../../services/helpingMethods";
import { useIsFocused } from "@react-navigation/native";


const ProfileScreen = ({ navigation }) => {

    const user = useSelector((state) => state.user.userData);

    const [userInfo, setUserInfo] = useState({});
    const [userPosts, setUserPosts] = useState([]);

    const fetchPersonalProfile = async () => {
        try {
            const response = await callApi("GET", api.personalProfile, {},
                (res) => {
                    console.log("response ", res);

                    if (res?.status) {
                        setUserInfo({
                            totalPosts: res?.data?.postCount,
                            totalFollowers: res?.data?.userFollowers,
                            totalFollowing: res?.data?.userFollowings,
                        });
                        //tomorrow kren gay.
                        console.log("user info is ", userInfo);
                        let tempData = res?.data?.posts;
                        setUserPosts(tempData.map((item) => {
                            let media = item.media;
                            return {
                                _id: item._id,
                                media: media.map((item, index) => {
                                    if (item.type === 'image') {
                                        return item.url;
                                    }
                                }),
                            }
                        }));
                        //  GreenSnackbar("Data Fetched");

                    }
                    else {
                        RedSnackbar(res?.message);
                    }
                },
                (res) => {
                    console.log("error occured");
                }

            )
        } catch (e) {
            console.log("error occured", e);
        }
    }




    useEffect(() => {



    }, [userPosts])
    const isFocused = useIsFocused()

    useEffect(() => {
        fetchPersonalProfile();
    }, [isFocused])
    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Check out this cool app!', // The text message to share
                url: 'https://www.scroll4.com', // Optional: The URL to share
            });

            if (result.action === Share.sharedAction) {
                console.log('Shared successfully');
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.log('Error sharing', error);
        }
    };


    return (
        <ScrollView>
            <View style={styles.mainDiv}>

                <View style={styles.topDiv}>
                    <Text style={styles.nameText}> {user.userName ?? "User Name"}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.setting)}><Image source={appIcons.bread} /></TouchableOpacity>
                </View>
                <View style={styles.coverDiv}>
                    <Image source={appIcons.backrectangle} style={styles.coverStyle} />
                </View>
                <View style={styles.followersDiv}>
                    <View style={styles.profilePictureDiv}>
                        <Image source={{ uri: user.profileImage } ?? appIcons.pic1} style={styles.profilePicture} />
                    </View>
                    <View>
                        <Text style={[styles.bold, styles.blackColor, styles.medium]}>
                            {userInfo.totalPosts ?? "0"}
                        </Text>
                        <Text style={[styles.blackColor]}>
                            posts
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.followers, { selected: 'followers', userName: user?.userName, followers: userInfo.totalFollowers, followings: userInfo.totalFollowing, otherUserFollowers: false, otherUserFollowings: false })}>
                        <Text style={[styles.bold, styles.blackColor, styles.medium]}>
                            {userInfo.totalFollowers ?? "0"}
                        </Text>
                        <Text style={[styles.blackColor]}>
                            followers
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate(routes.followers, { selected: 'following', userName: user?.userName, followers: userInfo.totalFollowers, followings: userInfo.totalFollowing, otherUserFollowings: false, otherUserFollowers: false, })}>
                        <Text style={[styles.bold, styles.blackColor, styles.medium]}>
                            {userInfo.totalFollowing ?? "0"}
                        </Text>
                        <Text style={[styles.blackColor]}>
                            following
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bioDiv}>
                    <Text style={[styles.blackColor]}> {user.name ?? "Ahmed the great"}</Text>
                    <Text style={[styles.blackColor]}>{user?.bio ?? "Graphic Designer @@"}</Text>
                    {/* <Text style={[styles.blackColor]}>20</Text>
                <Text style={[styles.blackColor]}>No pain no gain</Text> */}
                </View>
                <View style={styles.buttonDiv}>
                    <View style={{ width: widthPixel(160) }}>
                        <Button
                            themeColor={colors.themeSecondary}
                            children="Edit Profile"
                            onPress={() => navigation.navigate(routes.buildProfile, { screenName: "profile" })}
                            bidButton={true}
                            containerStyle={{ height: heightPixel(40) }}

                        />
                    </View>
                    <View style={{ width: widthPixel(160) }}>
                        <Button
                            themeColor={colors.theme}
                            children="Share Profile"
                            onPress={() => handleShare()}
                            bidButton={true}
                            containerStyle={{ height: heightPixel(40) }}
                        />
                    </View>
                </View>
                {/* <View style={styles.iconsDiv}>
                    <Image source={appIcons.profileicon2} style={styles.iconStyles} />
                    <Image source={appIcons.profileicon1} style={styles.iconStyles} />
                    <Image source={appIcons.savepost} style={styles.iconStyles} />
                </View> */}
                <View>
                    {userPosts.length > 0 ? <FlatList
                        data={userPosts}
                        renderItem={({ item, index }) => (
                            !item.media[0] ?
                                <></>
                                :
                                <TouchableOpacity style={styles.postsDiv} onPress={() => navigation.navigate(routes.singlepost, { postID: item._id, fetchDataFunction: fetchPersonalProfile })
                                }>
                                    <Image source={item.media[0] ? { uri: item.media[0] } : appIcons.pic1} style={{ height: '100%', width: '100%' }} />
                                </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.key}
                        numColumns={2}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                        :
                        <TouchableOpacity style={styles.createPostView} onPress={() => navigation.navigate("add")}>
                            <Text style={styles.createFirstText}>Create Your First Post</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </ScrollView>
    )
}
export default ProfileScreen; 