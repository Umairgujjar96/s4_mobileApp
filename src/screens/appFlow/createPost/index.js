import React, { useState } from "react";
import { Button, GlobalScroll, MyInput } from "../../../components";
import { View,Text, Image, TouchableOpacity,FlatList } from "react-native";
import { appIcons, colors, heightPixel, routes, widthPixel } from "../../../services";
import styles from "./style";
import { callApi } from "../../../network/NetworkManger";
import { RedSnackbar,GreenSnackbar } from "../../../services/helpingMethods";
import { api } from "../../../network/Environment";

const CreatePost = ({navigation,route})=>{
    const {postData,screenName} = route?.params || {};
    // console.log("received data is ",postData);
    let selectedIndex = -1;
    
    const [imagesArray,setImagesArray] = useState(postData?.media ?? [
        {type:'image', url:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
        {type:'image',url:"https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
      
    ]);
    const [caption,setCaption] = useState(postData?.caption ?? '');
    const [tags,setTags] = useState(postData?.tags ??  []);
    const [location,setLocation] = useState(postData?.location ?? '');

    const handleRemoveItem =() =>{
        console.log("received index is " ,selectedIndex);
        
    let duplicateArray = [...imagesArray];
    duplicateArray.splice(selectedIndex,1);
    setImagesArray(duplicateArray);

    }

    const clearAllFields = () =>{
        setCaption('');
        setLocation('');
        setTags('');
    }

    return(
        <GlobalScroll
        status={true}
        navigation={navigation}
        globalStyle={{
          paddingTop: heightPixel(1),
          paddingBottom: heightPixel(20),
          justifyContent: "space-between",
        }}
      >
        <View style={styles.mainView}>
            
            <TouchableOpacity style={styles.postPicDiv}>
                <Image source={appIcons.uploadicon} />
                <Text style={styles.uploadTextStyles}>
                    Upload media here
                </Text>
            </TouchableOpacity>
            <View style={styles.selectedMediaView}>
                <Text style= {styles.selectedMediaText}>
                    Selected Media
                </Text>
                <View style={styles.selectedImagesDiv}>
                 <View style={styles.flatListDiv}>
                 <FlatList
                  horizontal
                  data={imagesArray}
                  renderItem={({item,index})=>(
                    <TouchableOpacity style={styles.listImagesDiv} onPress={()=>selectedIndex = index}>
                        {/* <Image source={appIcons.close} style={{height:heightPixel(10),width:widthPixel(10)}}/> */}
                        {item.type === "image" ? <Image source={{uri:item.url}} style={styles.listImages}/> : <Text>Video</Text>}
                    </TouchableOpacity>
                  )}
                 
                  />
                 </View>
                 <TouchableOpacity style={styles.deleteButtonDiv} onPress={handleRemoveItem}>
                    <Image source={appIcons.deleteICon} style={{height:heightPixel(25),width:widthPixel(25)}}/>
                 </TouchableOpacity>
                </View>

            </View>
            <View style={styles.inputDivs}>
                <MyInput title="Caption" placeHolder="Write a caption here" borderBottom={true} value={caption} setValue={setCaption}/>
                <MyInput title="Tags" placeHolder="Add Tags" borderBottom={true} value={tags} setValue={setTags}/>
                <MyInput title="Location" placeHolder="Add Location" borderBottom={true} value={location} setValue={setLocation}/>
            </View>
            <View style={styles.buttonDiv}>
                <Button children="Next" onPress={()=>{navigation.navigate(routes.previewpost,{caption:caption,tags:tags,location:location,imagesArray:imagesArray,screenName:screenName ?? null,postID:postData?._id ?? null});clearAllFields();}}/>
            </View>
           
        </View>
        </GlobalScroll>
    );
}

export default CreatePost;