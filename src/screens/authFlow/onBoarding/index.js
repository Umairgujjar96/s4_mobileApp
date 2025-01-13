import React, { useState } from "react";
import { Text, View ,Image} from "react-native";
import { Button } from "../../../components";
import styles from "./style";
import { appIcons, colors, routes } from "../../../services";



const OnBoarding = ({ navigation }) => {

    const [index,setIndex] = useState(0);

    const itemsArray = [
        {
            img:appIcons.onBoard1,
            heading:"Meet new people , share your interest",
            subText:"Discover a world of possibilities on our social platform share your ideas , connect with like minded indiviuals and explore new content.",
            buttonText:"Next",
        },
        {
            img:appIcons.onBoard2,
            heading:"Start sharing your thoughts, photos",
            subText:"Experience the best of social media on our platform connect with friends , share your life and discover new interests.",
            buttonText:"Next",
        },
        {
            img:appIcons.onBoard3,
            heading:"Ready to jump in ? Let’s Go",
            subText:"Experience the best of social media on our platform connect with friends , share your life and discover new interests.",
            buttonText:"Lets go",
        },
       
    ];

    const onBoardPress = ()=>{
        if(index<2){
            setIndex(index + 1);
            return;
        }
        navigation.navigate(routes.signup);

    }
    return(
        <View style={styles.mainDiv}>
      
      <View style={styles.contentDiv}>
      <View style={styles.imageDiv}>
        <Image source={itemsArray[index].img}/>
      </View>
      <View style={styles.textDiv}>
      <Text style={styles.headingText}>{itemsArray[index].heading}</Text>
        <Text style={styles.subTextStyle}>{itemsArray[index].subText}</Text>
      </View>
    </View>
     
      <View style={styles.buttonDiv}>
       <View style={styles.buttonStyles}>
       <Button themeColor={colors.theme} children={itemsArray[index].buttonText} arrow={true} onPress={onBoardPress}/>
       </View>
      </View>
    </View>

    );
    
    
 
};

export default OnBoarding;
