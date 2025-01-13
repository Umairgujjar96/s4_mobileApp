import React from "react";
import { StyleSheet, TextInput, View, Image, Pressable } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { colors, fontFamily, heightPixel, widthPixel } from "../../services";

export const Search = ({
  onPressView,
  leftIcon,
  value,
  setValue,
  placeHolder,
  disable,
  textColor,
  placeholderColor,
  font,
  keyboardType,
  multiline,
  fontSize,
  textAlignVertical,
  numberOfLines,
  maxLength,
  onSubmitEditing,
  rightIcon,
  height,
  onPressLeft,
  onPressRight,
  secure,
  marginTop,
}) => {
  return (
    <Pressable
      onPress={onPressView}
      style={[
        styles.container,
        { marginTop: marginTop ? marginTop : heightPixel(24) },
      ]}
    >
      {leftIcon && (
        <Pressable onPress={onPressLeft} style={styles.leftView}>
          <Image source={leftIcon} style={styles.iconStyle} />
        </Pressable>
      )}
      <TextInput
        value={value}
        placeholder={placeHolder}
        onChangeText={setValue}
        style={{
          height: height ? height : heightPixel(48),
          width: leftIcon ? "88%" : "100%",
          textAlignVertical: textAlignVertical,
          fontFamily: font ? font : fontFamily.appTextRegular,
          color: textColor ? textColor : colors.black,
          fontSize: fontSize ? fontSize : responsiveFontSize(2.0),
        }}
        placeholderTextColor={
          placeholderColor ? placeholderColor : colors.lightText
        }
        keyboardType={keyboardType ? keyboardType : "default"}
        editable={disable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secure}
      />
      {rightIcon && (
        <Pressable onPress={onPressRight} style={styles.rightView}>
          <Image source={rightIcon} style={styles.iconStyle} />
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: widthPixel(12),
    backgroundColor: "#F0F2F3",
    paddingHorizontal: widthPixel(10),
    flexDirection: "row",
    alignItems: "center",
  },
  leftView: {
    height: heightPixel(48),
    justifyContent: "center",
    width: "11%",
  },
  iconStyle: {
    height: heightPixel(24),
    width: widthPixel(24),
    resizeMode: "contain",
  },
  rightView: {
    height: heightPixel(48),
    justifyContent: "center",
    alignItems: "flex-end",
    width: "9%",
  },
});
