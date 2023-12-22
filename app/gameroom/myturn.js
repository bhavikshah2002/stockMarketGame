import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useGameState } from "../../src/contexts/GameStateContext";
import { Companies } from "../../src/data/cards";
import CompanyCard from "../../src/components/CompanyCard";
import CardEntity from "../../src/components/CardEntity";
import CompanyEntity from "../../src/components/CompanyEntity";
import { LightText } from "../../src/common/Text";
import { Colors } from "../../src/common/styles";

export default function MyTurnScreen() {
  const { gameState, selectedEntityType } = useGameState();
  const thisUserId = 0;

  return (
    <View style={styles.container}>
      <View style={styles.sides}>
        <TouchableOpacity style={styles.btn}>
          <LightText align={"center"} size={18}>
            PASS
          </LightText>
        </TouchableOpacity>
        <FlatList
          data={Companies}
          renderItem={({ item }) => (
            <CompanyCard
              currentWorth={
                gameState.companyValues[item.id] +
                Math.floor(Math.random() * 6 - 3)
              }
              company={item}
              yourHoldings={gameState.userState[thisUserId].holdings[item.id]}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.center}>
        {selectedEntityType == "card" && <CardEntity />}
        {selectedEntityType == "company" && <CompanyEntity />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    paddingHorizontal: 20,
  },

  sides: {
    flex: 1,
    overflow: "hidden",
    marginVertical: 10,
  },

  center: {
    width: 400,
  },

  btn: {
    paddingHorizontal: 15,
    paddingTop: 2,
    paddingBottom: 1,
    borderRadius: 2,
    marginBottom: 8,
    backgroundColor: Colors.info,
  },
});
