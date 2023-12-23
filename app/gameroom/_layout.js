import { Slot } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import { useState } from "react";
import SelfInfoBarComponent from "../../src/components/SelfInfoBar";
import SmallCard from "../../src/components/SmallCard";
import { getShuffledCards } from "../../src/data/cards";
import UserBadge from "../../src/components/UserBadge";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function GameRoomLayout() {
  const [cards, setCards] = useState(
    getShuffledCards().slice(0, 10)
    // getCardStack().slice(-18,-6)
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

  return (
    <View style={styles.Container}>
      <View style={styles.Left}>
        <View style={styles.TopLeft}>
          <View style={styles.SelfInfoBar}>
            <SelfInfoBarComponent />
          </View>
        </View>
        <View style={styles.MiddleLeft}>
          <Slot />
        </View>
        <View style={styles.BottomLeft}>
          <DraggableFlatList
            data={cards}
            onDragEnd={({ data }) => setCards(data)}
            horizontal={true}
            renderItem={({ item, drag, isActive }) => (
              <SmallCard card={item} drag={drag} isActive={isActive} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <View style={styles.Right}>
        <FlatList
          style={{ alignSelf: "flex-end" }}
          data={player}
          renderItem={({ item }) => <UserBadge player={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
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
    width: "16%",
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
});
