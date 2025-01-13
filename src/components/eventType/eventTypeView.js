import React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { colors, fontFamily, heightPixel, widthPixel } from "../../services";

export const EventTypeView = ({ item, marginRight, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      key={item.id}
      style={{ ...styles.container, marginRight: marginRight }}
    >
      <View style={{ ...styles.iconView, backgroundColor: item.color }}>
        <Image source={item.icon} style={styles.imageView} />
      </View>
      <Text style={styles.titleText}>{item.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconView: {
    width: heightPixel(80),
    height: heightPixel(80),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: widthPixel(80),
    marginBottom: heightPixel(14),
  },
  imageView: {
    width: widthPixel(46),
    height: heightPixel(46),
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  titleText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.625),
    color: colors.black,
    textAlign: "center",
  },
});
