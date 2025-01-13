

import React,{useEffect,useState} from "react";
import { appIcons, colors, routes } from "../../../services";
import { View,Text,Image } from "react-native";
import { Button } from "../../../components";
import styles from './style';


const SplashScreen =({navigation}) =>{

    const getStarted = ()=>{
        navigation.navigate(routes.onBoarding);
    }
  
    return(
        <View style={styles.mainDiv}>
            <View style={styles.imageDiv}>
                <Image
                source={appIcons.logoIcon}
                />
            </View>
            <View style={styles.buttonDin}>
            <Button themeColor={colors.theme} disable={false} onPress={getStarted} children="Get Started" arrow={true}/>
            </View>
        </View>
    );

} 


export default SplashScreen;