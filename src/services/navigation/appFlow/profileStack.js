import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { routes } from "../../constants";
import { ProfileScreen, FollowersList, SettingScreen, SinglePostScreen, CreatePost, PreviewPost } from "../../../screens/appFlow";
import { BuildProfile } from "../../../screens/authFlow";
import PurchaseTokens from "../../../screens/appFlow/purchaseTokens";
import WithdrawTokens from "../../../screens/appFlow/withdrawTokens";


const ProfileNavigator = createStackNavigator();


const ProfileStack = () => {
    return (
        <ProfileNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName={routes.profile}>
            <ProfileNavigator.Screen name={routes.profile} component={ProfileScreen} />
            <ProfileNavigator.Screen name={routes.followers} component={FollowersList} />
            <ProfileNavigator.Screen name={routes.setting} component={SettingScreen} />
            <ProfileNavigator.Screen name={routes.buildProfile} component={BuildProfile} />
            <ProfileNavigator.Screen name={routes.singlepost} component={SinglePostScreen} />
            <ProfileNavigator.Screen name={routes.createpost} component={CreatePost} />
            <ProfileNavigator.Screen name={routes.previewpost} component={PreviewPost} />
            <ProfileNavigator.Screen name={routes.purchaseTokens} component={PurchaseTokens} />
            <ProfileNavigator.Screen name={routes.withdrawTokens} component={WithdrawTokens} />
        </ProfileNavigator.Navigator>
    );
}

export default ProfileStack;