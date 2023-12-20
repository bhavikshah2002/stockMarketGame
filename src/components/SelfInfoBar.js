import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../../src/common/Text";
import { useState } from "react";
import GameStateContextProvider from "../../src/contexts/GameStateContext";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
export default function SelfInfoBarComponent() {
    const [selfInfo, setSelfInfo] = useState({
        userName:"BuddyShah23",
        cashInHand: 6.5,
        cashInStock: 12.2,
        totalWorth: 18.7
      })
      const [roundInfo, setRoundInfo] = useState({
        subRoundNumber: 2,
        megaRoundNumber: 5
      })
  return (
    <>
      <TouchableOpacity style={styles.SettingButton}>
        <Ionicons name="settings" size={28} color="#e1e3e2" />
      </TouchableOpacity>
      <View style={styles.SelfInfoContent}>
        <View style={styles.WorthInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 25 }}>
            <MaterialCommunityIcons
              name="account-cash-outline"
              size={20}
              color="#e1e3e2"
            />
            {/* <MaterialCommunityIcons name="cash" size={24} color="#e1e3e2" /> */}
            <SemiBoldText size={14}>₹{selfInfo.cashInHand}L</SemiBoldText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 25 }}>
            <Octicons name="graph" size={20} color="#e1e3e2" />
            <SemiBoldText size={14}>₹{selfInfo.cashInStock}L</SemiBoldText>
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
            <RegularText size={13}>{roundInfo.subRoundNumber}</RegularText>
            <RegularText size={13}>{roundInfo.megaRoundNumber}</RegularText>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    SettingButton: {
        marginLeft: 20,
      },
      SelfInfoContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
      },
      WorthInfo: {
        alignItems: "center",
        gap:5
      },
      UserName: {
        justifyContent: "center",
        alignItems: "center",
      },
      RoundInfo: {
        flexDirection: "row",
        alignItems: "center",
      },
})
