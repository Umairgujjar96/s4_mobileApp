import React, { useRef, useState } from "react";
import { View,Text, ImageBackground ,ScrollView,TouchableOpacity} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import styles from './style';
import { appIcons, colors, routes } from "../../../services";
import { Button,GlobalScroll } from "../../../components";
import CountDownTimer from "react-native-countdown-timer-hooks";
import { RedSnackbar } from "../../../services/helpingMethods";


const OtpScreen = ({navigation,route})=>{
    const {receivedOTP,screenName,email} = route.params;

    const [otp,setOTP] = useState();
    const [timerEnd,setTimerEndd] = useState(false);
    const timer = useRef();

    const timerCallbackFunc = (timerFlag) =>{
        setTimerEndd(timerFlag);
    }

    const inputValidation = () =>{
      if(otp === null || !otp){
        RedSnackbar("Enter Otp");
        return false;
      }
      return true;
    }
    const VerfifyOTP = () =>{
      console.log(receivedOTP);
      console.log(otp);
     
      const status = inputValidation();
      if(!status){
        return;
      }
      if(otp == receivedOTP)
      {
        if(screenName === "forgot"){
          navigation.navigate(routes.changePassword,{email:email});
        }
        else{
          navigation.navigate(routes.buildProfile,{screenName:"otp"});
        }
       
      }
      else{
        RedSnackbar("invalid OTP");
      }
      
    }
    return(
        <ImageBackground source={appIcons.background} style={styles.mainDin}>
        <ScrollView contentContainerStyle={styles.scrollDesign}>
           <View style={styles.inputDiv}>
           <Text style={styles.headingDesign}>Enter OTP</Text>
           <Text style={styles.subHeadingDesign}>Enter OTP you receive on your email</Text>
           <View style={styles.otpDiv}>
           <OtpInput
          numberOfDigits={4}
          focusColor={colors.theme}
          focusStickBlinkingDuration={500}
          onTextChange={(text) => { setOTP(text);
           }}
          // onFilled={(text) => console.log(`OTP is ${text}`)}
          theme={{
            containerStyle: { borderWidth: 0, borderColor: "transparent" },
            inputsContainerStyle: {
              borderWidth: 0,
              borderColor: "transparent",
            },
            pinCodeContainerStyle: styles.underlineStyleBase,
            pinCodeTextStyle: styles.otpInputText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: [
              styles.underlineStyleBase,
              { borderColor: colors.theme },
            ],
          }}
          autoFocus={false}
        />

           </View>
           <View style={styles.timerDiv}>
          {
            !timerEnd && 
            <CountDownTimer
            ref={timer}
            timestamp={60}
            timerCallback={timerCallbackFunc}
            textStyle={{ ...styles.timerText, color: colors.theme }}
          /> 
          }
            {/* <Text style={styles.timerStyle}>Timer Text</Text> */}
            <TouchableOpacity disabled={!timerEnd} style={styles.sendAgain}>
                <Text style={{color: timerEnd ? colors.black : colors.grey}}>Send again</Text>
            </TouchableOpacity>
           </View>
           </View>
           <View>
            <Button children='Verify' onPress={VerfifyOTP}/>
           </View>
        </ScrollView>

        </ImageBackground>
    )
}

export default OtpScreen;