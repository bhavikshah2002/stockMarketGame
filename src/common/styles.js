import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const vh = (val) => (val * height) / 100;

export const vw = (val) => (val * width) / 100;
