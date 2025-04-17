import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { EventRegister } from "react-native-event-listeners";
import Snackbar from "react-native-snackbar";


import { decode } from 'base64-arraybuffer'
import { S3 } from 'aws-sdk'
var fs = require('react-native-fs');

export const storeDataToStorage = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const removeDataFromStorage = async (key) => {
  await AsyncStorage.removeItem(key);
};

export const getDataFromStorage = async (value) => {
  let data = await AsyncStorage.getItem(value);
  let newData = JSON.parse(data);
  return newData;
};

export default class NetworkUtils {
  static async isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected;
  }
}

export const GreenSnackbar = (text) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    textColor: "#fff",
    backgroundColor: "#4BB543",
  });

  console.log("GreenSnackbar -> text", text);
};

export const RedSnackbar = (text) => {
  Snackbar.show({
    text: text,
    duration: Snackbar.LENGTH_SHORT,
    textColor: "#fff",
    backgroundColor: "red",
    numberOfLines: 3,
  });
  console.log("RedSnackbar -> text", text);
};

export const hexToRgbA = (hex) => {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",0.4)"
    );
  }
  throw new Error("Bad Hex");
};

export const useListenEffect = (cb, deps) => {
  useEffect(() => {
    const res = cb();
    let eventListener = EventRegister.addEventListener("newUser", cb);
    return () => {
      EventRegister.removeEventListener(eventListener);
      return res?.();
    };
  }, deps);
};

export function timeAgo(timeString) {
  const now = new Date();
  const postDate = new Date(timeString);
  const diffInSeconds = Math.floor((now - postDate) / 1000); // difference in seconds

  const intervals = [
    { label: "second", value: 60 },
    { label: "minute", value: 60 },
    { label: "hour", value: 24 },
    { label: "day", value: 30 },
    { label: "month", value: 12 },
    { label: "year", value: Infinity }
  ];

  let intervalValue = diffInSeconds;
  let label = "";

  for (let i = 0; i < intervals.length; i++) {
    const { label: currentLabel, value } = intervals[i];
    if (intervalValue < value) {
      label = currentLabel;
      break;
    }
    intervalValue = Math.floor(intervalValue / value);
  }

  const timeAgo = `${intervalValue} ${label}${intervalValue > 1 ? "s" : ""} ago`;

  return timeAgo;
}








const s3Config = {
  ACCESS_KEY: "AKIA5THB4BNGBFCJOTV4",
  SECRET_KEY: "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",
  REGION: "eu-north-1",
  BUCKET_NAME: "scroll4bucket",
};

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }
  let dateTime = new Date().getTime().toString();
  return result + "/" + dateTime;
}


export const uploadImageOnS3 = async (file, successPath) => {
  let filename = generateRandomString(8)
  const s3bucket = new S3({
    region: s3Config.REGION,
    accessKeyId: s3Config.ACCESS_KEY,
    secretAccessKey: s3Config.SECRET_KEY,
    Bucket: s3Config.BUCKET_NAME,
    signatureVersion: 'v4',
  });
  let contentType = file.type;
  let contentDeposition = `inline; filename="${filename}"`;
  const base64 = await fs.readFile(file.path, 'base64');
  const arrayBuffer = decode(base64);

  s3bucket.createBucket(async () => {
    const params = {
      Bucket: s3Config.BUCKET_NAME,
      Key: filename,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
    };
    await s3bucket.upload(params).promise()
      .then((data) => {
        successPath(data.Location)
        console.log(data.Location)
      })
      .catch((err) => {
        console.log(err)
      })
  });
}