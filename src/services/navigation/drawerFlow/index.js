import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

 import { routes } from "../../constants";
import { TabNavigator } from "../tabFlow";
import DashboarStack from "../appFlow/dashboardStack";
import ProfileStack from "../appFlow/profileStack";
import { AuthNavigation } from "../authFlow";


const Drawer = createStackNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ gestureEnabled: true, headerShown: false }}
    >
      <Drawer.Screen name={routes.tab} component={TabNavigator} />
      {/* <Drawer.Screen name={routes.profilestack} component={ProfileStack} /> */}

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
