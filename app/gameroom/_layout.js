import { Slot } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { BoldText, RegularText, SemiBoldText } from "../../src/common/Text";
import { useState } from "react";
import GameStateContextProvider from "../../src/contexts/GameStateContext";

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
              <RegularText> Self Info Bar</RegularText>
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
                <View style={styles.Card}>
                  <BoldText>Card {item.cardNumber}</BoldText>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View style={styles.Right}>
          <FlatList
            data={player}
            renderItem={({ item }) => (
              <View
                style={{
                  ...styles.OtherPlayerInfoComponent,
                  ...getActive(item.id),
                }}
              >
                <SemiBoldText style={{ fontSize: 11 }}>
                  {item.playerName}
                </SemiBoldText>
                <RegularText>{item.playerInHandCash}L</RegularText>
              </View>
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
    height: "100%",
    width: "85%",
    alignItems: "center",
  },
  Right: {
    height: "100%",
    width: "15%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 15,
  },
  TopLeft: {
    height: "20%",
  },
  MiddleLeft: {
    height: "55%",
  },
  BottomLeft: {
    height: "25%",
  },
  SelfInfoBar: {
    width: 700,
    height: 55,
    marginTop: 15,
    backgroundColor: "#454547",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  Card: {
    marginVertical: 10,
    height: 75,
    width: 55,
    marginHorizontal: 8,
    backgroundColor: "#454547",
    justifyContent: "center",
    alignItems: "center",
  },
  OtherPlayerInfoComponent: {
    marginVertical: 5,
    height: 50,
    width: 100,
    marginHorizontal: 2,
    backgroundColor: "#454547",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  OnActive: {
    borderColor: "green",
    borderWidth: 2,
  },
});
