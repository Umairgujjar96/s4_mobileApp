import React, { useEffect, useState } from "react";
import { View,Text, Image, TouchableOpacity } from "react-native";
import { GlobalScroll ,Button} from "../../../components";
import { appIcons, colors, heightPixel, routes, widthPixel } from "../../../services";
import styles from "./style";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { userData } from "../../../redux/Slices/userSlice";
import { useSelector } from "react-redux";
import { api } from "../../../network/Environment";
import { callApi } from "../../../network/NetworkManger";
import { GreenSnackbar, RedSnackbar } from "../../../services/helpingMethods";


const UserProfileScreen = ({navigation,route})=>{
    const {userName} = route.params;
    const [user,setUser] = useState({
        name:'dummy',
        userName:'dummy_101',
        profileImage:'https://plus.unsplash.com/premium_photo-1666901328734-3c6eb9b6b979?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    });
    
    const dummyPictures = [
        {key:'1',pic:appIcons.pic1},
        {key:'2',pic:appIcons.pic2},
        {key:'3',pic:appIcons.pic3},
        {key:'4',pic:appIcons.pic4},
        {key:'5',pic:appIcons.pic5},
        {key:'6',pic:appIcons.pic6},
        {key:'7',pic:appIcons.pic7},
 
    ];
    const [userInfo,setUserInfo] = useState({});
    const [userPosts,setUserPosts] = useState([]);

    const fetchPersonalProfile =async () =>{
        try{
            const response = await callApi("GET",`${api.personalProfile}/${userName}`,{},
                (res)=>{
                    console.log("unique use response ",res);
                    
                    if(res?.status){
                        setUserInfo({
                            totalPosts: res?.data?.postCount,
                            totalFollowers:res?.data?.userFollowers,
                            totalFollowing:res?.data?.userFollowings,
                        });
                        console.log("before data is: ",res?.data?.posts);
                        
                        let tempData = res?.data?.posts;
                        console.log("sprecial log", tempData[0].media);
                        let tempUserData = res?.data?.user;
                        setUser({
                            name:tempUserData.name,
                            userName:tempUserData.userName,
                            profileImage:tempUserData.profileImage,
                            bio:tempUserData?.bio || '',
                        });
                        setUserPosts(
                           tempData.map((item)=>{
                            let media = item?.media;
                            if(!media){
                                return{
                                    _id: item._id,
                                    media:[],
                                }
                            }
                            else{
                                return {
                                    _id: item._id,
                                    media: media.map((item,index)=>{
                                        if(item.type === 'image'){
                                            return item.url;
                                        }
                                    }),
                                }

                            }
                            
                        })
                    );

                   
                    
                        GreenSnackbar("Data Fetched");
                        
                    }
                    else{
                        RedSnackbar(res?.message);
                    }
                },
                (res)=>{
                    console.log("error occured",res?.message);
                }

            )
        }catch(e){
            console.log("error occured",e);
        }
    }


    const FollowUser =async () =>{
        try{
            const response = callApi("POST",api.follow,{userName:user.userName},
                (res)=>{
                    if(res?.message){
                        GreenSnackbar("Followed Sucessfully");
                    }
                    else{
                        RedSnackbar(res?.messsage);
                    }
                },
                (err)=>{
                    console.log("error occured",err?.message);
                    
                } 
            )
            
        }catch(e){
            console.log("error occured",e);
            
        }
    }

    useEffect(()=>{
        console.log("filtered posts are ",userPosts);
        console.log("first picture", userPosts[0]?.media[0]);
        
        
    },[userPosts])
    
    useEffect(()=>{
        console.log("received unique name is",userName);
        
        fetchPersonalProfile();
    },[])

     

    return(
        <ScrollView>
        <View style={styles.mainDiv}>
            
            {/* <View style={styles.topDiv}>
                <Text style={styles.nameText}> {user.userName ??  "Ahmed Sarfaraz"}</Text>
                <TouchableOpacity onPress={()=>navigation.navigate(routes.setting)}><Image source={appIcons.bread}/></TouchableOpacity>
            </View> */}
            <View style={styles.coverDiv}>
                <Image source={appIcons.backrectangle} style={styles.coverStyle}/>
            </View>
            <View style={styles.followersDiv}>
                <View style={styles.profilePictureDiv}>
                    <Image source={{uri:user.profileImage} ??  appIcons.pic1} style={styles.profilePicture}/>
                </View>
                <View>
                    <Text style={[styles.bold,styles.blackColor,styles.medium]}>
                        {userInfo.totalPosts ?? "19"}
                    </Text>
                    <Text style={[styles.blackColor]}>
                        posts
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate(routes.followers,{selected:'followers',userName:"Ahmed Sarfaraz"})}>
                    <Text style={[styles.bold,styles.blackColor,styles.medium]}>
                        {userInfo.totalFollowers ?? "677"}
                    </Text>
                    <Text style={[styles.blackColor]}>
                        followers
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate(routes.followers,{selected:'following',userName:"Ahmed Sarfaraz"})}>
                    <Text style={[styles.bold,styles.blackColor,styles.medium]}>
                        {userInfo.totalFollowing ?? "261"}
                    </Text>
                    <Text style={[styles.blackColor]}>
                        following
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bioDiv}>
                <Text style={[styles.blackColor]}> {user.name ??  "Ahmed the great"}</Text>
                <Text style={[styles.blackColor]}>{user?.bio ??  "Graphic Designer @@"}</Text>
                {/* <Text style={[styles.blackColor]}>20</Text>
                <Text style={[styles.blackColor]}>No pain no gain</Text> */}
            </View>
            <View style={styles.buttonDiv}>
         <View style={{width:widthPixel(160)}}>
         <Button
            themeColor={colors.themeSecondary}
            children="Follow"
            onPress={()=>FollowUser()}
            bidButton={true}
            containerStyle={{height: heightPixel(40)}}
            
            />
         </View>
         <View style={{width:widthPixel(160)}}>
            <Button 
            themeColor={colors.theme} 
            children="Messages" 
            onPress={()=>console.log("clicked")} 
            bidButton={true}
            containerStyle={{height: heightPixel(40)}}
            />
            </View>
            </View>
            <View style={styles.iconsDiv}>
                <Image source={appIcons.profileicon2} style={styles.iconStyles}/>
                <Image source={appIcons.profileicon1} style={styles.iconStyles}/>
                <Image source={appIcons.savepost} style={styles.iconStyles}/>
            </View>
           <View>
           {userPosts.length > 0 ? <FlatList 
            data={userPosts}
            renderItem={({item,index})=>(
            <TouchableOpacity style={styles.postsDiv} onPress={()=>navigation.navigate(routes.singlepost,{postID:item._id,fetchDataFunction:fetchPersonalProfile})
            }>
                <Image source={item.media[0] ? {uri:item.media[0]}:  appIcons.representtext} style={{height:'100%',width:'100%'}}/>
            </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper} 
            />
            :
            <TouchableOpacity style={styles.createPostView} > 
                <Text style={styles.createFirstText}>No Posts to Show</Text>
            </TouchableOpacity>
         }
           </View>
        </View>
      </ScrollView>
    )
}
export default UserProfileScreen; 