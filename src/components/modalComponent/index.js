import React from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";

import { colors, fontFamily, heightPixel, widthPixel } from "../../services";
import Button from "../button";

function ModalComponent({
  modalVisible,
  title,
  subTitle,
  icon,
  titleStyle,
  subtitleStyle,
}) {
  const theme = useSelector((state) => state.user.themeColor);

  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <Pressable style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={[styles.imageHeightAndWidth]} source={icon} />
          <Text style={{ ...styles.textHeading, color: theme, ...titleStyle }}>
            {title ? title : " Successfully Requested"}
          </Text>
          <Text style={{ ...styles.detail, ...subtitleStyle }}>
            {subTitle
              ? subTitle
              : "Lorem ipsum dolor sit amet consectetur. Eget amet amet interdum nisi bibendum sed et. Bibendum lectus tincidunt eu sed tempus null"}
          </Text>
        </View>
      </Pressable>
    </Modal>
  );
}

function ModalWithButtonComponent({
  modalVisible,
  title,
  subTitle,
  icon,
  onPressOne,
  onPressTwo,
  textOne,

  textTwo,
  subTitleSize,
  showImg = true,
}) {
  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            { alignItems: "stretch", paddingHorizontal: widthPixel(20) },
          ]}
        >
          <View style={{ alignItems: "center" }}>
            {showImg && (
              <Image style={styles.imageHeightAndWidthOne} source={icon} />
            )}
            <Text style={styles.text}>
              {title ? title : " Successfully Requested"}
            </Text>
            <Text
              style={[
                styles.textOne,
                {
                  fontSize: subTitleSize
                    ? subTitleSize
                    : responsiveFontSize(2.25),
                },
              ]}
            >
              {subTitle
                ? subTitle
                : "Lorem ipsum dolor sit amet consectetur. Eget amet amet interdum nisi bibendum sed et. Bibendum lectus tincidunt eu sed tempus null"}
            </Text>
          </View>
          {onPressOne && <Button onPress={onPressOne} children={textOne} />}
          {onPressTwo && (
            <Button
              marginBottom={1}
              containerStyle={{
                borderWidth: widthPixel(1),
                borderColor: "black",
              }}
              themeColor={colors.white}
              children={textTwo ? textTwo : "Skip for Now"}
              onPress={onPressTwo}
              style={{
                color: colors.black,
                fontFamily: fontFamily.appTextBold,
                fontSize: responsiveFontSize(2),
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 31, 63, 0.70)",
    justifyContent: "center",
    paddingHorizontal: widthPixel(30),
  },
  modalView: {
    paddingHorizontal: widthPixel(27),
    paddingVertical: heightPixel(40),
    backgroundColor: colors.white,
    borderRadius: widthPixel(12),
    alignItems: "center",
  },
  imageHeightAndWidth: {
    height: heightPixel(180),
    width: widthPixel(186),
    resizeMode: "contain",
    marginBottom: heightPixel(24),
  },
  imageHeightAndWidthOne: {
    height: heightPixel(136),
    width: widthPixel(115),
    resizeMode: "contain",
    marginBottom: heightPixel(24),
  },
  textHeading: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(3.0),
    textAlign: "center",
    marginBottom: heightPixel(7),
    lineHeight: heightPixel(36),
  },
  detail: {
    color: colors.lightText,
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(2.0),
    textAlign: "center",
    marginBottom: heightPixel(20),
  },
  text: {
    color: colors.black,
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(2.75),
    textAlign: "center",
    marginBottom: heightPixel(7),
  },
  textOne: {
    color: colors.lightText,
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(2.25),
    textAlign: "center",
    marginBottom: heightPixel(20),
  },
  centeredViewOne: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 31, 63, 0.70)",
    justifyContent: "space-between",
  },
  modalViewOne: {
    flex: 0.95,
    paddingHorizontal: widthPixel(20),
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopLeftRadius: widthPixel(20),
    borderTopRightRadius: widthPixel(20),
  },
  scroll: {
    flexGrow: 1,
    paddingTop: heightPixel(20),
  },
  countryView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: heightPixel(20),
  },
  flagIcon: {
    height: heightPixel(20),
    width: widthPixel(30),
    marginRight: widthPixel(12),
  },
  countryName: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(1.75),
    color: colors.black,
  },
  crossIcon: {
    height: heightPixel(34),
    width: widthPixel(34),
    resizeMode: "contain",
    alignSelf: "flex-end",
    marginHorizontal: widthPixel(20),
    marginTop: StatusBar.currentHeight + heightPixel(20),
    marginBottom: heightPixel(10),
  },
});

export { ModalComponent, ModalWithButtonComponent };
