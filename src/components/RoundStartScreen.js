import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../common/styles";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

const { height } = Dimensions.get("window");
const padding = 10;
const radius = (height - 2 * padding) / 2;

export default function RoundStartScreen() {
  const scale = useSharedValue(0);
  const duration = 4000;
  const easing = Easing.cubic;

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(0, { duration, easing }),
        withTiming(1, { duration, easing }),
        withTiming(0, { duration, easing })
      ),
      -1,
      true
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sqContainer}>
        <View style={styles.circleTable}>
          {new Array(7).fill(0).map((_, i, arr) => (
            <Card scale={scale} index={i} totalDecks={arr.length} />
          ))}
        </View>
      </View>
    </View>
  );
}

function Card({ totalDecks, index, children, scale }) {
  const cardHeight = 40;
  const cardWidth = 30;
  const angle = (2 * Math.PI * index) / totalDecks;

  const animatedStyles = useAnimatedStyle(() => {
    const overlap = 0.5;
    const isActive =
      scale.value * totalDecks > index - overlap &&
      scale.value * totalDecks < index + 1 + overlap;

    if (!isActive) {
      return {
        bottom: radius - cardHeight / 2,
        right: radius - cardWidth / 2,
        backgroundColor: Colors.dim,
      };
    }

    const scalefactor = scale.value * radius;

    return {
      bottom: scalefactor * Math.sin(angle) + radius - cardHeight / 2,
      right: scalefactor * Math.cos(angle) + radius - cardWidth / 2,
      backgroundColor: Colors.teal,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: cardHeight,
          width: cardWidth,
          backgroundColor: Colors.dim,
          borderRadius: 3,
          position: "absolute",
        },
        animatedStyles,
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    height: "100%",
    alignItems: "center",
  },

  sqContainer: {
    position: "relative",
    height: 2 * radius,
    width: 2 * radius,
    marginTop: padding,
  },

  circleTable: {
    aspectRatio: 1,
    position: "absolute",
    backgroundColor: "#1f1f1f",
    borderRadius: 500,
    height: 2 * radius,
    width: 2 * radius,
  },
});
