import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

import { routes } from "../../constants";
import * as Auth from "../../../screens/authFlow";


const AuthStack = createStackNavigator();

export const AuthNavigation = ({ route }) => {
  return (
    <AuthStack.Navigator
      initialRouteName={routes?.splash} 
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
    >
      <AuthStack.Screen name={routes.splash} component={Auth.Splash} />
      <AuthStack.Screen name={routes.onBoarding} component={Auth.OnBoarding} />
      <AuthStack.Screen name={routes.signup} component={Auth.Signup} />
      <AuthStack.Screen name={routes.login} component={Auth.Signin} />
      <AuthStack.Screen name={routes.forgotPassword} component={Auth.ForgotPasswordScreen}/>
      <AuthStack.Screen name={routes.changePassword} component={Auth.ChangePassword}/>
      <AuthStack.Screen name={routes.otp} component={Auth.OtpScreen} />
      <AuthStack.Screen name={routes.buildProfile} component={Auth.BuildProfile} />
     
    </AuthStack.Navigator>
  );
};
