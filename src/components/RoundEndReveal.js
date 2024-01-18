import {
  BoldText,
  CustomText,
  ItalicText,
  LightText,
  SemiBoldText,
} from "../common/Text";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import { AntDesign } from "@expo/vector-icons";
import { CompanyInObj } from "../data/cards";
import { useEffect, useState } from "react";
import Animated, {
  FadeInDown,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";

const l = [
  "Arun Joseph",
  "Bhavik Shah",
  "Arpit Shah",
  "Arun Joseph",
  "Bhavik Shah",
  "Arpit Shah",
  "Arun Joseph",
];

export default function RoundEndReveal({}) {
  const [revealedCards, setRevealedCards] = useState([]);
  const { gameState } = useGameState();
  const currentlyRevealingCompanyId = 2;
  const company = CompanyInObj[currentlyRevealingCompanyId];
  const isProfit =
    gameState.companyValues[currentlyRevealingCompanyId].companyShareValue >=
    company.startingPrice;
  const totalChange = revealedCards.reduce(
    (acc, cur) => acc + cur.netChange,
    0
  );
  const totalUp = totalChange > 0;

  useEffect(() => {
    const itv = setInterval(() => {
      setRevealedCards((prev) =>
        prev.length == l.length
          ? []
          : prev.concat({
              user: l[prev.length],
              id: prev.length,
              netChange: Math.floor(Math.random() * 15 - 7),
            })
      );
    }, 2000);

    return () => {
      clearInterval(itv);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={company.photoUrl} style={styles.logo} />
        <View style={{ width: "45%" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <BoldText size={21} style={{ letterSpacing: 1 }}>
              {company.name}
            </BoldText>
            <AntDesign
              name={isProfit ? "caretup" : "caretdown"}
              size={34}
              color={isProfit ? Colors.green : Colors.red}
            />
          </View>
          <ItalicText color={Colors.dim}>
            Current Value{" "}
            <CustomText color={Colors.dim} family="BoldItalic">
              ₹{gameState.companyValues[company.id].companyShareValue}
            </CustomText>
          </ItalicText>
        </View>

        <FlatList
          horizontal
          style={{
            // backgroundColor: "#23d99721",
            marginRight: 10,
            padding: 5,
            paddingRight: 10,
          }}
          renderItem={({ item }) => (
            <View style={[styles.graphBar, { height: item / 2 }]} />
          )}
          data={gameState.history[company.id]}
          keyExtractor={(_, i) => i}
        />
      </View>

      <View style={styles.table}>
        <FlatList
          style={styles.flatlist}
          data={revealedCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const up = item.netChange > 0;
            return (
              <Animated.View
                key={"tableRow" + item.id}
                entering={FadeInDown.duration(400)}
                exiting={FadeOutDown.duration(400)}
                style={styles.row}
              >
                <LightText style={styles.index} size={10} color={Colors.dim}>
                  {index + 1}.
                </LightText>
                <SemiBoldText style={{ width: 130 }}>{item.user}</SemiBoldText>
                <AntDesign
                  size={15}
                  width={30}
                  name={up ? "caretup" : "caretdown"}
                  color={up ? Colors.green : Colors.red}
                />
                <CustomText family="BoldItalic" color={Colors.dim}>
                  {up ? "+" : "-"}₹{Math.abs(item.netChange)}
                </CustomText>
              </Animated.View>
            );
          }}
        />
        <View style={[styles.row, styles.totalRow]}>
          <SemiBoldText size={17} style={{ width: 145 }}>
            Total
          </SemiBoldText>
          <Animated.View
            key={"tableArrow" + totalUp}
            entering={FadeInDown.duration(400)}
            exiting={FadeOutUp.duration(400)}
          >
            <AntDesign
              width={30}
              size={20}
              name={totalUp ? "caretup" : "caretdown"}
              color={totalUp ? Colors.green : Colors.red}
            />
          </Animated.View>
          <Animated.Text
            style={{
              fontSize: 17,
              color: Colors.dim,
              fontFamily: "Poppins-BoldItalic",
            }}
            key={"tableRowLast" + Math.abs(totalChange)}
            entering={FadeInDown.duration(400)}
            exiting={FadeOutUp.duration(400)}
          >
            {totalUp ? "+" : "-"}₹{Math.abs(totalChange)}
          </Animated.Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    padding: 10,
    paddingTop: 20,
    alignItems: "center",
  },

  logo: {
    width: "25%",
    height: 60,
    objectFit: "cover",
  },

  top: {
    width: "75%",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: Colors.black,
    borderColor: Colors.green + "05",
    shadowColor: Colors.green,
    shadowOffset: {
      width: 13,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 16,
  },

  graphBar: {
    width: 3,
    backgroundColor: Colors.green + "88",
    marginRight: 6,
    alignSelf: "flex-end",
    borderTopLeftRadius: 1.5,
    borderTopRightRadius: 1.5,
  },

  table: {
    marginTop: 10,
  },

  flatlist: {
    flexGrow: 0,
    maxHeight: "75%",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: 1.5,
    borderColor: Colors.dim + "77",
    paddingVertical: 3,
    paddingHorizontal: 6,
  },

  totalRow: {
    borderBottomWidth: 0,
    height: 40,
    backgroundColor: "#1f1f1f",
    borderRadius: 6,
    marginTop: 8,
  },

  index: {
    width: 10,
    alignSelf: "flex-end",
    paddingBottom: 2,
  },
});
