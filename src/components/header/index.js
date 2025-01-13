import React from "react";
import { StyleSheet, Image, Text, View, Pressable } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import {
  appIcons,
  colors,
  fontFamily,
  heightPixel,
  widthPixel,
} from "../../services";
import { useSelector } from "react-redux";

const Header = ({
  navigation,
  isBack,
  headerTitle,
  headerSetting,
  headerSave,
  title,
  titleIcon,
  description,
}) => {
  const theme = useSelector((state) => state.user.themeColor);

  return (
    <View style={styles.padding}>
      <View style={[styles.rowAlign, styles.space]}>
        <View style={styles.rowAlign}>
          {isBack && (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginRight: widthPixel(16) }}
            >
              <Image source={appIcons.backIcon} style={styles.leftIcon} />
            </Pressable>
          )}
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
        {headerSetting ? (
          <Pressable onPress={() => navigation.navigate(headerSetting)}>
            <Image
              source={appIcons.settingIcon}
              style={[styles.rightIcon, { tintColor: theme }]}
            />
          </Pressable>
        ) : headerSave ? (
          <Pressable onPress={headerSave}>
            <Text style={[styles.headerTitle, { color: theme }]}>Save</Text>
          </Pressable>
        ) : null}
      </View>
      {title || description ? (
        <View style={isBack && styles.mt10}>
          {title && (
            <View style={[styles.rowAlign]}>
              <Text style={styles.title}>{title}</Text>
              <Image style={styles.titleIcon} source={titleIcon} />
            </View>
          )}
          <Text style={[styles.des, title && title && styles.mt10]}>
            {description}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  padding: {
    // marginVertical: heightPixel(15),
    paddingHorizontal: widthPixel(20),
  },
  space: {
    justifyContent: "space-between",
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  leftIcon: {
    height: heightPixel(24),
    width: widthPixel(24),
    resizeMode: "contain",
  },
  headerTitle: {
    fontFamily: fontFamily.appTextSemiBold,
    color: colors.black,
    fontSize: responsiveFontSize(2.0),
  },
  rightIcon: {
    height: heightPixel(37),
    width: widthPixel(37),
    resizeMode: "contain",
  },
  mt10: {
    marginTop: heightPixel(10),
  },
  title: {
    fontFamily: fontFamily.appTextBold,
    fontSize: responsiveFontSize(3.0),
    color: colors.black,
    marginRight: widthPixel(10),
  },
  titleIcon: {
    height: heightPixel(26),
    width: widthPixel(26),
    resizeMode: "contain",
  },
  des: {
    fontFamily: fontFamily.appTextRegular,
    fontSize: responsiveFontSize(1.75),
    color: colors.lightText,
    lineHeight: heightPixel(22),
  },
});
export default Header;
