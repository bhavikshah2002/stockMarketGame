import { StyleSheet, View } from "react-native";
import { Colors } from "../common/styles";
import { BoldText } from "../common/Text";
import { FlatList } from "react-native-gesture-handler";
import { Companies } from "../data/cards";
import { useGameState } from "../contexts/GameStateContext";
import RoundEndReveal from "./RoundEndReveal";
import CompanyCardForRoundEnd from "./CompanyCardForRoundEnd";

export default function RoundEnd() {
  const { gameState, selectedEntityType } = useGameState();
  return (
    <View style={styles.Conatiner}>
      <View style={styles.Left}>
        <FlatList
          data={Companies}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            paddingVertical: 10,
            paddingLeft: 10,
          }}
          renderItem={({ item }) => (
            <CompanyCardForRoundEnd
              currentWorth={
                gameState.companyValues[item.id] +
                Math.floor(Math.random() * 6 - 3) * 5
              }
              company={item}
              newValue={
                gameState.companyValues[item.id] +
                Math.floor(Math.random() * 6 - 3) * 5
              }
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
});
