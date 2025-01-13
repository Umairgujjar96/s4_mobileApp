import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import {
  appImages,
  colors,
  fontFamily,
  heightPixel,
  widthPixel,
} from "../../services";

const ReminderCardTwo = ({
  pressable,
  index,
  title,
  relation,
  date,
  mutual,
  button,
  onPress,
  onPressOne,
  buttonTitle,
  requestProps = {
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    _id: "662a9663b9386484c7802630",
    isSocial: false,
    email: "maazy9329@gmail.com",
    image:
      "file:///data/user/0/com.scripterz.mysurprise/cache/ImagePicker/91e92ba7-0036-4bd7-ada4-ca7eff0c9b85.jpeg",
    interests: [],
    gender: "male",
    passwordChangedAt: "2024-04-25T17:44:03.569Z",
    certificates: [],
    profileCompleted: true,
    interestSelected: false,
    deleted: false,
    role: "user",
    otp: null,
    verified: true,
    customerId: "cus_PzVLa616Pythu2",
    isNotification: true,
    createdAt: "2024-04-25T17:44:03.570Z",
    updatedAt: "2024-04-25T17:45:05.588Z",
    __v: 0,
    dateOfBirth: 988202700000,
    firstName: "muaaz",
    lastName: "khan2",
    id: "662a9663b9386484c7802630",
    status: "Pending",
  },
}) => {
  const theme = useSelector((state) => state.user.themeColor);
  return (
    <Pressable onPress={pressable} key={index} style={styles.container}>
      <Image
        source={{
          uri: requestProps?.image,
        }}
        style={styles.icon}
      />
      <View
        style={{
          width: "78%",
          marginRight: widthPixel(9),
        }}
      >
        <Text
          style={{
            ...styles.title,
            marginBottom: heightPixel(6),
          }}
        >
          New Friend Request!
        </Text>
        <Text
          style={{
            ...styles.subTitle,
            color: theme,
            marginBottom: heightPixel(15),
          }}
        >
          {requestProps?.firstName} {requestProps?.lastName}{" "}
          <Text
            style={{
              color: theme,
              fontFamily: fontFamily.appTextMedium,
              lineHeight: heightPixel(18),
            }}
          >
            sent you a friend request
          </Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable
            style={{
              ...styles.buttonView,
              backgroundColor: colors.white,
              borderWidth: widthPixel(1),
              borderColor: theme,
              width: "46%",
            }}
            onPress={() => {
              onPress && onPress(requestProps?._id);
            }}
          >
            <Text style={{ ...styles.buttonText, color: colors.textRed }}>
              {button}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              onPressOne && onPressOne(requestProps?._id);
            }}
            style={{
              ...styles.buttonView,
              backgroundColor: theme,
              marginBottom: button ? heightPixel(0) : heightPixel(7),
              borderWidth: widthPixel(1),
              borderColor: theme,
              width: "46%",
            }}
          >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          right: widthPixel(20),
          top: heightPixel(10),
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily.appTextRegular,
            fontSize: responsiveFontSize(1.25),
            color: colors.inActiveColorThree,
          }}
        >
          12/12/1995
        </Text>
      </View>
    </Pressable>
  );
};

export default ReminderCardTwo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingHorizontal: heightPixel(18),
    paddingVertical: heightPixel(18),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
    borderRadius: widthPixel(12),
    marginBottom: heightPixel(16),
    justifyContent: "space-between",
  },
  icon: {
    height: heightPixel(57),
    width: widthPixel(57),
    resizeMode: "contain",
    marginRight: widthPixel(12),
    borderRadius: widthPixel(57),
  },
  title: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(2.0),
    color: colors.black,
  },
  relation: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(1.65),
    color: colors.inActiveColorThree,
    marginBottom: heightPixel(6),
  },
  subTitle: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.75),
    color: colors.lightText,
  },
  subTitleOne: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.4),
    color: colors.lightText,
  },
  buttonView: {
    paddingVertical: heightPixel(7),
    paddingHorizontal: widthPixel(7),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: widthPixel(50),
  },
  buttonText: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(1.5),
    color: colors.white,
  },
});
