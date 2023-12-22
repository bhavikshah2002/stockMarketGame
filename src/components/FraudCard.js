import { BoldText, LightText, RegularText, SemiBoldText } from "../common/Text";
import CrystalContent from "./CrystalContent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "../common/styles";
import { Companies } from "../data/cards";
import { useGameState } from "../contexts/GameStateContext";
import { Entypo } from "@expo/vector-icons";

export default function FraudCard({ card }) {
  const { gameState } = useGameState();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View>
          <View style={styles.heading}>
            <BoldText>{card.crystalType.split("_").join("  ")}</BoldText>
          </View>
        </View>
        <CrystalContent type={card.crystalType} />
      </View>
      <View>
        <SemiBoldText style={{ marginVertical: 4 }}>Companies</SemiBoldText>
        <FlatList
          data={Companies}
          style={{ marginBottom: 5 }}
          renderItem={({ item }) => (
            <View style={styles.companyBox}>
              <SemiBoldText size={13} style={{ width: 70 }}>
                {item.name}
              </SemiBoldText>

              <LightText size={11} color={Colors.dim} style={styles.strike}>
                ₹{gameState.companyValues[item.id]}
              </LightText>
              <RegularText size={13} color={Colors.green}>
                ₹{Math.floor(gameState.companyValues[item.id] / 2)}
              </RegularText>
              <TouchableOpacity>
                <Entypo name="chevron-right" size={24} color={Colors.dim} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#141414",
    gap: 16,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
  },

  left: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  heading: {
    backgroundColor: Colors.info,
    paddingTop: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  companyBox: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
    backgroundColor: Colors.black,
  },

  strike: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
