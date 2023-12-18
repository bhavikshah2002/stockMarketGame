import { Text } from "react-native";

export function RegularText({
  transform,
  size,
  color='white',
  style,
  children,
  ...props
}) {
  return (
    <Text
      style={[
        {
          fontFamily: "Poppins-Regular",
          fontSize: size,
          color,
          textTransform: transform,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function BoldText({
  transform,
  size,
  color='white',
  style,
  children,
  ...props
}) {
  return (
    <Text
      style={[
        {
          fontFamily: "Poppins-Bold",
          fontSize: size,
          color,
          textTransform: transform,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function SemiBoldText({
  transform,
  size,
  color='white',
  style,
  children,
  ...props
}) {
  return (
    <Text
      style={[
        {
          fontFamily: "Poppins-SemiBold",
          fontSize: size,
          color,
          textTransform: transform,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function LightText({
  transform,
  size,
  color='white',
  style,
  children,
  ...props
}) {
  return (
    <Text
      style={[
        {
          fontFamily: "Poppins-Light",
          fontSize: size,
          color,
          textTransform: transform,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export function ItalicText({
  transform,
  size,
  color='white',
  style,
  children,
  ...props
}) {
  return (
    <Text
      style={[
        {
          fontFamily: "Poppins-Italic",
          fontSize: size,
          color,
          textTransform: transform,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
