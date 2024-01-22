import { Alert, BackHandler, Button, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import {
  BoldText,
  LightText,
  RegularText,
  SemiBoldText,
} from "../src/common/Text";
import { Audio } from "expo-av";
import { Colors } from "../src/common/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { Row, Rows, Table } from "react-native-table-component";
import { useGameState } from "../src/contexts/GameStateContext";

export default function EndGame() {
  const [sound, setSound] = useState();
  const [results, setResults] = useState([]);
  const [data, setData] = useState([[0,0,0,0,0]]);
  const { leave, conn } = useGameState();
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
            stopSound();
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
  function getData(results) {
    if (!results) {
      setData([]);
      return;
    }
    let l =[]
    for (let i = 0; i < results.length; i++) {
      l.push([
        i + 1,
        results[i].username,
        results[i].cashInHand,
        results[i].cashInStocks,
        results[i].cashInHand + results[i].cashInStocks,
      ]);
    }
    setData(l)
  }
  async function stopSound() {
    await sound.stopAsync();
    await sound.unloadAsync();
  }
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/makemoney.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  
  useEffect(() => {
    conn.current?.emit("endGame", {});
    playSound();
    if (!conn.current) return;

    const endGame = (data) => {
      console.log(data)
      setResults(data.results)
      getData(data.results)
    };

    conn.current.on("endGame", endGame);

    return () => {
      conn.current.off("endGame", endGame);
    };
  }, [conn.current]);

  function GetWinners({ results }) {
    if (!results) return <></>;
    return (
      <View style={styles.AllWinners}>
        <View style={styles.WinnerName}>
          <FontAwesome5 name="trophy" size={24} color="#d67400" />
          <RegularText size={24}>{results[0]?.username}</RegularText>
        </View>
        {!(results.length > 1) ? (
          <></>
        ) : (
          <View style={styles.WinnerName}>
            <FontAwesome5 name="trophy" size={24} color="#c0c0c0" />
            <RegularText size={24}>{results[1].username}</RegularText>
          </View>
        )}
        {!(results.length > 2) ? (
          <></>
        ) : (
          <View style={styles.WinnerName}>
            <FontAwesome5 name="trophy" size={24} color="#964B00" />
            <RegularText size={24}>{results[2].username}</RegularText>
            {/* <RegularText size={18} color={Colors.dim}>
            ₹ {(results[2].cashInHand + results[2].cashInStocks)/100000}L
          </RegularText> */}
          </View>
        )}
      </View>
    );
  }
  const header = ["Rank", "Player", "Cash", "Stocks", "Total"];
  const onExit = () => {
    leave();
    stopSound();
    router.push("/");
  };

  return (
    <View style={styles.container}>
      {/* <SemiBoldText>Hello</SemiBoldText> */}
      {/* <Button title="Play Sound" onPress={playSound} /> */}

      <View style={styles.Winner}>
        <Image
          style={{ width: 250, height: 300, marginTop: -80 }}
          source={require("../assets/images/Congragulations2.png")}
          contentFit="contain"
        />
        <View style={styles.winnerTrophy}>
          <BoldText size={30} color={Colors.green}>
            WINNERS
          </BoldText>
          <GetWinners results={results} />
        </View>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: Colors.red }]}
          onPress={onExit}
        >
          <LightText size={18}>Exit</LightText>
        </TouchableOpacity>
      </View>
      <View style={styles.ResultList}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/images/withoutBgLogo2.png")}
            contentFit="contain"
          />
          <SemiBoldText
            size={25}
            color={Colors.logoGreen}
            style={{ paddingTop: 4 }}
          >
            Stock Bazar
          </SemiBoldText>
        </View>
        <View style={styles.TableConatiner}>
          <Table borderStyle={{}}>
            <Row
              data={header}
              style={styles.head}
              textStyle={styles.textHeading}
            />
            <Rows
              data={data}
              style={styles.row}
              textStyle={styles.textContent}
            />
          </Table>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "row",
  },
  Winner: {
    flex: 1,
    alignItems: "center",
  },
  WinnerName: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  winnerTrophy: {
    marginTop: -120,
    alignItems: "center",
  },
  AllWinners: {
    gap: 1,
  },
  ResultList: {
    marginTop: 15,
    marginBottom: 15,
    borderLeftWidth: 2,
    borderColor: "#262525",
    width: "60%",
    alignItems: "center",
  },
  btn: {
    paddingHorizontal: 50,
    paddingTop: 5,
    marginTop: 40,
    paddingBottom: 3,
    borderRadius: 5,
    marginRight: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 75,
    height: 75,
  },
  TableConatiner: {
    width: 380,
  },
  head: {
    height: 30,
    backgroundColor: "#262525",
    // backgroundColor: Colors.dim,
    justifyContent: "center",
  },
  row: {
    height: 30,
  },
  textHeading: {
    textAlign: "center",
    fontWeight: "800",
    color: Colors.white,
    // textDecorationLine:"underline",
  },
  textContent: {
    textAlign: "center",
    color: Colors.white,
  },
});
