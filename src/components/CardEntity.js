import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { BoldText, SemiBoldText } from "../common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import CrystalContent from "./CrystalContent";
import { TouchableOpacity } from "react-native-gesture-handler";

// To be designed more
export default function CardEntity() {
  const { selectedEntity: card } = useGameState();

  if (card?.type != "CRYSTAL") {
    return (
      <View style={styles.container}>
        <AntDesign name="exclamationcircle" size={24} color={Colors.red} />
        <SemiBoldText size={15} align="center">
          No card is selected
        </SemiBoldText>
      </View>
    );
  }

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
      <View style={styles.left}>
        <TouchableOpacity>
          <BoldText>USE</BoldText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#141414",
    gap: 6,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
  },

  left: {
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
});
