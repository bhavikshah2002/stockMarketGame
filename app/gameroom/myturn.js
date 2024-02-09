import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useGameState } from "../../src/contexts/GameStateContext";
import { LightText, RegularText, SemiBoldText } from "../../src/common/Text";
import CompanyEntity from "../../src/components/CompanyEntity";
import HistoryModal from "../../src/components/HistoryModal";
import CompanyCard from "../../src/components/CompanyCard";
import CardEntity from "../../src/components/CardEntity";
import PriceBook from "../../src/components/PriceBook";
import { Companies } from "../../src/data/cards";
import { Colors } from "../../src/common/styles";
import Animated from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import ModalForCard from "../../src/components/CrystalCards/ModalForCard";
import { Image } from "expo-image";
import MiniCalculator from "../../src/components/MiniCalculator";

export default function MyTurnScreen() {
  const {
    gameState,
    selectedEntityType,
    selectedEntity: company,
    conn,
    myUserId,
    selectedPlayerId,
  } = useGameState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [priceBookVisible, setPriceBookVisible] = useState(false);
  const [calcVisible, setCalcVisible] = useState(false);

  const onPass = () => {
    conn.current?.emit("pass", { userId: myUserId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sides}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setModalVisible(true);
          }}
        >
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
              yourHoldings={
                gameState.userState[selectedPlayerId].holdings[item.id]
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.center}>
        {modalVisible ? (
          <View style={styles.PassModal}>
            <ModalForCard
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              transactionInfo={
                <RegularText color={Colors.dim} align={"center"}>
                  Are you sure, You want to PASS your turn?
                </RegularText>
              }
              operatingFunction={onPass}
            />
          </View>
        ) : selectedEntityType == "card" ? (
          <CardEntity />
        ) : company ? (
          <CompanyEntity />
        ) : (
          <View
            style={[
              styles.companyContainer,
              { flexDirection: "column", justifyContent: "center", gap: 15 },
            ]}
          >
            <Image
              style={styles.logoMain}
              source={require("../../assets/images/withoutBgLogo1.png")}
              contentFit="contain"
            />
            <RegularText size={13} color={Colors.dim} align="center">
              Please select a company to proceed a transaction!
            </RegularText>
          </View>
        )}
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
          <MiniCalculator
            modalVisible={calcVisible}
            setModalVisible={setCalcVisible}
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
                  backgroundColor: Colors.dim,
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
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: Colors.dim,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setIsMenuOpen(false);
                  setCalcVisible(true);
                }}
              >
                <SemiBoldText size={12} color={Colors.white}>
                  Calculator
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
  PassModal: {
    flex: 1,
    marginVertical: 10,
  },
  companyContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#141414",
    gap: 6,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
  },
  logoMain: {
    width: 100,
    height: 80,
  },
});
