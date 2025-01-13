import React from "react";
import { StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboarStack from "../appFlow/dashboardStack";
import ProfileStack from "../appFlow/profileStack";
import MessagesStack from "../appFlow/messagingStack";
import CreatePostStack from "../appFlow/createPostStack";
import { appIcons, colors, fontFamily } from "../../utilities";
import { heightPixel, routes, widthPixel } from "../../constants";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useSelector } from "react-redux";



const Tab = createBottomTabNavigator();

export function TabNavigator({ navigation }) {
  const theme = useSelector((state) => state.user.themeColor);
  const tabArray = [
    {
      route: "Home",
      icon: appIcons.tabIcon,
      component: DashboarStack,
      color: colors.theme,
    },
    {
      route: "Search",
      icon: appIcons.searchIcon,
      component: ()=>{return(<Text>Search</Text>)},
      color: colors.theme,
    },
    {
      route: "add",
      icon: appIcons.addIcon,
      component: CreatePostStack,
      color:colors.theme,
    },
    {
      route: "messages",
      icon: appIcons.shareIcon,
      component: MessagesStack,
      color: colors.theme,
    },
    {
      route: "Profile",
      icon: appIcons.profile,
      component: ProfileStack,
      color: colors.theme,
    },
  ];

  const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={[styles.container]}
      >
        <View style={[styles.btn]}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={item.icon}
              style={[
                styles.tabIcon,
                { tintColor: focused ? theme : colors.grey },
              ]}
            />
            {/* <Text
              style={{
                ...styles.routeText,
                color: focused ? theme : colors.inActiveColorTwo,
              }}
            >
              {item.route}
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.barStyle,
        }}
      >
        {tabArray.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
      {/* <View
        style={{ position: "absolute", bottom: heightPixel(60), left: "45%" }}
      >
        <TouchableOpacity onPress={() => navigation.navigate(routes.addItem)}>
          <Image style={[styles.tabIcon, { tintColor: theme }]} source={appIcons.addIcon} />
        </TouchableOpacity>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: colors.white,
    height: heightPixel(70),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  tabIcon: {
    width: widthPixel(30),
    height: heightPixel(30),
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  routeText: {
    fontFamily: fontFamily.appTextMedium,
    fontSize: responsiveFontSize(1.5),
  },
});
