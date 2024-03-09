import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, CustomText, SemiBoldText } from "../../src/common/Text";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import { useEffect, useState } from "react";
import FloatingEmoji from "./FloatingEmoji";
import { AntDesign } from "@expo/vector-icons";

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
  const {
    selectedPlayerId,
    setSelectedPlayerId,
    gameState,
    conn,
    isAdmin,
    myUserId,
  } = useGameState();
  const [received, setReceived] = useState([]);
  const [isKicking, setIsKicking] = useState(false);
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

  const kickUser = () => {
    console.log("Kick user:", player.playerName);
  };

  useEffect(() => {
    if (!conn.current) return;

    const handleMessage = (data) => {
      if (data.username == player.playerName) {
        onReceive(data.emoji);
      }
    };

    conn.current.on("emoticon", handleMessage);

    return () => {
      conn.current.off("emoticon", handleMessage);
    };
  }, [conn.current]);

  return (
    <TouchableOpacity
      style={isCurrentTurn && styles.shadow}
      onLongPress={() => {
        if (isAdmin && myUserId != player.id) {
          setIsKicking(true);
        }
      }}
      onPress={() => {
        setSelectedPlayerId(player.id);
      }}
    >
      <View style={styles.container}>
        {!isKicking ? (
          <View style={[styles.innerBox, { backgroundColor }]}>
            {received.map(({ id, emoji }) => (
              <FloatingEmoji id={id} key={id}>
                {emoji}
              </FloatingEmoji>
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
        ) : (
          <View style={styles.kickPanel}>
            <TouchableOpacity onPress={kickUser}>
              <SemiBoldText size={16} transform="uppercase">
                Kick
              </SemiBoldText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsKicking(false)}>
              <AntDesign name="close" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={[
            styles.diagonal,
            {
              top: 0,
              transform: [
                { rotateZ: "35deg" },
                { translateX: isSelected ? -45 : -35 },
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
                { translateX: isSelected ? -45 : -35 },
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

    // zIndex:9999,
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
    width: 50,
    height: 50,
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

  kickPanel: {
    backgroundColor: Colors.red,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
    paddingRight: 8,
  },
});
