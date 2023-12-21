import { FlatList, StyleSheet, View } from "react-native";
import { useGameState } from "../../src/contexts/GameStateContext";
import { Companies } from "../../src/data/cards";
import CompanyCard from "../../src/components/CompanyCard";
import BigCard from "../../src/components/BigCard";
import { Link } from "expo-router";
import { RegularText } from "../../src/common/Text";

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
      <View style={styles.middle}>
        <BigCard />
      </View>
      <View style={styles.sides}>
        <FlatList
          data={Companies.slice(4)}
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
        <Link href="/gameroom/myturn">
          <RegularText>myturn</RegularText>
        </Link>
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
    marginVertical: 10,
  },

  middle: {
    width: 180,
  },
});
