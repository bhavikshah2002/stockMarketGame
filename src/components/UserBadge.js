import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, CustomText, RegularText } from "../../src/common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";

const colorsArray = [
  Colors.info,
  Colors.purple,
  Colors.darkGreen,
  Colors.teal,
  Colors.dim,
];

export default function UserBadge({ player }) {
  const { selectedPlayerId, setSelectedPlayerId, gameState } = useGameState();
  const color = colorsArray[player.id % 5];
  const isSelected = selectedPlayerId == player.id;
  const isCurrentTurn = gameState.currentTurn == player.id;

  return (
    <TouchableOpacity onPress={() => setSelectedPlayerId(player.id)}>
      <View style={[styles.container]}>
        <View
        
          style={{
            backgroundColor: color,
            paddingHorizontal: 5,
            paddingLeft: 35,
            justifyContent: "center",
            alignItems: "flex-end",
            borderRadius: 2,
            // borderWidth: 3,
            shadowColor: isCurrentTurn ? Colors.green : color,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 0,
            shadowOpacity:0.1

          }}
        >
          <CustomText family="SemiBoldItalic" size={9}>
            {player.playerName} {JSON.stringify(gameState.currentTurn)}
          </CustomText>
          <BoldText>₹{player.playerInHandCash}L</BoldText>
        </View>
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 100,
            height: 100,
            backgroundColor: Colors.black,
            transform: [
              { rotateZ: "35deg" },
              { translateX: isSelected ? -105 : -95 },
            ],
          }}
        />
        <View
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 100,
            height: 100,
            backgroundColor: Colors.black,
            transform: [
              { rotateZ: "-35deg" },
              { translateX: isSelected ? -105 : -95 },
            ],
          }}
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
});
