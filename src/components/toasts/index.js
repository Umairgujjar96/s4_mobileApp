import Toast from "react-native-simple-toast";

export default function ShowMessage(message) {
  return Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
}
