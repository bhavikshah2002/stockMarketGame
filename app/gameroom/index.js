import { FlatList, StyleSheet, View } from "react-native";
import { useGameState } from "../../src/contexts/GameStateContext";
import { Companies, getCardStack } from "../../src/data/cards";
import CompanyCard from "../../src/components/CompanyCard";
import BigCard from "../../src/components/BigCard";
import { useEffect, useState } from "react";

export default function CommonRound() {
  const { gameState } = useGameState();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0); //Temporary for testing
  const thisUserId = 0;

  useEffect(() => {
    // Testing setup to be removed
    const itv = setInterval(() => {
      setSelectedCardIndex((p) => (p + 2) % 30);
    }, 1000);

    return () => {
      clearInterval(itv);
    };
  }, []);

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
        <BigCard card={getCardStack().at(-selectedCardIndex)} />
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
    gap: 15,
    paddingHorizontal: 20,
  },

  sides: {
    flex: 1,
  },

  middle: {
    width: 180,
  },
});
