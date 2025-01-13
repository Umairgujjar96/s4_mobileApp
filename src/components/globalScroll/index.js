import React, {
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";

import { colors, heightPixel, widthPixel } from "../../services";
import themeContext from "../../services/config/themeContext";
import Header from "../header";
import { Loader } from "../loader";
const STYLES = ["dark-content", "light-content"];

const GlobalScroll = forwardRef(
  (
    {
      children,
      globalStyle,
      navigation,
      isBack,
      headerSave,
      headerSetting,
      headerTitle,
      title,
      titleIcon,
      description,
      isLoading,
      refreshControl,
    },
    ref
  ) => {
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
      <View style={styles.main}>
        <StatusBar
          animated={true}
          backgroundColor={"transparent"}
          barStyle={statusBarStyle}
          translucent
        />
        {isLoading && <Loader loading={isLoading} />}
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
        <View style={styles.wrapper}>
          <ScrollView
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scroll, { ...globalStyle }]}
            refreshControl={refreshControl}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : heightPixel(40) ,
    backgroundColor: colors.white,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flexGrow: 1,
    paddingVertical: heightPixel(20),
    paddingHorizontal: widthPixel(20),
  },
});

export default GlobalScroll;
