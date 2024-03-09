import { Animated, StyleSheet } from "react-native";
import { RegularText } from "../common/Text";
import { useEffect, useRef } from "react";

export default function FloatingEmoji({ children, id }) {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: -50,
      duration: 700,
      delay: 100,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 0,
      duration: 900,
      delay: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[{ transform: [{ translateY }], opacity }, styles.floating]}
    >
      <RegularText size={20}>{children}</RegularText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: "absolute",
    right: 20,
    top: -10,
    padding: 0,
    margin: 0,
    zIndex: 999,
  },
});
