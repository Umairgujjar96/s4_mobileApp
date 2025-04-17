// import React, { useEffect, useState } from "react";
// import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
// import { appIcons, colors, heightPixel, widthPixel } from "../../../services";
// import styles from "./style";
// import { Button } from "../../../components";
// import { callApi } from "../../../network/NetworkManger";
// import { RedSnackbar, GreenSnackbar } from "../../../services/helpingMethods";
// import { api } from "../../../network/Environment";

// const FollowersList = ({ navigation, route }) => {
//     const { selected, userName, followings, followers, otherUserFollowers, otherUserFollowings } = route.params;
//     const [followerButton, setFollowersButtton] = useState(selected === 'followers' ? true : false);
//     const [followingButton, setFollowingButton] = useState(selected === 'followers' ? false : true);
//     const [usersList, setUsersList] = useState([]);





//     const getMyFollowers = async () => {

//         try {
//             let url = '';
//             if (otherUserFollowers && selected === 'followers') {
//                 url = `${api.getFollowers}/${userName}`;

//                 await callApi("GET", url, {},
//                     (res) => {
//                         if (res?.status) {
//                             let tempData = res?.data?.otherUserFollowers;
//                             setUsersList(
//                                 tempData.map((item) => {
//                                     return {

//                                         _id: item?.followerUserData[0]._id,
//                                         profilePic: item?.followerUserData[0].profileImage,
//                                         // status: item?.type,
//                                         name: item?.followerUserData[0].name,
//                                         subHead: item?.followerUserData[0].userName,
//                                     }
//                                 })
//                             );

//                         }
//                         else {
//                             RedSnackbar(res?.message);
//                         }
//                     }
//                     ,
//                     (err) => {
//                         console.log("error occured while fetching followers");

//                     }
//                 );

//             } else if (otherUserFollowings && selected === 'following') {
//                 url = `${api.getFollowings}/${userName}`;

//                 await callApi("GET", url, {},
//                     (res) => {
//                         if (res?.status) {
//                             let tempData = res?.data.otherUserFollowings;
//                             setUsersList(
//                                 tempData.map((item) => {
//                                     return {

//                                         _id: item.followingUserData[0]._id,
//                                         profilePic: item.followingUserData[0].profileImage,
//                                         // status: item?.type,
//                                         name: item.followingUserData[0].name,
//                                         subHead: item.followingUserData[0].userName,
//                                     }
//                                 })
//                             );

//                         }
//                         else {
//                             RedSnackbar(res?.message);
//                         }
//                     }
//                     ,
//                     (err) => {
//                         console.log("error occured while fetching followers");

//                     }
//                 );

//             } else if (selected === 'followers') {
//                 url = api.getFollowers; // Concatenate using template literals

//                 await callApi("GET", url, {},
//                     (res) => {
//                         if (res?.status) {
//                             let tempData = res?.data.followers;
//                             console.log("Temp data is", tempData);
//                             setUsersList(
//                                 tempData.map((item) => {
//                                     return {

//                                         _id: item?.otherUserId?._id || item?.otherUserInfo?._id || item?.followingUserData[0]._id,
//                                         profilePic: item?.otherUserId?.profileImage || item?.otherUserInfo?.profileImage || item?.followingUserData[0].profileImage,
//                                         // status: item?.type,
//                                         name: item?.otherUserId?.name || item?.otherUserInfo.name || item?.followingUserData[0].name,
//                                         subHead: item?.otherUserId?.userName || item?.otherUserInfo.userName || item?.followingUserData[0].userName,
//                                     }
//                                 })
//                             );

//                         }
//                         else {
//                             RedSnackbar(res?.message);
//                         }
//                     }
//                     ,
//                     (err) => {
//                         console.log("error occured while fetching followers");

//                     }
//                 );

//             } else if (selected === 'following') {
//                 url = api.getFollowings; // Concatenate using template literals

//                 await callApi("GET", url, {},
//                     (res) => {
//                         if (res?.status) {
//                             let tempData = res?.data
//                             console.log("Temp data is", tempData);
//                             setUsersList(
//                                 tempData.map((item) => {
//                                     return {

