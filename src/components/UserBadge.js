import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, CustomText } from "../../src/common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";

const colorsArray = [
  Colors.info,
  Colors.darkPink,
  Colors.logoGreen,
  Colors.purple,
  Colors.darkGreen,
  Colors.teal,
  Colors.dim,
];

export default function UserBadge({ player }) {
  const { selectedPlayerId, setSelectedPlayerId, gameState } = useGameState();
  const backgroundColor = colorsArray[player.id % 6];
  const isSelected = selectedPlayerId == player.id;
  const isCurrentTurn =
    gameState.playerOrder[gameState.currentTurn] == player.id;

  return (
    <TouchableOpacity
      style={isCurrentTurn && styles.shadow}
      onPress={() => setSelectedPlayerId(player.id)}
    >
      <View style={styles.container}>
        <View style={[styles.innerBox, { backgroundColor }]}>
          {isCurrentTurn && <View style={styles.whiteDot} />}
          <View>
            <CustomText family="SemiBoldItalic" size={12}>
              {player.playerName}
            </CustomText>
            <BoldText>₹{(+player.playerInHandCash).toFixed(2)}L</BoldText>
          </View>
        </View>
        <View
          style={[
            styles.diagonal,
            {
              top: 0,
              transform: [
                { rotateZ: "35deg" },
                { translateX: isSelected ? -105 : -95 },
              ],
            },
          ]}
        />
        <View
          style={[
            styles.diagonal,
            {
              bottom: 0,
              transform: [
                { rotateZ: "-35deg" },
                { translateX: isSelected ? -105 : -95 },
              ],
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: 110,
    height: 40,
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
  },

  innerBox: {
    paddingHorizontal: 5,
    paddingLeft: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    width: 120,
    gap: -5,
    position: "relative",
  },

  whiteDot: {
    width: 14,
    height: 14,
    backgroundColor: Colors.white,
    borderRadius: 1000,
    position: "absolute",
    top: "50%",
    left: 20,
    transform: [{ translateY: -7 }],
  },

  diagonal: {
    position: "absolute",
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: Colors.black,
  },
});
