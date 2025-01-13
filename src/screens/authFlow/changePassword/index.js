import React, { useState } from "react";
import { Text,View,ScrollView,ImageBackground } from "react-native";
import styles from "./style";
import { Button, MyInput,Global } from "../../../components";
import { appIcons, colors, heightPixel, routes } from "../../../services";
import CheckBox from '@react-native-community/checkbox';
import { callApi } from "../../../network/NetworkManger";
import { api } from "../../../network/Environment";
import { RedSnackbar } from "../../../services/helpingMethods";
import { passwordFormat } from "../../../services/validations";


const ChangePassword = ({navigation,route})=>{
  const {email} = route.params;
  const [confirmPassword,setConfirmPassword] = useState('');
  const [password,setPassword] = useState('');
  const [isChecked,setIsChecked] = useState(false);

  const inputValidation = () => {
    if(confirmPassword !== password){
      RedSnackbar("Password Mismatch");
      return false;
    }
    else if(!passwordFormat.test(password) || !passwordFormat.test(confirmPassword) ){
      RedSnackbar("Invalid Password");
      return false;
    }
    return true;
  }


  const ChangePassword =async ()=>{
    const status = inputValidation();
    if(!status){
      return;
    }
    try{
      const response = await callApi("POST",api.resetpassword,{email:email,newPassword:password},
        (res)=>{
          if(res?.status){
            console.log(res);
          navigation.navigate(routes.login);
          }
          else{
            RedSnackbar(res?.message);
          }
        }
        ,
        (err)=>{
          console.log("error occured",e);
          
        }
      )
    }catch(e){
      console.log("error occured",e);
    }
  }
  
return(
  <ImageBackground source={appIcons.background} style={styles.mainDin}>
  <ScrollView contentContainerStyle={styles.scrollDesign}>
    
      <View style={styles.inputDivs}>
      <Text style={styles.loginText}>Change Password</Text>
      <Text>Enter new password and confirm</Text>
    
   
      <MyInput border={true} placeHolder="********" value={password} setValue={setPassword} title="Password" textColor={colors.black} secure={true} />
   
    
      <MyInput border={true} placeHolder="********" value={confirmPassword} setValue={setConfirmPassword} title="Confirm Password" secure={true}/>
    

      </View>
    
    <View style={styles.buttonDiv}>
      <Button onPress={ChangePassword} children="Done" themeColor={colors.theme}/>
    </View>
    
  </ScrollView>
  </ImageBackground>
  );
}


export default ChangePassword;