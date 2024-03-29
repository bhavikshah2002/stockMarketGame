import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useGameState } from "../../src/contexts/GameStateContext";
import HistoryModal from "../../src/components/HistoryModal";
import CompanyCard from "../../src/components/CompanyCard";
import PriceBook from "../../src/components/PriceBook";
import { SemiBoldText } from "../../src/common/Text";
import BigCard from "../../src/components/BigCard";
import { Companies } from "../../src/data/cards";
import { Colors } from "../../src/common/styles";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

export default function CommonRound() {
  const { gameState, selectedPlayerId } = useGameState();
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [priceBookVisible, setPriceBookVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.sides}>
        <FlatList
          data={Companies.slice(0, 4)}
          renderItem={({ item }) => (
            <CompanyCard
              currentWorth={gameState.companyValues[item.id].companyShareValue}
              company={item}
              yourHoldings={
                gameState.userState[selectedPlayerId].holdings[item.id]
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.middle}>
        <BigCard />
      </View>
      <View style={styles.sides}>
        <FlatList
          data={Companies.slice(4)}
          renderItem={({ item }) => (
            <CompanyCard
              currentWorth={gameState.companyValues[item.id].companyShareValue}
              company={item}
              yourHoldings={
                gameState.userState[selectedPlayerId].holdings[item.id]
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.ModalButtonContainer}>
          <HistoryModal
            historyModalVisible={historyModalVisible}
            setHistoryModalVisble={setHistoryModalVisible}
          />
          <PriceBook
            priceBookVisible={priceBookVisible}
            setPriceBookVisible={setPriceBookVisible}
          />

          <TouchableOpacity
            style={{
              ...styles.ModalButton,
              borderBottomWidth: 1,
              borderColor: Colors.dim,
            }}
            onPress={() => {
              setHistoryModalVisible(true);
            }}
          >
            <SemiBoldText size={11}>Transaction History</SemiBoldText>
            <AntDesign name="arrowright" size={16} color={Colors.dim} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.ModalButton,
            }}
            onPress={() => {
              setPriceBookVisible(true);
            }}
          >
            <SemiBoldText size={11}>View Price Book</SemiBoldText>
            <AntDesign name="arrowright" size={16} color={Colors.dim} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    paddingHorizontal: 20,
  },

  sides: {
    flex: 1,
    marginVertical: 10,
  },

  middle: {
    width: 180,
  },
  ModalButtonContainer: {
    gap: 2,
    paddingVertical: 2,
    backgroundColor: "#141414",
    position: "relative",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  ModalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
});
