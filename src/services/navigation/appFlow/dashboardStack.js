import React from "react";
import {
    CardStyleInterpolators,
    createStackNavigator,
} from "@react-navigation/stack";

import * as AppFlow from '../../../screens/appFlow';
import { routes } from "../../constants";
import ProfileStack from "./profileStack";


const MyStack = createStackNavigator();


const DashboarStack = ({ route }) => {
    return (
        <MyStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={routes.dashboard}>
            <MyStack.Screen name={routes.dashboard} component={AppFlow.Dashboard} />
            <MyStack.Screen name={routes.notification} component={AppFlow.NotificationScreen} />
            <MyStack.Screen name={routes.userProfile} component={AppFlow.UserProfileScreen} />
            <MyStack.Screen name={routes.singlepost} component={AppFlow.SinglePostScreen} />
            {/* <MyStack.Screen name={routes.profilestack} component={ProfileStack}/> */}
        </MyStack.Navigator>
    );
}


export default DashboarStack;