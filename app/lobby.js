import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import {
  BoldText,
  CustomText,
  ItalicText,
  RegularText,
  SemiBoldText,
} from "../src/common/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Colors } from "../src/common/styles";
import { useGameState } from "../src/contexts/GameStateContext";
import GameSettingsModal from "../src/components/GameSettingsModal";

export default function LobbyPage() {
  const { leave, gameId, conn, myUserName, setGameState, setMyUserId } =
    useGameState();
  const [noOfRounds, setNoOfRounds] = useState(10);
  const emojiArray = ["😎", "😍", "😉", "🤩", "🧐", "😁", "🥳"].sort(
    () => Math.random() - 0.5
  );
  const [playersWaiting, setPlayersWaiting] = useState([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [gameSettingModalVisible, setGameSettingModalVisible] = useState(false);
  const isAdmin = useMemo(() => {
    return playersWaiting[0]?.name == myUserName;
  }, [playersWaiting]);

  useEffect(() => {
    if (!conn.current) return;

    const getRoomDetails = (data) => {
      setPlayersWaiting(data.userArr.map((name, id) => ({ id, name })));
    };
    const onStartGame = (data) => {
      setGameState(data);
      let userId = 0;
      for (let i = 0; i < data.noOfPlayers; i++) {
        if (myUserName == data.userState[i].username) {
          userId = data.userState[i].id;
        }
      }
      setMyUserId(userId);
      setIsRedirecting(true);
      const isMyTurn = data.playerOrder[0] == userId;

      setTimeout(() => {
        if (isMyTurn) {
          router.push("/gameroom/myturn");
        } else {
          router.push("/gameroom");
        }
      }, 2000);
    };

    const RejoinMessage = async (data) => {
      setGameState(data);
      let userId = 0;
      for (let i = 0; i < data.noOfPlayers; i++) {
        if (myUserName == data.userState[i].username) {
          userId = data.userState[i].id;
        }
      }
      setMyUserId(userId);
      setIsRedirecting(true);
      const isMyTurn = data.playerOrder[data.currentTurn] == userId;

      setTimeout(() => {
        if (isMyTurn) {
          router.push("/gameroom/myturn");
        } else {
          router.push("/gameroom");
        }
      }, 2000);
    };

    conn.current.on("getRoomDetails", getRoomDetails);
    conn.current.on("onStartGame", onStartGame);
    conn.current.on("RejoinMessage", RejoinMessage);

    return () => {
      conn.current.off("getRoomDetails", getRoomDetails);
      conn.current.off("onStartGame", onStartGame);
      conn.current.off("RejoinMessage", RejoinMessage);
    };
  }, [conn.current]);

  useEffect(() => {
    const backAction = () => {
      leave();
      router.push("/");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleStartGame = () => {
    conn.current?.emit("onStartGame", { totalMegaRounds: noOfRounds });
  };

  const handleLeave = () => {
    leave();
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image
          source={require("../assets/images/lobbyBackground.png")}
          style={{ width: 600, height: 400, position: "absolute" }}
        />
        <LinearGradient
          style={{ flex: 1, width: "100%", alignItems: "center" }}
          colors={["transparent", "#000"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <View style={styles.RoomID}>
            <BoldText size={20}>ROOM ID : </BoldText>
            <BoldText size={20} color="white">
              {gameId}
            </BoldText>
          </View>
          <View style={{ height: isAdmin ? 120 : 250 }} />
          {isAdmin && (
            <>
              <ItalicText>No of rounds</ItalicText>

              <View style={styles.inputBox}>
                <TouchableOpacity
                  onPress={() => setNoOfRounds((p) => p - 1)}
                  disabled={noOfRounds == 2}
                >
                  <AntDesign name="minus" size={16} color="white" />
                </TouchableOpacity>
                <BoldText size={20}>{noOfRounds}</BoldText>
                <TouchableOpacity
                  onPress={() => setNoOfRounds((p) => p + 1)}
                  disabled={noOfRounds == 10}
                >
                  <AntDesign name="plus" size={16} color="white" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => setGameSettingModalVisible(true)}
              >
                <RegularText
                  style={{ textDecorationLine: "underline" }}
                  color={Colors.white + "bb"}
                >
                  More option
                </RegularText>
              </TouchableOpacity>
              <GameSettingsModal
                modalVisible={gameSettingModalVisible}
                setModalVisible={setGameSettingModalVisible}
              />
              <TouchableOpacity
                onPress={handleStartGame}
                style={styles.startBtn}
              >
                <BoldText size={20} transform="uppercase">
                  Start game
                </BoldText>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={handleLeave} style={styles.LeaveBtn}>
            <BoldText size={20} transform="uppercase">
              Leave Lobby
            </BoldText>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.right}>
        <RegularText color={Colors.dim} size={12}>
          {playersWaiting.length} players waiting in lobby...
        </RegularText>

        <FlatList
          data={playersWaiting}
          renderItem={({ item }) => (
            <View style={styles.playerBox}>
              <SemiBoldText style={{ marginLeft: 10 }} size={18}>
                {emojiArray[item.id]}
              </SemiBoldText>
              <SemiBoldText size={15}>{item.name}</SemiBoldText>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {isRedirecting && (
        <View style={styles.redirectingModal}>
          <ActivityIndicator size="50" color={Colors.white} />
          <CustomText family="SemiBoldItalic" size={16}>
            Starting your game in few seconds...
          </CustomText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.black,
    alignItems: "center",
    position: "relative",
  },

  left: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  startBtn: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: Colors.green,
  },
  LeaveBtn: {
    marginTop: 10,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: Colors.red,
  },

  right: {
    flex: 1,
    alignItems: "center",
    gap: 5,
    height: 350,
    justifyContent: "center",
  },
  playerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 3,
    backgroundColor: "#222",
    width: 200,
    padding: 6,
    borderRadius: 5,
  },
  RoomID: {
    top: 60,
    flexDirection: "row",
    backgroundColor: Colors.info,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 2,
  },

  redirectingModal: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    backgroundColor: Colors.black + "e5",
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
  },
});
