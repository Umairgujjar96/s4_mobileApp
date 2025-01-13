import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import DateTimePicker from "@react-native-community/datetimepicker";

import { colors, fontFamily, heightPixel, widthPixel } from "../../services";

export const DateInput = ({
  title,
  value,
  setValue,
  placeHolder,
  disable,
  textColor,
  fontSize,
  height,
  font,
  marginTop,
  open,
  setOpen,
  date,
  mode,
}) => {
  return (
    <Pressable
      disabled={disable}
      onPress={() => setOpen(true)}
      style={[
        styles.container,
        { marginTop: marginTop ? marginTop : heightPixel(24) },
      ]}
    >
      <View style={{ marginBottom: heightPixel(5) }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text
        style={{
          height: height ? height : heightPixel(40),
          width: "100%",
          fontFamily: font ? font : fontFamily.appTextMedium,
          color: textColor
            ? textColor
            : value
            ? colors?.black
            : colors.themeSecondary,
          fontSize: fontSize ? fontSize : responsiveFontSize(1.75),
          verticalAlign: "middle",
        }}
      >
        {value == ""
          ? placeHolder
          : mode == "time"
          ? new Date(value).toLocaleTimeString("en-US", {
              second: "2-digit",
              hour: "2-digit",
              hour12: true,
              minute: "2-digit",
            })
          : new Date(value)
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .replace(/\//g, "-")}
      </Text>
      {open && (
        <DateTimePicker
          testID="dateTimePicker"
          style
          value={date}
          mode={mode ? mode : "date"}
          is24Hour={true}
          display="default"
          onChange={(date) => {
            if (date.type == "dismissed") {
              setOpen(false);
              return;
            }
            if (date.type == "set") {
              setOpen(false);
              setValue(date.nativeEvent.timestamp);
              return;
            }
          }}
          onError={(err) => {
            setOpen(false);
          }}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // borderBottomWidth: widthPixel(1),
  },
  title: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(2.0),
    color: colors.black,
  },
});
