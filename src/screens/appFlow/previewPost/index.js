import React from "react";
import { View,Text, Image, FlatList } from "react-native";
import { Button, GlobalScroll } from "../../../components";
import { appIcons, heightPixel } from "../../../services";
import { PostComponent } from "../../../components";
import styles from "./style";
import { RedSnackbar,GreenSnackbar } from "../../../services/helpingMethods";
import { api } from "../../../network/Environment";
import { callApi } from "../../../network/NetworkManger";
import Video from "react-native-video";

const PreviewPost = ({navigation,route})=>{
    const {caption,tags,location,imagesArray,screenName,postID} = route.params;

    const inputValidation = ()=>{
            if(caption === ''){
                RedSnackbar("Please enter caption");
                return false;
            }
            else{
                return true;
            }
    }
    const createPost =async () =>{
        const status = inputValidation();
        if(!status){
            return;
        }
        try{

            // const mediaArray = imagesArray.map((item,index)=>{return {url:item,type:"image"}}); 
            const payload = {
                media:imagesArray,
                caption:caption,
                tags:tags,
                location:location,
            }
            const apiAddress = screenName === 'edit' ? `${api.getPosts}/${postID}` : api.post;
            const method = screenName === 'edit' ? "PUT" : "POST";
            const response = await callApi(method,apiAddress,payload,
                (res)=>{
                    if(res?.status){
                        console.log("Sucess")
                        GreenSnackbar("Posted Successfuly");
                        navigation.pop();
                    }
                    else{
                        RedSnackbar(res?.message);
                    }
                },
                (err)=>{
                    console.log("error occured");
                }
            ); 
        }catch(e){
            console.log("error occured",e);
        }
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
         <View style={styles.mainDiv}>
           <Text style={styles.headingText}>Preview</Text>
           <View style={styles.secondDiv}>
                <View style={styles.postDiv}>
                    <View style={styles.firstBarView}>
                        <Image source={appIcons.profile} style={styles.profilePicture}/>
                        <View style={styles.useNameDiv}>
                            <Text style={styles.userName}>
                                Ahmed Sarfaraz
                            </Text>
                            <Text>
                                {location ? location : "Lahore,Pakistan"}
                            </Text>
                            
                        </View>
                        {/* <View style={styles.infoDiv}>
                        <Image source={appIcons.info} />
                        </View> */}
                    </View>
                        <FlatList 
                        data={imagesArray}
                        horizontal
                        renderItem={({item,index})=>(
                            <View style={styles.postPicdiv}>
                            {item.type === "image" && <Image source={{uri:item.url}} style={styles.postPic} resizeMode="cover"/>}
                            {item.type === 'video' &&
                  (  <Video
                  
                    source={{ uri: item.url}}
                    style={styles.videoCombine}
                    controls={true} // Show default controls
                    resizeMode="contain"
                    onError={(error) => {
                        console.log('Video Error:', error);
                      }} 
                />)
                    }
                            </View>
                        )}
                        />
                    
                    
                </View>
               
           </View>
           <View style={styles.descriptionDiv}>
                        <Text style={styles.descriptionText}>{caption}</Text>
                    </View>
                    <View style={styles.buttonDiv}>
                        <Button children="Post" onPress={createPost}/>
                    </View>
         </View>
      </GlobalScroll>
       
    );
}

export default PreviewPost;