import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const vh = (val) => (val * height) / 100;

export const vw = (val) => (val * width) / 100;

export const Colors = {
  black: "#000",
  dim: "#888",
  white: "#fff",
  green: "#23d997",
  red: "#ba110c",
  info: "#4287f5",
};
