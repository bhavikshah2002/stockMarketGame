import { Slot } from "expo-router";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../../src/common/Text";
import { useState } from "react";
import GameStateContextProvider from "../../src/contexts/GameStateContext";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
import SelfInfoBarComponent from "../../src/components/SelfInfoBar";
import SmallCard from "../../src/components/SmallCard";

export default function GameRoomLayout() {
  const [cards, setCards] = useState(
    new Array(10).fill(0).map((_, id) => ({
      id,
      cardNumber: id,
    }))
  );

  const [player, setPlayers] = useState(
    new Array(6).fill(0).map((_, id) => ({
      id,
      playerNumber: id,
      playerName: "UserName" + (id + 1),
      playerInHandCash: 10 * (id + 1),
      active: false,
    }))
  );

  function getActive(isActive) {
    if (!isActive) {
      return {
        borderColor: "green",
        borderWidth: 2,
      };
    } else return {};
  }

  return (
    <GameStateContextProvider>
      <View style={styles.Container}>
        <View style={styles.Left}>
          <View style={styles.TopLeft}>
            <View style={styles.SelfInfoBar}>
              <SelfInfoBarComponent/>
            </View>
          </View>
          <View style={styles.MiddleLeft}>
            <Slot />
          </View>
          <View style={styles.BottomLeft}>
            <FlatList
              data={cards}
              horizontal={true}
              renderItem={({ item }) => (
                <SmallCard CardInfo={item.cardNumber}/>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View style={styles.Right}>
          <FlatList
            data={player}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <View
                  style={{
                    ...styles.OtherPlayerInfoComponent,
                    ...getActive(item.id),
                  }}
                >
                  <SemiBoldText style={{ fontSize: 9 }}>
                    {item.playerName}
                  </SemiBoldText>
                  <RegularText>{item.playerInHandCash}L</RegularText>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </GameStateContextProvider>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",
  },
  Left: {
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  Right: {
    height: "100%",
    width: "12%",
    alignItems: "center",
    marginVertical: 15,
  },
  TopLeft: {
    flex: 1,
    height: "20%",
    alignSelf: "stretch",
  },
  MiddleLeft: {
    height: "60%",
  },
  BottomLeft: {
    flex: 1,
    height: "20%",
    alignSelf: "center",
  },
  SelfInfoBar: {
    flex: 1,
    marginTop: 15,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#454547",
    borderRadius: 100,
    alignItems: "center",
  },
  
  OtherPlayerInfoComponent: {
    marginVertical: 5,
    height: 50,
    width: 80,
    marginHorizontal: 2,
    backgroundColor: "#454547",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },

});
