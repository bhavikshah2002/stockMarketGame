import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const vh = (val) => (val * height) / 100;

export const vw = (val) => (val * width) / 100;

export const Colors = {
  black: "#000000",
  dim: "#888888",
  white: "#ffffff",
  green: "#23d997",
  red: "#ba110c",
  info: "#4287f5",
  teal: "#1bcfab",
  purple: "#aa42f5",
  darkGreen: "#0c5419",
  darkPink: "#cf1bc0",
  logoGreen: "#039c09",
};
