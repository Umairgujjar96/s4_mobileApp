import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";

import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  widthPixel,
} from "../../services";

const ReminderCard = ({
  item,
  index,
  button,
  onPress,
  buttonTitle,
  disable,
  title,
  time,
  name,
  type = "Birthday",
}) => {
  const theme = useSelector((state) => state.user.themeColor);
  let CardTitle = type === "Birthday" && name ? name + " Birthday" : title;
  return (
    <View
      key={index}
      style={{ ...styles.container, backgroundColor: colors.white }}
    >
      <View style={{ ...styles.iconView, backgroundColor: "#FF5C2C1A" }}>
        <Image source={appIcons.eventIconThree} style={styles.imageView} />
      </View>
      <View>
        <View style={{ ...styles.row }}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ ...styles.row, justifyContent: "flex-start" }}>
          <Image
            source={appIcons.tabIconThree}
            style={{
              height: heightPixel(20),
              width: widthPixel(20),
              resizeMode: "contain",
              marginRight: widthPixel(6),
            }}
          />
          <Text style={{ ...styles.subTitle, color: theme }}>
            {time}{" "}
            {/* <Text
              style={{
                color: colors.inActiveColorThree,
                fontFamily: fontFamily.appTextMedium,
              }}
            >
              Days to go
            </Text> */}
          </Text>
        </View>
      </View>
      {/* <View
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
      </View> */}
    </View>
  );
};

export default ReminderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
  },
  iconView: {
    width: heightPixel(68),
    height: heightPixel(68),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: widthPixel(80),
    marginRight: widthPixel(10),
  },
  imageView: {
    width: widthPixel(40),
    height: heightPixel(40),
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(2.0),
    color: colors.black,
    marginBottom: heightPixel(8),
  },
  subTitle: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.75),
    color: colors.lightText,
  },
  button: {
    paddingHorizontal: widthPixel(20),
    paddingVertical: heightPixel(6),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: widthPixel(30),
    marginBottom: heightPixel(10),
  },
  buttonTitle: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(1.5),
    color: colors.white,
  },
});
