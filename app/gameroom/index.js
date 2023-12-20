import { StyleSheet, View } from "react-native";
import { RegularText } from "../../src/common/Text";

export default function CommonRound() {
  return (
    <View style={styles.container}>
      <View style={styles.sides}>
        <RegularText>Left</RegularText>
      </View>
      <View style={styles.middle}>
        <RegularText>Mid</RegularText>
      </View>
      <View style={styles.sides}>
        <RegularText>Right</RegularText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },

  sides: {
    flex: 1,
  },

  middle: {
    flex: 1,
  },
});
