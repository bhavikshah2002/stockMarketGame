import { Animated, StyleSheet, View } from "react-native";
import { RegularText } from "../common/Text";
import { useEffect, useRef } from "react";

export default function FloatingEmoji({ children }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -50,
      duration: 900,
      delay: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 900,
      delay: 100,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  return (
    <Animated.View
      style={[{ transform: [{ translateY }], opacity }, styles.floating]}
    >
      <RegularText size={15}>{children}</RegularText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: "absolute",
    right: 25,
    top: 0,
    zIndex: 999,
  },
});
