import SelfInfoBarComponent from "../../src/components/SelfInfoBar";
import { useGameState } from "../../src/contexts/GameStateContext";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SmallCard from "../../src/components/SmallCard";
import UserBadge from "../../src/components/UserBadge";
import { LightText, SemiBoldText } from "../../src/common/Text";
import { Colors } from "../../src/common/styles";
import { AntDesign } from "@expo/vector-icons";
import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function GameRoomLayout() {
  const [isHide, setIsHide] = useState(false);
  const { players, gameState, leave, cards, setCards } = useGameState();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to leave the game?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            router.push("/");
            leave();
            return true;
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
          <View style={styles.showCards}>
            <TouchableOpacity
              onPress={() => {
                setIsHide(!isHide);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                transform: [{ rotate: "-90deg" }],
              }}
            >
              <LightText size={13} color={Colors.white}>
                {isHide ? " SHOW" : " HIDE "}
              </LightText>
              {isHide ? (
                <Entypo name="chevron-up" size={15} color="white" />
              ) : (
                <Entypo name="chevron-down" size={15} color="white" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.cards}>
            <DraggableFlatList
              data={cards}
              onDragEnd={({ data }) => setCards(data)}
              horizontal={true}
              renderItem={({ item, drag, isActive }) => (
                <SmallCard
                  key={item.id}
                  card={item}
                  drag={drag}
                  isActive={isActive}
                  isHide={isHide}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
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
    flexDirection: "row",
    justifyContent: "center",
  },
  SelfInfoBar: {
    flex: 1,
    marginTop: 15,
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: "#45454788",
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
  showCards: {
    left: 5,
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  cards: {
    flex: 1,
    height: "100%",
    alignSelf: "center",
    flexDirection: "row",
  },
});
