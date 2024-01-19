import {
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../../src/common/Text";
import { useMemo, useState } from "react";
import GameStateContextProvider, {
  useGameState,
} from "../../src/contexts/GameStateContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Settings from "./settings";

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
            {/* <MaterialCommunityIcons name="cash" size={24} color="#e1e3e2" /> */}
          </View>
          <View style={{ justifyContent: "center" }}>
            <SemiBoldText size={14}>₹{selfInfo.cashInHand}</SemiBoldText>
            <SemiBoldText size={14}>₹{selfInfo.cashInStock}</SemiBoldText>
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
            Total Worth <SemiBoldText>₹{selfInfo.totalWorth}L</SemiBoldText>
          </RegularText>
        </View>
        <View style={styles.RoundInfo}>
          <View>
            <SemiBoldText size={13}>Sub-Round</SemiBoldText>
            <SemiBoldText size={13}>Mega-Round</SemiBoldText>
          </View>
          <View style={{ marginLeft: 10 }}>
            <RegularText size={13}>{gameState["currentSubRound"]}</RegularText>
            <RegularText size={13}>{gameState["currentMegaRound"]}</RegularText>
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
