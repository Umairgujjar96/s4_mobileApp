import React from "react";
import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";

import { appIcons, colors, fontFamily, heightPixel, widthPixel } from "../../services";

export const MyInput = ({
  title,
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
  height,
  secure,
  marginTop,
  textTransform,
  border,
  borderRadius,
  borderBottom,
  icon,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: marginTop ? marginTop : heightPixel(24),
        
        },
      ]}
    >
      <View style={{ marginBottom: heightPixel(5) }}>
        <Text style={{ ...styles.title }}>{title}</Text>
      </View>

    <View style={[border && { borderRadius:borderRadius ? borderRadius : 13,borderWidth:1,padding:heightPixel(5),borderColor:colors.grey},icon && {flexDirection:'row',},borderBottom && {borderBottomWidth:1,borderColor:colors.grey}]}>
     {icon && <Image source={icon} style={{alignSelf:'center',marginLeft:widthPixel(10),marginRight:widthPixel(5)}}/>}
    <TextInput
        value={value}
        placeholder={placeHolder}
        onChangeText={setValue}
        style={[
         { height: height ? height : heightPixel(40),
          width: "100%",
          textAlignVertical: textAlignVertical,
          fontFamily: font ? font : fontFamily.appTextMedium,
          color: textColor ? textColor : colors.black,
          fontSize: fontSize ? fontSize : responsiveFontSize(1.75),
          textTransform: textTransform,
          
         },
          // {
          //   borderWidth:1,
          //   borderRadius:13,
          //   paddingTop:heightPixel(20),
          //   paddingBottom:heightPixel(20),
          // }

        ]}
        placeholderTextColor={
          placeholderColor ? placeholderColor : colors.themeSecondary
        }
        keyboardType={keyboardType ? keyboardType : "default"}
        editable={disable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={secure}
      />
    </View>
     
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: widthPixel(0),
  
  },
  title: {
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: responsiveFontSize(2.0),
    color: colors.black,
  },
});
