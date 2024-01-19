import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useGameState } from "../../src/contexts/GameStateContext";
import { Companies } from "../../src/data/cards";
import CompanyCard from "../../src/components/CompanyCard";
import CardEntity from "../../src/components/CardEntity";
import CompanyEntity from "../../src/components/CompanyEntity";
import { LightText, SemiBoldText } from "../../src/common/Text";
import { Colors } from "../../src/common/styles";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import Animated from "react-native-reanimated";
import HistoryModal from "../../src/components/HistoryModal";
import PriceBook from "../../src/components/PriceBook";

export default function MyTurnScreen() {
  const { gameState, selectedEntityType, conn,myUserId } = useGameState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [priceBookVisible, setPriceBookVisible] = useState(false);
  const thisUserId = 0;

  const onPass = () => {
    conn.current?.emit("pass", { userId:  myUserId});
  };

  return (
    <View style={styles.container}>
      <View style={styles.sides}>
        <TouchableOpacity style={styles.btn} onPress={onPass}>
          <LightText align={"center"} size={18}>
            PASS
          </LightText>
        </TouchableOpacity>
        <FlatList
          data={Companies}
          renderItem={({ item }) => (
            <CompanyCard
              currentWorth={gameState.companyValues[item.id].companyShareValue}
              company={item}
              yourHoldings={gameState.userState[thisUserId].holdings[item.id]}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.center}>
        {selectedEntityType == "card" && <CardEntity />}
        {selectedEntityType == "company" && <CompanyEntity />}
        <View style={styles.moreOptions}>
          <TouchableOpacity
            onPress={() => setIsMenuOpen((p) => !p)}
            style={styles.moreBtn}
          >
            <Feather name="more-horizontal" size={24} color={Colors.dim} />
          </TouchableOpacity>

          <HistoryModal
            historyModalVisible={historyModalVisible}
            setHistoryModalVisble={setHistoryModalVisible}
          />
          <PriceBook
            priceBookVisible={priceBookVisible}
            setPriceBookVisible={setPriceBookVisible}
          />

          {isMenuOpen && (
            <Animated.View style={styles.menu}>
              <TouchableOpacity
                onPress={() => {
                  setIsMenuOpen(false);
                  setHistoryModalVisible(true);
                }}
              >
                <SemiBoldText size={12} color={Colors.white}>
                  Transactions
                </SemiBoldText>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: Colors.white,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsMenuOpen(false);
                  setPriceBookVisible(true);
                }}
              >
                <SemiBoldText size={12} color={Colors.white}>
                  PriceBook
                </SemiBoldText>
              </TouchableOpacity>
            </Animated.View>
          )}
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
    overflow: "hidden",
    marginVertical: 10,
  },

  center: {
    width: 400,
    position: "relative",
  },

  btn: {
    paddingHorizontal: 15,
    paddingTop: 2,
    paddingBottom: 1,
    borderRadius: 2,
    marginBottom: 8,
    backgroundColor: Colors.info,
  },

  moreOptions: {
    position: "absolute",
    top: 15,
    right: 5,
    alignItems: "flex-end",
  },

  moreBtn: {
    backgroundColor: "#141414",
    borderRadius: 1000,
    padding: 2,
  },

  menu: {
    backgroundColor: "#141414",
    width: 130,
    padding: 2,
    paddingLeft: 5,
    marginTop: 8,
    borderRadius: 4,
    borderColor: Colors.dim,
    borderWidth: 0.3,
    shadowColor: Colors.dim,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
});
