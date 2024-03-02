import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export function FadeInView({
  children,
  duration = 250,
  delay = 0,
  style = {},
  easing,
  ...props
}) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      easing,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[{ opacity }, style]} {...props}>
      {children}
    </Animated.View>
  );
}

export function SlideInView({
  children,
  duration = 400,
  delay = 0,
  style = {},
  easing,
  ...props
}) {
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      delay,
      easing,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      easing,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <Animated.View
      style={[{ transform: [{ translateY }], opacity }, style]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
