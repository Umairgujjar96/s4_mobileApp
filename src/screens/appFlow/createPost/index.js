import React, { useState } from "react";
import { Button, GlobalScroll, Loader, MyInput } from "../../../components";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { appIcons, colors, heightPixel, routes, widthPixel } from "../../../services";
import styles from "./style";
import { callApi } from "../../../network/NetworkManger";
import { RedSnackbar, GreenSnackbar } from "../../../services/helpingMethods";
import { api } from "../../../network/Environment";
import DocumentPicker from 'react-native-document-picker';
import { uploadImageOnS3 } from "../../../services/helpingMethods";

const CreatePost = ({ navigation, route }) => {
    const { postData, screenName } = route?.params || {};
    const [loading, setLoading] = useState(false);


    const [imagesArray, setImagesArray] = useState(postData?.media ?? [
        // { type: 'image', url: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        // { type: 'image', url: "https://plus.unsplash.com/premium_photo-1718232331577-204b781ae127?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },

    ]);
    const [selectedIndex, setSelectedIndex] = useState(imagesArray.length - 1);
    const [caption, setCaption] = useState(postData?.caption ?? '');
    const [tags, setTags] = useState(postData?.tags ?? []);
    const [location, setLocation] = useState(postData?.location ?? '');

    const handleRemoveItem = () => {
        if (selectedIndex !== -1) {
            let duplicateArray = [...imagesArray];
            duplicateArray.splice(selectedIndex, 1);
            setImagesArray(duplicateArray);
            setSelectedIndex(-1); // Reset selected index after removal
        } else {
            console.log("No item selected");
        }
    };


    const clearAllFields = () => {
        setCaption('');
        setLocation('');
        setTags('');
    }

    const selectOneFile = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.video],
            });

            console.log('res : ' + JSON.stringify(res));
            setLoading(true)
            const file = {
                path: res[0].uri,
                name: res[0].name,
                type: res[0].type,

            };
            const typePrefix = file.type.split('/')[0];

            uploadImageOnS3(file, (url) => {
                setImagesArray([...imagesArray, { type: typePrefix, url }]);
                setLoading(false)
            });

            console.log("Images are", imagesArray);

        } catch (err) {
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                alert('Canceled from single doc picker');
            } else {
                // For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
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
            <View style={styles.mainView}>

                <TouchableOpacity onPress={() => { selectOneFile() }} style={styles.postPicDiv}>
                    <Image source={appIcons.uploadicon} />
                    <Text style={styles.uploadTextStyles}>
                        Upload media here
                    </Text>
                </TouchableOpacity>
                <View style={styles.selectedMediaView}>
                    <Text style={styles.selectedMediaText}>
                        Selected Media
                    </Text>
                    {imagesArray && imagesArray.length > 0 ? <View style={styles.selectedImagesDiv}>
                        <View style={styles.flatListDiv}>
                            <FlatList
                                horizontal
                                data={imagesArray}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={[
                                        styles.listImagesDiv,
                                        {
                                            borderColor: selectedIndex === index ? 'darkblue' : 'transparent', // Conditional border color
                                            borderWidth: selectedIndex === index ? 2 : 0, // Conditional border width
                                        }
                                    ]} onPress={() => setSelectedIndex((prevIndex) => index)}
                                    >
                                        {/* <Image source={appIcons.close} style={{height:heightPixel(10),width:widthPixel(10)}}/> */}
                                        {item.type === "image" ? <Image source={{ uri: item.url }} style={styles.listImages} /> :
                                            <Image style={styles.listImages} source={{ uri: "https://img.icons8.com/material-rounded/94/video.png" }} alt="video" />}
                                    </TouchableOpacity>
                                )}

                            />
                        </View>
                        {imagesArray && imagesArray.length > 0 ? <TouchableOpacity style={styles.deleteButtonDiv} onPress={handleRemoveItem}>
                            <Image source={appIcons.deleteICon} style={{ height: heightPixel(25), width: widthPixel(25) }} />
                        </TouchableOpacity> : ''}
                    </View> : ''}

                </View>
                <View style={styles.inputDivs}>
                    <MyInput title="Caption" placeHolder="Write a caption here" borderBottom={true} value={caption} setValue={setCaption} />
                    <MyInput title="Tags" placeHolder="Add Tags" borderBottom={true} value={tags} setValue={setTags} />
                    <MyInput title="Location" placeHolder="Add Location" borderBottom={true} value={location} setValue={setLocation} />
                </View>
                <View style={styles.buttonDiv}>
                    <Button children="Next" onPress={() => { navigation.navigate(routes.previewpost, { caption: caption, tags: tags, location: location, imagesArray: imagesArray, screenName: screenName ?? null, postID: postData?._id ?? null }); clearAllFields(); }} />
                </View>
                <Loader loading={loading} />
            </View>
        </GlobalScroll >
    );
}

export default CreatePost;