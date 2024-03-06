import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, CustomText, RegularText } from "../../src/common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import { useState } from "react";
import FloatingEmoji from "./FloatingEmoji";

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
  const [received, setReceived] = useState([]);
  const backgroundColor = colorsArray[player.id % 6];
  const isSelected = selectedPlayerId == player.id;
  const isCurrentTurn =
    gameState.playerOrder[gameState.currentTurn] == player.id;

  const onReceive = (emoji) => {
    const id = Math.random();
    setReceived((prev) => [...prev, { id, emoji }]);

    setTimeout(() => {
      setReceived((prev) => prev.filter((e) => e.id != id));
    }, 1100);
  };

  return (
    <TouchableOpacity
      style={isCurrentTurn && styles.shadow}
      onPress={() => {
        onReceive("😀");
        setSelectedPlayerId(player.id);
      }}
    >
      <View style={styles.container}>
        <View style={[styles.innerBox, { backgroundColor }]}>
          {received.map(({ id, emoji }) => (
            <FloatingEmoji key={id}>{emoji}</FloatingEmoji>
          ))}
          {isCurrentTurn && (
            <View style={[styles.whiteDot, { left: isSelected ? 15 : 25 }]} />
          )}
          <View>
            <CustomText family="SemiBoldItalic" size={10}>
              {player.playerName}
            </CustomText>
            <BoldText size={12}>
              ₹{(+player.playerInHandCash).toFixed(2)}L
            </BoldText>
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
    // overflow: "hidden",
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
    backgroundColor: "#6EC531",
    borderRadius: 3,
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -7 }, { rotate: "45deg" }],
  },

  diagonal: {
    position: "absolute",
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: Colors.black,
  },

  shadow: {
    overflow: "visible",
    shadowColor: Colors.green,
    shadowOffset: {
      width: 13,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 16,
  },
});
