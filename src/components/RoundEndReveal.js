import {
  BoldText,
  CustomText,
  ItalicText,
  LightText,
  SemiBoldText,
} from "../common/Text";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../common/styles";
import { useGameState } from "../contexts/GameStateContext";
import { AntDesign } from "@expo/vector-icons";
import { CompanyInObj } from "../data/cards";
import { useEffect, useMemo, useState } from "react";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FadeOutUp,
} from "react-native-reanimated";
import { Entypo } from "@expo/vector-icons";

export default function RoundEndReveal({netChangeInCompanyByUser}) {
  const { gameState, myUserId, conn } = useGameState();
  const isAdmin = myUserId == gameState.adminId;
  const noOfPlayers = netChangeInCompanyByUser[1].length;
  const noOfCompanies = 7;
  const [currentlyRevealingCompanyId, setCurrentlyRevealingCompanyId] =
    useState(1);
  const isLastRound = gameState.totalMegaRounds==gameState.currentMegaRound
  const revealedCards = useMemo(
    () =>
      netChangeInCompanyByUser[currentlyRevealingCompanyId].map(
        (netChange, id) => ({
          id,
          netChange,
          user: gameState.userState[id].username,
        })
      ),
    [currentlyRevealingCompanyId]
  );
  const company = useMemo(
    () => CompanyInObj[currentlyRevealingCompanyId],
    [currentlyRevealingCompanyId]
  );
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
      setCurrentlyRevealingCompanyId((p) => (p == noOfCompanies ? p : p + 1));
    }, 2000 * (noOfPlayers + 1));

    return () => {
      clearInterval(itv);
    };
  }, []);

  const onNextRound = () => {
    conn.current?.emit("startMegaRound", {});
  };
  const onResults = () => {
    conn.current?.emit("endGame", {});
  };

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
                key={
                  "tableRow" +
                  item.id +
                  "-company" +
                  currentlyRevealingCompanyId
                }
                entering={FadeInDown.duration(400).delay((index + 1) * 2000)}
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
            key={"tableArrow" + currentlyRevealingCompanyId}
            entering={FadeInUp.duration(400).delay(2000 * noOfPlayers)}
            exiting={FadeOutDown.duration(400)}
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
            key={"tableRowLast" + currentlyRevealingCompanyId}
            entering={FadeInDown.duration(400).delay(2000 * noOfPlayers)}
            exiting={FadeOutUp.duration(400)}
          >
            {totalUp ? "+" : "-"}₹{Math.abs(totalChange)}
          </Animated.Text>
        </View>
      </View>

      {currentlyRevealingCompanyId == noOfCompanies && isAdmin && (
        <Animated.View
          style={styles.nextRound}
          entering={FadeIn.duration(1000).delay(gameState.noOfPlayers*2000)}
        >
          { isLastRound?
          <TouchableOpacity onPress={onResults} style={styles.nextRoundBtn}>
            <BoldText>Results</BoldText>
            <Entypo name="chevron-right" size={24} color={Colors.white} />
          </TouchableOpacity>:
          <TouchableOpacity onPress={onNextRound} style={styles.nextRoundBtn}>
            <BoldText>NEXT ROUND</BoldText>
            <Entypo name="chevron-right" size={24} color={Colors.white} />
          </TouchableOpacity>
          } 
        </Animated.View>
      )}
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
    position: "relative",
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

  nextRound: {
    position: "absolute",
    right: 15,
    bottom: 15,
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.darkPink,
    borderRadius: 5,
    zIndex: 9999,
    flexDirection: "row",
  },

  nextRoundBtn: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});
