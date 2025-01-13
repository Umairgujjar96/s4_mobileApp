import React, { useRef, useState } from "react";
import { View,Text ,StyleSheet,Image, TouchableOpacity,Modal, FlatList} from "react-native";
import { appIcons, colors, fontPixel, heightPixel, routes, widthPixel } from "../../services";
import Video from 'react-native-video';
import { MyInput } from "../myInput";
import Button from "../button";
import { timeAgo } from "../../services/helpingMethods";
import { callApi } from "../../network/NetworkManger";
import { api } from "../../network/Environment";
import { RedSnackbar,GreenSnackbar } from "../../services/helpingMethods";
import { connect, useSelector } from "react-redux";
// import { timeAgo } from "../../services/helpingMethods";

export const PostComponent = ({navigatetoPersonal,navigatetoUser,_id,userID,uniqueName,profilePicture,userName,location,pictures,text,likes,description,commentsNumber,time,hasLiked,personalPost,deleteFunction,editPostFucntion})=>{
    const dummyText = 'sdjfb  vdvjdb dfjsdf sjs sfsd fsdf sdfjs vdfsdf asddjfj ssf fsdjf sdvsdhjss dfs fsdfsbfns fsjhfb'
    const [isLiked,setisLiked] = useState(hasLiked);
    const [showOptions, setShowOptions] = useState(false);
    const user = useSelector((state)=>state.user.userData);
    const [showOptionsButton,setShowOptionButton] = useState(personalPost ? true : false);
    const [enteredComment,setEnteredComment]= useState('');
    console.log("got pictures are" ,pictures);
    

    const [commentModal,setCommentModal] = useState(false);
    // const commentList = [
    //         {id:'1',icon:appIcons.profile,name:"Ahmed Sarfaraz",comment:"sd fbsdsbdnf sbdfh",time:'3 min ago',active:false},
          
    //   ];

    const [commentList,setCommentList] = useState([]);
    const handlePostLike =async () =>{
        console.log("post id",_id);
        
        try{
            setisLiked(!isLiked);
            const response = await callApi("POST",`${api.getPosts}/${_id}/${api.toggleLike}`,{},
                (res)=>{
                    if(res?.status){
                        console.log("toggle liked");
                    }
                    else{
                        console.log("error occured adding like");
                        RedSnackbar(res?.message);
                    }
                },
                (res)=>{
                    console.log("network error",res?.message);
                }
            ); 
        }catch(e){
            console.log("error occured",e);
        }
    }


    const fetchComments =async () =>{
        try{
            console.log("post id is",_id);
            
            const response = await callApi("GET",`${api.comment}/${_id}`,{},
                (res)=>{
                    if(res?.status){
                        console.log("got comments are ",res?.data?.comments);
                        let comments = res?.data?.comments;
                        setCommentList(comments.map((item)=>{
                            return  {
                                id:item?.commentId,
                                icon:item?.author?.profileImage,
                                name:item?.author?.name,
                                comment:item?.content,
                                time:timeAgo(item?.createdAt),
                                hasLiked:item?.hasLiked,
                            }
                        }))
                    }
                    else{
                        RedSnackbar(res?.message);
                    }
                },
                (err)=>{
                    console.log("error occured fetching comments");
                }
            )
        }catch(e){
            console.log("error occured",e);
        }
    }

    const likeAComment =async (id) =>{
        console.log("got id of comment is ",id);
        
        try{
            const response = await callApi("POST",`${api.comment}/${id}/toggleLike`,{},
                (res)=>{
                    if(res?.status){
                        console.log("liked successfully");
                        
                    }
                    else{
                        RedSnackbar("error occured adding like")
                    }
                },
                (err)=>{
                    console.log("error occured liking the comment");
                    
                }
            )
        }catch(e){
            console.log("error occured",e);
        }

    }

    const createAComment = async() =>{
        if(enteredComment === ''){
            RedSnackbar("Please enter a comment");
            return;
        }
        try{
            const response = await callApi("POST",`${api.comment}/${_id}`,{
                content:enteredComment,
            },
                (res)=>{
                    if(res?.status){
                        console.log("comment addded");
                        let tempComment = res?.data?.comment
                        setCommentList([...commentList,{
                            id:tempComment._id,
                            icon:user.profileImage,
                            name:user.name,
                            comment:tempComment?.content,
                            time:timeAgo(tempComment?.createdAt),
                            hasLiked:tempComment?.hasLiked,
                                
                        }]);
                        setEnteredComment('');
                    }
                    else{
                        RedSnackbar(res?.message);
                    }
                },
                (err)=>{
                    console.log("error occured addung comment");
                }
            );
        }catch(e){
            console.log("error occured",e);
        }
    }
   
    const handleEditClick = () => {
       
        setShowOptions(false);
        editPostFucntion();
      };
    
      const handleDeleteClick =async () => {
        setShowOptions(false);
        deleteFunction();
      };


    return(
        <>
        
        <View style={styles.mainDiv}>
            <View style={styles.firstDiv}>
                <TouchableOpacity style={styles.profileImageDiv} onPress={()=>{
                        if(user._id === userID){
                            navigatetoPersonal();
                        }
                        else{
                            navigatetoUser(uniqueName);
                        }
                    
                }
                }>
                    <Image source={profilePicture ? {uri:profilePicture} : appIcons.profile} style={styles.profileImageStyle}/>
                </TouchableOpacity>
                <View style={styles.userSection}>
                    <Text style={styles.userName}>{userName ?? "Ahmed Sarfaraz"} </Text>
                    <Text style={styles.greyTextColor}>
                       {location ??  "Lahore Pakistan"} 
                    </Text>
                </View>
                {showOptionsButton && <TouchableOpacity style={{flexGrow: 1,alignItems:'flex-end',}} onPress={()=>{setShowOptions(true);console.log("I m getting pressed");
                }
                }>
                <Image source={appIcons.info}/>
                </TouchableOpacity>}
               
            </View>
          
            {pictures && 
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={pictures}
                renderItem={({ item }) => (
                    <View style={styles.imageDiv}>
                    {item.type === 'image'  && (<Image source={{uri:item.url}} style={styles.postPic} resizeMode="cover" />)}
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
                keyExtractor={item => item.key}     
            />
           
            }
                {!pictures && <View style={[styles.textDiv,styles.postTextStyle]}>
            <Text style={styles.universalText}>{description ?? dummyText}</Text>
        </View>  

                }
             
            <View style={styles.thirdDiv}>  
                <View style={styles.iconsDiv}>
                   <TouchableOpacity onPress={handlePostLike}>
                   <Image source={isLiked ?  appIcons.filledHeart  : appIcons.like}/>
                    </TouchableOpacity> 
                    <TouchableOpacity onPress={()=>{
                        setCommentModal(!commentModal);
                        fetchComments();
                        }}><Image source={appIcons.comment}/></TouchableOpacity>
                    <Image source={appIcons.sharepost}/>
                </View>
                <View style={styles.saveDiv}>
                    <Image source={appIcons.savepost}/>
                </View>
 
            </View>
            
        </View> 
         { !text &&<View style={styles.detailView}>
            <Text style={styles.universalText}>
                {likes || likes === 0  ?likes + " Likes": "16 Likes" } 
            </Text>
        {pictures &&    <Text style={styles.universalText}>
                {description ? description : "Lorem ipsum dolor sit amet consectetur. Sit non solet   .    bsdf sdbfsd nbsfs sdfbhsd fsdfvshd fsdf shdf sdjh"}
            </Text>}
            <View style={styles.timeandComment}>
                <Text style={styles.greyTextColor}>
                   {time ? timeAgo(time) : "16 hours ago"}  
                </Text>
                <View style={[styles.totalCommentText]}>
                <Text style={styles.greyTextColor}>
                    {commentsNumber || commentsNumber === 0 ? commentsNumber + " Comments" : "3 Comments"}
                </Text>

                </View>
              
            </View>
            

        </View>}

       { commentModal && <Modal
       
        transparent={true}
        visible={commentModal}
        animationType="slide" 
        onRequestClose={() => setCommentModal(false)}
       
      >
<View style={styles.modalMain}>
<TouchableOpacity style={styles.crossDiv} onPress={()=>setCommentModal(!commentModal)}><Image source={appIcons.close}  style={styles.crossIcon}/></TouchableOpacity>
<Text style={styles.commentText}>Comments</Text>
   <View style={styles.commentsFlatListStyles}> 
   <FlatList 
   data={commentList}
   scrollEnabled={true}
   renderItem={({item,index})=>(
    <>
    
    <View style={styles.commentDetailDiv}>
    <TouchableOpacity style={styles.frequentUsersList}>
                        <Image source={item.icon ? {uri:item.icon} :  appIcons.profile} style={styles.profilePicStyle}/>
                        
                    </TouchableOpacity>
                   
                        <View style={styles.commentUserDetail}>
                        <Text style={styles.commentUserName}>{item.name}</Text>
                        <Text style={styles.commentContentStyles}>{item.comment}</Text>
                        <TouchableOpacity><Text>Reply</Text></TouchableOpacity>
                        </View>
                        <Text>{item.time}</Text>
                        <TouchableOpacity style={styles.commentLikes} onPress={()=>likeAComment(item.id)}>
                        <Image source={item.hasLiked ?appIcons.filledHeart : appIcons.like}  style={styles.commentLike}/>
                        </TouchableOpacity>
                        
                        
                   
    </View></>
   )}
   />
   </View>
  <View style={styles.commentInputDiv}>
  <View style={styles.commentInputFieldDiv}>
  <MyInput placeHolder="Comment" border={true} value={enteredComment} setValue={setEnteredComment}/>
  {/* <Text>Hello I am text</Text> */}
  </View>
  <View style={styles.commentButtonDiv}>
  <Button children="Post" bidButton={true} onPress={createAComment}/>
  </View>
  </View>
</View>
      </Modal>
      }

         <Modal
                visible={showOptions}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowOptions(false)}
              >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowOptions(false)}>
                  <View style={styles.optionsMenu}>
                    <TouchableOpacity onPress={handleEditClick} style={styles.optionButton}>
                      <Text style={styles.optionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDeleteClick} style={styles.optionButton}>
                      <Text style={styles.optionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
       
        </>
        
    )
}


const styles = StyleSheet.create({

    mainDiv:{
    flexDirection: 'column',
    // flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.theme,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 7,

    },
    textStyles:{
        color:colors.red,
    },
    firstDiv:{
        flexDirection:'row',
        alignItems:'center',
      padding:heightPixel(15),
    },
    userSection:{
        marginLeft:widthPixel(15),
    },
    userName:{
        fontWeight:'bold',
        color:colors.black
    },
    imageDiv:{
         justifyContent:'center',
        alignItems:'center',
        height:heightPixel(400),
        width:widthPixel(350),
        marginRight:widthPixel(10),
        // backgroundColor:'green'
     
    },
    textDiv:{
        justifyContent:'center',
       alignItems:'center',
    //    height:heightPixel(400),
    //    width:widthPixel(350),
       marginRight:widthPixel(10),
       // backgroundColor:'green'
    
   },
    postPic:{
        height:'100%',
        width:'100%',
        resizeMode:'cover'
    },
    thirdDiv:{
        // backgroundColor:colors.grey,
        flexDirection:'row',
        padding:heightPixel(15),
    },
    iconsDiv:{
        flexDirection:'row',
        gap:widthPixel(15),
    },
    saveDiv:{
        flexGrow:1,
        // backgroundColor:colors.red,
        alignItems:'flex-end',
    },
    postTextStyle:{
        fontSize:fontPixel(14),
        padding:heightPixel(10),
    },
    video:{
        height:heightPixel(380),
        width:widthPixel(300),
    },
    videoCombine:{
        height:'100%',
        width:'100%',
    },
    detailView:{
        padding:heightPixel(10),
        flexDirection:'column',
    },
    timeandComment:{
        flexDirection:'row',
      
    },
    universalText:{
        color:colors.black,
        fontWeight:'bold',
        marginBottom:heightPixel(5),
    },
    
    totalCommentText:{
        flexGrow:1,
       
       alignItems:'flex-end',
    },
    greyTextColor:{
        color:colors.grey,
    },
    crossIcon:{
        height:heightPixel(15),
        width:widthPixel(15),
        
    },
    modalMain:{
       backgroundColor:'rgba(184, 184, 184, 0.9)',
        flex:1,
        marginTop:heightPixel(130),
        marginLeft:widthPixel(10),
        marginRight:heightPixel(10),
        padding:heightPixel(10),
        borderTopLeftRadius: 40,
        borderTopRightRadius:40,
        flexGrow:1,
        paddingBottom:heightPixel(60)
    },
    crossDiv:{
        alignItems:'flex-end',
        margin:heightPixel(10)
        
    },
    commentText:{
        color:colors.black,
        alignSelf:'center',
        fontSize:fontPixel(15),
        fontWeight:'bold',
        marginBottom:heightPixel(20),
    },
    frequentUsersList:{
        // backgroundColor:colors.green,
        marginLeft:widthPixel(10),
        borderRadius:50,
        height:heightPixel(45),
        width:widthPixel(45),
        alignItems:'center',
        justifyContent:'center',
        borderColor:colors.theme,
        borderWidth:8,
        marginTop:heightPixel(6),
    },
    profilePicStyle:{
        height:heightPixel(35),
        width:widthPixel(35),
        borderRadius:50,
        },
        greendotStyle:{position:'absolute',alignSelf:"flex-end",top:heightPixel(40)},
        firendListDiv:{
            flexGrow:1,
            marginTop:heightPixel(20),
            // backgroundColor:colors.red,
            
            // height:hp(60),
            borderTopRightRadius:40,
            borderTopLeftRadius:40,
            padding:heightPixel(15),
            shadowColor:colors.grey,
            shadowOpacity:0.9,
            shadowOffset:{
                height:8,
                width:5
            },
            elevation:6,
            

            
        },
        commentDetailDiv:{
            // flexGrow: 1,
            flexDirection:'row',
            marginBottom:heightPixel(25),
            // height:heightPixel(240),
            
            
        },
        
        
        commentLikes:{
            flexGrow:1,
            
          alignItems:'flex-end',
          padding:heightPixel(4)
        },
        commentLike:{
            height:heightPixel(12),
            width:widthPixel(12),
            marginRight:widthPixel(10)
            
,        },
commentUserDetail:{
    marginLeft:widthPixel(10),
},
commentUserName:{
    color:colors.black,
    fontWeight:'bold',

},
commentContentStyles:{
    marginTop:heightPixel(4),
    color:colors.black
},
commentsFlatListStyles:{
    height:heightPixel(420),
},
commentInputDiv:{
    flexGrow:1,
    backgroundColor:colors.white,
    flexDirection:'row',
    padding:heightPixel(10),
    justifyContent:'center',
    alignItems:'flex-start',
  
},

commentInputFieldDiv:{
    flex:0.75,
    flexDirection:'row',
    justifyItems: 'flex-start',
    
    
},
commentButtonDiv:{
    flex:0.2,
},
profileImageDiv:{
    height:heightPixel(40),
    width:widthPixel(40),
    borderWidth:5,
    borderColor:colors.theme,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
},
profileImageStyle:{
    height:'98%',
    width:'98%',
    borderRadius:50,

},
modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsMenu: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color:colors.black
  },





    

});

