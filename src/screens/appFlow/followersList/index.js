import React, { useEffect, useState } from "react";
import { View,Text, TouchableOpacity,FlatList, Image } from "react-native";
import { appIcons, colors, heightPixel, widthPixel } from "../../../services";
import styles from "./style";
import { Button } from "../../../components";
import { callApi } from "../../../network/NetworkManger";
import { RedSnackbar,GreenSnackbar } from "../../../services/helpingMethods";
import { api } from "../../../network/Environment";

const FollowersList = ({navigation,route})=>{
    const {selected,userName} = route.params;
    const [followerButton,setFollowersButtton] = useState(selected === 'followers' ? true : false);
    const [followingButton,setFollowingButton] = useState(selected === 'followers' ? false : true);
    const [usersList,setUsersList] = useState([]);
    // const dummyData = [
    //     {profilePic:appIcons.profile,status:'follower',name:"Umair Mehmood",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'follower',name:"Kashif Mehmood",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'following',name:"Uzair Mehmood",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'follower',name:"Huzaifa Irhsad",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'following',name:"John Tommy",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'follower',name:"Umair Mehmood",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'follower',name:"Kashif Mehmood",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'following',name:"Uzair Mehmood",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'follower',name:"Huzaifa Irhsad",subHead:"hello_umair"},
    //     {profilePic:appIcons.profile,status:'following',name:"John Tommy",subHead:"hello_umair"},
    // ];
    const getMyFollowers = async() =>{
        try{
            const response = await callApi("GET",`${api.follow}/${api.getFollowers}`,{},
                (res)=>{ 
                    if(res?.status){
                        console.log("get followers success");
                        let tempData = res?.data?.followers;
                        setUsersList(
                            tempData.map((item)=>{
                                return{
                                    _id:item?.otherUserId?._id,
                                    profilePic:item?.otherUserId?.profileImage,
                                    status:item?.type,
                                    name:item?.otherUserId?.name,
                                    subHead:item?.otherUserId?.userName,
                                }
                            })
                        );
                        
                    }
                    else{
                        RedSnackbar(res?.message);
                    }
                }
                ,
                (err)=>{
                    console.log("error occured while fetching followers");
                    
                }
            );
        }catch(e){
            console.log("error occured",e);
        }
    }
    useEffect(()=>{
        getMyFollowers();
    },[])
    return(
        <View>
            <Text style={[styles.medium,styles.bold,styles.blackColor,styles.useNameStye]}>{userName}</Text>
            <View style={styles.navDiv}>
            <TouchableOpacity onPress={()=>{setFollowersButtton(true);setFollowingButton(false)}}>
                <Text style={[styles.small,followerButton &&  styles.blackColor,followerButton && styles.bold]}>10 Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{setFollowingButton(true);setFollowersButtton(false)}}>
                <Text style={[styles.small ,followingButton &&  styles.blackColor,followingButton && styles.bold]}>20 Following</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.flatListDiv}>
            <FlatList
            data={usersList}
            renderItem={({item,index})=>(
                <View style={styles.listMainView}>
                    <View style={styles.profilePicDiv}>
                    <Image source={{uri: item?.profilePic}} style={styles.pictureStyle}/>
                    </View>
                    <View style={styles.nameAndSubDiv}>
                        <Text style={[styles.blackColor,styles.bold]}>{item?.name}</Text>
                        <Text>{item?.subHead}</Text>
                    </View>
                  <View style={styles.buttonDiv}>
                  <Button containerStyle={{height: heightPixel(30),width: widthPixel(90),marginTop: heightPixel(10)}} bidButton={true} children="Follow"/>
                  </View>
                </View>
            )}
            />
            </View>
        </View>
    );
}


export default FollowersList;