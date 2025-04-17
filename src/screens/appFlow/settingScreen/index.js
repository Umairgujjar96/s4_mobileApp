import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import styles from "./style";
import { appIcons, routes } from "../../../services";
import { useDispatch } from "react-redux";
import { resetState } from "../../../redux/Slices/userSlice";

const SettingTyle = ({ screenName, icons, operation }) => {
    return (
        <TouchableOpacity style={styles.tyleMainDiv} onPress={operation}>
            <Text style={styles.screenNameStyle}>
                {screenName}
            </Text>
            <View style={styles.mainIconDiv}>
                <Image source={icons} style={[screenName === 'Logout' && styles.iconPicture]} />
            </View>
        </TouchableOpacity>
    );

}



const SettingScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const settings = [
        { screenName: "Account", icons: appIcons.forward, operation: () => { navigation.navigate(routes.buildProfile, { screenName: "profile" }) } },
        { screenName: "Purchase Tokens", icons: appIcons.forward, operation: () => { navigation.navigate(routes.purchaseTokens) } },
        { screenName: "Withdraw Tokens", icons: appIcons.forward, operation: () => { navigation.navigate(routes.withdrawTokens) } },
        // { screenName: "Notifications", icons: appIcons.forward, operation: () => { } },
        { screenName: "Privacy Policy", icons: appIcons.forward, operation: () => { Linking.openURL("https://docs.google.com/document/d/1cezBcO6dCSJaNTU1-IObEAZs9yi-iCf1KPojQ8_z8LE/edit?tab=t.0") } },
        { screenName: "Terms & Conditions", icons: appIcons.forward, operation: () => { Linking.openURL("https://docs.google.com/document/d/1cezBcO6dCSJaNTU1-IObEAZs9yi-iCf1KPojQ8_z8LE/edit?tab=t.0") } },
        // { screenName: "Feedback", icons: appIcons.forward, operation: () => { } },
        { screenName: "Help Center", icons: appIcons.forward, operation: () => { Linking.openURL("https://docs.google.com/document/d/1cezBcO6dCSJaNTU1-IObEAZs9yi-iCf1KPojQ8_z8LE/edit?tab=t.0") } },
        {
            screenName: "Logout",
            icons: appIcons.logoutIcon,
            operation: () => {
                navigation.navigate(routes.auth, { screen: routes.login });
                dispatch(resetState());
            }
        },
    ]
    return (
        <View style={styles.mainScreenStyle}>
            {settings.map((item, index) => {
                return (
                    <SettingTyle screenName={item.screenName} icons={item.icons} operation={item.operation} />
                );
            })}
            {/* <TouchableOpacity style={styles.addAccountDiv}>
            <Text style={styles.addAccountText}>Add Account</Text>
           </TouchableOpacity> */}
        </View>
    );
}

export default SettingScreen;