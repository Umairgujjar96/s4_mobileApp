import { RedSnackbar } from "../helpingMethods";

export const emailFormat =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordFormat =
  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;
export const urlFormat = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
  "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
  "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
  "(\\#[-a-z\\d_]*)?$",
  "i"
);

export const isLoginValid = (email, password) => {
  if (email == "" && password == "") {
    RedSnackbar("Email and Password Required");
    return false;
  }
  if (!emailFormat.test(email)) {
    RedSnackbar("Enter valid email address");
    return false;
  }
  if (password.length < 8) {
    RedSnackbar(
      "Min 8 Characters required for password"
    );
    return false;
  }
  return true;
};

export const isForgotValid = (email) => {
  if (!emailFormat.test(email)) {
    RedSnackbar("Enter valid email address");
    return false;
  }
  return true;
};

export const isSignupValid = (email, password, confirmPassword) => {
  if (email == "" && password == "" && confirmPassword == "") {
    RedSnackbar("Required");
    return false;
  }
  if (!emailFormat.test(email)) {
    RedSnackbar("Enter valid email address");
    return false;
  }

  if (password.length < 8) {
    RedSnackbar(
      "Min 8 Characters required for password"
    );
    return false;
  }

  if (password != confirmPassword) {
    RedSnackbar("Confirm password did not matched!");
    return false;
  }
  return true;
};

export const isAddMemberValid = (first, last, image, date, memeber) => {
  if (
    first == " " &&
    last == "" &&
    image == "" &&
    date == "" &&
    memeber == ""
  ) {
    RedSnackbar("Required");
    return false;
  }
  if (first == "") {
    RedSnackbar("First name is required");
    return false;
  }
  if (last == "") {
    RedSnackbar("last name is required");
    return false;
  }
  if (image == "") {
    RedSnackbar("Image is required");
    return false;
  }
  if (date == "") {
    RedSnackbar("Date of birth is required");
    return false;
  }
  if (memeber == "") {
    RedSnackbar("Add member is required");
    return false;
  }
  return true;
};

export const isChangePasswordValid = (password, newPassword) => {
  if (password.length < 8) {
    RedSnackbar(
      "Min 8 Characters required for password"
    );
    return false;
  }

  if (password != newPassword) {
    RedSnackbar("Confirm password did not matched!");
    return false;
  }

  return true;
};

export const isChangePasswordValidInApp = (
  oldPassword,
  password,
  newPassword
) => {

  if (password.length < 8) {
    RedSnackbar(
      "Min 8 Characters required for password"
    );
    return false;
  }




  if (password != newPassword) {
    RedSnackbar("Password not matched");
    return false;
  }
  return true;
};

export const isEditValid = (firstName, lastName, dob) => {
  // if (image == null) {
  //   RedSnackbar("Image required");
  //   return false;
  // }
  if (firstName == "") {
    RedSnackbar("First name required");
    return false;
  }
  if (lastName == "") {
    RedSnackbar("Last name required");
    return false;
  }
  if (dob == "") {
    RedSnackbar("Date of birth required");
    return false;
  }
  return true;
};

export const isWishListValid = (title, image, link, event, desc) => {
  if (title == "") {
    RedSnackbar("Wishlist title required");
    return false;
  }
  if (image == "") {
    RedSnackbar("Wishlist image required");
    return false;
  }
  if (link == "") {
    RedSnackbar("Wishlist link required");
    return false;
  }
  if (!urlFormat.test(link)) {
    RedSnackbar("Wishlist link invalid");
    return false;
  }
  if (event == "") {
    RedSnackbar("Wishlist preferred event required");
    return false;
  }
  if (desc == "") {
    RedSnackbar("Wishlist description required");
    return false;
  }
  return true;
};
