import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../common/styles";

const { height } = Dimensions.get("window");
const padding = 10;
const radius = (height - 2 * padding) / 2;

export default function RoundStartScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.sqContainer}>
        <View style={styles.circleTable}>
          {new Array(8).fill(0).map((_, i, arr) => (
            <Card index={i} totalDecks={arr.length} />
          ))}
        </View>
      </View>
    </View>
  );
}

function Card({ totalDecks, index, children }) {
  const cardHeight = 40;
  const cardWidth = 30;
  const angle = (2 * Math.PI * index) / totalDecks;

  return (
    <View
      style={{
        height: cardHeight,
        width: cardWidth,
        backgroundColor: Colors.dim,
        borderRadius: 3,
        position: "absolute",
        bottom: 0.8 * radius * Math.sin(angle) + radius - cardHeight / 2,
        right: 0.8 * radius * Math.cos(angle) + radius - cardWidth / 2,
      }}
    >
      {children}
    </View>
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
