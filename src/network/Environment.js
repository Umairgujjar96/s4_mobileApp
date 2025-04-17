export const BASE_URL =
  "http://ec2-16-171-52-243.eu-north-1.compute.amazonaws.com/";
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
  notification: 'notification',
  token: 'token',
  purchaseIntent: 'payment/purchase',
  confirmPayment: 'payment/confirm',
  tokenSend: 'token/send',

  forgot: "auth/forgotPassword",
  resetpassword: "auth/resetPassword",
  post: "post/create",

  getPosts: "post",

  toggleLike: "toggleLike",
  personalProfile: "user/profile",
  comment: "comment",
  follow: "follow",
  getFollowers: "follow/getFollowers",
  getFollowings: "follow/getFollowings",
  checkFollowing: "follow/checkFollowing",


};
