import { Alert, BackHandler, StyleSheet, View } from "react-native";
import { Colors } from "../src/common/styles";
import { FlatList } from "react-native-gesture-handler";
import { Companies } from "../src/data/cards";
import { useGameState } from "../src/contexts/GameStateContext";
import RoundEndReveal from "../src/components/RoundEndReveal";
import CompanyCardForRoundEnd from "../src/components/CompanyCardForRoundEnd";
import { router } from "expo-router";
import { useEffect } from "react";

export default function RoundEnd() {
  const { gameState,leave } = useGameState();

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

  return (
    <View style={styles.Conatiner}>
      <View style={styles.Left}>
        <FlatList
          data={Companies}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({ item }) => (
            <CompanyCardForRoundEnd
              currentWorth={gameState.companyValues[item.id].companyShareValue}
              company={item}
              newValue={gameState.companyValues[item.id].companyShareValue}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.Right}>
        <RoundEndReveal />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    backgroundColor: Colors.black,
    flexDirection: "row",
  },
  Left: {
    height: "100%",
    width: "25%",
  },
  Right: {
    height: "100%",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingLeft: 10,
  },
});
