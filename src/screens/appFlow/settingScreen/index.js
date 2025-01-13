import React from "react";
import { View,Text, Image,TouchableOpacity } from "react-native";
import styles from "./style";
import { appIcons, routes } from "../../../services";
import { useDispatch } from "react-redux";
import { resetState } from "../../../redux/Slices/userSlice";

const SettingTyle = ({screenName,icons,operation})=>{
    return(
        <TouchableOpacity style={styles.tyleMainDiv} onPress={operation}>
            <Text style={styles.screenNameStyle}>
                {screenName}
            </Text>
            <View style={styles.mainIconDiv}>
            <Image source={icons} style={[screenName === 'Logout' && styles.iconPicture]}/>
            </View>
        </TouchableOpacity>
    );

}



const SettingScreen = ({navigation})=>{
    const dispatch = useDispatch();
    const settings = [
        {screenName:"Account",icons:appIcons.forward,operation:()=>{}},
        {screenName:"Notifications",icons:appIcons.forward,operation:()=>{}},
        {screenName:"Privacy",icons:appIcons.forward,operation:()=>{}},
        {screenName:"Accesibility",icons:appIcons.forward,operation:()=>{}},
        {screenName:"Feedback",icons:appIcons.forward,operation:()=>{}},
        {screenName:"Help Center",icons:appIcons.forward,operation:()=>{}},
        {screenName:"Logout",
        icons:appIcons.logoutIcon,
        operation:()=>{
            navigation.navigate(routes.auth,{screen:routes.login});
            dispatch(resetState());
                    }
    },
    ]
    return(
        <View style={styles.mainScreenStyle}>
           {settings.map((item,index)=>{
            return(
                <SettingTyle screenName={item.screenName} icons={item.icons} operation={item.operation}/>
            );
           })}
           <TouchableOpacity style={styles.addAccountDiv}>
            <Text style={styles.addAccountText}>Add Account</Text>
           </TouchableOpacity>
        </View>
    );
}

export default SettingScreen;