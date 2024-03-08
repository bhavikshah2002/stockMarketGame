import { Image, StyleSheet, View } from "react-native";
import { CustomText, RegularText, SemiBoldText } from "../common/Text";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import { FadeInView } from "../common/animations";

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
        style={{ width: 65 }}
        colors={["transparent", "#141414"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.99, y: 0 }}
      />
      <View style={{ flex: 1, marginTop: 2 }}>
        <SemiBoldText size={13}>{company.name}</SemiBoldText>
        <RegularText size={9} color={Colors.dim}>
          Last Value
          <CustomText family="SemiBoldItalic" color={Colors.dim}>
            {"  "}₹{currentWorth}
          </CustomText>
        </RegularText>
      </View>
      <View style={{ marginRight: 6, marginTop: 8 }}>
        <FadeInView delay={(gameState.noOfPlayers + 1) * company.id * 2000}>
          <CustomText family="SemiBoldItalic" color={color}>
            {"  "}₹{newValue}
          </CustomText>
        </FadeInView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    flexDirection: "row",
    gap: 5,
    alignItems: "stretch",
    backgroundColor: "#141414",
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
  },

  logo: {
    width: 65,
    height: "100%",
    position: "absolute",
    objectFit: "cover",
    left: 0,
    top: 0,
  },
});
