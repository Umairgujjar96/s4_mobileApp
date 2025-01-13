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

const UserCard = ({
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
  image,
}) => {
  const theme = useSelector((state) => state.user.themeColor);
  return (
    <Pressable onPress={pressable} key={index} style={styles.container}>
      <Image source={{ uri: image }} style={styles.icon} />
      <View
        style={{
          width: "34%",
          marginRight: widthPixel(9),
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            ...styles.title,
            marginBottom: relation ? heightPixel(2) : heightPixel(6),
          }}
        >
          {title}
        </Text>
        {relation && <Text style={styles.relation}>({relation})</Text>}
        <Text style={styles.subTitle}>
          Date of birth{" "}
          <Text
            style={{
              color: theme,
              fontFamily: fontFamily.appTextMedium,
              lineHeight: heightPixel(18),
            }}
          >
            {" "}
            {date}{" "}
          </Text>
        </Text>
      </View>
      <View style={{ width: "38%" }}>
        {button && (
          <Pressable
            style={{
              ...styles.buttonView,
              backgroundColor: colors.white,
              borderWidth: widthPixel(1),
              borderColor: theme,
            }}
            onPress={onPress}
          >
            <Text style={{ ...styles.buttonText, color: theme }}>{button}</Text>
          </Pressable>
        )}
        {buttonTitle && (
          <Pressable
            onPress={onPressOne}
            style={{
              ...styles.buttonView,
              backgroundColor: theme,
              marginBottom: button ? heightPixel(0) : heightPixel(7),
              borderWidth: widthPixel(1),
              borderColor: theme,
            }}
          >
            <Text style={styles.buttonText}>{buttonTitle}</Text>
          </Pressable>
        )}
        {mutual && (
          <Text
            style={{
              ...styles.subTitle,
              color: theme,
              fontFamily: fontFamily.appTextMedium,
              lineHeight: heightPixel(18),
              textAlign: "center",
            }}
          >
            {mutual} <Text style={styles.subTitleOne}>Mutual Friends</Text>
          </Text>
        )}
      </View>
    </Pressable>
  );
};

export default UserCard;

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
    alignItems: "center",
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
    marginBottom: heightPixel(7),
  },
  buttonText: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(1.5),
    color: colors.white,
  },
});
