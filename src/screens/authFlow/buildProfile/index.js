import React, { useState } from "react";
import { View,Text,Image,TouchableOpacity } from "react-native";
import styles from "./style";
import { Button, GlobalScroll, MyInput } from "../../../components";
import { appIcons, colors, heightPixel,routes,widthPixel } from "../../../services";
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { store } from "../../../redux/store";
import { userData } from "../../../redux/Slices/userSlice";
import { RedSnackbar } from "../../../services/helpingMethods";
import { useSelector } from "react-redux";


const BuildProfile = ({navigation,route})=>{
  const {screenName} = route.params;
  const userProfileData = useSelector((state)=>state.user);
  console.log("user data is ");
  console.log(userProfileData?.userData?.name);
  
  
  const [name,setName]= useState(userProfileData?.userData?.name ?? '');
  const [userName,setUserName] = useState(userProfileData?.userData?.userName ?? '');
  const [bio,setBio] = useState( userProfileData?.userData?.bio ?? '');
  const [links,setLinks]= useState(userProfileData?.userData?.links ??  []);
  // let userChange = false;

  const inputValidation = () =>{
    if(name === ''){
      RedSnackbar("Please enter the name");
      return false
    }
    else if(userName === ''){
      RedSnackbar("Please enter user name");
      return false;
    }
    else if(bio === ''){
      RedSnackbar("Please enter bio");
      return false;
    }
    return true;
  }



  const BuildProfileButton = async()=>{
    const status = inputValidation();
    if(!status){
      return;
    }
    try{
      const endPoint = api.updateProfile;
      
      const payload = {
        name:name,
        profileImage:"https://www.hocalwire.com/h-upload/uid/UrqcwKUWdSIBFwKspwg7hiPlTyX5TAoB7033284.jpg",
        links:links,
        bio:bio
      }
      if(userName !== userProfileData?.userData?.userName){
        console.log("I am inside userName" ,userName);
        
        payload.userName = userName;
      }

      const response = await callApi("PUT",endPoint,payload,
        (res)=>{
          if(res?.status){
            console.log("successfull");
            console.log(res);
            store.dispatch(userData(res?.data?.user));
           if(screenName === 'otp'){
            navigation.navigate(routes.drawer);
           }
           else{
            navigation.pop();
           }
            
          }
          else{
            RedSnackbar(res?.message);
          }
        },
        (err)=>{
          console.log("error occured",err);
        }
      )
    }catch(e){
      console.log("error occured",e);

    }
  }

  
    return(
        <GlobalScroll
      status={true}
    //   ref={statusBar}
      navigation={navigation}
    //   isBack={true}
    //   isLoading={isLoading}
    //   headerTitle={route.params?.title ? route.params?.title : "Add Member"}
      
      globalStyle={{
        paddingTop: heightPixel(1),
        paddingBottom: heightPixel(20),
        justifyContent: "space-between",
      }}
    >
        <View style={styles.mainDiv}>
            <View style={styles.profileAndText}>
            <Text style={styles.headingText}> {screenName === 'otp' ? 'Complete Your Profile' : 'Edit Your Profile'}</Text>
            <Text style={styles.subHeading}>Give Us Some Info</Text>
            <TouchableOpacity style={styles.profilePicture}>
                <Image source={appIcons.profile} />
            </TouchableOpacity>
            <Text style={styles.addPhoto}>
            Add profile photo
            </Text>

            </View>
            
           
              <MyInput border={true} placeHolder="Your Name" value={name} setValue={setName} title="Name"/>
           
           
              <MyInput border={true} placeHolder="user_name" value={userName} setValue={setUserName} title="User Name"/>
            
            <MyInput border={true} placeHolder="Your bio here ...." value={bio} setValue={setBio} title="Bio" multiline={true} numberOfLines={2}/>
             
           
              <MyInput border={true} placeHolder="www.facebook.com,www----" value={links} setValue={setLinks} title="Links"/>
           
            <View style={styles.buttonDiv}>
            <Button themeColor={colors.theme} children="Done" onPress={BuildProfileButton}/>
            </View>
            

        </View>
    </GlobalScroll>
    )

}

export default BuildProfile;