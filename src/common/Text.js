import { Text } from "react-native";

export function RegularText({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: "Poppins-Regular" }, style]} {...props}>
      {children}
    </Text>
  );
}

export function BoldText({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: "Poppins-Bold" }, style]} {...props}>
      {children}
    </Text>
  );
}

export function SemiBoldText({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: "Poppins-Bold" }, style]} {...props}>
      {children}
    </Text>
  );
}

export function LightText({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: "Poppins-Light" }, style]} {...props}>
      {children}
    </Text>
  );
}

export function ItalicText({ style, children, ...props }) {
  return (
    <Text style={[{ fontFamily: "Poppins-Italic" }, style]} {...props}>
      {children}
    </Text>
  );
}
