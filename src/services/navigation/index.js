import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { EventRegister } from "react-native-event-listeners";

import { routes } from "..";
import { AuthNavigation } from "./authFlow";
import themeContext from "../config/themeContext";
import theme from "../config/theme";
import DrawerNavigator from "./drawerFlow";
import { useSelector } from "react-redux";
import { userData } from "../../redux/Slices/userSlice";
import ProfileStack from "./appFlow/profileStack";

const MyStack = createStackNavigator();
export const MainNavigator = () => {
  const [mode, setMode] = useState();
  const user = useSelector((state)=>state.user.userData);
  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "changeTheme",
      (data) => {
        setMode(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: mode === true ? "#0000" : "#fff",
    },
  };

  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={MyTheme}>
        <MyStack.Navigator
          initialRouteName={!user ?  routes.auth : routes.drawer}
          screenOptions={{ headerShown: false }}
        >
          <MyStack.Screen name={routes.auth} component={AuthNavigation} />
          <MyStack.Screen name={routes.drawer} component={DrawerNavigator} />
          
        </MyStack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};
