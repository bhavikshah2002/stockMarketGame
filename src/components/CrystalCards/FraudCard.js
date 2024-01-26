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
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FraudCard({ card }) {
  const { gameState, conn, myUserId, _setSelectedCard } = useGameState();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [maxStocksPossibleToBuy, setMaxStocksPossibleToBuy] = useState(0);
  const noOfStocks = useSharedValue(0);
  function getMaxSliderValue(company) {
    var newShareValue =
      Math.floor(
        Math.floor(
          (0.7 * gameState.companyValues[company.id].companyShareValue) / 5
        )
      ) * 5;
    setMaxStocksPossibleToBuy(
      Math.min(
        gameState.companyValues[company.id].stocksAvailable,
        Math.floor(
          gameState.userState[myUserId].cashInHand / newShareValue / 1000
        )
      )
    );
  }

  if (modalVisible && selectedCompany) {
    if(Math.floor(
      Math.floor(
        (0.7 * gameState.companyValues[selectedCompany.id].companyShareValue) / 5
      )
    ) * 5 ==0){
      return (
        <View style={styles.container}>
         
          <View style={styles.bottom2}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="close-box"
                size={40}
                color={Colors.red}
              />
              <BoldText size={22} style={{paddingTop:3}}>New Share Price Zero!</BoldText>
            </View>
            <View>
              <RegularText color={Colors.dim} style={{paddingHorizontal:20}}>
                Since company new share value is zero, No transaction can be made!
              </RegularText>
            </View>
            <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{ ...styles.Btn, backgroundColor: Colors.info,marginTop:15 }}
          >
            <BoldText size={15} transform="uppercase">
              Close
            </BoldText>
          </TouchableOpacity>
          </View>
        </View>
      );
    }
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
              numberOfStocks: Math.floor(noOfStocks.value) * 1000,
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
  bottom2: {
    width: "100%",
    alignItems: "center",
    paddingTop:10,
    gap:5,
    flex: 1,
  },
  Btn: {
    flexDirection: "row",
    borderRadius: 5,
    height: 40,
    width: 90,
    alignItems: "center",
    justifyContent: "center",
  },
});
