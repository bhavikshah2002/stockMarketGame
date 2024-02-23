import {
  BoldText,
  CustomText,
  RegularText,
  SemiBoldText,
} from "../../src/common/Text";
import { useGameState } from "../../src/contexts/GameStateContext";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import Settings from "./settings";
import { useMemo } from "react";
import { Colors } from "../common/styles";
import MiniCalculator from "./MiniCalculator";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function SelfInfoBarComponent() {
  const { myUserName, gameState, myUserId } = useGameState();
  const [calculatorVisible, setCalculatorVisible] = useState(false);
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
              size={18}
              color="white"
            />
            <Octicons name="graph" size={16} color="white" />
          </View>
          <View style={{ justifyContent: "center" }}>
            <RegularText size={13}>
              ₹{(+selfInfo.cashInHand).toFixed(0)}
            </RegularText>
            <RegularText size={13}>
              ₹{(+selfInfo.cashInStock).toFixed(0)}
            </RegularText>
          </View>
        </View>
        <View style={styles.UserName}>
          <TouchableOpacity>
            <CustomText
              family="ExtraBoldItalic"
              size={20}
              style={{ marginBottom: -5 }}
            >
              {selfInfo.userName}
            </CustomText>
          </TouchableOpacity>
          <RegularText size={12}>
            Total Worth{" "}
            <SemiBoldText>₹{selfInfo.totalWorth.toFixed(2)}L</SemiBoldText>
          </RegularText>
        </View>
        <View style={styles.RoundInfo}>
          <View style={styles.roundInfoSec}>
            <SemiBoldText size={10}>Sub Round</SemiBoldText>
            {gameState.currentSubRound == 4 ? (
              <BoldText
                style={{ marginBottom: -2 }}
                size={13}
                color={Colors.green}
              >
                C
              </BoldText>
            ) : (
              <BoldText style={{ marginBottom: -2 }} size={13}>
                {gameState.currentSubRound}
              </BoldText>
            )}
          </View>
          <View style={styles.roundInfoSec}>
            <SemiBoldText size={10}>Mega Round</SemiBoldText>
            <BoldText style={{ marginBottom: -2 }} size={13}>
              {gameState.currentMegaRound}
            </BoldText>
          </View>
        </View>
      </View>
      <MiniCalculator
        modalVisible={calculatorVisible}
        setModalVisible={setCalculatorVisible}
      />
      <TouchableOpacity
        onPress={() => {
          setCalculatorVisible(true);
        }}
      >
        <Ionicons
          name="calculator"
          size={25}
          color="white"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
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
    alignItems: "flex-end",
    gap: 2,
    marginTop: 3,
  },

  roundInfoSec: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
});