//                                         _id: item.otherUserInfo._id,
//                                         profilePic: item.otherUserInfo?.profileImage,
//                                         // status: item?.type,
//                                         name: item.otherUserInfo.name,
//                                         subHead: item.otherUserInfo.userName,
//                                     }
//                                 })
//                             );

//                         }
//                         else {
//                             RedSnackbar(res?.message);
//                         }
//                     }
//                     ,
//                     (err) => {
//                         console.log("error occured while fetching followers");

//                     }
//                 );
//             } else {
//                 url = '';
//             }


//         } catch (e) {
//             console.log("error occured", e);
//         }
//     }
//     useEffect(() => {
//         getMyFollowers();
//     }, [])
//     return (
//         <View>
//             <Text style={[styles.medium, styles.bold, styles.blackColor, styles.useNameStye]}>{userName}</Text>
//             <View style={styles.navDiv}>
//                 <TouchableOpacity onPress={() => { setFollowersButtton(true); setFollowingButton(false) }}>
//                     <Text style={[styles.small, followerButton && styles.blackColor, followerButton && styles.bold]}>{followers} Followers</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => { setFollowingButton(true); setFollowersButtton(false) }}>
//                     <Text style={[styles.small, followingButton && styles.blackColor, followingButton && styles.bold]}>{followings} Following</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.flatListDiv}>
//                 <FlatList
//                     data={usersList}
//                     renderItem={({ item, index }) => (
//                         <View style={styles.listMainView}>
//                             <View style={styles.profilePicDiv}>
//                                 <Image source={{ uri: item?.profilePic }} style={styles.pictureStyle} />
//                             </View>
//                             <View style={styles.nameAndSubDiv}>
//                                 <Text style={[styles.blackColor, styles.bold]}>{item?.name}</Text>
//                                 <Text>{item?.subHead}</Text>
//                             </View>
//                             <View style={styles.buttonDiv}>
//                                 <Button containerStyle={{ height: heightPixel(30), width: widthPixel(90), marginTop: heightPixel(10) }} bidButton={true} children="Follow" />
//                             </View>
//                         </View>
//                     )}
//                 />
//             </View>
//         </View>
//     );
// }


// export default FollowersList;

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { appIcons, colors, heightPixel, widthPixel } from "../../../services";
import styles from "./style";
import { Button } from "../../../components";
import { callApi } from "../../../network/NetworkManger";
import { RedSnackbar, GreenSnackbar } from "../../../services/helpingMethods";
import { api } from "../../../network/Environment";

