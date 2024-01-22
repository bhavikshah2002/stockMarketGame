import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SocketConn from "../utils/socket";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { CustomText } from "../common/Text";
import { Colors } from "../common/styles";

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
  results: [],
  serResults: (s) => {},
  gameId: null,
  setGameId(p) {},
  create() {},
  join() {},
  leave() {},
  myUserId: null,
  setMyUserId(p) {},
});

export default function GameStateContextProvider({ children }) {
  const conn = useRef(null);
  const [gameState, setGameState] = useState(null);
  const [results, setResults] = useState([]);
  const [myUserId, setMyUserId] = useState(null);
  const [selectedCard, _setSelectedCard] = useState(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState(1);
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
  const [loadingMsg, setLoadingMsg] = useState("");

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

  //########### SOCKET STUFF ###########
  const create = () => {
    const id = new Date().getTime() % 1000000;
    setGameId(id);
    conn.current = new SocketConn(
      `http://13.232.187.121/ws/chat/${id}/?create=True&join=False&username=${myUserName}`
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
    conn.current = new SocketConn(
      `http://13.232.187.121/ws/chat/${gameId}/?create=False&join=True&username=${myUserName}`
    );
    return true;
  };

  const leave = () => {
    setGameId(null);
    setMyUserId(null);
    conn.current?.close();
  };

  useEffect(() => {
    if (!conn.current) return;

    const roundInfo = (data) => {
      setGameState(data);
      const isMyTurn = data.playerOrder[data.currentTurn] == myUserId;
      const shouldDistributeCards =
        data.currentSubRound == 1 && data.currentTurn == 0;

      if (shouldDistributeCards) {
        setLoadingMsg("Cards Are Being Distributed! Please hold on...");

        setTimeout(() => {
          setLoadingMsg(
            "अब `" +
              data.userState[data.playerOrder[data.currentTurn]].username +
              "` की बारी है"
          );

          if (data.currentSubRound < 5) {
            router.replace(isMyTurn ? "/gameroom/myturn" : "/gameroom");
          } else {
            router.push("/roundend");
          }

          setTimeout(() => {
            setLoadingMsg("");
          }, 1000);
        }, 2000);
      } else {
        setLoadingMsg(
          "अब `" +
            data.userState[data.playerOrder[data.currentTurn]].username +
            "` की बारी है"
        );

        if (data.currentSubRound < 5) {
          router.replace(isMyTurn ? "/gameroom/myturn" : "/gameroom");
        } else {
          router.push("/roundend");
        }

        setTimeout(() => {
          setLoadingMsg("");
        }, 1000);
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
      console.log(data);
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
        selectedCard,
        selectedPlayerId,
        setSelectedPlayerId,
        selectCompany,
        selectedEntity,
        selectedEntityType,
        players,
        myUserName,
        setMyUserName,

        conn,
        gameId,
        setGameId,
        create,
        join,
        leave,
        myUserId,
        setMyUserId,
        results,
        setResults,
      }}
    >
      {children}

      {loadingMsg && (
        <View style={styles.redirectingModal}>
          <ActivityIndicator size="50" color={Colors.white} />
          <CustomText family="SemiBoldItalic" size={16}>
            {loadingMsg}
          </CustomText>
        </View>
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
