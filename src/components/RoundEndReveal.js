import { StyleSheet, View } from "react-native";
import { BoldText } from "../common/Text";
import { Colors } from "../common/styles";

export default function RoundEndReveal({}) {
  return (
    <View style={styles.container}>
      <BoldText size={20}>Jai Shri Ram</BoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
