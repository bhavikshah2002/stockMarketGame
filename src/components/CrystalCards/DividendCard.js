import { View } from "@bacons/react-views";
import { BoldText, RegularText, SemiBoldText } from "../../common/Text";
import CrystalContent from "../CrystalContent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList, StyleSheet } from "react-native";
import { Colors } from "../../common/styles";
import { Companies } from "../../data/cards";
import { Entypo } from "@expo/vector-icons";
import { useGameState } from "../../contexts/GameStateContext";
import { useState } from "react";
import ModalForCard from "./ModalForCard";

export default function DividendCard({ card }) {
  const { gameState, myUserId, conn, setSelectedCard } = useGameState();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (modalVisible && selectedCompany) {
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
            setSelectedCard(null);
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
              disabled={gameState.userState[myUserId].holdings[item.id] == 0}
              onPress={() => {
                setSelectedCompany(item);
                setModalVisible(true);
              }}
              style={styles.companyBox}
            >
              <SemiBoldText size={13} style={{ width: 80 }}>
                {item.name}
              </SemiBoldText>

              <RegularText size={13} color={Colors.green}>
                ₹
                {(
                  (5 * gameState.userState[myUserId].holdings[item.id]) /
                  1000
                ).toFixed(0)}
                K
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

  strike: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
