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
import { CompanyInObj } from "../data/cards";
import { useEffect, useMemo, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import ChangeIcon from "./ChangeIcon";
import { FadeInView, SlideInView } from "../common/animations";

export default function RoundEndReveal({ netChangeInCompanyByUser }) {
  const { gameState, myUserId, conn } = useGameState();
  const isAdmin = myUserId == gameState.adminId;
  const noOfPlayers = netChangeInCompanyByUser[1].length;
  const noOfCompanies = 7;
  const [currentlyRevealingCompanyId, setCurrentlyRevealingCompanyId] =
    useState(1);
  const isLastRound = gameState.totalMegaRounds == gameState.currentMegaRound;
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
  const totalChange = revealedCards.reduce(
    (acc, cur) => acc + cur.netChange,
    0
  );
  const totalUp = totalChange >= 0;

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
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <BoldText size={21} style={{ letterSpacing: 1 }}>
              {company.name}
            </BoldText>
            <FadeInView
              key={currentlyRevealingCompanyId}
              duration={400}
              delay={gameState.noOfPlayers * 2000}
            >
              <ChangeIcon size={25} netChange={totalChange} />
            </FadeInView>
          </View>

          <FadeInView
            key={currentlyRevealingCompanyId}
            duration={400}
            delay={gameState.noOfPlayers * 2000}
          >
            <ItalicText color={Colors.dim}>
              Current Value{" "}
              <CustomText color={Colors.dim} family="BoldItalic">
                ₹{gameState.companyValues[company.id].companyShareValue}
              </CustomText>
            </ItalicText>
          </FadeInView>
        </View>
      </View>

      <View style={styles.table}>
        <FlatList
          style={styles.flatlist}
          data={revealedCards}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const up = item.netChange >= 0;
            return (
              <SlideInView
                key={
                  "tableRow" +
                  item.id +
                  "-company" +
                  currentlyRevealingCompanyId
                }
                style={styles.row}
                delay={(index + 1) * 2000}
              >
                <LightText style={styles.index} size={10} color={Colors.dim}>
                  {index + 1}.
                </LightText>
                <SemiBoldText style={{ width: 130 }}>{item.user}</SemiBoldText>
                <ChangeIcon netChange={item.netChange} size={15} width={30} />
                <CustomText family="BoldItalic" color={Colors.dim}>
                  {up ? "+" : "-"}₹{Math.abs(item.netChange)}
                </CustomText>
              </SlideInView>
            );
          }}
        />
        <View style={[styles.row, styles.totalRow]}>
          <SemiBoldText size={17} style={{ width: 145 }}>
            Total
          </SemiBoldText>
          <SlideInView
            delay={2000 * noOfPlayers}
            key={"tableArrow" + currentlyRevealingCompanyId}
          >
            <ChangeIcon netChange={totalChange} width={30} size={20} />
          </SlideInView>

          <SlideInView
            key={"tableRowLast" + currentlyRevealingCompanyId}
            delay={2000 * noOfPlayers}
          >
            <CustomText size={17} color={Colors.dim} family="BoldItalic">
              {totalUp ? "+" : "-"}₹{Math.abs(totalChange)}
            </CustomText>
          </SlideInView>
        </View>
      </View>

      {currentlyRevealingCompanyId == noOfCompanies && isAdmin && (
        <FadeInView
          style={styles.nextRound}
          duration={1000}
          delay={gameState.noOfPlayers * 2000}
        >
          {isLastRound ? (
            <TouchableOpacity onPress={onResults} style={styles.nextRoundBtn}>
              <BoldText>Results</BoldText>
              <Entypo name="chevron-right" size={24} color={Colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onNextRound} style={styles.nextRoundBtn}>
              <BoldText>NEXT ROUND</BoldText>
              <Entypo name="chevron-right" size={24} color={Colors.white} />
            </TouchableOpacity>
          )}
        </FadeInView>
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
    gap: 28,
    alignItems: "center",
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
    zIndex: 9999,
    flexDirection: "row",
  },
  
  nextRoundBtn: {
    borderRadius: 5,
    backgroundColor: Colors.darkPink,
    padding: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});
