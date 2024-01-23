import { BoldText, RegularText, SemiBoldText } from "../../src/common/Text";
import { useGameState } from "../../src/contexts/GameStateContext";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import Settings from "./settings";
import { useMemo } from "react";

export default function SelfInfoBarComponent() {
  const { myUserName, gameState, myUserId } = useGameState();

  const selfInfo = useMemo(() => {
    if (!gameState) {
      return {
        userName: myUserName,
        cashInHand: 0,
        cashInStock: 0,
        totalWorth: 0,
      };
    }
    return {
      userName: myUserName,
      cashInHand: gameState.userState[myUserId].cashInHand,
      cashInStock: gameState.userState[myUserId].cashInStocks,
      totalWorth:
        (gameState.userState[myUserId].cashInHand +
          gameState.userState[myUserId].cashInStocks) /
        100000,
    };
  }, [gameState]);

  return (
    <>
      <Settings />
      <View style={styles.SelfInfoContent}>
        <View style={styles.WorthInfo}>
          <View
            style={{ alignItems: "center", gap: 5, justifyContent: "center" }}
          >
            <MaterialCommunityIcons
              name="account-cash-outline"
              size={20}
              color="#e1e3e2"
            />
            <Octicons name="graph" size={20} color="#e1e3e2" />
          </View>
          <View style={{ justifyContent: "center" }}>
            <SemiBoldText size={14}>
              ₹{(+selfInfo.cashInHand).toFixed(0)}
            </SemiBoldText>
            <SemiBoldText size={14}>
              ₹{(+selfInfo.cashInStock).toFixed(0)}
            </SemiBoldText>
          </View>
        </View>
        <View style={styles.UserName}>
          <TouchableOpacity>
            <BoldText
              size={20}
              style={{
                textDecorationLine: "underline",
                fontStyle: "italic",
              }}
            >
              {selfInfo.userName}
            </BoldText>
          </TouchableOpacity>
          <RegularText size={12}>
            Total Worth{" "}
            <SemiBoldText>₹{selfInfo.totalWorth.toFixed(2)}L</SemiBoldText>
          </RegularText>
        </View>
        <View style={styles.RoundInfo}>
          <View>
            <SemiBoldText size={13}>Sub Round</SemiBoldText>
            <SemiBoldText size={13}>Mega Round</SemiBoldText>
          </View>
          <View style={{ marginLeft: 10 }}>
            <RegularText size={13}>{gameState.currentSubRound}</RegularText>
            <RegularText size={13}>{gameState.currentMegaRound}</RegularText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  SelfInfoContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  WorthInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  UserName: {
    justifyContent: "center",
    alignItems: "center",
  },
  RoundInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
});
