import { StyleSheet } from "react-native";
import { colors, fontPixel, heightPixel, widthPixel } from "../../../services";

const styles = StyleSheet.create({
  mainDiv: {
    flex: 8.5,
  },
  buttonDiv: {
    flex: 1.5,

    justifyContent: "center",
    alignItems: "center",
  },
  contentDiv: {
    flex: 9,
  },
  buttonStyles: {
    width: widthPixel(300),
  },
  imageDiv: {
    flex: 7,
  },
  textDiv: {
    flex: 3.4,
    alignItems: "center",
    // backgroundColor:'red',
    marginLeft: widthPixel(20),
    marginRight: widthPixel(20),
    marginTop: heightPixel(140),
  },
  headingText: {
    marginTop: 44,
    color: colors.black,
    fontSize: fontPixel(20),
    fontWeight: "bold",
  },
  subTextStyle: {
    marginTop: heightPixel(20),
    color: colors.black,
    fontSize: fontPixel(14),
  },
});

export default styles;