const FollowersList = ({ navigation, route }) => {
    const { selected, userName, followings, followers, otherUserFollowers, otherUserFollowings } = route.params;
    const [followersList, setFollowersList] = useState([]);
    const [followingsList, setFollowingsList] = useState([]);
    const [selectedState, setSelectedState] = useState(selected);

    const getFollowersForCurrentUser = async () => {
        const url = api.getFollowers;
        await callApi("GET", url, {}, (res) => {
            if (res?.status) {
                const tempData = res?.data?.followers;
                setFollowersList(
                    tempData.map((item) => {
                        return {
                            _id: item?.otherUserId._id,
                            profilePic: item?.otherUserId.profileImage,
                            name: item?.otherUserId.name,
                            subHead: item?.otherUserId.userName,
                        };
                    })
                );
            } else {
                RedSnackbar(res?.message);
            }
        }, (err) => {
            console.log("Error occurred while fetching followers for current user");
        });
    };

    const getFollowingsForCurrentUser = async () => {
        const url = api.getFollowings;
        await callApi("GET", url, {}, (res) => {
            if (res?.status) {
                const tempData = res?.data;
                setFollowingsList(
                    tempData.map((item) => {
                        return {
                            _id: item?.otherUserInfo._id,
                            profilePic: item?.otherUserInfo?.profileImage,
                            name: item?.otherUserInfo.name,
                            subHead: item?.otherUserInfo.userName,
                        };
                    })
                );
            } else {
                RedSnackbar(res?.message);
            }
        }, (err) => {
            console.log("Error occurred while fetching followings for current user");
        });
    };

    const getFollowersForOtherUser = async () => {
        const url = `${api.getFollowers}/${userName}`;
        await callApi("GET", url, {}, (res) => {
            if (res?.status) {
                const tempData = res?.data?.otherUserFollowers;
                setFollowersList(
                    tempData.map((item) => {
                        return {
                            _id: item?.followerUserData[0]._id,
                            profilePic: item?.followerUserData[0].profileImage,
                            name: item?.followerUserData[0].name,
                            subHead: item?.followerUserData[0].userName,
                        };
                    })
                );
            } else {
                RedSnackbar(res?.message);
            }
        }, (err) => {
            console.log("Error occurred while fetching followers for other user");
        });
    };

    const getFollowingsForOtherUser = async () => {
        const url = `${api.getFollowings}/${userName}`;
        await callApi("GET", url, {}, (res) => {
            if (res?.status) {
                const tempData = res?.data?.otherUserFollowings;
                setFollowingsList(
                    tempData.map((item) => {
                        return {
                            _id: item?.followingUserData[0]._id,
                            profilePic: item?.followingUserData[0].profileImage,
                            name: item?.followingUserData[0].name,
                            subHead: item?.followingUserData[0].userName,
                        };
                    })
                );
            } else {
                RedSnackbar(res?.message);
            }
        }, (err) => {
            console.log("Error occurred while fetching followings for other user");
        });
    };

    const getLists = async () => {
        if (selectedState === 'followers') {
            if (otherUserFollowers) {
                await getFollowersForOtherUser();
            } else {
                await getFollowersForCurrentUser();
            }
        } else if (selectedState === 'following') {
            if (otherUserFollowings) {
                await getFollowingsForOtherUser();
            } else {
                await getFollowingsForCurrentUser();
            }
        }
    };

    useEffect(() => {
        getLists(); // Fetch appropriate list when the component loads or state changes
    }, [selectedState, userName]); // Re-fetch data when the tab or username changes

    return (
        <View>
            <Text style={[styles.medium, styles.bold, styles.blackColor, styles.useNameStye]}>{userName}</Text>
            <View style={styles.navDiv}>
                <TouchableOpacity onPress={() => { setSelectedState("followers"); }}>
                    <Text style={[styles.small, selectedState === 'followers' && styles.blackColor, selectedState === 'followers' && styles.bold]}>
                        {followers} Followers
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSelectedState("following"); }}>
                    <Text style={[styles.small, selectedState === 'following' && styles.blackColor, selectedState === 'following' && styles.bold]}>
                        {followings} Following
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.flatListDiv}>
                {/* Conditional rendering based on the selected tab */}
                {selectedState === 'followers' && (
                    <FlatList
                        data={followersList}
                        renderItem={({ item }) => (
                            <View style={styles.listMainView}>
                                <View style={styles.profilePicDiv}>
                                    <Image source={{ uri: item?.profilePic }} style={styles.pictureStyle} />
                                </View>
                                <View style={styles.nameAndSubDiv}>
                                    <Text style={[styles.blackColor, styles.bold]}>{item?.name}</Text>
                                    <Text>{item?.subHead}</Text>
                                </View>
                                <View style={styles.buttonDiv}>
                                    <Button containerStyle={{ height: heightPixel(30), width: widthPixel(90), marginTop: heightPixel(10) }} bidButton={true} children="Follow" />
                                </View>
                            </View>
                        )}
                    />
                )}
                {selectedState === 'following' && (
                    <FlatList
                        data={followingsList}
                        renderItem={({ item }) => (
                            <View style={styles.listMainView}>
                                <View style={styles.profilePicDiv}>
                                    <Image source={{ uri: item?.profilePic }} style={styles.pictureStyle} />
                                </View>
                                <View style={styles.nameAndSubDiv}>
                                    <Text style={[styles.blackColor, styles.bold]}>{item?.name}</Text>
                                    <Text>{item?.subHead}</Text>
                                </View>
                                <View style={styles.buttonDiv}>
                                    <Button containerStyle={{ height: heightPixel(30), width: widthPixel(90), marginTop: heightPixel(10) }} bidButton={true} children="Follow" />
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
};

export default FollowersList;

