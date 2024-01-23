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
  const { selectCompany, gameState } = useGameState();
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
        style={{ width: 65, height: 40 }}
        colors={["transparent", "#141414"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.95, y: 0.5 }}
      />
      <View style={{ flex: 1 }}>
        <SemiBoldText size={13}>{company.name}</SemiBoldText>
        <RegularText size={9} color={Colors.dim}>
          Price
          <CustomText family="SemiBoldItalic" color={color}>
            {"  "}₹{currentWorth}
          </CustomText>
        </RegularText>
      </View>
      <View style={{ marginRight: 6 }}>
        {yourHoldings != 0 ? (
          <BoldText size={18}>{(yourHoldings / 1000).toFixed(0)}K</BoldText>
        ) : (
          <BoldText size={18}></BoldText>
        )}
      </View>
    </TouchableOpacity>
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
