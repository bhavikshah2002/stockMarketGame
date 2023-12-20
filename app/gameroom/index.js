import { FlatList, StyleSheet, View } from "react-native";
import { RegularText } from "../../src/common/Text";
import { useGameState } from "../../src/contexts/GameStateContext";
import { Companies } from "../../src/data/cards";
import CompanyCard from "../../src/components/CompanyCard";

export default function CommonRound() {
  const { gameState } = useGameState();
  const thisUserId = 0;

  return (
    <View style={styles.container}>
      <View style={styles.sides}>
        <FlatList
          data={Companies.slice(0, 4)}
          renderItem={({ item }) => (
            <CompanyCard
              currentWorth={gameState.companyValues[item.id]}
              company={item}
              yourHoldings={gameState.userState[thisUserId].holdings[item.id]}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.middle}>
        <RegularText>Mid</RegularText>
      </View>
      <View style={styles.sides}>
        <FlatList
          data={Companies.slice(4)}
          renderItem={({ item }) => (
            <CompanyCard
              currentWorth={gameState.companyValues[item.id]}
              company={item}
              yourHoldings={gameState.userState[thisUserId].holdings[item.id]}
            />
          )}
          keyExtractor={(item) => item.id}
        />
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
    gap: 10,
    paddingHorizontal:20,
  },

  sides: {
    flex: 1,
  },

  middle: {
    flex: 1,
  },
});
