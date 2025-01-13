import React from "react";
import { StyleSheet, View } from "react-native";

import { colors, hp, loaderStyles, wp } from "../../services";
import { useSelector } from "react-redux";
import { hexToRgbA } from "../../services/helpingMethods";

var Spinner = require("react-native-spinkit");

export const Loader = ({ loading }) => {
  const theme = useSelector((state) => state.user.themeColor);
  var changeToRgba = hexToRgbA("#fff");
  return loading ? (
    <View style={{ ...styles.container, backgroundColor: changeToRgba }}>
      <Spinner
        style={styles.spinerStyle}
        isVisible={loading}
        size={60}
        type={loaderStyles.Circle}
        color={theme}
      />
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  spinerStyle: {
    marginBottom: hp(0),
  },
});
