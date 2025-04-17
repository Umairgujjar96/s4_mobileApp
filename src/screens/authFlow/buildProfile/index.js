import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform, PermissionsAndroid } from "react-native";
import styles from "./style";
import { Button, GlobalScroll, Loader, MyInput } from "../../../components";
import { appIcons, colors, heightPixel, routes } from "../../../services";
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { store } from "../../../redux/store";

import { useDispatch, useSelector } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import { RedSnackbar, uploadImageOnS3 } from "../../../services/helpingMethods";
import { userData } from "../../../redux/Slices/userSlice";


const BuildProfile = ({ navigation, route }) => {
  const { screenName } = route.params;
  const userProfileData = useSelector((state) => state.user);
  console.log("USER", userProfileData)


  const [name, setName] = useState(userProfileData?.userData?.name ?? '');
  const [userName, setUserName] = useState(userProfileData?.userData?.userName ?? '');
  const [bio, setBio] = useState(userProfileData?.userData?.bio ?? '');
  const [links, setLinks] = useState(userProfileData?.userData?.links ?? []);
  const [userImage, setUserImage] = useState(userProfileData?.userData?.profileImage ?? '');
  const [loading, setLoading] = useState(false)
  // let userChange = false;

  const inputValidation = () => {
    if (name === '') {
      RedSnackbar("Please enter the name");
      return false
    }
    else if (userName === '') {
      RedSnackbar("Please enter user name");
      return false;
    }
    else if (bio === '') {
      RedSnackbar("Please enter bio");
      return false;
    }
    return true;
  }



  const BuildProfileButton = async () => {
    const status = inputValidation();
    if (!status) {
      return;
    }
    setLoading(true)
    try {
      const endPoint = api.updateProfile;

      const payload = {
        name: name,
        profileImage: userImage ? userImage : "https://www.hocalwire.com/h-upload/uid/UrqcwKUWdSIBFwKspwg7hiPlTyX5TAoB7033284.jpg",
        links: links,
        bio: bio
      }
      if (userName !== userProfileData?.userData?.userName) {
        console.log("I am inside userName", userName);

        payload.userName = userName;
      }

      const response = await callApi("PUT", endPoint, payload,
        (res) => {
          if (res?.status) {
            console.log("successfull");
            console.log(res);
            store.dispatch(userData(res?.data?.user));
            if (screenName === 'otp') {
              navigation.navigate(routes.drawer);
            }
            else {
              navigation.pop();
            }

          }
          else {
            RedSnackbar(res?.message);

          }
          setLoading(false);
        },
        (err) => {
          console.log("error occured", err);
          setLoading(false);
        }
      )
    } catch (e) {
      console.log("error occured", e);
      setLoading(false);
    }
  }





  const pickProfileImage = async () => {
    // For Android, we explicitly request the permissions
    if (Platform.OS === "android") {
      try {
        // Request Camera permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "We need access to your camera to take photos",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          RedSnackbar("Camera permission denied!");
          return;
        }

        // Request Storage permission (for picking images from gallery)
        const storageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "We need access to your storage to select images",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (storageGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          RedSnackbar("Storage permission denied!");
          return;
        }
      } catch (err) {
        console.warn(err);
        RedSnackbar("Failed to request permission");
        return;
      }
    }

    // Use react-native-image-crop-picker to open the image picker
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(async (image) => {

        // Upload image to S3
        await uploadImageOnS3(image, (imageUrl) => {

          // Update the profile picture in state or redux store
          setUserImage(imageUrl);
          // BuildProfileButton(imageUrl)
        });
      })
      .catch((error) => {
        console.log("Error picking image:", error);
        RedSnackbar("Image selection failed");
      });
  };




  return (
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
        <View style={styles.profileAndText}>
          <Text style={styles.headingText}> {screenName === 'otp' ? 'Complete Your Profile' : 'Edit Your Profile'}</Text>
          <Text style={styles.subHeading}>Give Us Some Info</Text>
          <TouchableOpacity onPress={() => { pickProfileImage() }} style={styles.profilePicture}>
            <Image style={{ height: heightPixel(70), width: heightPixel(70), borderRadius: heightPixel(35) }} source={userImage ? { uri: userImage } : appIcons.profile} />
          </TouchableOpacity>
          <Text style={styles.addPhoto}>
            Add profile photo
          </Text>

        </View>


        <MyInput border={true} placeHolder="Your Name" value={name} setValue={setName} title="Name" />


        <MyInput border={true} placeHolder="user_name" value={userName} setValue={setUserName} title="User Name" />

        <MyInput border={true} placeHolder="Your bio here ...." value={bio} setValue={setBio} title="Bio" multiline={true} numberOfLines={2} />


        <MyInput border={true} placeHolder="www.facebook.com,www----" value={links} setValue={setLinks} title="Links" />

        <View style={styles.buttonDiv}>
          <Button themeColor={colors.theme} children="Done" onPress={BuildProfileButton} />
        </View>

        <Loader loading={loading} />
      </View>
    </GlobalScroll>
  )

}

export default BuildProfile;