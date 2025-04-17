import { StyleSheet } from "react-native";
import {
  colors,
  fontFamily,
  fontPixel,
  heightPixel,
  hp,
  widthPixel,
  wp,
} from "../../../services";
import { timeAgo } from "../../../services/helpingMethods";
const styles = StyleSheet.create({
  notificationMain: {
    margin: heightPixel(15),
    flex: 1,
  },
  name: {
    color: colors.black,
    fontSize: fontPixel(16),
    fontWeight: "bold",
    marginBottom: heightPixel(8),
  },
  heading: {
    color: colors.black,
    fontSize: fontPixel(16),
    fontWeight: "bold",
    alignSelf: "center",
  },
  tokenRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(3),
  },
  tokenIcon: {
    height: heightPixel(30),
    width: heightPixel(30),
    resizeMode: "contain",
  },
  tokenName: {
    color: "gold",
    fontSize: fontPixel(14),
    fontWeight: "bold",
    marginLeft: wp(2),
  },
  tokenPrice: {
    color: "grey",
    fontSize: fontPixel(12),
    marginLeft: wp(2),
    fontFamily: fontFamily.appTextItalic,
  },
  totalPrice: {
    color: colors.black,
    fontSize: fontPixel(16),
  },
  total: {
    color: colors.theme,
    fontSize: fontPixel(16),
  },
  counterButton: {
    backgroundColor: colors.theme,
    height: heightPixel(26),
    width: heightPixel(26),
    justifyContent: "center",
    marginLeft: wp(2),
    alignItems: "center",
    borderRadius: heightPixel(13),
  },
  counterText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: fontPixel(18),
  },
  counterValue: {
    color: colors.black,
    marginLeft: wp(2),
    fontSize: fontPixel(14),
  },
  noTokensContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: heightPixel(30),
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: "75%",
    marginVertical: heightPixel(20),
    shadowColor: colors.grey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyWalletIcon: {
    width: widthPixel(60),
    height: heightPixel(60),
    tintColor: colors.grey,
    marginBottom: heightPixel(15),
  },
  noTokensText: {
    fontSize: fontPixel(18),
    fontWeight: "bold",
    color: colors.black,
    marginBottom: heightPixel(8),
  },
  noTokensSubtext: {
    fontSize: fontPixel(14),
    color: colors.grey,
    textAlign: "center",
  },
});

export default styles;
