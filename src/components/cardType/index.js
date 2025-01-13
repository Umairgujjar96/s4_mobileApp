import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useDispatch, useSelector } from "react-redux";

import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  widthPixel,
} from "../../services";
import { setItemId } from "../../redux/Slices/itemSlice";

const CardView = ({
  item,
  index,
  button,
  onPress,
  buttonTitle,
  disable,
  bought,
}) => {
  const theme = useSelector((state) => state.user.themeColor);
  const dispatch = useDispatch();
  // const [bought , setBought] = useState(buttonTitle)

  return (
    <>
      <View
        key={index}
        style={{ ...styles.container, backgroundColor: colors.white }}
      >
        <Image source={item?.image ? { uri: item?.image } : appIcons.imgPlaceholder} style={styles.icon} />
        <View style={{ width: "68%" }}>
          <View style={styles.row}>
            <Text
              style={{
                ...styles.title,
                marginBottom: button ? heightPixel(0) : heightPixel(6),
                width: button ? "47%" : "100%",
                color: disable ? colors.inActiveColorThree : colors.black,
              }}
            >
              {item?.title}
            </Text>
            {button && (
              <Pressable
                onPress={() => {
                  onPress && onPress();
                  dispatch(setItemId(item?._id));
                  // setBought("Bought");
                }}
                disabled={disable}
                style={{
                  ...styles.button,
                  backgroundColor: disable ? colors.inActiveColorThree : theme,
                }}
              >
                <Text style={styles.buttonTitle}>{buttonTitle}</Text>
              </Pressable>
            )}
          </View>
          <Text
            style={{
              ...styles.subTitle,
              color: disable ? colors.inActiveColorThree : colors.lightText,
            }}
          >
            {item?.desc}{" "}
          </Text>
        </View>
      </View>
      {disable && (
        <View
          style={{
            position: "absolute",
            backgroundColor: colors.inActiveColorFour,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            marginBottom: heightPixel(16),
            borderRadius: widthPixel(12),
          }}
        ></View>
      )}
    </>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: heightPixel(20),
    paddingVertical: heightPixel(20),
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
  icon: {
    height: heightPixel(80),
    width: widthPixel(80),
    resizeMode: "contain",
    marginRight: widthPixel(16),
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
  },
  subTitle: {
    fontFamily: fontFamily.appTextRegular,
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
