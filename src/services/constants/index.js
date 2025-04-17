import { Dimensions, PixelRatio } from "react-native";
const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

export const storageKey = {};

export const routes = {
  messages: "messages",
  auth: "auth",
  tab: "tabNavigator",
  changePassword: 'changePassword',
  drawer: "drawer",
  app: "app",
  setting: "setting",
  splash: "splash",
  onBoarding: "onBoarding",
  selectAccount: "selectAccount",
  login: "login",
  signup: "signup",
  otp: "otp",
  buildProfile: "buildProfile",
  dashboard: "dashboard",
  listing: "listing",
  eventList: "eventList",
  userListing: "userListing",
  favorite: "favorite",
  addItem: "addItem",
  reminders: "reminders",
  profile: "profile",
  settings: "settings",
  addMember: "addMember",
  userProfile: "userProfile",
  profilestack: "profilestack",
  friends: "friends",
  editProfile: "editProfile",
  inviteFriends: "inviteFriends",
  content: "content",
  contactUs: "contactUs",
  feedback: "feedback",
  delete: "delete",
  deleteVerfication: "deleteVerfication",
  forgotPassword: "forgotPassword",
  followers: "followers",
  createpost: "createpost",
  previewpost: "previewpost",
  notification: "notification",
  singlepost: 'singlepost',
  individualMessages: "individualMessages",
  followings: "followings",
  purchaseTokens: "purchaseTokens",
  withdrawTokens: "withdrawTokens",
};

export const loaderStyles = {
  CircleFlip: "CircleFlip",
  Bounce: "Bounce",
  Wave: "Wave",
  WanderingCubes: "WanderingCubes",
  Pulse: "Pulse",
  ChasingDots: "ChasingDots",
  ThreeBounce: "ThreeBounce",
  Circle: "Circle",
  CubeGrid: "9CubeGrid",
  WordPress: "WordPress",
  FadingCircle: "FadingCircle",
  FadingCircleAlt: "FadingCircleAlt",
  Arc: "Arc",
};

export const wp = (p) => WINDOW_WIDTH * (p / 100);
export const hp = (p) => WINDOW_HEIGHT * (p / 100);
export { WINDOW_HEIGHT, WINDOW_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH };

const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

function normalize(size, based = "width") {
  const newSize =
    based === "height" ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
const widthPixel = (size) => {
  return normalize(size, "width");
};
const heightPixel = (size) => {
  return normalize(size, "height");
};
const fontPixel = (size) => {
  return heightPixel(size);
};

export { widthPixel, heightPixel, fontPixel };
