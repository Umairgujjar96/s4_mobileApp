export const BASE_URL =
  "http://192.168.18.38:8000/";
export const IMAGE_BASE_URL = "";

export const api = {
  appItem: "appItem",
  signup: "auth/register",
  login: "auth/login",
  otpVerify: "user/verify",
  sendOtp: "user/sendOTP",
  updateProfile: "user/updateProfile",
  wishList: "wishlist",
  getItem: "link",
  getFriend: "friend",
  deleteUser: "user/deleteMe",
  logout: "user/logout",
  getUsers: "user/all",
  deleteFriend: "friend",
  addFriend: "friend",
  reminders: "user/reminders",

  forgot:"auth/forgotPassword",
  resetpassword:"auth/resetPassword",
  post:"post/create",

  getPosts:"post",
  
  toggleLike:"toggleLike",
  personalProfile:"user/profile",
  comment:"comment",
  follow:"follow",
  getFollowers:"getFollowers",
  getFollowings:"getFollowings",
  

};
