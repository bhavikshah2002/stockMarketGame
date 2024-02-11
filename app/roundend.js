import {
  Alert,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../src/common/styles";
import { FlatList } from "react-native-gesture-handler";
import { Companies } from "../src/data/cards";
import { useGameState } from "../src/contexts/GameStateContext";
import RoundEndReveal from "../src/components/RoundEndReveal";
import CompanyCardForRoundEnd from "../src/components/CompanyCardForRoundEnd";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { BoldText } from "../src/common/Text";

export default function RoundEnd() {
  const { gameState, leave, conn, myUserId } = useGameState();
  const [data, setData] = useState(null);
  const isAdmin = myUserId == gameState.adminId;
  const isLastRound = gameState.totalMegaRounds == gameState.currentMegaRound;
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

  useEffect(() => {
    conn.current?.emit("endMegaRound", {});
  }, []);

  useEffect(() => {
    if (!conn.current) return;
    const endMegaRound = (curdata) => {
      setData(curdata);
    };

    conn.current.on("endMegaRound", endMegaRound);

    return () => {
      conn.current.off("endMegaRound", endMegaRound);
    };
  }, [conn.current]);

  const onNextRound = () => {
    conn.current?.emit("startMegaRound", {});
  };
  const onResults = () => {
    conn.current?.emit("endGame", {});
  };

  return (
    <View style={styles.Conatiner}>
      <View style={styles.Left}>
        {data && (
          <FlatList
            data={Companies}
            contentContainerStyle={styles.contentContainerStyle}
            renderItem={({ item }) => (
              <CompanyCardForRoundEnd
                currentWorth={data.priceBook[item.id].at(-2)}
                company={item}
                newValue={data.priceBook[item.id].at(-1)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      {/* Comment this for Buddy Version! */}
      <View style={styles.Right}>
        {data && <RoundEndReveal netChangeInCompanyByUser={data.netChange} />}
      </View>

      {/* Buddy Version Code */}
      {/* <View style={styles.Right}>
        {isAdmin && (
          <View style={styles.nextRound}>
            {
            isLastRound ? (
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
          </View>
        )}
      </View> */}
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
    width: "28%",
  },
  Right: {
    height: "100%",
    width: "72%",
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingLeft: 10,
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
