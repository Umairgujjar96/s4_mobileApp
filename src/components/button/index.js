// import React from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

// import { colors, fontFamily, heightPixel, wp } from "../../services";
// import { useSelector } from "react-redux";

// const Button = ({
//   style,
//   disable,
//   containerStyle,
//   onPress,
//   themeColor,
//   payoutButton,
//   bidButton,
//   shadow,
//   children,
//   marginBottom,
// }) => {
//   const theme = useSelector((state) => state.user.themeColor);

//   return (
//     <View style={styles.topContainer}>
//       <TouchableOpacity
//         disabled={disable}
//         style={[
//           shadow && styles.shadow,
//           {
//             ...styles.container,
//             ...containerStyle,
//             borderRadius: payoutButton ? 12 : bidButton ? 10 : 30,
//             backgroundColor: themeColor ? themeColor : theme,
//             marginBottom: marginBottom ? marginBottom : heightPixel(20),
//           },
//         ]}
//         onPress={onPress}
//       >
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Text style={{ ...styles.label, ...style }}>{children}</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   topContainer: {},
//   container: {
//     width: "100%",
//     height: heightPixel(48),
//     alignItems: "center",
//     alignSelf: "center",
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   shadow: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 5,
//     },
//     shadowOpacity: 0.34,
//     shadowRadius: 6.27,

//     elevation: 10,
//   },
//   label: {
//     color: colors.white,
//     fontFamily: fontFamily.appTextSemiBold,
//     fontSize: 16,
//   },
// });

// export default Button;




import React from "react";
import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { appIcons, colors, fontFamily, heightPixel, widthPixel, wp } from "../../services";
import { useSelector } from "react-redux";


const Button = ({
  style,
  disable,
  containerStyle,
  onPress,
  themeColor,
  payoutButton,
  bidButton,
  shadow,
  children,
  marginBottom,
  gradient,
  arrow,

}) => {
  const theme = useSelector((state) => state.user.themeColor);
 
  
  const buttonStyle = [
    shadow && styles.shadow,
    {
      ...styles.container,
      ...containerStyle,
      borderRadius: payoutButton ? 12 : bidButton ? 10 : 30,
      backgroundColor: themeColor ? themeColor : theme,
      marginBottom: marginBottom ? marginBottom : heightPixel(20),
    },
  ];

  return (
    <View style={styles.topContainer}>
      {gradient ? (
        <LinearGradient
          colors={['pink', theme]}
          style={buttonStyle}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          locations={[0, 0.5]}
        >
          <TouchableOpacity
            disabled={disable}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={onPress}
          >
            <Text style={{ ...styles.label, ...style }}>{children}</Text>
          </TouchableOpacity>
        </LinearGradient>
      ) : (
        <TouchableOpacity
          disabled={disable}
          style={buttonStyle}
          onPress={onPress}
        >
          <View
            style={{
              flex:1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={[ styles.label, style, arrow && { marginLeft:widthPixel(30)}] }>{children}</Text>
          </View>
         {arrow && <View style={{backgroundColor:colors.themeSecondary,zIndex:1,alignItems:'center',justifyContent:'center',padding:heightPixel(23),borderRadius:50,}}>
          <Image style={{position:"absolute"}} source={appIcons.arrow}/>
          </View>}
          
          {/* <View style={{flexDirection:'row',alignItems: 'flex-end',justifyContent: 'flex-end'}}><Text style={{alignSelf:'flex-end',}}>hel</Text></View> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {},
  container: {
    width: "100%",
    height: heightPixel(48),
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  label: {
    color: colors.white,
    fontFamily: fontFamily.appTextSemiBold,
    fontSize: 16,
  },
});

export default Button;
