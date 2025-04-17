import React, { useEffect, useState } from "react"
import { View, Text, Modal, TouchableOpacity } from "react-native"
import styles from "./style";
import { Button, PostComponent } from "../../../components";
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { RedSnackbar, GreenSnackbar } from "../../../services/helpingMethods";
import { routes } from "../../../services";
const SinglePostScreen = ({ navigation, route }) => {
    const { postID, fetchDataFunction } = route.params;
    const [postData, setPostData] = useState({});

    const fetchSinglePostData = async () => {
        try {
            const response = await callApi("GET", `${api.getPosts}/${postID}`, {},
                (res) => {
                    if (res?.status) {
                        // console.log("data fetched successfully");
                        setPostData(res?.data?.post);
                    }
                    else {
                        RedSnackbar(res?.message);
                    }
                }
                ,
                (err) => {
                    console.log("error occured");
                }
            );
        } catch (e) {
            console.log("error occured", e);
        }
    }


    const deleteThisPostFunction = async () => {
        const response = await callApi("DELETE", `${api.getPosts}/${postData?._id}`, {},
            (res) => {
                if (res?.status) {
                    console.log("deleted successful");
                    GreenSnackbar("Post deleted Successfully");
                    fetchDataFunction();
                    navigation.pop();
                }
                else {
                    RedSnackbar("error deleting post");
                }
            },
            (err) => {
                console.log("error occured deleting post");
            }

        )
    }

    const EditPostFunction = () => {
        navigation.navigate(routes.createpost, { postData: postData, screenName: 'edit' });
    }



    useEffect(() => {
        console.log("single post data", postData);

    }, [postData])




    useEffect(() => {
        fetchSinglePostData();
    }, [])
    return (
        <>
            {postData !== null || postData ? <View style={styles.mainDiv}>
                <PostComponent _id={postData?._id} userID={postData?.postCreator?._id} userName={postData?.postCreator?.name} profilePicture={postData?.postCreator?.profileImage} location={postData?.location} description={postData?.caption} pictures={postData.media === null || !postData.media ? false : postData.media} time={postData?.createdAt} commentsNumber={postData?.commentsCount} likes={postData?.likesCount} hasLiked={postData?.hasLiked} personalPost={true} deleteFunction={deleteThisPostFunction} editPostFucntion={EditPostFunction} />
            </View>
                :
                <Text>Fetching Data</Text>
            }

        </>
    );
}

export default SinglePostScreen; 