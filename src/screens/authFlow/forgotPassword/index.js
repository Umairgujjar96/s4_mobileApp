import React, { useState } from "react";
import { Text, View, ScrollView, ImageBackground } from "react-native";
import styles from "./style";
import { Button, Loader, MyInput } from "../../../components";
import { appIcons, colors, heightPixel, routes } from "../../../services";
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { emailFormat } from "../../../services/validations";
import { RedSnackbar } from "../../../services/helpingMethods";


const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)

  const inputValidation = () => {
    if (!emailFormat.test(email)) {
      RedSnackbar("Invalid Email");
      return false;
    }
    return true;
  }
  const Login = async () => {

    const status = inputValidation();
    if (!status) {
      return;
    }
    setLoading(true)
    try {
      const response = await callApi("POST", api.forgot, { email: email },
        (res) => {
          if (res?.status) {

            console.log("success");
            navigation.navigate(routes.otp, { receivedOTP: res?.data?.otp, screenName: "forgot", email: email.toLowerCase() });
          }
          else {
            RedSnackbar(res?.message);
          }
          setLoading(false)
        },
        (err) => {
          console.log("error occured");
          setLoading(false)
        }

      )
    } catch (e) {
      console.log("error occured");
      setLoading(false)
    }
  }

  return (
    <ImageBackground source={appIcons.background} style={styles.mainDin}>
      <ScrollView contentContainerStyle={styles.scrollDesign}>
        <View style={styles.top}>
          <Text style={styles.loginText}>Forgot password</Text>
          <Text style={styles.subText}>Enter email to receive OTP</Text>
          <MyInput border={true} placeHolder="abc@gmail.com" value={email} setValue={setEmail} title="Email" textColor={colors.black} />
        </View>
        <View style={styles.bottom}>
          <Button onPress={Login} children="Continue" themeColor={colors.theme} />
        </View>
        <Loader loading={loading} />
      </ScrollView>
    </ImageBackground>
  );
}


export default ForgotPasswordScreen;