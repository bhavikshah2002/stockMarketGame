import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SocketConn from "../utils/socket";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";
import { CustomText } from "../common/Text";
import { Colors } from "../common/styles";
import wait from "../utils/wait";
import TransactionSplash from "../components/TransactionSplash";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Audio } from "expo-av";

const GameStateContext = createContext({
  gameState: null,
  setGameState: (s) => {},
  selectedCard: null,
  setSelectedCard: (s) => {},
  selectedPlayerId: 1,
  setSelectedPlayerId: (s) => {},
  selectCompany: (c) => {},
  selectedEntity: null,
  selectedEntityType: "card",
  players: null,
  myUserName: "username",
  setMyUserName: (s) => {},
  gameId: null,
  setGameId(p) {},
  results: [],
  setResults(p) {},
  create() {},
  join() {},
  leave() {},
  myUserId: null,
  setMyUserId(p) {},
});

export default function GameStateContextProvider({ children }) {
  const conn = useRef(null);
  const [gameState, setGameState] = useState(null);
  const [myUserId, setMyUserId] = useState(null);
  const [selectedCard, _setSelectedCard] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState(0);
  const [selectedEntity, setSelectedEntity] = useState(selectedCard);
  const [selectedEntityType, setSelectedEntityType] = useState("card");
  const [myUserName, setMyUserName] = useState("username");
  const players = useMemo(() => {
    if (!gameState) return [];
    return gameState.playerOrder.map((id) => ({
      id: id,
      playerNumber: id,
      playerName: gameState.userState[id].username,
      playerInHandCash: gameState.userState[id].cashInHand / 100000,
      active: gameState.playerOrder[gameState.currentTurn] == id ? true : false,
    }));
  }, [gameState]);
  const [gameId, setGameId] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState(null);

  const selectEntity = (entity, type) => {
    setSelectedEntityType(type);
    setSelectedEntity(entity);
  };

  const setSelectedCard = (card) => {
    _setSelectedCard(card);
    if (
      (card.type == "CRYSTAL" && gameState.currentSubRound != 4) ||
      (card.type == "CIRCUIT" && gameState.currentSubRound == 4) //Change this to 4
    ) {
      selectEntity(card, "card");
    }
  };

  const selectCompany = (company) => {
    selectEntity(company, "company");
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/circuit.mp3")
    );
    sound.playAsync();
  }

  //########### SOCKET STUFF ###########
  const create = () => {
    if (conn.current) conn.current.close();

    const id = new Date().getTime().toString().slice(-6);
    setGameId(id);
    conn.current = new SocketConn(
      `ws://13.232.187.121/ws/chat/${id}/?create=True&join=False&username=${myUserName}`
    );
  };

  const join = () => {
    if (!gameId) {
      Alert.alert("Game Id Invalid", "Please enter a valid gameId", [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ]);
      return false;
    }

    if (conn.current) conn.current.close();

    conn.current = new SocketConn(
      `ws://13.232.187.121/ws/chat/${gameId}/?create=False&join=True&username=${myUserName}`
    );
    return true;
  };

  const leave = () => {
    setGameId(null);
    setMyUserId(null);
    _setSelectedCard(null);
    selectEntity(null);
    setSelectedPlayerId(0);
    conn.current?.close();
    router.push("/");
  };

  useEffect(() => {
    if (!conn.current) return;

    const roundInfo = async (data) => {
      try {
        setGameState(data);
        const isMyTurn = data.playerOrder[data.currentTurn] == myUserId;
        const shouldDistributeCards =
          data.currentSubRound == 1 && data.currentTurn == 0;

        if (isMyTurn) {
          _setSelectedCard(null);
          setSelectedEntity(null);
        }

        if (data.transactions.length > 0 && !shouldDistributeCards) {
          setLoadingMsg(
            <TransactionSplash
              transaction={data.transactions[0]}
              userName={data.userState[data.transactions[0].userId].username}
            />
          );

          await wait(1500);
        }

        if (data.currentSubRound == 4 && data.currentTurn == 0) {
          _setSelectedCard(null);
          playSound();
          await wait(500);
          setLoadingMsg(
            <View style={{ gap: 30, alignItems: "center" }}>
              <Image
                source={require("../../assets/images/circuit.png")}
                style={{ width: 200, height: 150 * 1.5 }}
              />
              <CustomText family="SemiBoldItalic" size={20}>
                Circuit Round Begins!
              </CustomText>
            </View>
          );
          // Changed from 2000 to 1500 for Buddy Version
          await wait(5000);
        }

        if (shouldDistributeCards) {
          setLoadingMsg(
            <>
              <View style={{ gap: 30, alignItems: "center" }}>
                <Image
                  source={require("../../assets/gif/cards.gif")}
                  style={{ width: 200 * 1.5, height: 150 * 1.5 }}
                />
                <CustomText family="SemiBoldItalic" size={16}>
                  Cards Are Being Distributed! Please hold on...
                </CustomText>
              </View>
            </>
          );

          await wait(2000);
        }

        if (data.currentSubRound < 5) {
          // Commented this code for Buddy Version

          // setLoadingMsg(
          //   <>
          //     <ActivityIndicator size="50" color={Colors.white} />
          //     <CustomText family="SemiBoldItalic" size={16}>
          //       अब `
          //       {data.userState[data.playerOrder[data.currentTurn]].username}`
          //       की बारी है"
          //     </CustomText>
          //   </>
          // );

          router.replace(isMyTurn ? "/gameroom/myturn" : "/gameroom");
        } else {
          setLoadingMsg(
            <View style={{ gap: 30, alignItems: "center" }}>
              <Image
                source={require("../../assets/gif/bear-and-bull.gif")}
                style={{ width: 200 * 1.5, height: 150 * 1.5 }}
              />
              <CustomText family="SemiBoldItalic" size={16}>
                Calculating results...
              </CustomText>
            </View>
          );
          await wait(2000);

          router.push("/roundend");
        }
        // await wait(1000);

        setLoadingMsg(null);
      } catch (error) {
        console.log("Somthing went wrong in roundInfo", error);
        setLoadingMsg(null);
      }
    };

    conn.current.on("roundInfo", roundInfo);

    return () => {
      conn.current.off("roundInfo", roundInfo);
    };
  }, [conn.current, myUserId]);

  useEffect(() => {
    if (!conn.current) return;
    const endGame = (data) => {
      setResults(data.results);
      router.push("/endGame");
    };

    conn.current.on("endGame", endGame);

    return () => {
      conn.current.off("endGame", endGame);
    };
  }, [conn.current]);

  return (
    <GameStateContext.Provider
      value={{
        gameState,
        setGameState,
        setSelectedCard,
        _setSelectedCard,
        selectedCard,
        selectedPlayerId,
        setSelectedPlayerId,
        selectCompany,
        selectedEntity,
        selectedEntityType,
        setSelectedEntityType,
        players,
        myUserName,
        setMyUserName,
        results,
        setResults,
        conn,
        gameId,
        setGameId,
        create,
        join,
        leave,
        myUserId,
        setMyUserId,
      }}
    >
      {children}

      {loadingMsg && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.redirectingModal}
        >
          {loadingMsg}
        </Animated.View>
      )}
    </GameStateContext.Provider>
  );
}

export const useGameState = () => {
  const gameContext = useContext(GameStateContext);

  if (!gameContext) {
    throw new Error(
      "`useGameState` must be used only inside <GameStateContextProvider></GameStateContextProvider"
    );
  }

  return gameContext;
};

const styles = StyleSheet.create({
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
