import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Pressable,
  Animated,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  //   KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  appIcons,
  colors,
  fontPixel,
  heightPixel,
  hp,
  widthPixel,
  wp,
} from "../../services";
import Video from "react-native-video";
import { MyInput } from "../myInput";
import Button from "../button";
import { GreenSnackbar, timeAgo } from "../../services/helpingMethods";
import { callApi } from "../../network/NetworkManger";
import { api } from "../../network/Environment";
import { RedSnackbar } from "../../services/helpingMethods";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../redux/Slices/userSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import ImageViewer from "react-native-image-zoom-viewer";
// import playIcons from "../../assets/icons/playIcon.PNG";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export const PostComponent = ({
  navigatetoPersonal,
  navigatetoUser,
  _id,
  userID,
  uniqueName,
  profilePicture,
  userName,
  location,
  pictures,
  text,
  likes,
  description,
  commentsNumber,
  time,
  hasLiked,
  personalPost,
  deleteFunction,
  editPostFucntion,
}) => {
  const [isLiked, setisLiked] = useState(hasLiked);
  const [showOptions, setShowOptions] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const [showOptionsButton, setShowOptionButton] = useState(
    personalPost ? true : false
  );
  const [enteredComment, setEnteredComment] = useState("");
  const [userBalance, setUserBalance] = useState(user.balance);
  const dispatch = useDispatch();

  const [commentModal, setCommentModal] = useState(false);
  const [commentList, setCommentList] = useState([]);

  // New state for full-screen media viewing
  const [fullScreenModal, setFullScreenModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const mediaFlatListRef = useRef(null);
  const fullScreenFlatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Animation values
  const scrollX = useRef(new Animated.Value(0)).current;
  const fullScreenScrollX = useRef(new Animated.Value(0)).current;

  const handlePostLike = async () => {
    try {
      setisLiked(!isLiked);
      const response = await callApi(
        "POST",
        `${api.getPosts}/${_id}/${api.toggleLike}`,
        {},
        (res) => {
          if (res?.status) {
            console.log("toggle liked");
          } else {
            console.log("error occured adding like");
            RedSnackbar(res?.message);
          }
        },
        (res) => {
          console.log("network error", res?.message);
        }
      );
    } catch (e) {
      console.log("error occured", e);
    }
  };

  const fetchComments = async () => {
    try {
      console.log("post id is", _id);

      const response = await callApi(
        "GET",
        `${api.comment}/${_id}`,
        {},
        (res) => {
          if (res?.status) {
            console.log("got comments are ", res?.data?.comments);
            let comments = res?.data?.comments;
            setCommentList(
              comments.map((item) => {
                return {
                  id: item?.commentId,
                  icon: item?.author?.profileImage,
                  name: item?.author?.name,
                  comment: item?.content,
                  time: timeAgo(item?.createdAt),
                  hasLiked: item?.hasLiked,
                };
              })
            );
          } else {
            RedSnackbar(res?.message);
          }
        },
        (err) => {
          console.log("error occured fetching comments");
        }
      );
    } catch (e) {
      console.log("error occured", e);
    }
  };

  const likeAComment = async (id) => {
    console.log("got id of comment is ", id);

    try {
      const response = await callApi(
        "POST",
        `${api.comment}/${id}/toggleLike`,
        {},
        (res) => {
          if (res?.status) {
            console.log("liked successfully");
          } else {
            RedSnackbar("error occured adding like");
          }
        },
        (err) => {
          console.log("error occured liking the comment");
        }
      );
    } catch (e) {
      console.log("error occured", e);
    }
  };

  const createAComment = async () => {
    if (enteredComment === "") {
      RedSnackbar("Please enter a comment");
      return;
    }
    try {
      const response = await callApi(
        "POST",
        `${api.comment}/${_id}`,
        {
          content: enteredComment,
        },
        (res) => {
          if (res?.status) {
            console.log("comment addded");
            let tempComment = res?.data?.comment;
            setCommentList([
              ...commentList,
              {
                id: tempComment._id,
                icon: user.profileImage,
                name: user.name,
                comment: tempComment?.content,
                time: timeAgo(tempComment?.createdAt),
                hasLiked: tempComment?.hasLiked,
              },
            ]);
            setEnteredComment("");
          } else {
            RedSnackbar(res?.message);
          }
        },
        (err) => {
          console.log("error occured addung comment");
        }
      );
    } catch (e) {
      console.log("error occured", e);
    }
  };

  const handleEditClick = () => {
    setShowOptions(false);
    editPostFucntion();
  };

  const handleDeleteClick = async () => {
    setShowOptions(false);
    deleteFunction();
  };

  const [tokensVisible, setTokensVisible] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [countValue, setCountValue] = useState(0);

  const onSendToken = () => {
    if (!selectedToken) {
      return RedSnackbar("Please select a token type!");
    }
    if (countValue <= 0) {
      return RedSnackbar("Please enter a valid token count!");
    }
    if (selectedToken?.quantity <= 0 || countValue > selectedToken?.quantity) {
      return RedSnackbar("You dont have sufficient tokens!");
    }

    console.log(selectedToken);
    sendTokenApi(selectedToken);
  };

  const sendTokenApi = async (details) => {
    setTokensVisible(false);
    let obj = {
      type: details?.type,
      quantity: countValue,
    };
    console.log(obj);
    try {
      console.log("calling api....");
      await callApi(
        "POST",
        `${api.tokenSend}/${userID}`,
        obj,
        (res) => {
          if (res?.status) {
            GreenSnackbar(res?.message);
            dispatch(userData(res?.data?.updatedProfile));
          } else {
            RedSnackbar(res?.message);
          }
        },
        (err) => {
          console.log("error occured", err);
        }
      );
    } catch (e) {
      console.log("error occured", e);
    }
    setCountValue(0);
  };

  // Handle media item click to open full screen modal
  const handleMediaClick = (index) => {
    setActiveIndex(index);
    setFullScreenModal(true);
    // Ensure the full screen carousel starts at the right position
    setTimeout(() => {
      fullScreenFlatListRef.current?.scrollToIndex({
        index,
        animated: false,
      });
    }, 100);
  };

  // Pagination dots for media carousel
  const renderPaginationDots = () => {
    if (!pictures || pictures.length <= 1) return null;

    const total = pictures.length;
    const visibleDots = 7;

    const currentIndex = Math.round(scrollX._value / widthPixel(350));

    let start = 0;
    let end = visibleDots;

    if (total > visibleDots) {
      if (currentIndex <= 3) {
        start = 0;
        end = visibleDots;
      } else if (currentIndex >= total - 4) {
        start = total - visibleDots;
        end = total;
      } else {
        start = currentIndex - 3;
        end = currentIndex + 4;
      }
    } else {
      end = total;
    }

    const visibleItems = pictures.slice(start, end);

    return (
      <View style={styles.paginationContainer}>
        {visibleItems.map((_, index) => {
          const actualIndex = start + index;
          const isActive = actualIndex === currentIndex;

          return (
            <View
              key={actualIndex}
              style={[styles.paginationDot, isActive && styles.activeDot]}
            />
          );
        })}
      </View>
    );
  };

  // Pagination dots for full screen media carousel
  const renderFullScreenPaginationDots = () => {
    if (!pictures || pictures.length <= 1) return null;

    const currentIndex = Math.round(fullScreenScrollX._value / SCREEN_WIDTH); // assuming scrollX is Animated.Value

    return (
      <View style={styles.fullScreenPaginationContainer}>
        {pictures.map((_, index) => {
          if (Math.abs(index - currentIndex) > 3) return null; // skip dots outside range

          const inputRange = [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ];

          const dotScaleX = fullScreenScrollX.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: "clamp",
          });

          const opacity = fullScreenScrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.fullScreenPaginationDot,
                {
                  opacity,
                  transform: [{ scaleX: dotScaleX }],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderMedia = (item, index, fullScreen = false) => {
    const containerStyle = fullScreen
      ? styles.fullScreenImageContainer
      : styles.imageDiv;

    const imageStyle = fullScreen ? styles.fullScreenImage : styles.postPic;

    const videoStyle = fullScreen
      ? styles.fullScreenVideo
      : styles.videoCombine;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={containerStyle}
        onPress={() => !fullScreen && handleMediaClick(index)}
      >
        {item.type === "image" && (
          <Image
            source={{ uri: item.url }}
            style={imageStyle}
            resizeMode={fullScreen ? "contain" : "cover"}
          />
        )}

        {item.type === "video" && (
          <View style={{ position: "relative", backgroundColor: "black" }}>
            <Video
              source={{ uri: item.url }}
              style={videoStyle}
              autoplay={fullScreen}
              paused={
                !fullScreen || item.type !== "video" || index !== currentIndex
              }
              controls={fullScreen}
              resizeMode={fullScreen ? "contain" : "cover"}
              onError={(error) => {
                console.log("Video Error:", error);
              }}
            />
            {!fullScreen && (
              <View style={styles.playIconOverlay}>
                <Image
                  source={appIcons.playIcon} // update path if needed
                  style={styles.playIcon}
                />
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderModalMedia = (item, index, fullScreen = false) => {
    if (item.type === "image") {
      return fullScreen ? (
        <View style={styles.fullScreenImageContainer}>
          <Image
            source={{ uri: item.url }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      ) : (
        <View style={styles.imageDiv}>
          <Image
            source={{ uri: item.url }}
            style={styles.postPic}
            resizeMode="cover"
          />
        </View>
      );
    } else if (item.type === "video") {
      return (
        <View
          style={fullScreen ? styles.fullScreenImageContainer : styles.imageDiv}
        >
          <Video
            source={{ uri: item.url }}
            style={fullScreen ? styles.fullScreenVideo : styles.videoCombine}
            autoplay={fullScreen}
            paused={!fullScreen || index !== currentIndex}
            controls={fullScreen}
            resizeMode={fullScreen ? "contain" : "cover"}
            onError={(error) => console.log("Video Error:", error)}
          />
          {!fullScreen && (
            <View style={styles.playIconOverlay}>
              <Image source={appIcons.playIcon} style={styles.playIcon} />
            </View>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <>
      <View style={styles.mainDiv}>
        <View style={styles.firstDiv}>
          <TouchableOpacity
            style={styles.profileImageDiv}
            onPress={() => {
              if (user._id === userID) {
                navigatetoPersonal();
              } else {
                navigatetoUser(uniqueName);
              }
            }}
          >
            <Image
              source={
                profilePicture ? { uri: profilePicture } : appIcons.profile
              }
              style={styles.profileImageStyle}
            />
          </TouchableOpacity>
          <View style={styles.userSection}>
            <Text style={styles.userName}>{userName ?? "Ahmed Sarfaraz"} </Text>
            <Text style={styles.greyTextColor}>
              {location ? location : "Without Location"}
            </Text>
          </View>
          {showOptionsButton && (
            <TouchableOpacity
              style={{ flexGrow: 1, alignItems: "flex-end" }}
              onPress={() => {
                setShowOptions(true);
              }}
            >
              <Image source={appIcons.info} />
            </TouchableOpacity>
          )}
        </View>

        {pictures && pictures.length > 0 && (
          <View>
            <Animated.FlatList
              ref={mediaFlatListRef}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              data={pictures}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(
                  event.nativeEvent.contentOffset.x / widthPixel(350)
                );
                setActiveIndex(newIndex);
              }}
              renderItem={({ item, index }) => renderMedia(item, index)}
              keyExtractor={(item, index) => `media-${index}`}
              snapToInterval={widthPixel(350)}
              decelerationRate="fast"
            />
            {renderPaginationDots()}
          </View>
        )}

        {description && (
          <View style={[styles.textDiv, styles.postTextStyle]}>
            <Text style={styles.universalText}>
              {description ?? "No Description"}
            </Text>
          </View>
        )}
        <View style={styles.thirdDiv}>
          <View style={[styles.iconsDiv, { flex: 2 }]}>
            <TouchableOpacity onPress={handlePostLike}>
              <Image source={isLiked ? appIcons.filledHeart : appIcons.like} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCommentModal(!commentModal);
                fetchComments();
              }}
            >
              <Image source={appIcons.comment} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setTokensVisible(true);
            }}
            style={styles.saveDiv}
          >
            <Image style={styles.tokenIcon} source={appIcons.tokenIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {!text && (
        <View style={styles.detailView}>
          <Text style={styles.universalText}>
            {likes || likes === 0 ? likes + " Likes" : "0 Likes"}
          </Text>

          <View style={styles.timeandComment}>
            <Text style={styles.greyTextColor}>
              {time ? timeAgo(time) : "16 hours ago"}
            </Text>
            <View style={[styles.totalCommentText]}>
              <Text style={styles.greyTextColor}>
                {commentsNumber || commentsNumber === 0
                  ? commentsNumber + " Comments"
                  : "3 Comments"}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Full Screen Media Modal */}
      <Modal
        visible={fullScreenModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullScreenModal(false)}
      >
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <View style={styles.fullScreenModalContainer}>
          <TouchableOpacity
            style={styles.fullScreenCloseButton}
            onPress={() => setFullScreenModal(false)}
          >
            <Image source={appIcons.close} style={styles.fullScreenCloseIcon} />
          </TouchableOpacity>

          <Animated.FlatList
            ref={fullScreenFlatListRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={pictures}
            initialScrollIndex={activeIndex}
            getItemLayout={(data, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: fullScreenScrollX } } }],
              { useNativeDriver: true }
            )}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x / SCREEN_WIDTH
              );
              setActiveIndex(newIndex);
              // Sync the main carousel with the full screen one
              mediaFlatListRef.current?.scrollToOffset({
                offset: newIndex * widthPixel(350),
                animated: false,
              });
            }}
            renderItem={({ item, index }) =>
              renderModalMedia(item, index, true)
            }
            keyExtractor={(item, index) => `fullscreen-media-${index}`}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          {renderFullScreenPaginationDots()}

          <View style={styles.fullScreenUserInfo}>
            <Image
              source={
                profilePicture ? { uri: profilePicture } : appIcons.profile
              }
              style={styles.fullScreenProfileImage}
            />
            <Text style={styles.fullScreenUserName}>{userName}</Text>
          </View>
        </View>
      </Modal>

      {/* Comment Modal */}
      <Modal
        transparent={true}
        visible={commentModal}
        animationType="slide"
        onRequestClose={() => setCommentModal(false)}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalMain}>
                {/* Close button */}
                <TouchableOpacity
                  style={styles.crossDiv}
                  onPress={() => setCommentModal(false)}
                >
                  <Image source={appIcons.close} style={styles.crossIcon} />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.commentText}>Comments</Text>

                {/* Comment list */}
                <FlatList
                  contentContainerStyle={{ flexGrow: 1 }}
                  style={styles.commentsFlatListStyles}
                  keyboardShouldPersistTaps="handled"
                  data={commentList}
                  ListEmptyComponent={
                    <Text style={styles.emptyCommentText}>
                      No comments yet. Be the first to comment!
                    </Text>
                  }
                  renderItem={({ item }) => (
                    <View style={styles.commentDetailDiv}>
                      <TouchableOpacity style={styles.frequentUsersList}>
                        <Image
                          source={
                            item.icon ? { uri: item.icon } : appIcons.profile
                          }
                          style={styles.profilePicStyle}
                        />
                      </TouchableOpacity>

                      <View style={styles.commentUserDetail}>
                        <Text style={styles.commentUserName}>{item.name}</Text>
                        <Text style={styles.commentContentStyles}>
                          {item.comment}
                        </Text>
                      </View>
                      <Text style={{ color: colors.black }}>{item.time}</Text>
                      <TouchableOpacity
                        style={styles.commentLikes}
                        onPress={() => likeAComment(item.id)}
                      >
                        <Image
                          source={
                            item.hasLiked ? appIcons.filledHeart : appIcons.like
                          }
                          style={styles.commentLike}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />

                {/* Comment input */}
                <View style={styles.commentInputDiv}>
                  <View style={styles.commentInputFieldDiv}>
                    <MyInput
                      placeHolder="Comment"
                      border={true}
                      value={enteredComment}
                      setValue={setEnteredComment}
                    />
                  </View>
                  <View style={styles.commentButtonDiv}>
                    <Button
                      children="Post"
                      bidButton={true}
                      onPress={createAComment}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Options Modal */}
      <Modal
        visible={showOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowOptions(false)}
        >
          <View style={styles.optionsMenu}>
            <TouchableOpacity
              onPress={handleEditClick}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteClick}
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Tokens Modal */}
      <Modal
        visible={tokensVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setTokensVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setTokensVisible(false)}
        >
          <View style={styles.tokenModalBody}>
            <Text style={[styles.sendTokenText, { color: colors.theme }]}>
              Send Token
            </Text>
            <Text
              style={[
                styles.sendTokenText,
                { alignSelf: "flex-start", fontSize: 14 },
              ]}
            >
              Select Token Type
            </Text>
            <TextInput
              value={countValue}
              onChangeText={(text) => {
                setCountValue(text);
              }}
              placeholderTextColor={colors.greyLight}
              keyboardType="decimal-pad"
              placeholder="2"
              style={styles.tokenInput}
            />
            <Button
              onPress={() => {
                onSendToken();
              }}
            >
              Send Tokens
            </Button>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flexDirection: "column",
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.theme,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  textStyles: {
    color: colors.red,
  },
  firstDiv: {
    flexDirection: "row",
    alignItems: "center",
    padding: heightPixel(15),
  },
  userSection: {
    marginLeft: widthPixel(15),
  },
  userName: {
    fontWeight: "bold",
    color: colors.black,
  },
  imageDiv: {
    justifyContent: "center",
    alignItems: "center",
    height: heightPixel(400),
    width: widthPixel(350),
  },
  tokenRow: {
    flexDirection: "row",
    width: "100%",
    marginBottom: hp(2),
    padding: 8,
    justifyContent: "space-between",
  },
  textDiv: {
    justifyContent: "center",
    marginRight: widthPixel(10),
  },
  sendTokenText: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.black,
    marginBottom: heightPixel(18),
  },
  postPic: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  thirdDiv: {
    flexDirection: "row",
    padding: heightPixel(15),
  },
  iconsDiv: {
    flexDirection: "row",
    gap: widthPixel(15),
  },
  tokenInput: {
    fontWeight: "bold",
    fontSize: 16,
    borderColor: colors.grey,
    color: colors.black,
    borderWidth: 1,
    width: "100%",
    borderRadius: 22,
    paddingHorizontal: 10,
    marginBottom: hp(2),
  },
  saveDiv: {},
  postTextStyle: {
    fontSize: fontPixel(14),
    padding: heightPixel(10),
  },
  video: {
    height: heightPixel(380),
    width: widthPixel(300),
  },
  videoCombine: {
    height: "100%",
    width: "100%",
  },
  detailView: {
    padding: heightPixel(10),
    flexDirection: "column",
  },
  timeandComment: {
    flexDirection: "row",
  },
  tokenModalBody: {
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: wp(8),
    width: widthPixel(300),
  },
  universalText: {
    color: colors.black,
    fontWeight: "bold",
    marginBottom: heightPixel(2),
  },
  totalCommentText: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  greyTextColor: {
    color: colors.grey,
  },
  crossIcon: {
    height: heightPixel(15),
    width: widthPixel(15),
  },
  tokensIcon: {
    height: heightPixel(20),
    width: widthPixel(20),
  },
  modalMain: {
    backgroundColor: "rgba(184, 184, 184, 0.9)",
    flex: 1,
    marginTop: heightPixel(130),
    marginLeft: widthPixel(10),
    marginRight: heightPixel(10),
    padding: heightPixel(10),
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexGrow: 1,
    paddingBottom: heightPixel(60),
  },
  crossDiv: {
    alignItems: "flex-end",
    margin: heightPixel(10),
  },
  commentText: {
    color: colors.black,
    alignSelf: "center",
    fontSize: fontPixel(15),
    fontWeight: "bold",
    marginBottom: heightPixel(20),
  },
  frequentUsersList: {
    marginLeft: widthPixel(10),
    borderRadius: 50,
    height: heightPixel(45),
    width: widthPixel(45),
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.theme,
    borderWidth: 8,
    marginTop: heightPixel(6),
  },
  profilePicStyle: {
    height: heightPixel(35),
    width: widthPixel(35),
    borderRadius: 50,
  },
  greendotStyle: {
    position: "absolute",
    alignSelf: "flex-end",
    top: heightPixel(40),
  },
  firendListDiv: {
    flexGrow: 1,
    marginTop: heightPixel(20),
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    padding: heightPixel(15),
    shadowColor: colors.grey,
    shadowOpacity: 0.9,
    shadowOffset: {
      height: 8,
      width: 5,
    },
    elevation: 6,
  },
  commentDetailDiv: {
    flexDirection: "row",
    marginBottom: heightPixel(25),
  },
  commentLikes: {
    flexGrow: 1,
    alignItems: "flex-end",
    padding: heightPixel(4),
  },
  commentLike: {
    height: heightPixel(12),
    width: widthPixel(12),
    marginRight: widthPixel(10),
  },
  commentUserDetail: {
    marginLeft: widthPixel(10),
  },
  commentUserName: {
    color: colors.black,
    fontWeight: "bold",
  },
  commentContentStyles: {
    marginTop: heightPixel(4),
    color: colors.black,
  },
  commentsFlatListStyles: {
    height: heightPixel(420),
  },
  commentInputDiv: {
    flexGrow: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    flexDirection: "row",
    padding: heightPixel(10),
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 30,
  },
  commentInputFieldDiv: {
    flex: 0.75,
    flexDirection: "row",
    justifyItems: "flex-start",
  },
  commentButtonDiv: {
    flex: 0.2,
  },
  profileImageDiv: {
    height: heightPixel(40),
    width: widthPixel(40),
    borderWidth: 5,
    borderColor: colors.theme,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageStyle: {
    height: "98%",
    width: "98%",
    borderRadius: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  optionsMenu: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    color: colors.black,
  },
  tokenTitle: {
    fontSize: 16,
    color: colors.black,
  },
  tokenIcon: {
    height: heightPixel(25),
    width: widthPixel(25),
    resizeMode: "contain",
  },

  // New styles for pagination dots
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: heightPixel(20),
    marginTop: heightPixel(5),
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 3,
    backgroundColor: colors.theme,
    marginHorizontal: 3,
  },

  // Full screen media modal styles
  fullScreenModalContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "black",
    justifyContent: "center",
  },
  fullScreenImageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "black",
  },
  fullScreenImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
  fullScreenVideo: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.8,
  },
  fullScreenCloseButton: {
    position: "absolute",
    top: 30,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  fullScreenCloseIcon: {
    height: heightPixel(20),
    width: widthPixel(20),
    tintColor: "#fff",
  },
  fullScreenPaginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  fullScreenPaginationDot: {
    height: 8,
    width: 8,
    borderRadius: 3,
    gap: 4,
    backgroundColor: "#fff",
    marginHorizontal: 6,
  },
  fullScreenUserInfo: {
    position: "absolute",
    top: 30,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  fullScreenProfileImage: {
    height: heightPixel(30),
    width: widthPixel(30),
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#fff",
  },
  fullScreenUserName: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: fontPixel(14),
  },
  playIconOverlay: {
    position: "absolute",
    top: "50%",
    // left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background (optional)
    borderRadius: 30,
    padding: 10,
    zIndex: 1,
  },

  playIcon: {
    width: 30,
    height: 30,
    tintColor: "white",
  },
  paginationDot: {
    height: 8,
    width: 8,
    borderRadius: 10,
    backgroundColor: "#aaa",
    marginHorizontal: 2,
  },

  activeDot: {
    width: 16,
    height: 12,
    backgroundColor: colors.theme,
  },
});
