import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  BoldText,
  CustomText,
  RegularText,
  SemiBoldText,
} from "../common/Text";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";

export default function CompanyCard({ company, currentWorth, yourHoldings }) {
  const { selectCompany, gameState, selectedPlayerId } = useGameState();
  let color =
    currentWorth > gameState.priceBook[company.id].at(-2)
      ? Colors.green
      : Colors.red;
  if (gameState.priceBook[company.id].length == 1) color = Colors.info;
  if (currentWorth == gameState.priceBook[company.id].at(-2))
    color = Colors.info;

  return (
    <TouchableOpacity
      onPress={() => selectCompany(company)}
      style={styles.container}
      disabled={gameState.currentSubRound == 4}
    >
      <Image source={company.photoUrl} style={styles.logo} />
      <LinearGradient
        style={{ width: 65, minHeight: 40 }}
        colors={["transparent", "#141414"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.95, y: 0.5 }}
      />
      <View style={{ flex: 1, marginTop: 2 }}>
        <SemiBoldText size={13}>{company.name}</SemiBoldText>
        <RegularText size={9} color={Colors.dim}>
          Price
          <CustomText family="SemiBoldItalic" color={color}>
            {"  "}₹{currentWorth}
          </CustomText>
        </RegularText>
      </View>
      <View style={{ marginRight: 6, marginTop: 6 }}>
        {yourHoldings != 0 ? (
          <BoldText size={18}>{(yourHoldings / 1000).toFixed(0)}K</BoldText>
        ) : (
          <BoldText size={18}></BoldText>
        )}
      </View>

      {gameState?.chairman[company.id] == selectedPlayerId && (
        <RegularText style={styles.sideBadge}>Chairman</RegularText>
      )}
      {gameState?.director[company.id].includes(selectedPlayerId) && (
        <RegularText
          style={{ ...styles.sideBadge, backgroundColor: Colors.purple }}
        >
          Director
        </RegularText>
      )}
    </TouchableOpacity>
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

  sideBadge: {
    textTransform: "uppercase",
    textAlign: "center",
    width: 80,
    fontSize: 8,
    position: "absolute",
    backgroundColor: Colors.darkGreen,
    left: -10,
    transform: [{ translateX: -10 }, { translateY: 8 }, { rotateZ: "-30deg" }],
  },
});
