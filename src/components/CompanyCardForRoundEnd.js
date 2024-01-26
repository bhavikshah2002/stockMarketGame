import { Image, StyleSheet, View } from "react-native";
import { CustomText, RegularText, SemiBoldText } from "../common/Text";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../common/styles";
import Animated, { FadeIn } from "react-native-reanimated";
import { useGameState } from "../contexts/GameStateContext";

export default function CompanyCardForRoundEnd({
  company,
  currentWorth,
  newValue = null,
}) {
  const { gameState } = useGameState();
  let color = Colors.info;
  if (newValue != null) {
    color = newValue > currentWorth ? Colors.logoGreen : Colors.red;

    if (currentWorth == newValue) color = Colors.info;
  }
  return (
    <View style={styles.container}>
      <Image source={company.photoUrl} style={styles.logo} />
      <LinearGradient
        style={{ width: 65, height: 40 }}
        colors={["transparent", "#141414"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.99, y: 0 }}
      />
      <View style={{ flex: 1 }}>
        <SemiBoldText size={13}>{company.name}</SemiBoldText>
        <RegularText size={9} color={Colors.dim}>
          Last Value
          <CustomText family="SemiBoldItalic" color={Colors.dim}>
            {"  "}₹{currentWorth}
          </CustomText>
        </RegularText>
      </View>
      <View style={{ marginRight: 6 }}>
        <Animated.Text
          style={{ fontFamily: "Poppins-SemiBoldItalic", color }}
          entering={FadeIn.delay(
            (gameState.noOfPlayers + 1) * company.id * 2000
          )}
        >
          {"  "}₹{newValue}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    backgroundColor: "#141414",
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
  },

  logo: {
    width: 65,
    height: 40,
    position: "absolute",
    objectFit: "cover",
    left: 0,
    top: 0,
  },
});
