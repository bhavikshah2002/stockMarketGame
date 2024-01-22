import {
  BoldText,
  LightText,
  RegularText,
  SemiBoldText,
} from "../../common/Text";
import CrystalContent from "../CrystalContent";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "../../common/styles";
import { Companies } from "../../data/cards";
import { useGameState } from "../../contexts/GameStateContext";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import ModalForCard from "./ModalForCard";
import MySlider from "../Slider";
import { useSharedValue } from "react-native-reanimated";

export default function FraudCard({ card }) {
  const { gameState, conn, myUserId, setSelectedCard } = useGameState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [maxStocksPossibleToBuy, setMaxStocksPossibleToBuy] = useState(0);
  const noOfStocks = useSharedValue(10);
  function getMaxSliderValue(company) {
    var newShareValue =
      Math.floor(
        Math.floor(
          (0.7 * gameState.companyValues[company.id].companyShareValue) / 5
        )
      ) * 5;
    setMaxStocksPossibleToBuy(
      Math.floor(
        gameState.userState[myUserId].cashInHand / newShareValue / 1000
      )
    );
  }
  
  if (modalVisible && selectedCompany) {
    return (
      <View style={styles.container}>
        <ModalForCard
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          transactionInfo={
            <View>
              <RegularText color={Colors.dim} align="center">
                Select how much stock you want to buy of {selectedCompany.name}
              </RegularText>
              <View style={styles.slider}>
                <MySlider
                  value={noOfStocks}
                  max={maxStocksPossibleToBuy}
                  min={0}
                />
              </View>
            </View>
          }
          operatingFunction={() => {
            conn.current.emit("crystal", {
              userId: myUserId,
              crystalType: card.crystalType,
              companyId: selectedCompany.id,
              numberOfStocks: noOfStocks.value,
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
              onPress={() => {
                setSelectedCompany(item);
                setModalVisible(true);
                getMaxSliderValue(item);
              }}
              style={styles.companyBox}
            >
              <SemiBoldText size={13} style={{ width: 70 }}>
                {item.name}
              </SemiBoldText>

              <LightText size={11} color={Colors.dim} style={styles.strike}>
                ₹{gameState.companyValues[item.id].companyShareValue}
              </LightText>
              <RegularText size={13} color={Colors.green}>
                ₹
                {Math.floor(
                  Math.floor(
                    (0.7 * gameState.companyValues[item.id].companyShareValue) /
                      5
                  )
                ) * 5}
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
    position: "relative",
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

  slider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 5,
    width: 220,
  },
});
