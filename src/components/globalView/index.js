import React, {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import { colors, heightPixel, widthPixel } from "../../services";
import themeContext from "../../services/config/themeContext";
import Header from "../header";
import { Loader } from "../loader";
const STYLES = ["dark-content", "light-content"];

const Global = forwardRef(
  (
    {
      status,
      backgroundColor,
      header,
      navigation,
      children,
      globalStyle,
      isBack,
      headerSave,
      headerSetting,
      headerTitle,
      title,
      titleIcon,
      description,
      isLoading,
    },
    ref
  ) => {
    const theme = useContext(themeContext);
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);

    useImperativeHandle(ref, () => ({
      lightContent() {
        changeStatusBarStyle(1);
      },
      darkContent() {
        changeStatusBarStyle(0);
      },
    }));

    const changeStatusBarStyle = (val) => {
      setStatusBarStyle(STYLES[val]);
    };

    return (
      <View
        style={[
          styles.main,
          {
            paddingTop: status && StatusBar.currentHeight,
            backgroundColor: backgroundColor ? backgroundColor : colors.white,
          },
        ]}
      >
        <StatusBar
          animated={true}
          backgroundColor={"transparent"}
          barStyle={statusBarStyle}
          translucent
        />
        {isLoading && <Loader loading={isLoading} />}
        {header && (
          <Header
            navigation={navigation}
            isBack={isBack}
            headerSave={headerSave}
            headerSetting={headerSetting}
            headerTitle={headerTitle}
            title={title}
            titleIcon={titleIcon}
            description={description}
          />
        )}
        <View style={[styles.wrapper, { ...globalStyle }]}>{children}</View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    paddingVertical: heightPixel(20),
    paddingHorizontal: widthPixel(20),
  },
});

export default Global;
