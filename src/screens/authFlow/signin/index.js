import React, { useState } from "react";
import { Text, View, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Button, Loader, MyInput } from "../../../components";
import { appIcons, colors, heightPixel, routes } from "../../../services";
import CheckBox from '@react-native-community/checkbox';
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { emailFormat, passwordFormat } from "../../../services/validations";
import { RedSnackbar } from "../../../services/helpingMethods";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../redux/store";
import { accessToken, userData } from "../../../redux/Slices/userSlice";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const inputValidation = () => {
    if (!emailFormat.test(email)) {
      RedSnackbar("Invalid Email");
      return false;
    }
    else if (password.length < 8) {
      RedSnackbar("Password must be at least 8 characters");
      return false;
    }
    return true;
  }
  const LoggedIn = async () => {
    if (!loading) {

      try {
        const status = inputValidation();
        if (!status) {
          return;
        }
        setLoading(true);
        const response = await callApi("POST", api.login, { email: email.toLowerCase(), password: password },
          (res) => {
            if (res?.status) {
              store.dispatch(accessToken(res?.data?.jwt));
              dispatch(userData(res?.data?.user));

              navigation.navigate(routes.drawer, { screen: routes.dashboard });
            }
            else {
              RedSnackbar(res?.message);
            }
            setLoading(false);
          },
          (err) => {
            console.log("error occured");
            setLoading(false);
          }
        )
      } catch (e) {
        console.log("error occured", e);
        setLoading(false);
      }
    }
  }



  return (
    <ImageBackground source={appIcons.background} style={styles.mainDin}>
      <ScrollView contentContainerStyle={styles.scrollDesign}>

        <Text style={styles.loginText}>Login</Text>


        <MyInput border={true} placeHolder="xyz@gmail.com" value={email} setValue={setEmail} title="Email" textColor={colors.black} />
        <MyInput border={true} placeHolder="********" value={password} setValue={setPassword} title="Password" secure={true} />


        <View style={styles.bottomComponent}>
          <View style={styles.remberMeDiv}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{ true: '#126FCF', false: colors.black }}
              boxType="square"
              tran

            />
            <Text style={styles.rememberMe}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate(routes.forgotPassword)}>
            <Text style={styles.forgetPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>


        <View style={{ marginTop: 70 }}>
          <Button onPress={() => LoggedIn()} children="Login" themeColor={colors.theme} />
        </View>

        <Loader loading={loading} />
      </ScrollView>
    </ImageBackground>
  );
}


export default LoginScreen;