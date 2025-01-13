import React, { useState } from "react";
import { Text,View,ScrollView,ImageBackground } from "react-native";
import styles from "./styles";
import { Button, MyInput } from "../../../components";
import { appIcons, colors, heightPixel, routes } from "../../../services";
import CheckBox from '@react-native-community/checkbox';
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { store } from "../../../redux/store";
import { accessToken,userData } from "../../../redux/Slices/userSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { emailFormat ,passwordFormat} from "../../../services/validations";
import { RedSnackbar } from "../../../services/helpingMethods";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"


const SignupScreen = ({navigation}) =>{
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [isChecked,setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const validateInputs = ()=>{
    if(!emailFormat.test(email)){
      RedSnackbar("Ivalid Email");
      return false;
    }
    else if(!passwordFormat.test(password)){
      RedSnackbar("Invalid Password");
      return false;
    }
    else if(!password === confirmPassword){

      RedSnackbar("Password Mismatch");
      return false;
    }
    return true;
  }
  const SingUpOperation =async ()=>{
    try{
      const status = validateInputs();
      if(!status){
        return;
      }
      const response =await callApi("POST",api.signup,{email:email,password:password},
        (res)=>
        {
          if(res?.status){
            console.log("successfil",res);
            store.dispatch(accessToken(res?.data?.jwt));
            console.log("data is ",res?.data?.user);
            dispatch(userData(res?.data?.user));
            navigation.navigate(routes.otp,{receivedOTP:res?.data?.otp,screenName:"signup",email:email});
          }
          else{
            RedSnackbar(res?.message);
          }
         
        },
        (res)=>
          console.log("error occured",res));
        
       
    }catch(e){
      console.log("error occured",e);
      
    }
  }

return(
  <ImageBackground source={appIcons.background} style={styles.mainDin}>
<View style={styles.scrollDesign}>
<KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
    <View>
      <Text style={styles.signUpText}>Sign up</Text>
    </View>
    <View style={styles.inputDiv}>
      <MyInput border={true} placeHolder="hey.ahmed005@gmail.com" value={email} setValue={setEmail} title="Email" textColor={colors.black} />
    </View>
    <View style={styles.inputDiv}>
      <MyInput border={true} placeHolder="********" value={password} setValue={setPassword} title="Password" secure={true}/>
    </View>
    <View style={styles.inputDiv}>
      <MyInput border={true} placeHolder="********" value={confirmPassword} setValue={setConfirmPassword} title="Confirm password" secure={true}/>
    </View>
    
    <View style={styles.agreeTermsStyle}>
    
    <CheckBox
        value={isChecked}
        onValueChange={setIsChecked }
        tintColors={{ true: '#126FCF', false: colors.black }}
        boxType="square" 
        tran
        
      />
      <Text style={styles.termConditionText}>By tapping confirm, you agree to the terms of service and privacy policy of S4 app</Text>

    </View>
    <View>
      <Button onPress={()=>
        //SingUpOperation()
        navigation.navigate(routes.drawer,{screen:routes.dashboard})
        } children="Sign up" themeColor={colors.theme}/>

    </View>
    <View style={styles.alreadyAccountDiv}>
      <Text style={styles.alreadyAccount}>
      Already have an account? 
      </Text>
     <TouchableOpacity onPress={()=>navigation.navigate(routes.login)}>
     <Text style={[styles.alreadyAccount,styles.alreadyLogin]}>
      LOGIN
      </Text>
     </TouchableOpacity>
    </View>


  </KeyboardAwareScrollView>
</View>
</ImageBackground>
  );
}


export default SignupScreen;