import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { FriendMessagesListing,Messages } from "../../../screens/appFlow";
import { routes } from "../../constants";

const MessagesStack = createStackNavigator();

const MessagingStack = ()=>{
    return(
        <MessagesStack.Navigator initialRouteName={routes.messages}>
            <MessagesStack.Screen name={routes.messages} component={FriendMessagesListing}/>
            <MessagesStack.Screen name={routes.individualMessages} component={Messages}/>
            </MessagesStack.Navigator>
    );
}

export default MessagingStack;