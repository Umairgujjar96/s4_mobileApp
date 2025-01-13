import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { GlobalScroll } from "../../../components";
import { appIcons, heightPixel, routes } from "../../../services";
import { PostComponent } from "../../../components";
import styles from "./style";
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { RedSnackbar,GreenSnackbar } from "../../../services/helpingMethods";

const DashboardScreen = ({ navigation }) => {
  const [posts,setPosts] = useState([]);
  const FetchPosts = async() =>{
    try{
      const response = await callApi('GET',api.getPosts,{},
        (res)=>{
          if(res?.status){
            console.log(res?.data);
            GreenSnackbar("Posts fetch successfully");
            setPosts(res?.data?.posts);
            console.log("posts are :", posts);
            
          }
          else{
            RedSnackbar(res?.message);
          }

        },
        (err)=>{
            RedSnackbar("error occured");
        }
      )
    }catch(e){
      console.log("error occured",e);
    }
  }

  const navigateToPersonalProfile = ()=>{
    navigation.navigate("Profile");
  }

  const navigateToUserProfile = (userName) =>{
    console.log("got use name is ",userName);
    
    navigation.navigate(routes.userProfile,{userName:userName});
  }

  useEffect(()=>{
    FetchPosts();
  },[])



  return (
    <>
    {/* <Image source={{uri:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} style={{height:10}}/> */}
    <View style={styles.topBarStyles}>
      <Image source={appIcons.logoIcon} style={styles.logoStyle} />
          <TouchableOpacity style={styles.notificatioIconView} onPress={()=>navigation.navigate(routes.notification)}>
              <Image source={appIcons.notifIcon}/>
          </TouchableOpacity>
        
      </View>
      <GlobalScroll   
      status={true}
      navigation={navigation}
      globalStyle={{
        paddingTop: heightPixel(1),
        paddingBottom: heightPixel(20),
        justifyContent: "space-between",
      }}
    > 
      <View style={styles.mainDiv}>
        {posts.map((item,index)=>{ 
          return(
            <View style={styles.postView}>
           <PostComponent navigatetoPersonal={navigateToPersonalProfile} navigatetoUser={navigateToUserProfile} navigation={navigation} _id={item?._id} userID={item?.postCreator?._id} uniqueName= {item?.postCreator?.userName} userName={item?.postCreator?.name} profilePicture={item?.postCreator?.profileImage} location={item?.location} description={item?.caption} pictures={item.media === null || !item.media ? false: item.media} time={item?.createdAt} commentsNumber={item?.commentsCount} likes={item?.likesCount} hasLiked={item?.hasLiked}/>
        </View>
          );
        })}
      </View>
    </GlobalScroll>
    
</> 

  ); 
}

export default DashboardScreen;
