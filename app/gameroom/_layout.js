import SelfInfoBarComponent from "../../src/components/SelfInfoBar";
import { useGameState } from "../../src/contexts/GameStateContext";
import DraggableFlatList from "react-native-draggable-flatlist";
import { FlatList, StyleSheet, View } from "react-native";
import SmallCard from "../../src/components/SmallCard";
import UserBadge from "../../src/components/UserBadge";
import { SemiBoldText } from "../../src/common/Text";
import { Colors } from "../../src/common/styles";
import { AntDesign } from "@expo/vector-icons";
import { Slot } from "expo-router";
import { useState } from "react";

export default function GameRoomLayout() {
  const { players, gameState, myUserId } = useGameState();
  const [cards, setCards] = useState(
    gameState?.userState?.[myUserId]?.cardsHeld
  );

  if (!gameState) {
    return (
      <View style={styles.errorScreen}>
        <AntDesign name="exclamationcircle" size={34} color={Colors.red} />
        <SemiBoldText align="center" size={20}>
          Something went wrong{"\n"}
          <SemiBoldText size={15}>(`gameState` is null)</SemiBoldText>
        </SemiBoldText>
      </View>
    );
  }

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
          data={players}
          renderItem={({ item }) => <UserBadge player={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            justifyContent: "space-evenly",
            flexGrow: 1,
          }}
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

  errorScreen: {
    backgroundColor: Colors.black,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
