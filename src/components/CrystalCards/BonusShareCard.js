import {
  BoldText,
  LightText,
  RegularText,
  SemiBoldText,
} from "../../common/Text";
import CrystalContent from "../CrystalContent";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../common/styles";
import { useState } from "react";
import { Companies } from "../../data/cards";
import { useGameState } from "../../contexts/GameStateContext";
import { Entypo } from "@expo/vector-icons";
import ModalForCard from "./ModalForCard";
import CompanyValueZeroCard from "./CompanyValueZeroCard";

export default function BonusShareCard({ card }) {
  const { gameState, myUserId, conn, _setSelectedCard } = useGameState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  if (modalVisible && selectedCompany) {
    if (gameState.companyValues[selectedCompany.id].companyShareValue == 0) {
      return (
        <CompanyValueZeroCard
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ModalForCard
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          transactionInfo={
            <RegularText color={Colors.dim} align={"center"}>
              You want to continue with {selectedCompany.name}
            </RegularText>
          }
          operatingFunction={() => {
            conn.current.emit("crystal", {
              userId: myUserId,
              crystalType: card.crystalType,
              companyId: selectedCompany.id,
              numberOfStocks: 0,
            });
            _setSelectedCard(null);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View>
          <View style={styles.heading}>
            <BoldText>{card.crystalType.split("_").join("  ")}</BoldText>
          </View>
        </View>
        <CrystalContent type={card.crystalType} />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <SemiBoldText color={Colors.dim} style={{ marginVertical: 4 }}>
          Companies
        </SemiBoldText>
        <FlatList
          data={Companies}
          style={{ marginBottom: 5 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCompany(item);
                setModalVisible(true);
              }}
              disabled={gameState.userState[myUserId].holdings[item.id] == 0}
              style={styles.companyBox}
            >
              <SemiBoldText size={13} style={{ width: 65 }}>
                {item.name}
              </SemiBoldText>

              <RegularText size={10} color={Colors.dim} style={styles.strike}>
                Get{" "}
                <BoldText color={Colors.green}>
                  {Math.min(
                        Math.floor(
                          Math.floor(
                            gameState.userState[myUserId].holdings[item.id] /
                              5000
                          ) * 1000
                        ) / 1000,
                        gameState.companyValues[item.id].stocksAvailable
                      )}
                  K
                </BoldText>{" "}
                stocks for Free
              </RegularText>
              <Entypo name="chevron-right" size={24} color={Colors.dim} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#141414",
    gap: 6,
    marginVertical: 10,
    borderRadius: 6,
    overflow: "hidden",
    borderColor: Colors.green + "22",
    borderWidth: 2,
  },

  left: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  heading: {
    backgroundColor: Colors.info,
    paddingTop: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },

  companyBox: {
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 5,
    backgroundColor: Colors.black,
  },
});
