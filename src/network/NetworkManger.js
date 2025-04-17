import { BASE_URL } from "./Environment";
import { getDeviceId } from "react-native-device-info";
import { store } from "../redux/store";

import NetworkUtils, { RedSnackbar } from "../services/helpingMethods";
import { accessToken } from "../redux/Slices/userSlice";

export const AUTHORIZE = "AUTHORIZE";
export const NETWORK_ERROR = "NETWORK ERROR";

export const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

export const Status = {
  SUCCESS: 200,
  ERROR: 400,
  AUTHENTICATION_FAIL: 401,
  NOT_FOUND: 400,
};

var defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const callApi = async (
  method,
  endPoint,
  bodyParams,
  onSuccess,
  onError,
  multipart
) => {
  const isConnected = await NetworkUtils.isNetworkAvailable();
  if (isConnected) {
    let token = store.getState().user.accessToken ?? false;

    console.log("token,,,,,", BASE_URL + endPoint)
    let refreshToken = store.getState().user.refreshToken ?? false;
    let url = BASE_URL + endPoint;
    if (multipart) {
      defaultHeaders["Content-Type"] = "multipart/form-data";
    } else {
      defaultHeaders["Content-Type"] = "application/json";
    }
    if (token) {
      console.log("token saved is :", token);
      defaultHeaders["Authorization"] = token;
    }
    let fetchObject = {
      method: method,
      headers: defaultHeaders,
      body:
        method == "GET"
          ? null
          : method == "DELETE"
            ? null
            : multipart
              ? bodyParams
              : JSON.stringify(bodyParams),
    };
    if (bodyParams == null) {
      delete fetchObject.body;
    }
    try {
      let response = await fetch(url, fetchObject);
      let responseJson = await response.json();
      if (responseJson?.message == "jwt expired") {
        let fetchObject = {
          method: "POST",
          headers: defaultHeaders,
          body: JSON.stringify({
            device: {
              id: getDeviceId(),
            },
          }),
        };
        await fetch(`${BASE_URL}user/refresh/${refreshToken}`, fetchObject)
          .then(async (res) => {
            let resJson = await res.json();
            store.dispatch(accessToken(resJson.data.accessToken));
            callApi(method, endPoint, bodyParams, onSuccess, onError);
          })
          .catch((err) => console.log("error refresh token=> ", erreeeeee));
      } else if (responseJson?.status < 400) {
        onSuccess(responseJson);
      } else {
        onError(responseJson);
      }
    } catch (error) {
      onError(error);
      RedSnackbar("Network request failed");
    }
  } else {
    onError("No internet connection");
    RedSnackbar("No internet connection");
  }
};
